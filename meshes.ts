import * as BABYLON from 'babylonjs';

export class Meshes {
  scene: BABYLON.Scene;

  sphere: BABYLON.Mesh;
  xAxis: BABYLON.Mesh;
  yAxis: BABYLON.Mesh;
  zAxis: BABYLON.Mesh;
  xyPlane: BABYLON.Mesh;
  xzPlane: BABYLON.Mesh;
  yzPlane: BABYLON.Mesh;
  xyQuarter: BABYLON.Mesh;
  xzQuarter: BABYLON.Mesh;
  yzQuarter: BABYLON.Mesh;
  field: BABYLON.Mesh;
  ring1: BABYLON.Mesh;
  ring2: BABYLON.Mesh;
  ring3: BABYLON.Mesh;
  cage1: BABYLON.Mesh;
  cage2: BABYLON.Mesh;
  cage3: BABYLON.Mesh;
  outerCage: BABYLON.Mesh;

  private meshlist: Array<BABYLON.Mesh> = [];

  private _material: BABYLON.Material;

  constructor() {
    this.makeMesh(
      "sphere",
      this.makeSphere(new BABYLON.Color4(0.8, 0.4, 0.4, 1), new BABYLON.Color4(0.2, 0, 0, 1)),
    );
    this.makeMesh(
      "xAxis",
      this.makeAxis(new BABYLON.Vector3(0, 0, 0)),
      new BABYLON.Color4(1, 0, 0, 1),
    );
    this.makeMesh(
      "yAxis",
      this.makeAxis(new BABYLON.Vector3(0, 0, Math.PI / 2)),
      new BABYLON.Color4(0, 1, 0, 1),
    );
    this.makeMesh(
      "zAxis",
      this.makeAxis(new BABYLON.Vector3(0, Math.PI / 2, 0)),
      new BABYLON.Color4(0, 0, 1, 1),
    );
    this.makeMesh(
      "xyPlane",
      this.makePlane(new BABYLON.Vector3(0, 0, 0)),
      new BABYLON.Color4(1, 0.5, 0.5, 1),
    );
    this.makeMesh(
      "xzPlane",
      this.makePlane(new BABYLON.Vector3(Math.PI / 2, 0, 0)),
      new BABYLON.Color4(0.5, 1, 0.5, 1),
    );
    this.makeMesh(
      "yzPlane",
      this.makePlane(new BABYLON.Vector3(0, Math.PI / 2, 0)),
      new BABYLON.Color4(0.5, 0.5, 1, 1),
    );
    this.makeMesh(
      "xyQuarter",
      this.makeQuarterPlane(new BABYLON.Vector3(0, 0, 0)),
      new BABYLON.Color4(1, 0.5, 0.5, 1),
    );
    this.makeMesh(
      "xzQuarter",
      this.makeQuarterPlane(new BABYLON.Vector3(Math.PI / 2, 0, 0)),
      new BABYLON.Color4(0.5, 1, 0.5, 1),
    );
    this.makeMesh(
      "yzQuarter",
      this.makeQuarterPlane(new BABYLON.Vector3(0, -Math.PI / 2, 0)),
      new BABYLON.Color4(0.5, 0.5, 1, 1),
    );
    this.makeMesh(
      "ring1",
      this.makeRibbon(),
      new BABYLON.Color4(1, 0, 0, 1),
    );
    this.makeMesh(
      "ring2",
      this.makeRibbon(),
      new BABYLON.Color4(0, 1, 0, 1),
    );
    this.makeMesh(
      "ring3",
      this.makeRibbon(),
      new BABYLON.Color4(0, 0, 1, 1),
    );
    this.makeMesh(
      "cage1",
      this.makeCage(),
      new BABYLON.Color4(1, 0, 0, 1),
    );
    this.makeMesh(
      "cage2",
      this.makeCage(),
      new BABYLON.Color4(0, 1, 0, 1),
    );
    this.makeMesh(
      "cage3",
      this.makeCage(),
      new BABYLON.Color4(0, 0, 1, 1),
    );
    this.makeMesh(
      "outerCage",
      this.makeCage(100, 0.1, BABYLON.Mesh.FRONTSIDE),
      new BABYLON.Color4(1, 1, 1, 1),
    );
    this.outerCage.isVisible = true;
    this.outerCage.scaling = new BABYLON.Vector3(10,10,10);
  }

  makeMesh(name: string, vd:BABYLON.VertexData, color?:BABYLON.Color4) {
    if (color != null) {
      this.colorVertexData(vd, color);
    }
    var mesh = new BABYLON.Mesh(name, this.scene);
    vd.applyToMesh(mesh);
    mesh.isVisible = false;
    this.meshlist.push(mesh);
    this[name] = mesh;
  }

