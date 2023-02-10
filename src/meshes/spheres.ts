import * as BABYLON from 'babylonjs';
import { MeshDefinition, colorVertexData, cloneVertexData } from './meshdef';
import { makeCage } from './ribbons';

export function Sphere(
    sphereColor: BABYLON.Color4 = new BABYLON.Color4(0.8, 0.4, 0.4, 1),
    cageColor: BABYLON.Color4 = new BABYLON.Color4(0.2, 0, 0, 1),
    ) : MeshDefinition {
  var vd1 = BABYLON.CreateIcoSphereVertexData({subdivisions:6, flat:false});
  colorVertexData(vd1, sphereColor);
  var vd2 = makeCage();
  colorVertexData(vd2, cageColor);
  vd1.merge(vd2);
  return {vertexData:vd1, hasRadius:true, defaultName:"Sphere"};
}

export function SphereRainbow() : MeshDefinition {
  // First create one 1/8th segment of the sphere
  const segments = 8;
  var paths = new Array<Array<BABYLON.Vector3>>(segments + 1);
  for (var i = 0; i <= segments; i++) {
    paths[i] = new Array<BABYLON.Vector3>(segments + 1);
    for (var j = 0; j <= segments; j++) {
      let vAngle = i / segments * Math.PI / 2;
      let rAngle = j / segments * Math.PI / 2;
      let r = Math.cos(vAngle)
      paths[i][j] = new BABYLON.Vector3(
        Math.cos(rAngle) * r,
        Math.sin(vAngle),
        Math.sin(rAngle) * r,
      );
    }
  }
  var vd1 = BABYLON.CreateRibbonVertexData({
    pathArray:paths,
    sideOrientation:BABYLON.Mesh.BACKSIDE,
  });

  // Copy and rotate it 7 times, coloring each section differently
  colorVertexData(vd1, new BABYLON.Color4(1, 0.5, 0.5, 1));
  console.log(vd1);

  var vd2 = cloneVertexData(vd1);
  vd2.transform(BABYLON.Matrix.RotationYawPitchRoll(0, Math.PI / 2, 0));
  colorVertexData(vd2, new BABYLON.Color4(0.5, 0, 0, 1));

  var vd3 = cloneVertexData(vd1);
  vd3.transform(BABYLON.Matrix.RotationYawPitchRoll(0, Math.PI, 0));
  colorVertexData(vd3, new BABYLON.Color4(0.5, 1, 0.5, 1));

  var vd4 = cloneVertexData(vd1);
  vd4.transform(BABYLON.Matrix.RotationYawPitchRoll(0, Math.PI / 2 * 3, 0));
  colorVertexData(vd4, new BABYLON.Color4(0, 0.5, 0, 1));

  var vd5 = cloneVertexData(vd1);
  vd5.transform(BABYLON.Matrix.RotationYawPitchRoll(0, 0, Math.PI/2));
  colorVertexData(vd5, new BABYLON.Color4(0.5, 0, 0, 1));

  var vd6 = cloneVertexData(vd1);
  vd6.transform(BABYLON.Matrix.RotationYawPitchRoll(0, Math.PI/2, Math.PI/2));
  colorVertexData(vd6, new BABYLON.Color4(1, 0.5, 0.5, 1));

  var vd7 = cloneVertexData(vd1);
  vd7.transform(BABYLON.Matrix.RotationYawPitchRoll(0, Math.PI, Math.PI/2));
  colorVertexData(vd7, new BABYLON.Color4(0, 0.5, 0, 1));

  var vd8 = cloneVertexData(vd1);
  vd8.transform(BABYLON.Matrix.RotationYawPitchRoll(0, Math.PI/2*3, Math.PI/2));
  colorVertexData(vd8, new BABYLON.Color4(0.5, 1, 0.5, 1));

  vd1.merge(vd2);
  vd1.merge(vd3);
  vd1.merge(vd4);
  vd1.merge(vd5);
  vd1.merge(vd6);
  vd1.merge(vd7);
  vd1.merge(vd8);

  return {vertexData:vd1, hasRadius:true, defaultName:"Sphere"};
}