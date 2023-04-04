import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { SpinorScene } from '../../multiscene';
import { PlaySlider } from '../../gui';
import { BraketMaterial } from './shader';
import { MakeSliderControl } from '../../gui';

function _getShader(s:SpinorScene) : BraketMaterial {
  if (!(s.material instanceof BraketMaterial)) {
    throw new Error("AddCycleSlider only works on scenes with a BraketMaterial");
  }
  return s.material as BraketMaterial;
}

export function AddCycleSlider(s:SpinorScene) {
  let shader = _getShader(s);

  const slider = new PlaySlider(s, 0.01);
  slider.maximum = 1;
  slider.speed = 1/shader.period;
  shader.period = 0;
  shader.addListener(() => {
    let revolutions = Math.abs(shader.spin);
    if (shader.spin == 0) {
      slider.updateTicks([]);
    } else {
      let ticks = new Array<number>(revolutions);
      for (let i = 0; i < ticks.length; i++) {
        ticks[i] = i / ticks.length;
      }
      slider.updateTicks(ticks);
    }
  }, true);
  slider.listeners.push((v)=> {
    shader.time = v * Math.PI * 2;
  })
  s.gui.addControl(slider);
}

export function MakeControlGUI(s:SpinorScene) : GUI.Control {
  let shader = _getShader(s);

  let shaderPanel = new GUI.StackPanel('shader_panel')
  shaderPanel.isVertical = true;
  shaderPanel.width = '100%'
  shaderPanel.setPaddingInPixels(5);
  shaderPanel.adaptHeightToChildren = true;

  let [timeH, timeS] = MakeSliderControl('Phase')
  timeS.minimum = 0;
  timeS.maximum = 1;
  s.scene.registerAfterRender(() => {
    timeS.value = (shader.time / Math.PI / 2) % 1;
  });
  timeS.onValueChangedObservable.add((time:number) => {
    shader.time = time * Math.PI * 2;
  });
  shaderPanel.addControl(timeH);

  let [speedH, speedS] = MakeSliderControl('Cycle Time')
  speedS.minimum = 0;
  speedS.maximum = 5;
  speedS.value = 1;
  speedS.onValueChangedObservable.add((period:number) => {
    shader.period = period;
  });
  shaderPanel.addControl(speedH);

  return shaderPanel;
}