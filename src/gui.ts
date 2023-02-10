import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { SpinorScene } from './multiscene';
import { SpinorShader } from './shader';

export function TopSlider(
  name:string,
  min:number,
  max:number,
  step:number,
  onChange:(value:number) => void,
) : [GUI.Container, GUI.Slider] {
  let h = new GUI.TextBlock(name + '_label');
  h.text = name;
  h.height = '30px';
  h.color = 'black';
  h.textHorizontalAlignment = 0;
  h.paddingLeftInPixels = 5;

  let s = new GUI.Slider(name + '_slider');
  s.width = '100%';
  s.height = '20px';
  s.color = 'black';
  s.minimum = min;
  s.maximum = max;
  s.step = step;

  s.onValueChangedObservable.add(onChange);

  let headerPanel = new GUI.Grid(name + '_controls');
  headerPanel.addColumnDefinition(150,true);
  headerPanel.addColumnDefinition(1);
  headerPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  headerPanel.background = "#99999999";
  headerPanel.width = '100%';
  headerPanel.height = '30px';
  headerPanel.addControl(h,0,0);
  headerPanel.addControl(s,0,1);

  return [headerPanel, s]
}

export function PhaseSlider(s:SpinorScene) {
  var [panel, slider] = TopSlider("Phase", 0, 1, 0.01,(value:number)=> {
    s.shader.time = value * Math.PI * 2;
  });
  s.scene.registerAfterRender(() => {
    slider.value = (s.shader.time / Math.PI / 2) % 1;
  });
  return [panel, slider];
}

function makeSliderControl(name: string): [GUI.StackPanel, GUI.Slider] {
  let h = new GUI.TextBlock(name + '_label');
  h.text = name;
  h.height = '30px';
  h.color = 'black';
  h.textHorizontalAlignment = 0;
  //h.paddingLeftInPixels = 5;

  let s = new GUI.Slider(name + '_radius');
  s.width = '100%';
  s.height = '20px';
  s.color = 'black';

  let headerPanel = new GUI.StackPanel(name + '_controls');
  //headerPanel.isVertical = false;
  headerPanel.width = '100%';
  headerPanel.adaptHeightToChildren = true;
  headerPanel.addControl(h);
  headerPanel.addControl(s);

  return [headerPanel, s]
}

