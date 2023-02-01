import * as BABYLON from 'babylonjs';
import { SpinorShader } from './shader';

var renderCanvas = document.createElement("canvas");
export const engine = new BABYLON.Engine(renderCanvas, true);
const viewSceneMap = new Map<BABYLON.EngineView, SpinorScene>();

export class SpinorScene {
  view: BABYLON.EngineView;
  scene: BABYLON.Scene;
  camera: BABYLON.ArcRotateCamera;
  shader: SpinorShader;
  light: BABYLON.HemisphericLight;

  constructor(canvas:HTMLCanvasElement) {
    this.scene = new BABYLON.Scene(engine);
    this.scene.clearColor = new BABYLON.Color4(1,1,1,1);

    this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/4, Math.PI/4, 20, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(canvas, true);
    this.camera.upVector = new BABYLON.Vector3(0, 0, 1);
    this.camera.wheelPrecision = 20;
    this.camera.lowerRadiusLimit = 2;
    this.camera.upperRadiusLimit = 30;
    this.camera.lockedTarget = BABYLON.Vector3.Zero();

    this.shader = new SpinorShader(this.scene);

    this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1,1,0), this.scene);

    this.view = engine.registerView(canvas, this.camera);
    viewSceneMap.set(this.view, this);
  }
};

engine.runRenderLoop(() => {
  if (viewSceneMap.has(engine.activeView)) {
    viewSceneMap.get(engine.activeView).scene.render();
  }
});