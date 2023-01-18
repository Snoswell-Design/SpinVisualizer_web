import * as BABYLON from 'babylonjs';
import { makeGUI } from './gui';
import { SpinorShader } from './shader';

const canvas: any = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
  const scene = new BABYLON.Scene(engine);

  scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);
  var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/4, Math.PI/4, 20, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  camera.upVector = new BABYLON.Vector3(0, 0, 1);
  camera.wheelPrecision = 20;
  camera.lowerRadiusLimit = 2;
  camera.upperRadiusLimit = 30;
  camera.lockedTarget = BABYLON.Vector3.Zero();

  let shader = new SpinorShader(scene);

  var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1,1,0), scene);

  makeGUI(scene, shader);

  //scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
  //scene.fogStart = 10;
  //scene.fogEnd = 30;
  //scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.9);

  return scene;
};

var scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});