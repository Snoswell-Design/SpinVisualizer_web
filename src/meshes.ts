import * as BABYLON from 'babylonjs';
import { Vector3 } from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { SpinorScene, latestScene } from './multiscene';

type MeshDefinition = {
  vertexData:BABYLON.VertexData,
  hasRadius:boolean,
  defaultName:string,
};

export class MeshView {
  prettyName: string;
  mesh: BABYLON.Mesh;
  hasRadius: boolean;
  color: BABYLON.Color4;

  constructor(options: {
    scene?: SpinorScene,
    mesh: MeshDefinition, 
    name?: string,
    guiColor?:BABYLON.Color4,
    meshColor?:BABYLON.Color4,
    startInvisible?:boolean,
    scale?:number,
    rotation?:BABYLON.Vector3,
    translation?:BABYLON.Vector3,
    alpha?:number,
  }) {
    var {
      scene = latestScene,
      mesh,
      name = mesh.defaultName,
      guiColor = new BABYLON.Color4(0,0,0,1),
      meshColor,
      startInvisible = false,
      scale = 1,
      rotation,
      translation,
      alpha = 1,
    } = options;
    this.prettyName = name;
    this.color = guiColor;
    this.mesh = new BABYLON.Mesh(name.toLowerCase().replace(' ', ''), scene.scene);
    if (meshColor != null) {
      colorVertexData(mesh.vertexData, meshColor);
    }
    mesh.vertexData.applyToMesh(this.mesh);
    this.mesh.material = scene.shader.shader;
    this.mesh.isVisible = !startInvisible;
    this.mesh.scaling = new BABYLON.Vector3(scale, scale, scale);
    if (translation != null) {
      this.mesh.locallyTranslate(translation); 
    }
    if (rotation != null) {
      this.mesh.rotation = rotation; 
    }
    if (alpha < 1) {
      this.mesh.visibility = alpha;
    }
    this.hasRadius = mesh.hasRadius;
  }


  createControl() {
    let colorHex = this.color.toHexString(true);

    let c = new GUI.Checkbox(this.mesh.name + '_checkbox');
    c.width = '20px';
    c.height = '20px';
    c.color = colorHex;
    c.background = "white";
    c.horizontalAlignment = 0; // left
    c.onIsCheckedChangedObservable.add((visible:boolean) => {
      this.mesh.isVisible = visible;
    })

    let h = new GUI.TextBlock(this.mesh.name + '_label');
    h.text = this.prettyName;
    h.height = '30px';
    h.color = 'black';
    h.textHorizontalAlignment = 0;
    h.paddingLeftInPixels = 5;

    let headerPanel = new GUI.StackPanel(this.mesh.name + '_header');
    headerPanel.isVertical = false;
    headerPanel.width = '100%';
    headerPanel.adaptHeightToChildren = true;
    headerPanel.addControl(c);
    headerPanel.addControl(h);

    let panel = new GUI.StackPanel(this.mesh.name + 'controls');
    panel.setPaddingInPixels(5);
    panel.addControl(headerPanel);

    if (this.hasRadius) {
      let s = new GUI.Slider(this.mesh.name + '_radius');
      s.width = '100%';
      s.height = '20px';
      s.value = 0.1;
      s.minimum = 0.1;
      s.maximum = 10;
      s.color = colorHex;
      s.onValueChangedObservable.add((radius:number) => {
        this.mesh.scaling = new BABYLON.Vector3(radius, radius, radius);
        if (!c.isChecked) {
          c.isChecked = true;
        }
      });
      panel.addControl(s);
    }

    return panel;
  }
}

function colorVertexData(vd:BABYLON.VertexData, color:BABYLON.Color4) {
  var l = vd.positions.length / 3;
  var colorsUnfolded = new Array<number>(l * 4);
  for (var i = 0; i < l; i++) {
    color.toArray(colorsUnfolded, i * 4);
  }
  vd.colors = colorsUnfolded;
}

function cloneVertexData(vd:BABYLON.VertexData) : BABYLON.VertexData {
  var v2 = new BABYLON.VertexData();
  v2.positions = new Float32Array(vd.positions);
  v2.indices = new Uint16Array(vd.indices);
  v2.normals = new Float32Array(vd.normals);
  if (vd.colors) {
    v2.colors = new Float32Array(vd.colors);
  }
  if (vd.uvs) {
    v2.uvs = new Float32Array(vd.uvs);
  }
  return v2;
}

function makeRingRibbon(segments:number = 100, width:number = 0.1, sideOrientation=BABYLON.Mesh.DOUBLESIDE) : BABYLON.VertexData {
  var path1 = new Array<BABYLON.Vector3>(segments);
  var path2 = new Array<BABYLON.Vector3>(segments);
  for (var i = 0; i < segments; i++) {
    var rad = 2.0 * Math.PI * i / segments;
    var x = Math.cos(rad);
    var y = Math.sin(rad);
    path1[i] = new BABYLON.Vector3(x, y, width / 2);
    path2[i] = new BABYLON.Vector3(x, y, -width / 2);
  }
  return BABYLON.CreateRibbonVertexData({pathArray:[path1,path2],closePath:true,sideOrientation:sideOrientation})
}

