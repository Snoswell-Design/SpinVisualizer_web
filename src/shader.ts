import * as BABYLON from 'babylonjs';
import { CustomMaterial } from 'babylonjs-materials';

const numKernels = 3;

export class SpinorShader {
  stepSpeeds: Float32Array;
  stepPhases:Float32Array;
  kernelWinds: Float32Array;
  kernelPhases: Float32Array;
  period: number;
  time: number;
  radius: number;
  power: number;
  center: number;
  shader: CustomMaterial;

  constructor(scene: BABYLON.Scene) {
    this.stepSpeeds = new Float32Array(numKernels+1);
    this.stepPhases = new Float32Array(numKernels+1);
    this.kernelWinds = new Float32Array(numKernels);
    this.kernelPhases = new Float32Array(numKernels);
    this.time = 0;
    this.period = 8;
    this.radius = 10;
    this.power = 1.5;
    this.center = 1.3;

    this.shader = new CustomMaterial("spinorMaterial", scene);
    this.shader.AddUniform('time', 'float', 0);
    this.shader.AddUniform('numSteps', 'int', numKernels + 1);
    this.shader.AddUniform('stepSpeeds', 'float[' + (numKernels + 1) + ']', null);
    this.shader.AddUniform('stepPhases', 'float[' + (numKernels + 1) + ']', null);
    this.shader.AddUniform('kernelWinds', 'float[' + numKernels + ']', null);
    this.shader.AddUniform('kernelPhases', 'float[' + numKernels + ']', null);
    this.shader.AddUniform('radial_radius', 'float', 0);
    this.shader.AddUniform('radial_power', 'float', 0);
    this.shader.AddUniform('radial_center', 'float', 0);

    this.shader.Vertex_Definitions(`
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
    this.shader.Vertex_After_WorldPosComputed(`
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
          rotation = rotation * rotXY(time * stepSpeeds[i] + stepPhases[i]);
          rotation = rotation * foldXY(r * PI * kernelWinds[i], kernelPhases[i]);
        }
        rotation = rotation * rotXY(time * stepSpeeds[numSteps] + stepPhases[numSteps]);
        worldPos = worldPos * rotation;
        vNormalW = vec3(vec4(vNormalW, 1.0) * rotation);
    `);

    this.shader.onBindObservable.add(() => {
      this.shader.getEffect().setFloat('time', this.time);
      this.shader.getEffect().setInt("numSteps", numKernels);

      this.shader.getEffect().setFloatArray("stepSpeeds", this.stepSpeeds);
      this.shader.getEffect().setFloatArray("stepPhases", this.stepPhases);

      this.shader.getEffect().setFloatArray("kernelWinds", this.kernelWinds);
      this.shader.getEffect().setFloatArray("kernelPhases", this.kernelPhases);

      this.shader.getEffect().setFloat('radial_radius', this.radius);
      this.shader.getEffect().setFloat('radial_power', this.power);
      this.shader.getEffect().setFloat('radial_center', this.center);
    });

    scene.registerBeforeRender(() => {
      this.time += scene.getEngine().getDeltaTime() / 1000 * Math.PI * 2 / this.period;
    });
  }

  parseBraKet(def:string) {
    if ((def.match("/s/g") || []).length > numKernels) {
      console.error('too many kernels in bra-ket definition, max is ' + numKernels, def);
      return;
    }
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
    for (var i = 0; i < def.length; i++) {
      let c = def.charAt(i);
      switch (c) {
        case 's':
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
    this.stepSpeeds[currentStep] = currentSpeed;
  }
}