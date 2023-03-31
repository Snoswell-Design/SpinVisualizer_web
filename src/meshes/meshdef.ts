import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import { SpinorScene, latestScene } from '../multiscene';

export type MeshDefinition = {
  vertexData:BABYLON.VertexData,
  hasRadius:boolean,
  defaultName:string,
  trails?:Float32Array,
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
    this.mesh.alwaysSelectAsActiveMesh = true;
    if (meshColor != null) {
      colorVertexData(mesh.vertexData, meshColor);
    }
    mesh.vertexData.applyToMesh(this.mesh);
    if (mesh.trails != null) {
      this.mesh.setVerticesData("trail", mesh.trails, false, 1);
      console.log(this.mesh);
      console.log("trails", this.mesh.getVerticesData("trail"));
    }
    this.mesh.material = scene.material;
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

  set scale(value:number) {
    this.mesh.scaling = new BABYLON.Vector3(value, value, value);
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

export function colorVertexData(vd:BABYLON.VertexData, color:BABYLON.Color4) {
  var l = vd.positions.length / 3;
  var colorsUnfolded = new Array<number>(l * 4);
  for (var i = 0; i < l; i++) {
    color.toArray(colorsUnfolded, i * 4);
  }
  vd.colors = colorsUnfolded;
}

export function cloneVertexData(vd:BABYLON.VertexData) : BABYLON.VertexData {
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

export function addBackfaces(vd:BABYLON.VertexData) {
  var v2 = new BABYLON.VertexData();
  v2.positions = vd.positions;
  if (vd.colors) {
    v2.colors = new Float32Array(vd.colors);
  }
  if (vd.uvs) {
    v2.uvs = new Float32Array(vd.uvs);
  }
  // Flip indices
  let indices = new Uint32Array(vd.indices.length);
  for (let i = 0; i < vd.indices.length / 3; i++) {
    indices[i*3+0] = vd.indices[i*3+0];
    indices[i*3+1] = vd.indices[i*3+2];
    indices[i*3+2] = vd.indices[i*3+1];
  }
  v2.indices = indices;
  // Flip normals
  let normals = new Float32Array(vd.normals.length);
  for (let i = 0; i < vd.normals.length / 3; i++) {
    let flip = new BABYLON.Vector3(vd.normals[i*3+0], vd.normals[i*3+1], vd.normals[i*3+2]).scale(-1);
    normals[i*3+0] = flip.x;
    normals[i*3+1] = flip.y;
    normals[i*3+2] = flip.z;
  }
  v2.normals = normals;
  vd.merge(v2);
}