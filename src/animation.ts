import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { SpinorScene } from './multiscene';

export class ScrubAnimation {
  scene: SpinorScene;
  channels: Array<AnimationChannel>;
  currentTime: number;
  maxTime: number;
  speed: number;
  paused: boolean;
  slider: GUI.Slider;
  playPause: GUI.Button;
  playImg:string;
  pauseImg:string;
  suppressNextSliderUpdate:boolean;

  constructor(scene:SpinorScene) {
    this.scene = scene;
    this.channels = new Array<AnimationChannel>();
    this.currentTime = 0;
    this.maxTime = 0;
    this.speed = 1;
    this.paused = false;
    this.playImg = scene.assetLocation + '/images/play.svg';
    this.pauseImg = scene.assetLocation + '/images/pause.svg';
    this.suppressNextSliderUpdate = false;

    this.makePlayPauseSlider();

    scene.scene.registerBeforeRender(() => {
      if (this.paused) { return; }

      this.currentTime += scene.scene.deltaTime * this.speed / 1000;
      if (this.currentTime > this.maxTime) {
        this.currentTime = 0;
      }
      this.suppressNextSliderUpdate = true;
      this.slider.value = this.currentTime;
      this.update();
    });
  }

  addChannel(newChannel:AnimationChannel) {
    this.channels.push(newChannel);
    let newMax = newChannel.keyframes[newChannel.keyframes.length-1][0];
    if (newMax > this.maxTime) {
      this.maxTime = newMax;
      this.slider.maximum = newMax;
    }
  }

  add(frames:Array<Keyframe>, object:Object, param:string) {
    this.addChannel(AnimationChannel.ControlParameter(frames, object, param));
  }

  update() {
    for (const c of this.channels) {
      var iBefore:number = -1;
      for (var i = 0; i < c.keyframes.length; i++) {
        if (c.keyframes[i][0] < this.currentTime) {
          iBefore = i;
        }
      }
      if (iBefore < 0) {
        c.callback(c.keyframes[0][1]);
      } else if (iBefore >= c.keyframes.length - 1) {
        c.callback(c.keyframes[c.keyframes.length-1][1]);
      } else {
        let [tb, vb] = c.keyframes[iBefore];
        let [ta, va] = c.keyframes[iBefore+1];
        c.callback(vb + ((this.currentTime - tb) / (ta - tb)) * (va - vb));
      }
    }
  }

  makePlayPauseSlider() {
    var playPause = GUI.Button.CreateImageOnlyButton('play/pause button', this.pauseImg);
    playPause.image.stretch = GUI.Image.STRETCH_UNIFORM;
    playPause.width = "20px";
    playPause.height = "20px";
    playPause.color = "transparent";

    var slider = new GUI.Slider('animation_slider');
    slider.width = '100%';
    slider.height = '20px';
    slider.color = 'black';
    slider.minimum = 0;
    slider.maximum = 0;
    slider.step = 1/30;

    var panel = new GUI.Grid('animation_controls');
    panel.addColumnDefinition(30, true);
    panel.addColumnDefinition(1);
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    panel.background = "#99999999";
    panel.width = '100%';
    panel.height = '30px';

    panel.addControl(playPause, 0, 0);
    panel.addControl(slider, 0, 1);
    if (this.scene.gui == undefined) {
      this.scene.makeGui();
    }
    this.scene.gui.addControl(panel);
    this.slider = slider;
    this.playPause = playPause;

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
      this.update();
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
}

export type Keyframe = [time:number, value:number];

export class AnimationChannel {
  callback: (value:number) => void;
  keyframes: Array<Keyframe>;

  constructor(frames:Array<Keyframe>, callback:(value:number) => void) {
    this.keyframes = frames;
    this.callback = callback;
  }

  static ControlParameter(frames:Array<Keyframe>, object:Object, param:string) : AnimationChannel {
    return new AnimationChannel(
      frames,
      (value:number) => {
        object[param] = value;
      },
    );
  }
}