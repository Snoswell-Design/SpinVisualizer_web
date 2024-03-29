import * as BABYLON from 'babylonjs';
import { CustomMaterial } from 'babylonjs-materials';
import { MaterialFactory } from '../../multiscene';

const numKernels = 4;

export function New(braket:string):MaterialFactory {
  return (s:BABYLON.Scene) => {
    let m = new BraketMaterial(s);
    m.parseBraKet(braket);
    return m;
  };
}

export class BraketMaterial extends CustomMaterial {
  stepSpeeds: Float32Array;
  stepPhases:Float32Array;
  stepRotations:Float32Array;
  kernelWinds: Float32Array;
  kernelPhases: Float32Array;
  period: number;
  _time: number;
  radius: number;
  power: number;
  center: number;
  spin: number;
  braketChangeListeners: Array<() => void>;

  constructor(scene: BABYLON.Scene) {
    super("BraKet_Material", scene);

    this.stepSpeeds = new Float32Array(numKernels+1);
    this.stepPhases = new Float32Array(numKernels+1);
    this.stepRotations = new Float32Array(numKernels+1);
    this.kernelWinds = new Float32Array(numKernels);
    this.kernelPhases = new Float32Array(numKernels);
    this._time = 0;
    this.period = 8;
    this.radius = 10;
    this.power = 1.5;
    this.center = 1.3;
    this.spin = 0;
    this.braketChangeListeners = new Array();

    this.AddUniform('numSteps', 'int', numKernels + 1);
    this.AddUniform('stepRotations', 'float[' + (numKernels + 1) + ']', null);
    this.AddUniform('stepSpeeds', 'float[' + (numKernels + 1) + ']', null);
    this.AddUniform('kernelWinds', 'float[' + numKernels + ']', null);
    this.AddUniform('kernelPhases', 'float[' + numKernels + ']', null);
    this.AddUniform('radial_radius', 'float', 0);
    this.AddUniform('radial_power', 'float', 0);
    this.AddUniform('radial_center', 'float', 0);
    this.AddAttribute('trail');

    this.Vertex_Definitions(`
      attribute float trail;
      mat4 rotXY(float a) {
            float c = cos(a);
            float s = sin(a);
            return mat4(
                 c, s, 0, 0,
                -s, c, 0, 0,
                 0, 0, 1, 0,
                 0, 0, 0, 1);
        }
        mat4 rotYZ(float a) {
            float c = cos(a);
            float s = sin(a);
            return mat4(
                1, 0, 0, 0,
                0, c, s, 0,
                0,-s, c, 0,
                0, 0, 0, 1);
        }
        mat4 foldXY(float amount, float angle) {
            mat4 angleMat = rotXY(angle);
            return angleMat * rotYZ(amount) * transpose(angleMat);
        }
    `);
    this.Vertex_After_WorldPosComputed(`
        float r = 1.0 - (length(worldPos) - radial_center) / (radial_radius - radial_center);
        r = clamp(r, 0.0, 1.0);
        r = -0.5 * (cos(PI*r) - 1.0);
        if (radial_power > 0.0) {
          r = pow(r,radial_power);
        } else {
          r = 1.0-(pow(1.0-r,-radial_power));
        }
        mat4 rotation = mat4(1.0);
        for (int i = 0; i < numSteps; i++) {
          rotation = rotation * rotXY(stepRotations[i] + trail * stepSpeeds[i]);
          rotation = rotation * foldXY(r * PI * kernelWinds[i], kernelPhases[i]);
        }
        rotation = rotation * rotXY(stepRotations[numSteps]);
        worldPos = worldPos * rotation;
        vNormalW = vec3(vec4(vNormalW, 1.0) * rotation);
    `);

    this.onBindObservable.add(() => {
      let effect = this.getEffect();
      effect.setInt("numSteps", numKernels);
      effect.setFloatArray("stepRotations", this.stepRotations);
      effect.setFloatArray("stepSpeeds", this.stepSpeeds);
      effect.setFloatArray("kernelWinds", this.kernelWinds);
      effect.setFloatArray("kernelPhases", this.kernelPhases);

      effect.setFloat('radial_radius', this.radius);
      effect.setFloat('radial_power', this.power);
      effect.setFloat('radial_center', this.center);
    });

    scene.registerBeforeRender(() => {
      if (this.period > 0) {
        let delta = scene.getEngine().getDeltaTime() / 1000 * Math.PI * 2 / this.period;
        this._time += delta;
        for (var i = 0; i <= numKernels; i++) {
          this.stepRotations[i] += this.stepSpeeds[i] * delta;
        }
      }
    });
  }

  parseBraKet(def:string) {
    for (var i = 0; i < numKernels; i++) {
      this.stepSpeeds[i] = 0;
      this.stepPhases[i] = 0;
      this.kernelWinds[i] = 0;
      this.kernelPhases[i] = 0;
    }
    this.stepSpeeds[numKernels] = 0;
    this.stepPhases[numKernels] = 0;

    var currentStep:number = 0;
    var currentSpeed:number = 0;
    var spin:number = 0;
    for (var i = 0; i < def.length; i++) {
      let c = def.charAt(i);
      switch (c) {
        case 's':
          if (currentStep % 2 == 0) {
            spin += currentSpeed;
          } else {
            spin -= currentSpeed;
          }
          this.stepSpeeds[currentStep] = currentSpeed;
          currentSpeed = 0;
          this.kernelWinds[currentStep] = 1;
          currentStep += 1;
          break;
        case '<':
          currentSpeed += 1;
          break;
        case '>':
          currentSpeed -= 1;
          break;
      }
    }
    if (currentStep % 2 == 0) {
      spin += currentSpeed;
    } else {
      spin -= currentSpeed;
    }
    this.stepSpeeds[currentStep] = currentSpeed;
    this.spin = spin;
    this.time = this._time; // Force update of stepRotations
    for (var listener of this.braketChangeListeners) {
      listener();
    }
  }

  addListener(listener:() => void, fireNow=false) {
    this.braketChangeListeners.push(listener);
    if (fireNow) {
      listener();
    }
  }

  set time(t:number) {
    this._time = t;
    for (var i = 0; i <= numKernels; i++) {
      this.stepRotations[i] = this.stepPhases[i] + this.stepSpeeds[i] * t;
    }
  }
}