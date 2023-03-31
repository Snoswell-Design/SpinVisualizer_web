import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { SpinorScene } from './multiscene';

export class PlaySlider extends GUI.Grid {
  playPause:GUI.Button;
  playImg:string;
  pauseImg:string;
  slider:GUI.Slider;
  sliderContainer:GUI.Rectangle;
  tickContainer:GUI.Grid;

  currentTime:number;
  speed:number;
  paused:boolean;
  suppressNextSliderUpdate:boolean;
  listeners:Array<(v:number)=>void>;

  constructor(scene:SpinorScene, step:number) {
    super("play_slider");
    this.playImg = scene.assetLocation + '/images/play.svg';
    this.pauseImg = scene.assetLocation + '/images/pause.svg';

    this.addColumnDefinition(30, true);
    this.addColumnDefinition(1);
    this.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.background = "#99999999";
    this.width = '100%';
    this.height = '30px';

    this.playPause = GUI.Button.CreateImageOnlyButton('play/pause button', this.pauseImg);
    this.playPause.image.stretch = GUI.Image.STRETCH_UNIFORM;
    this.playPause.width = "20px";
    this.playPause.height = "20px";
    this.playPause.color = "transparent";
    this.addControl(this.playPause, 0, 0);

    this.sliderContainer = new GUI.Rectangle();
    this.sliderContainer.width = '100%';
    this.sliderContainer.height = '100%';
    this.sliderContainer.thickness = 0;
    this.addControl(this.sliderContainer, 0, 1);

    this.slider = new GUI.Slider('animation_slider');
    this.slider.width = '100%';
    this.slider.height = '20px';
    this.slider.color = 'black';
    this.slider.minimum = 0;
    this.slider.maximum = 0;
    this.slider.step = step;

    this.tickContainer = new GUI.Grid();
    this.tickContainer.width = '100%';
    this.tickContainer.height = '100%';
    this.tickContainer.paddingLeftInPixels = this.slider.thumbWidthInPixels / 2;
    this.tickContainer.paddingRightInPixels = this.slider.thumbWidthInPixels / 2;
    this.tickContainer.background = '#00000022';

    this.sliderContainer.addControl(this.tickContainer);
    this.sliderContainer.addControl(this.slider);

    this.currentTime = 0;
    this.speed = 1;
    this.paused = false;
    this.suppressNextSliderUpdate = false;
    this.listeners = new Array();

    scene.scene.registerBeforeRender(() => {
      if (this.paused) { return; }

      this.currentTime += scene.scene.deltaTime * this.speed / 1000;
      if (this.currentTime > this.slider.maximum) {
        this.currentTime = 0;
      }
      this.suppressNextSliderUpdate = true;
      this.slider.value = this.currentTime;
      for (let l of this.listeners) {
        l(this.currentTime);
      }
    });

    this.slider.onValueChangedObservable.add((value:number) => {
      if (this.suppressNextSliderUpdate) {
        this.suppressNextSliderUpdate = false;
        return;
      }
      this.currentTime = value;
      if (!this.paused) {
        this.paused = true;
        this.playPause.image.source = this.playImg;
      }
      for (let l of this.listeners) {
        l(this.currentTime);
      }
    });

    this.playPause.onPointerClickObservable.add(() => {
      if (this.paused) {
        this.paused = false;
        this.playPause.image.source = this.pauseImg;
      } else {
        this.paused = true;
        this.playPause.image.source = this.playImg;
      }
    });
  }

  get maximum():number {
    return this.slider.maximum;
  }
  set maximum(v:number) {
    this.slider.maximum = v;
  }

  updateTicks(tickValues:Array<number>) {
    // Remove old tick marks
    this.tickContainer.clearControls();
    for (let i = this.tickContainer.columnCount-1; i >= 0; i--) {
      this.tickContainer.removeColumnDefinition(i);
    }
    // Return early in no tick to add
    if (tickValues == undefined || tickValues.length < 1) { return; }
    // Add ticks for 0 and slider.max if necessary
    if (tickValues[0] > 0) {
      tickValues.unshift(0);
    }
    if (tickValues[tickValues.length-1] < this.slider.maximum) {
      tickValues.push(this.slider.maximum);
    }
    for (let i = 0; i < tickValues.length-1; i++) {
      this.tickContainer.addColumnDefinition(tickValues[i+1] - tickValues[i]);
      if (i%2==1) {
        let r = new GUI.Rectangle();
        r.width = '100%';
        r.height = '100%';
        r.background = '#55FF5566';
        r.thickness = 0;
        this.tickContainer.addControl(r,0,i);
      }
    }
  }
}

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