import * as BABYLON from 'babylonjs';
import { SpinorShader } from './shader';
import { MeshView, OuterCage } from './meshes';

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

  constructor(canvas?:HTMLCanvasElement|string) {
    if (canvas == null) {
      // Make a new canvas and insert it just before the script element calling this code
      var scripts = document.getElementsByTagName('script');
      var currentScriptElement = scripts[scripts.length - 1];
      canvas = document.createElement("canvas")
      canvas.setAttribute("touch-action", "none");
      canvas.style.width = "100%";
      currentScriptElement.parentElement.insertBefore(canvas, currentScriptElement);
      this.canvas = canvas;
    } else if (typeof canvas == "string") {
      this.canvas = document.getElementById(canvas) as HTMLCanvasElement;
    } else {
      this.canvas = canvas;
    }
    
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
  }
};

engine.runRenderLoop(() => {
  if (viewSceneMap.has(engine.activeView)) {
    viewSceneMap.get(engine.activeView).scene.render();
  }
});