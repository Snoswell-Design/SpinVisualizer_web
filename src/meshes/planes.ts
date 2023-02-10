import * as BABYLON from 'babylonjs';
import {MeshDefinition} from './meshdef';

export function Plane(segments?:number) : MeshDefinition {
  // Using ribbon because babylon doesn't give you a nice subdivided plane that also can be doublesided
  var paths = new Array<Array<BABYLON.Vector3>>(segments+1);
  for (var x = 0; x <= segments; x++) {
    paths[x] = new Array<BABYLON.Vector3>(segments+1);
  }
  for (var x = 0; x <= segments; x++) {
    for (var y = 0; y <= segments; y++) {
      paths[x][y] = new BABYLON.Vector3(
        -10 + 20 * (x / segments),
        -10 + 20 * (y / segments),
        0);
    }
  }
  var vd1 = BABYLON.CreateRibbonVertexData({pathArray:paths,sideOrientation:BABYLON.Mesh.DOUBLESIDE});
  return {vertexData:vd1, hasRadius:false, defaultName:"Plane"};
}

export function Disc(segments:number = 50) : MeshDefinition {
  var path1 = new Array<BABYLON.Vector3>(segments);
  var path2 = new Array<BABYLON.Vector3>(segments);
  var colors = new Array<BABYLON.Color4>(segments * 4 + 4);
  for (var i = 0; i < segments; i++) {
    var rad = 2.0 * Math.PI * i / segments;
    var x = Math.cos(rad);
    var y = Math.sin(rad);
    path1[i] = new BABYLON.Vector3(x, y, 0);
    path2[i] = new BABYLON.Vector3(x * 0.5, y * 0.5, 0);
  }
  for (var i = 0; i <= segments; i++) {
    let color = 1;
    if (i % 3 == 0) {
      color = 0;
    }
    colors[i*4+0] = new BABYLON.Color4(color, color, color, 1);
    colors[i*4+1] = colors[i*4];
    colors[i*4+2] = colors[i*4];
    colors[i*4+3] = colors[i*4];
  }
  var vd1 = BABYLON.CreateRibbonVertexData({pathArray:[path1,path2],closePath:true,sideOrientation:BABYLON.Mesh.DOUBLESIDE,colors})
  //var vd2 = BABYLON.CreateDiscVertexData({radius:0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
  //colorVertexData(vd2, new BABYLON.Color4(0.5, 0.5, 0.5, 1));
  //vd1.merge(vd2);
  return {vertexData:vd1, hasRadius:true, defaultName:"Disc"};
}

export function ParticlePlane(particlesPerSide:number = 50, particleSize:number = 0.1, planeRadius:number = 10) : MeshDefinition {
  var particlePositions = new Array<BABYLON.Vector2>(particlesPerSide * particlesPerSide);
  for (var x = 0; x < particlesPerSide; x++) {
    let xC = x / (particlesPerSide - 1) * planeRadius * 2 - planeRadius;
    for (var y = 0; y < particlesPerSide; y++) {
      let baseIndex = x * particlesPerSide + y;
      let yC = y / (particlesPerSide - 1) * planeRadius * 2 - planeRadius;
      particlePositions[baseIndex] = new BABYLON.Vector2(xC, yC);
    }
  }
  var vd1 = makeParticlesVertexData(particlePositions, particleSize);

  return {vertexData:vd1, hasRadius:false, defaultName:"Particle Plane"};
}

export function ParticlePlaneRing(options: {
    innerRadius:number,
    outerRadius:number,
    particlesPerSide?:number,
    particleSize?:number,
  }) : MeshDefinition {
  var {
    innerRadius = 1,
    outerRadius = 10,
    particlesPerSide = 50,
    particleSize = 0.1,
  } = options;
  var particlePositions = new Array<BABYLON.Vector2>();
  for (var x = 0; x < particlesPerSide; x++) {
    let xC = x / (particlesPerSide - 1) * outerRadius * 2 - outerRadius;
    for (var y = 0; y < particlesPerSide; y++) {
      let yC = y / (particlesPerSide - 1) * outerRadius * 2 - outerRadius;
      let c = new BABYLON.Vector2(xC, yC);
      if (c.length() > innerRadius && c.length() < outerRadius) {
        particlePositions.push(c);
      }
    }
  }
  var vd1 = makeParticlesVertexData(particlePositions, particleSize);
  return {vertexData:vd1, hasRadius:false, defaultName:"Particle Plane"};
}

export function ParticlePlaneRingHalf(options: {
    innerRadius:number,
    outerRadius:number,
    particlesPerSide?:number,
    particleSize?:number,
  }) : MeshDefinition {
  var {
    innerRadius = 1,
    outerRadius = 10,
    particlesPerSide = 50,
    particleSize = 0.1,
  } = options;
  var particlePositions = new Array<BABYLON.Vector2>();
  for (var x = 0; x < particlesPerSide / 2; x++) {
    let xC = x / (particlesPerSide - 1) * outerRadius * 2;
    for (var y = 0; y < particlesPerSide; y++) {
      let yC = y / (particlesPerSide - 1) * outerRadius * 2 - outerRadius;
      let c = new BABYLON.Vector2(xC, yC);
      if (c.length() > innerRadius && c.length() < outerRadius) {
        particlePositions.push(c);
      }
    }
  }
  var vd1 = makeParticlesVertexData(particlePositions, particleSize);
  return {vertexData:vd1, hasRadius:false, defaultName:"Particle Plane"};
}

