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
    if (rotation != null) {
      this.mesh.rotation = rotation; 
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

export function Ring(segments?:number, width?:number) : MeshDefinition {
  var vd1 = makeRingRibbon(segments, width);
  return {vertexData:vd1, hasRadius:true, defaultName:"Ring"};
}

export function Cage(segments?:number, width?:number) : MeshDefinition {
  var vd1 = makeCage(segments, width);
  return {vertexData:vd1, hasRadius:true, defaultName:"Cage"};
}

export function Axis(
  lengthSegments: number = 100,
  widthSegments: number = 5,
  width: number = 3,
) : MeshDefinition {
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

export function ParticlePlane(particlesPerSide:number = 50, particleRadius:number = 0.1, planeRadius:number = 10) : MeshDefinition {
  var positions = new Float32Array(particlesPerSide * particlesPerSide * 4 * 3 * 2);
  var indices = new Uint32Array(particlesPerSide * particlesPerSide * 6 * 2);
  for (var x = 0; x < particlesPerSide; x++) {
    let xC = x / (particlesPerSide - 1) * planeRadius * 2 - planeRadius;
    for (var y = 0; y < particlesPerSide; y++) {
      let baseIndex = x * particlesPerSide + y;
      let yC = y / (particlesPerSide - 1) * planeRadius * 2 - planeRadius;
      // vertex 1
      positions[baseIndex * 24 + 0] = xC - particleRadius; // x
      positions[baseIndex * 24 + 1] = yC - particleRadius; // y
      positions[baseIndex * 24 + 2] = 0; // z
      // vertex 2
      positions[baseIndex * 24 + 3] = xC + particleRadius; // x
      positions[baseIndex * 24 + 4] = yC - particleRadius; // y
      positions[baseIndex * 24 + 5] = 0; // z
      // vertex 3
      positions[baseIndex * 24 + 6] = xC + particleRadius; // x
      positions[baseIndex * 24 + 7] = yC + particleRadius; // y
      positions[baseIndex * 24 + 8] = 0; // z
      // vertex 4
      positions[baseIndex * 24 + 9] = xC - particleRadius; // x
      positions[baseIndex * 24 + 10] = yC + particleRadius; // y
      positions[baseIndex * 24 + 11] = 0; // z
      // repeat for backface
      // vertex 1
      positions[baseIndex * 24 + 12] = xC - particleRadius; // x
      positions[baseIndex * 24 + 13] = yC - particleRadius; // y
      positions[baseIndex * 24 + 14] = 0; // z
      // vertex 2
      positions[baseIndex * 24 + 15] = xC + particleRadius; // x
      positions[baseIndex * 24 + 16] = yC - particleRadius; // y
      positions[baseIndex * 24 + 17] = 0; // z
      // vertex 3
      positions[baseIndex * 24 + 18] = xC + particleRadius; // x
      positions[baseIndex * 24 + 19] = yC + particleRadius; // y
      positions[baseIndex * 24 + 20] = 0; // z
      // vertex 4
      positions[baseIndex * 24 + 21] = xC - particleRadius; // x
      positions[baseIndex * 24 + 22] = yC + particleRadius; // y
      positions[baseIndex * 24 + 23] = 0; // z
      // indices
      indices[baseIndex * 12 + 0] = baseIndex * 8 + 0;
      indices[baseIndex * 12 + 1] = baseIndex * 8 + 1;
      indices[baseIndex * 12 + 2] = baseIndex * 8 + 2;

      indices[baseIndex * 12 + 3] = baseIndex * 8 + 0;
      indices[baseIndex * 12 + 4] = baseIndex * 8 + 2;
      indices[baseIndex * 12 + 5] = baseIndex * 8 + 3;
      // backface
      indices[baseIndex * 12 + 6] = baseIndex * 8 + 4;
      indices[baseIndex * 12 + 7] = baseIndex * 8 + 6;
      indices[baseIndex * 12 + 8] = baseIndex * 8 + 5;

      indices[baseIndex * 12 + 9] = baseIndex * 8 + 4;
      indices[baseIndex * 12 + 10] = baseIndex * 8 + 7;
      indices[baseIndex * 12 + 11] = baseIndex * 8 + 6;
    }
  }
  var normals = [];
  BABYLON.VertexData.ComputeNormals(positions, indices, normals);

  var vd1 = new BABYLON.VertexData()
  vd1.positions = positions;
  vd1.indices = indices;
  vd1.normals = normals;



  return {vertexData:vd1, hasRadius:false, defaultName:"Particle Plane"};
}

export function OuterCage() : MeshDefinition {
  var vd1 = makeCage(100, 0.1, BABYLON.Mesh.FRONTSIDE);
  return {vertexData:vd1, hasRadius:false, defaultName:"Outer Cage"};
}