  makeSphere(sphereColor:BABYLON.Color4, cageColor:BABYLON.Color4) {
    // Combine a sphere and a cage so you can see it rotating
    var vd1 = BABYLON.VertexData.CreateIcoSphere({subdivisions:6, flat:false});
    this.colorVertexData(vd1, sphereColor);
    var vd2 = this.makeCage();
    this.colorVertexData(vd2, cageColor);
    vd1.merge(vd2);
    return vd1;
  }

  makeAxis(rotation:BABYLON.Vector3, segments:number=100) {
    var vd = BABYLON.VertexData.CreateCylinder({height:20,diameter:0.1,tessellation:8,subdivisions:segments})
    vd.transform(BABYLON.Matrix.RotationYawPitchRoll(rotation.y, rotation.x, rotation.z + Math.PI / 2));
    return vd;
  }

  makeQuarterPlane(rotation:BABYLON.Vector3, size:number=10, segments:number=50) {
    // Using ribbon because babylon doesn't give you a nice subdivided plane that also can be doublesided
    var paths = new Array<Array<BABYLON.Vector3>>(segments+1);
    for (var x = 0; x <= segments; x++) {
      paths[x] = new Array<BABYLON.Vector3>(segments+1);
    }
    for (var x = 0; x <= segments; x++) {
      for (var y = 0; y <= segments; y++) {
        paths[x][y] = new BABYLON.Vector3(x / segments * size, y / segments * size, 0);
      }
    }
    var vd = BABYLON.VertexData.CreateRibbon({pathArray:paths,sideOrientation:BABYLON.Mesh.DOUBLESIDE})
    vd.transform(BABYLON.Matrix.RotationYawPitchRoll(rotation.y, rotation.x, rotation.z));
    return vd;
  }

  makePlane(rotation:BABYLON.Vector3, size:number=20, segments:number=100) {
    // Using ribbon because babylon doesn't give you a nice subdivided plane that also can be doublesided
    var paths = new Array<Array<BABYLON.Vector3>>(segments+1);
    for (var x = 0; x <= segments; x++) {
      paths[x] = new Array<BABYLON.Vector3>(segments+1);
    }
    for (var x = 0; x <= segments; x++) {
      for (var y = 0; y <= segments; y++) {
        paths[x][y] = new BABYLON.Vector3(x / segments * size - size / 2, y / segments * size - size / 2, 0);
      }
    }
    var vd = BABYLON.VertexData.CreateRibbon({pathArray:paths,sideOrientation:BABYLON.Mesh.DOUBLESIDE})
    vd.transform(BABYLON.Matrix.RotationYawPitchRoll(rotation.y, rotation.x, rotation.z));
    return vd;
  }

  makeRibbon(segments:number = 100, width:number = 0.1, sideOrientation=BABYLON.Mesh.DOUBLESIDE) {
    var path1 = new Array<BABYLON.Vector3>(segments);
    var path2 = new Array<BABYLON.Vector3>(segments);
    for (var i = 0; i < segments; i++) {
      var rad = 2.0 * Math.PI * i / segments;
      var x = Math.cos(rad);
      var y = Math.sin(rad);
      path1[i] = new BABYLON.Vector3(x, y, width / 2);
      path2[i] = new BABYLON.Vector3(x, y, -width / 2);
    }
    var vd = BABYLON.VertexData.CreateRibbon({pathArray:[path1, path2],closePath:true,sideOrientation:sideOrientation})
    return vd;
  }

  makeCage(segments:number = 100, width:number = 0.1, sideOrientation=BABYLON.Mesh.DOUBLESIDE) {
    var vd1 = this.makeRibbon(segments, width, sideOrientation);
    var vd2 = this.makeRibbon(segments, width, sideOrientation);
    vd2.transform(BABYLON.Matrix.RotationX(Math.PI / 2));
    var vd3 = this.makeRibbon(segments, width, sideOrientation);
    vd3.transform(BABYLON.Matrix.RotationY(Math.PI / 2));
    vd1.merge(vd2);
    vd1.merge(vd3);
    return vd1;
  }

  colorVertexData(vd:BABYLON.VertexData, color:BABYLON.Color4) {
    var l = vd.positions.length / 3;
    var colorsUnfolded = new Array<number>(l * 4);
    for (var i = 0; i < l; i++) {
      color.toArray(colorsUnfolded, i * 4);
    }
    vd.colors = colorsUnfolded;
  }

  get material(): BABYLON.Material {
    return this._material;
  }

  set material(n: BABYLON.Material) {
    this._material = n;
    for (var mesh of this.meshlist) {
      mesh.material = this._material;
    }
  }
}
