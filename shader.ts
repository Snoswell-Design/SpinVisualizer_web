import * as BABYLON from 'babylonjs';
import { CustomMaterial } from 'babylonjs-materials';

const numKernels = 3;

export class SpinorShader {
  steps: Array<BABYLON.Matrix>;
  kernelWinds: Float32Array;
  kernelPhases: Float32Array;
  speed: number;
  time: number;
  radius: number;
  power: number;
  center: number;
  shader: CustomMaterial;

  constructor(scene: BABYLON.Scene) {
    this.steps = Array(numKernels+1);
    for (let i = 0; i < numKernels+1; i++) {
      this.steps[i] = BABYLON.Matrix.Identity();
    }
    this.kernelWinds = new Float32Array(numKernels);
    this.kernelPhases = new Float32Array(numKernels);
    this.time = 0;
    this.speed = 1;
    this.radius = 10;
    this.power = 1.5;
    this.center = 1.3;

    this.shader = new CustomMaterial("spinorMaterial", scene);
    this.shader.AddUniform('numSteps', 'int', numKernels + 1);
    this.shader.AddUniform("steps", "mat4[" + (numKernels+1) + "]", null);
    this.shader.AddUniform('kernelWinds', 'float[' + numKernels + ']', null);
    this.shader.AddUniform('kernelPhases', 'float[' + numKernels + ']', null);
    this.shader.AddUniform('time', 'float', 0);
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
        float r = 1.0 - length(worldPos) / radial_radius;
        r = clamp(pow(r, radial_power) * radial_center, 0.0, 1.0);
        mat4 rotation = mat4(1.0);
        for (int i = 0; i < numSteps-1; i++) {
            rotation = rotation * steps[i];
            rotation = rotation * foldXY(r * PI * kernelWinds[i], kernelPhases[i]);
        }
        rotation = rotation * steps[numSteps-1];
        worldPos = worldPos * rotation;
        vNormalW = vec3(vec4(vNormalW, 1.0) * rotation);
    `);

    this.shader.onBindObservable.add(() => {
      this.shader.getEffect().setFloat('time', this.time);

      //TEMPORARY, needs to be based on actual spinor we're rendering
      this.steps[0] = BABYLON.Matrix.RotationZ(this.time);
      this.steps[1] = this.steps[0].transpose();

      this.shader.getEffect().setInt("numSteps", this.steps.length);
      var stepsUnfolded = new Float32Array(this.steps.length * 16);
      for (var i = 0; i < this.steps.length; i++) {
          stepsUnfolded.set(this.steps[i].asArray(), i*16);
      }
      this.shader.getEffect().setMatrices("steps", stepsUnfolded);

      this.shader.getEffect().setFloatArray("kernelWinds", this.kernelWinds);
      this.shader.getEffect().setFloatArray("kernelPhases", this.kernelPhases);

      this.shader.getEffect().setFloat('radial_radius', this.radius);
      this.shader.getEffect().setFloat('radial_power', this.power);
      this.shader.getEffect().setFloat('radial_center', this.center);
    });

    scene.registerBeforeRender(() => {
      this.time += scene.getEngine().getDeltaTime() / 500 * this.speed;
    });

    //TEMPORARY
    this.kernelWinds[0] = 1;
  }
}