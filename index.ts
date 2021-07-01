import * as BABYLON from 'babylonjs';
import { makeGUI } from './gui';
import { SpinorShader } from './shader';

const canvas: any = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
  const scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/4, Math.PI/4, 20, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  let shader = new SpinorShader(scene);

  var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1,1,0), scene);

  //var sphere = BABYLON.MeshBuilder.CreateSphere("Sphere", { diameter: 5}, scene);
  //sphere.material = shader.shader;
  //var box = BABYLON.MeshBuilder.CreateBox("Box", {size:1}, scene);

  /*for (var x = 0; x <= 10; x++) {
      for (var y = 0; y <= 10; y++) {
          for (var z = 0; z <= 10; z++) {
              var box = BABYLON.Mesh.CreateBox("Box", 0.1, scene);
              box.material = shader.shader;
              box.position = new BABYLON.Vector3(5-x,5-y,5-z);
          }
      }
  }*/

  makeGUI(scene, shader);

  scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
  scene.fogStart = 10;
  scene.fogEnd = 30;

  return scene;
};

var scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});