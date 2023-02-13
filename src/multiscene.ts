import * as BABYLON from 'babylonjs';
import { AdvancedDynamicTexture } from 'babylonjs-gui';
import { SpinorShader } from './shader';

var renderCanvas = document.createElement("canvas");
export const engine = new BABYLON.Engine(renderCanvas, true);
const viewSceneMap = new Map<BABYLON.EngineView, SpinorScene>();
var attachedScene:SpinorScene;

export var latestScene: SpinorScene;

export class SpinorScene {
  canvas: HTMLCanvasElement;
  view: BABYLON.EngineView;
  scene: BABYLON.Scene;
  camera: BABYLON.ArcRotateCamera;
  shader: SpinorShader;
  light: BABYLON.HemisphericLight;
  linkedCameraScenes: Array<SpinorScene>;
  gui:AdvancedDynamicTexture;
  assetLocation:string;

  constructor(canvas:HTMLCanvasElement|string, assetLocation?:string) {
    if (typeof canvas == "string") {
      this.canvas = document.getElementById(canvas) as HTMLCanvasElement;
    } else {
      this.canvas = canvas;
    }
    this.assetLocation = assetLocation;
    
    this.scene = new BABYLON.Scene(engine);
    this.scene.clearColor = new BABYLON.Color4(0.8,0.8,0.8,1);

    this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/4, Math.PI/4, 20, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvas, true);
    this.camera.upVector = new BABYLON.Vector3(0, 0, 1);
    this.camera.wheelPrecision = 20;
    this.camera.lowerRadiusLimit = 2;
    this.camera.upperRadiusLimit = 30;
    this.camera.lockedTarget = BABYLON.Vector3.Zero();

    this.shader = new SpinorShader(this.scene);

    this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1,1,0), this.scene);

    this.view = engine.registerView(this.canvas, this.camera);
    viewSceneMap.set(this.view, this);
    latestScene = this;

    if (attachedScene == null) {
      attachedScene = this;
      engine.inputElement = this.canvas;
      this.scene.attachControl();
    } else {
      this.scene.detachControl();
    }

    // Focus on mouseover
    this.canvas.addEventListener("mouseover", () => {
      attachedScene.scene.detachControl();
      engine.inputElement = this.canvas;
      this.scene.attachControl();
      attachedScene = this;
    });

    // Prevent scrolls when the mouse is over the canvas from scrolling the page
    this.canvas.addEventListener('wheel', e => {
      e.preventDefault();
      e.stopPropagation();
    });

    /*// Outer cage
    new MeshView({
      scene:this,
      mesh:OuterCage(),
      scale:10,
      meshColor:new BABYLON.Color4(0,0,0,0),
      alpha:0.2,
    });*/

    this.linkedCameraScenes = new Array<SpinorScene>();
  }

  makeGui() {
    this.gui = AdvancedDynamicTexture.CreateFullscreenUI("UI",true,this.scene);
  }

  static LinkCameras(...scenes:SpinorScene[]) {
    for (var i = 0; i < scenes.length-1; i++) {
      for (var j = i+1; j < scenes.length; j++) {
        scenes[i].linkedCameraScenes.push(scenes[j]);
        scenes[j].linkedCameraScenes.push(scenes[i]);
      }
    }
  }
};

engine.runRenderLoop(() => {
  if (viewSceneMap.has(engine.activeView)) {
    let scene = viewSceneMap.get(engine.activeView);
    scene.scene.render();

    if (attachedScene == scene) {
      for (var s of scene.linkedCameraScenes) {
        s.camera.alpha = scene.camera.alpha;
        s.camera.beta = scene.camera.beta;
        s.camera.radius = scene.camera.radius;
      }
    }
  }
});