function makeCage(segments:number = 100, width:number = 0.1, sideOrientation=BABYLON.Mesh.DOUBLESIDE) : BABYLON.VertexData {
  var vd1 = makeRingRibbon(segments, width, sideOrientation);
  var vd2 = makeRingRibbon(segments, width, sideOrientation);
  vd2.transform(BABYLON.Matrix.RotationX(Math.PI / 2));
  var vd3 = makeRingRibbon(segments, width, sideOrientation);
  vd3.transform(BABYLON.Matrix.RotationY(Math.PI / 2));
  vd1.merge(vd2);
  vd1.merge(vd3);
  return vd1;
}

function makePlane(startX:number, endX:number, startY:number, endY:number, xSegments:number = 100, ySegments:number = 100) : BABYLON.VertexData {
  // Using ribbon because babylon doesn't give you a nice subdivided plane that also can be doublesided
  var paths = new Array<Array<BABYLON.Vector3>>(xSegments+1);
  for (var x = 0; x <= xSegments; x++) {
    paths[x] = new Array<BABYLON.Vector3>(ySegments+1);
  }
  for (var x = 0; x <= xSegments; x++) {
    for (var y = 0; y <= ySegments; y++) {
      paths[x][y] = new BABYLON.Vector3(
        startX + (endX - startX) * (x / xSegments),
        startY + (endY - startY) * (y / ySegments),
        0);
    }
  }
  return BABYLON.CreateRibbonVertexData({pathArray:paths,sideOrientation:BABYLON.Mesh.DOUBLESIDE});
}

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

export function Ring(segments?:number, width?:number) : MeshDefinition {
  var vd1 = makeRingRibbon(segments, width);
  return {vertexData:vd1, hasRadius:true, defaultName:"Ring"};
}

export function Cage(segments?:number, width?:number) : MeshDefinition {
  var vd1 = makeCage(segments, width);
  return {vertexData:vd1, hasRadius:true, defaultName:"Cage"};
}

export function Axis(options: {
  lengthSegments?:number,
  widthSegments?:number,
  width?:number,
}) : MeshDefinition {
  var {
    lengthSegments = 100,
    widthSegments = 5,
    width = 3,
  } = options;
  var paths = new Array<Array<BABYLON.Vector3>>(widthSegments);
  for (var j = 0; j < widthSegments; j++) {
    paths[j] = new Array<BABYLON.Vector3>(lengthSegments);
  }
  for (var i = 0; i < lengthSegments; i++) {
    for (var j = 0; j < widthSegments; j++) {
      paths[j][i] = new Vector3(
        -10 + 20 * (i / (lengthSegments-1)),
        -width/2 + width * (j / (widthSegments-1)),
        0,
      );
    }
  }
  var vd1 = BABYLON.CreateRibbonVertexData({pathArray:paths,closePath:false,sideOrientation:BABYLON.Mesh.DOUBLESIDE});
  return {vertexData:vd1, hasRadius:false, defaultName:"Axis"};
}

export function Plane(segments?:number) : MeshDefinition {
  var vd1 = makePlane(-10, 10, -10, 10, segments, segments);
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

export function OuterCage() : MeshDefinition {
  var vd1 = makeCage(100, 0.1, BABYLON.Mesh.FRONTSIDE);
  return {vertexData:vd1, hasRadius:false, defaultName:"Outer Cage"};
}

export function ArrowRing(options: {
    radius?:number,

    arc?:number,
    arcSegments?:number,
    width?:number,
    widthSegments?:number,

    arrowArc?:number,
    arrowWidth?:number,
    arrowSegments?:number,
  }) : MeshDefinition {
  var {
    radius = 1,

    arc = Math.PI,
    arcSegments = 100,
    width = 0.1,
    widthSegments = 1,

    arrowArc = 0.1,
    arrowWidth = 0.5,
    arrowSegments = 5,
  } = options;

  // Create arrow
  var paths = new Array<Array<BABYLON.Vector3>>(widthSegments+1);
  for (var w = 0; w <= widthSegments; w++) {
    paths[w] = new Array<BABYLON.Vector3>(arrowSegments+1);
  }
  for (let a = 0; a <= arrowSegments; a++) {
    let angle = (a / arrowSegments) * arrowArc;
    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;
    let wi = (a / arrowSegments) * arrowWidth;
    for (var w = 0; w <= widthSegments; w++) {
      paths[w][a] = new BABYLON.Vector3(
        x,
        y,
        ((w / widthSegments) - 0.5) * wi);
    }
  }
  var vd1 = BABYLON.CreateRibbonVertexData({pathArray:paths,sideOrientation:BABYLON.Mesh.DOUBLESIDE})

  // Create ring
  var paths = new Array<Array<BABYLON.Vector3>>(widthSegments+1);
  for (var w = 0; w <= widthSegments; w++) {
    paths[w] = new Array<BABYLON.Vector3>(arcSegments+1);
  }
  for (let a = 0; a <= arcSegments; a++) {
    let angle = (a / arcSegments) * (arc - arrowArc) + arrowArc;
    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;
    for (var w = 0; w <= widthSegments; w++) {
      paths[w][a] = new BABYLON.Vector3(
        x,
        y,
        ((w / widthSegments) - 0.5) * width);
    }
  }
  var vd2 = BABYLON.CreateRibbonVertexData({pathArray:paths,sideOrientation:BABYLON.Mesh.DOUBLESIDE})

  vd1.merge(vd2);
  return {vertexData:vd1, hasRadius:false, defaultName:"Arrow"};
}