import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { PlaySlider } from './gui';
import { SpinorScene } from './multiscene';

export class ScrubAnimation {
  scene: SpinorScene;
  channels: Array<AnimationChannel>;
  playSlider:PlaySlider;

  constructor(scene:SpinorScene) {
    this.scene = scene;
    this.channels = new Array<AnimationChannel>();
    this.playSlider = new PlaySlider(scene, 1/30);
    scene.gui.addControl(this.playSlider);

    this.playSlider.listeners.push((v) => {this.update(v)});
  }

  addChannel(newChannel:AnimationChannel) {
    this.channels.push(newChannel);
    let newMax = newChannel.keyframes[newChannel.keyframes.length-1][0];
    if (newMax > this.playSlider.maximum) {
      this.playSlider.maximum = newMax;
    }

    // update ticks
    var tickVals = new Set<number>();
    for (let c of this.channels) {
      for (let t of c.keyframes) {
        tickVals.add(t[0]);
      }
    }
    this.playSlider.updateTicks(new Array<number>(...tickVals).sort((a:number,b:number)=>a-b));
  }

  add(frames:Array<Keyframe>, object:Object, param:string) {
    this.addChannel(AnimationChannel.ControlParameter(frames, object, param));
  }

  update(time:number) {
    for (const c of this.channels) {
      var iBefore:number = -1;
      for (var i = 0; i < c.keyframes.length; i++) {
        if (c.keyframes[i][0] < time) {
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
        c.callback(vb + ((time - tb) / (ta - tb)) * (va - vb));
      }
    }
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