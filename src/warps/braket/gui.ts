import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { SpinorScene } from '../../multiscene';
import { PlaySlider } from '../../gui';
import { BraketMaterial } from './shader';

export function AddCycleSlider(s:SpinorScene) {
  if (!(s.material instanceof BraketMaterial)) {
    console.error("AddCycleSlider only works on scenes with a BraketMaterial");
    return;
  }
  let shader = s.material as BraketMaterial;

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