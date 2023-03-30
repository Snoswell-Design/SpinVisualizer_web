import * as BABYLON from 'babylonjs';
import {MeshDefinition, addBackfaces} from './meshdef';

export function Trail(options: {
  numParticles?:number,
  position?:BABYLON.Vector3,
  normal?:BABYLON.Vector3,
  size?:number,
  backfaces?:boolean,
}) : MeshDefinition {
  var {
    numParticles = 100,
    position = new BABYLON.Vector3(0,0,1),
    normal = new BABYLON.Vector3(0,0,1),
    size = 1,
    backfaces = false,
  } = options;
  var positions = new Float32Array(numParticles * 4 * 3); // 4 vertices per particle, 3 coords per vertex
  var indices = new Uint32Array(numParticles * 6); // two triangles per particle
  var trails = new Float32Array(numParticles * 4); // 4 vertices per particle, 1 trail per vertex

  let d1 = normal.cross(BABYLON.Vector3.Up());
  if (BABYLON.Vector3.DistanceSquared(normal, BABYLON.Vector3.Up()) < 0.001) {
    d1 = normal.cross(BABYLON.Vector3.Forward());
  }
  d1 = BABYLON.Vector3.Normalize(d1).scale(size/2);
  let d2 = d1.cross(normal).normalize().scale(size/2);

  let c1 = position.add(d1);
  let c2 = position.add(d2);
  let c3 = position.add(d1.scale(-1));
  let c4 = position.add(d2.scale(-1));

  for (var i = 0; i < numParticles; i++) {
    // vertex 1
    positions[i * 12 + 0] = c1.x;
    positions[i * 12 + 1] = c1.y;
    positions[i * 12 + 2] = c1.z;
    // vertex 2
    positions[i * 12 + 3] = c2.x;
    positions[i * 12 + 4] = c2.y;
    positions[i * 12 + 5] = c2.z;
    // vertex 3
    positions[i * 12 + 6] = c3.x;
    positions[i * 12 + 7] = c3.y;
    positions[i * 12 + 8] = c3.z;
    // vertex 4
    positions[i * 12 + 9] = c4.x;
    positions[i * 12 + 10] = c4.y;
    positions[i * 12 + 11] = c4.z;
    // indices
    indices[i * 6 + 0] = i * 4 + 0;
    indices[i * 6 + 1] = i * 4 + 1;
    indices[i * 6 + 2] = i * 4 + 2;

    indices[i * 6 + 3] = i * 4 + 0;
    indices[i * 6 + 4] = i * 4 + 2;
    indices[i * 6 + 5] = i * 4 + 3;
    // trail
    trails[i] = (i / numParticles) * (Math.PI * 2);
  }
  var normals = [];
  BABYLON.VertexData.ComputeNormals(positions, indices, normals);

  var vd = new BABYLON.VertexData();
  vd.positions = positions;
  vd.indices = indices;
  vd.normals = normals;
  if (backfaces) {
    addBackfaces(vd);
    // double trails too
    let t2 = new Float32Array(trails.length * 2);
    t2.set(trails);
    t2.set(trails, trails.length);
    trails = t2;
  }
  return { vertexData:vd, hasRadius:false, defaultName:"Trail", trails: trails };
}