import * as BABYLON from 'babylonjs';
import * as dat from 'dat.gui';
import { SpinorShader } from './shader';

export function makeGUI(scene: BABYLON.Scene, shader: SpinorShader) {
  var oldgui = document.getElementById("datGUI");
  if (oldgui != null) {
      oldgui.remove();
  }

  let gui : dat.GUI = new dat.GUI();
  gui.domElement.style.marginTop = "100px";
  gui.domElement.id = "datGUI";

  var options = {
    speed: 1.0,
    time: 0.0,
    radius: 5.0,
    power: 1.5,
    center: 2.0,
    sphere: false,
    sphereRadius: 1.0,
    xaxis: false,
    yaxis: false,
    zaxis: false,
    xyplane: false,
    xzplane: false,
    yzplane: false,
    field: false,
  }
  let meshes: Record<string, any> = {};
  let controllers : Record<string, dat.Controller> = {};


  let spinSettings = gui.addFolder("Spin settings")

  controllers.speed = spinSettings.add(options, "speed", 0, 5, 0.1).onChange((value) => {
    shader.speed = value;
  });

  controllers.time = spinSettings.add(options, "time", 0, 1, 0.01);
  controllers.time.listen();
  scene.registerAfterRender(() => {
    options.time = (shader.time / Math.PI / 2) % 1;
  });
  controllers.time.onChange((value) => {
    shader.time = value * Math.PI * 2;
  });


  controllers.radius = spinSettings.add(options, "radius", 1, 10, 0.5).onChange((value) => {
    shader.radius = value;
  });
  controllers.power = spinSettings.add(options, "power", 0.1, 3, 0.1).onChange((value) => {
    shader.power = value;
  });
  controllers.center = spinSettings.add(options, "center", 0.1, 10, 0.1).onChange((value) => {
    shader.center = value;
  });

  let objects = gui.addFolder("Objects")

  controllers.sphere = objects.add(options, "sphere").onChange((value: any) => {
    let sphere = meshes.sphere;
    if (value && sphere == null) {
      sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { segments: 32, diameter: 1}, scene);
      let scale = options.sphereRadius;
      sphere.scaling = new BABYLON.Vector3(scale, scale, scale);
      sphere.material = shader.shader;
      meshes.sphere = sphere;
    }
    if (!value && sphere != null) {
      sphere.dispose();
      delete meshes.sphere;
    }
  });

  controllers.sphereRadius = objects.add(options, "sphereRadius", 0.1, 10, 0.1).onChange((value) => {
    let sphere = meshes.sphere;
    if (sphere != null) {
      sphere.scaling = new BABYLON.Vector3(value, value, value);
    }
  });
  
  controllers.xaxis = objects.add(options, "xaxis").onChange((value) => {
    let mesh = meshes.xAxis;
    if (value && mesh == null) {
      mesh = BABYLON.MeshBuilder.CreateCylinder('xAxis', { height: 10, diameter: 0.1, subdivisions: 100});
      mesh.material = shader.shader;
      mesh.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
      meshes.xAxis = mesh;
    }
    if (!value && mesh != null) {
      mesh.dispose();
      delete meshes.xAxis;
    }
  });

  controllers.yaxis = objects.add(options, "yaxis").onChange((value) => {
    let mesh = meshes.yAxis;
    if (value && mesh == null) {
      mesh = BABYLON.MeshBuilder.CreateCylinder('yAxis', { height: 10, diameter: 0.1, subdivisions: 100});
      mesh.material = shader.shader;
      mesh.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
      meshes.yAxis = mesh;
    }
    if (!value && mesh != null) {
      mesh.dispose();
      delete meshes.yAxis;
    }
  });

  controllers.zaxis = objects.add(options, "zaxis").onChange((value) => {
    let mesh = meshes.zAxis;
    if (value && mesh == null) {
      mesh = BABYLON.MeshBuilder.CreateCylinder('zAxis', { height: 10, diameter: 0.1, subdivisions: 100});
      mesh.material = shader.shader;
      meshes.zAxis = mesh;
    }
    if (!value && mesh != null) {
      mesh.dispose();
      delete meshes.zAxis;
    }
  });

  controllers.xyplane = objects.add(options, "xyplane").onChange((value) => {
    let mesh : Array<BABYLON.AbstractMesh> = meshes.xyplane;
    if (value && mesh == null) {
      mesh = Array(2);
      let m1 = BABYLON.MeshBuilder.CreateGround('xyplane', { width: 10, height: 10, subdivisions: 100 }, scene)
      m1.position = new BABYLON.Vector3(0, 0.01, 0);
      m1.material = shader.shader;
      //m1.visibility = 0;
      let m2 = m1.createInstance('xyplane_back');
      m2.rotation = new BABYLON.Vector3(Math.PI, 0, 0);
      m2.position = new BABYLON.Vector3(0, -0.01, 0);
      mesh[0] = m1;
      mesh[1] = m2;
      meshes.xyplane = mesh;
    }
    if (!value && mesh != null) {
      for (let m of mesh) {
        m.dispose();
      }
      delete meshes.xyplane;
    }
  });
  controllers.xzplane = objects.add(options, "xzplane").onChange((value) => {
    let mesh : Array<BABYLON.AbstractMesh> = meshes.xzplane;
    if (value && mesh == null) {
      mesh = Array(2);
      let m1 = BABYLON.MeshBuilder.CreateGround('xzplane', { width: 10, height: 10, subdivisions: 100 }, scene)
      m1.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
      m1.position = new BABYLON.Vector3(0, 0, 0.01);
      m1.material = shader.shader;
      //m1.visibility = 0;
      let m2 = m1.createInstance('xzplane_back');
      m2.rotation = new BABYLON.Vector3(Math.PI / 2, Math.PI, 0);
      m2.position = new BABYLON.Vector3(0, 0, -0.01);
      mesh[0] = m1;
      mesh[1] = m2;
      meshes.xzplane = mesh;
    }
    if (!value && mesh != null) {
      for (let m of mesh) {
        m.dispose();
      }
      delete meshes.xzplane;
    }
  });
  controllers.yzplane = objects.add(options, "yzplane").onChange((value) => {
    let mesh : Array<BABYLON.AbstractMesh> = meshes.yzplane;
    if (value && mesh == null) {
      mesh = Array(2);
      let m1 = BABYLON.MeshBuilder.CreateGround('yzplane', { width: 10, height: 10, subdivisions: 100 }, scene)
      m1.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
      m1.position = new BABYLON.Vector3(0.01, 0, 0);
      m1.material = shader.shader;
      let m2 = m1.createInstance('yzplane_back');
      m2.rotation = new BABYLON.Vector3(0, Math.PI, Math.PI / 2);
      m2.position = new BABYLON.Vector3(-0.01, 0, 0);
      mesh[0] = m1;
      mesh[1] = m2;
      meshes.yzplane = mesh;
    }
    if (!value && mesh != null) {
      for (let m of mesh) {
        m.dispose();
      }
      delete meshes.yzplane;
    }
  });
  controllers.field = objects.add(options, "field").onChange((value) => {
    var mesh : Array<BABYLON.Mesh> = meshes.field;
    if (value && mesh == null) {
      mesh = Array<BABYLON.Mesh>(10*10*10);
      let i = 0;
      for (var x = 0; x <= 10; x++) {
          for (var y = 0; y <= 10; y++) {
              for (var z = 0; z <= 10; z++) {
                  var box = BABYLON.Mesh.CreateBox("Box", 0.1, scene);
                  box.material = shader.shader;
                  box.position = new BABYLON.Vector3(5-x,5-y,5-z);
                  mesh[i] = box;
                  i++;
              }
          }
      }
      meshes.field = mesh;
    }
    if (!value && mesh != null) {
      for (let m of mesh) {
        m.dispose();
      }
      delete meshes.field;
    }
  });

  controllers.sphere.setValue(true);
  controllers.xaxis.setValue(true);
  controllers.yaxis.setValue(true);
  controllers.zaxis.setValue(true);
}