export function makeGUI(scene: BABYLON.Scene, shader: SpinorShader) {
  //scene.debugLayer.show();
  let gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  //var meshClass = new Meshes();
  //meshClass.material = shader.shader;

  var panel = new GUI.StackPanel("Meshes");
  panel.width = "200px";
  panel.isVertical = true;
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  panel.background = "#99999999";
  gui.addControl(panel);

  // shader controls

  let shaderPanel = new GUI.StackPanel('shader_panel')
  shaderPanel.isVertical = true;
  shaderPanel.width = '100%'
  shaderPanel.setPaddingInPixels(5);
  shaderPanel.adaptHeightToChildren = true;

  let [timeH, timeS] = makeSliderControl('Phase')
  timeS.minimum = 0;
  timeS.maximum = 1;
  scene.registerAfterRender(() => {
    timeS.value = (shader.time / Math.PI / 2) % 1;
  });
  timeS.onValueChangedObservable.add((time:number) => {
    shader.time = time * Math.PI * 2;
  });
  shaderPanel.addControl(timeH);

  let [speedH, speedS] = makeSliderControl('Cycle Time')
  speedS.minimum = 0;
  speedS.maximum = 5;
  speedS.value = 1;
  speedS.onValueChangedObservable.add((period:number) => {
    shader.period = period;
  });
  shaderPanel.addControl(speedH);

  panel.addControl(shaderPanel);

  /*for (var meshView of meshClass.meshes) {
    panel.addControl(meshView.createControl());
  }*/
}
/*
  let gui : dat.GUI = new dat.GUI();
  gui.domElement.style.marginTop = "100px";
  gui.domElement.id = "datGUI";

  var options = {
    speed: 1.0,
    time: 0.0,
    radius: 5.0,
    power: 1.5,
    center: 2.0,
    "Sphere": false,
    "Sphere Radius": 1.0,
    "X Axis": false,
    "Y Axis": false,
    "Z Axis": false,
    "XY Plane": false,
    "XZ Plane": false,
    "YZ Plane": false,
    "XY Quarter": false,
    "XZ Quarter": false,
    "YZ Quarter": false,
    field: false,
    "Ring 1": "Off",
    "Ring 1 Radius": 1.0,
    "Ring 2": "Off",
    "Ring 2 Radius": 1.0,
    "Ring 3": "Off",
    "Ring 3 Radius": 1.0,
    "Cage 1": false,
    "Cage 1 Radius": 1.0,
    "Cage 2": false,
    "Cage 2 Radius": 1.0,
    "Cage 3": false,
    "Cage 3 Radius": 1.0,
  }
  let meshes: Record<string, any> = {};
  let controllers : Record<string, dat.GUIController> = {};

  var meshClass = new Meshes();
  meshClass.material = shader.shader;


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


  //controllers.radius = spinSettings.add(options, "radius", 1, 10, 0.5).onChange((value) => {
  //  shader.radius = value;
  //});
  controllers.power = spinSettings.add(options, "power", 0.1, 3, 0.1).onChange((value) => {
    shader.power = value;
  });
  controllers.center = spinSettings.add(options, "center", 0.1, 10, 0.1).onChange((value) => {
    shader.center = value;
  });

  var objects = gui.addFolder("Objects");

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

  function onOffControl(option:string, meshname:string) {
    controllers[option] = objects.add(options, option).onChange((value) => {
      meshClass[meshname].isVisible = value;
    });
  }

  onOffControl("X Axis", "xAxis");
  onOffControl("Y Axis", "yAxis");
  onOffControl("Z Axis", "zAxis");
  onOffControl("XY Plane", "xyPlane");
  onOffControl("XZ Plane", "xzPlane");
  onOffControl("YZ Plane", "yzPlane");
  onOffControl("XY Quarter", "xyQuarter");
  onOffControl("XZ Quarter", "xzQuarter");
  onOffControl("YZ Quarter", "yzQuarter");

  function radiusControl(option:string, meshname:string) {
    controllers[option] = objects.add(options, option).onChange((value) => {
        meshClass[meshname].isVisible = value;
    });
    controllers[option + "Radius"] = objects.add(options, option + " Radius", 0.1, 10, 0.1).onChange((value) => {
      meshClass[meshname].scaling = new BABYLON.Vector3(value, value, value);
    });
  }

  radiusControl("Sphere", "sphere");
  radiusControl("Cage 1", "cage1");
  radiusControl("Cage 2", "cage2");
  radiusControl("Cage 3", "cage3");

  function ringControl(option:string, meshname:string) {
    controllers[option] = objects.add(options, option, ["Off", "XY", "XZ", "YZ"]).onChange((value) => {
      switch (value) {
        case "XY":
          meshClass[meshname].isVisible = true;
          meshClass[meshname].rotation = new BABYLON.Vector3(0, 0, 0);
          break;
        case "XZ":
          meshClass[meshname].isVisible = true;
          meshClass[meshname].rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
          break;
        case "YZ":
          meshClass[meshname].isVisible = true;
          meshClass[meshname].rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
          break;
        default:
          meshClass[meshname].isVisible = false;
          break;
      }
    });
    controllers[option + "Radius"] = objects.add(options, option + " Radius", 0.1, 10, 0.1).onChange((value) => {
      meshClass[meshname].scaling = new BABYLON.Vector3(value, value, value);
    });
  }

  ringControl("Ring 1", "ring1");
  ringControl("Ring 2", "ring2");
  ringControl("Ring 3", "ring3");


  controllers["Sphere"].setValue(true);
  controllers["X Axis"].setValue(true);
  controllers["Y Axis"].setValue(true);
  controllers["Z Axis"].setValue(true);
}*/