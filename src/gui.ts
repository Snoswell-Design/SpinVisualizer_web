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