export function ParticleRings(options: {
    innerRadius?:number,
    outerRadius?:number,
    radialSegments?:number,
    angleSegments?:number,
    particleSize?:number,
  }) : MeshDefinition {
  var {
    innerRadius = 0.5,
    outerRadius = 1,
    radialSegments = 5,
    angleSegments = 50,
    particleSize = 0.1,
  } = options;
  var particlePositions = new Array<BABYLON.Vector2>((radialSegments + 1) * angleSegments);
  var particleAngles = new Array<BABYLON.Vector2>((radialSegments + 1) * angleSegments);
  for (var r = 0; r <= radialSegments; r++) {
    let radius = innerRadius + (outerRadius - innerRadius) * (r / radialSegments);
    for (var a = 0; a < angleSegments; a++) {
      let angle = 2.0 * Math.PI * (a / angleSegments);
      particlePositions[r * angleSegments + a] = new BABYLON.Vector2(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      );
      particleAngles[r * angleSegments + a] = new BABYLON.Vector2(
        Math.sin(angle + Math.PI / 8),
        Math.cos(angle + Math.PI / 8),
      );
    }
  }
  var vd1 = makeParticlesVertexData(particlePositions, particleSize, particleAngles);
  return {vertexData:vd1, hasRadius:false, defaultName:"Particle Rings"};
}

function makeParticlesVertexData(particlePositions:Array<BABYLON.Vector2>, particleSize:number, particleAngles?:Array<BABYLON.Vector2>) : BABYLON.VertexData {
  var positions = new Float32Array(particlePositions.length * 4 * 3 * 2);
  var indices = new Uint32Array(particlePositions.length * 6 * 2);
  for (var i = 0; i < particlePositions.length; i++) {
    let xC = particlePositions[i].x;
    let yC = particlePositions[i].y;
    let d1 = particleSize;
    let d2 = particleSize;
    if (particleAngles != null) {
      d1 = particleAngles[i].x * particleSize;
      d2 = particleAngles[i].y * particleSize;
    }
    // vertex 1
    positions[i * 24 + 0] = xC + d1; // x
    positions[i * 24 + 1] = yC + d2; // y
    positions[i * 24 + 2] = 0; // z
    // vertex 2
    positions[i * 24 + 3] = xC + d2; // x
    positions[i * 24 + 4] = yC - d1; // y
    positions[i * 24 + 5] = 0; // z
    // vertex 3
    positions[i * 24 + 6] = xC - d1; // x
    positions[i * 24 + 7] = yC - d2; // y
    positions[i * 24 + 8] = 0; // z
    // vertex 4
    positions[i * 24 + 9] = xC - d2; // x
    positions[i * 24 + 10] = yC + d1; // y
    positions[i * 24 + 11] = 0; // z
    // repeat for backface
    // vertex 1
    positions[i * 24 + 12] = xC + d1; // x
    positions[i * 24 + 13] = yC + d2; // y
    positions[i * 24 + 14] = 0; // z
    // vertex 2
    positions[i * 24 + 15] = xC + d2; // x
    positions[i * 24 + 16] = yC - d1; // y
    positions[i * 24 + 17] = 0; // z
    // vertex 3
    positions[i * 24 + 18] = xC - d1; // x
    positions[i * 24 + 19] = yC - d2; // y
    positions[i * 24 + 20] = 0; // z
    // vertex 4
    positions[i * 24 + 21] = xC - d2; // x
    positions[i * 24 + 22] = yC + d1; // y
    positions[i * 24 + 23] = 0; // z
    // indices
    indices[i * 12 + 0] = i * 8 + 0;
    indices[i * 12 + 1] = i * 8 + 1;
    indices[i * 12 + 2] = i * 8 + 2;

    indices[i * 12 + 3] = i * 8 + 0;
    indices[i * 12 + 4] = i * 8 + 2;
    indices[i * 12 + 5] = i * 8 + 3;
    // backface
    indices[i * 12 + 6] = i * 8 + 4;
    indices[i * 12 + 7] = i * 8 + 6;
    indices[i * 12 + 8] = i * 8 + 5;

    indices[i * 12 + 9] = i * 8 + 4;
    indices[i * 12 + 10] = i * 8 + 7;
    indices[i * 12 + 11] = i * 8 + 6;
  }
  var normals = [];
  BABYLON.VertexData.ComputeNormals(positions, indices, normals);

  var vd1 = new BABYLON.VertexData()
  vd1.positions = positions;
  vd1.indices = indices;
  vd1.normals = normals;
  return vd1;
}