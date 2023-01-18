import * as BABYLON from 'babylonjs';
import { Vector3 } from 'babylonjs';
import * as GUI from 'babylonjs-gui'

function colorVertexData(vd:BABYLON.VertexData, color:BABYLON.Color4) {
  var l = vd.positions.length / 3;
  var colorsUnfolded = new Array<number>(l * 4);
  for (var i = 0; i < l; i++) {
    color.toArray(colorsUnfolded, i * 4);
  }
  vd.colors = colorsUnfolded;
}

export class MeshView {
  prettyName: string;
  mesh: BABYLON.Mesh;
  hasRadius: boolean = false;
  color: BABYLON.Color4;

  constructor(scene:BABYLON.Scene, name: string, vd: BABYLON.VertexData, color?:BABYLON.Color4) {
    this.prettyName = name;
    if (color != null) {
      colorVertexData(vd, color);
      this.color = color;
    } else {
      this.color = new BABYLON.Color4(0,0,0,1);
    }
    this.mesh = new BABYLON.Mesh(name.toLowerCase().replace(' ', ''), scene);
    vd.applyToMesh(this.mesh);
    this.mesh.isVisible = false;
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

export class Meshes {
  scene: BABYLON.Scene;
  meshes: Array<MeshView> = [];
  outerCage: BABYLON.Mesh;

  private _material: BABYLON.Material;

  constructor() {
    this.makeMesh('Sphere',
      this.makeSphere(new BABYLON.Color4(0.8, 0.4, 0.4, 1), new BABYLON.Color4(0.2, 0, 0, 1)),
      null,
      true,
    );
    this.makeMesh('X Axis',
      this.makeAxis(new BABYLON.Vector3(0,0,0)),
      new BABYLON.Color4(1, 0, 0, 1),
    );
    this.makeMesh('Y Axis',
      this.makeAxis(new BABYLON.Vector3(0,0,Math.PI/2)),
      new BABYLON.Color4(0, 1, 0, 1),
    );
    this.makeMesh('Z Axis',
      this.makeAxis(new BABYLON.Vector3(Math.PI/2,0,0)),
      new BABYLON.Color4(0, 0, 1, 1),
    );
    this.makeMesh("XY Plane",
      this.makePlane(new BABYLON.Vector3(0, 0, 0)),
      new BABYLON.Color4(0.5, 0.5, 1, 1),
    );
    this.makeMesh("XZ Plane",
      this.makePlane(new BABYLON.Vector3(0,Math.PI/2,0)),
      new BABYLON.Color4(0.5, 1, 0.5, 1),
    );
    this.makeMesh("YZ Plane",
      this.makePlane(new BABYLON.Vector3(Math.PI/2,0,0)),
      new BABYLON.Color4(1, 0.5, 0.5, 1),
    );
    this.makeMesh("XY Quarter",
      this.makeQuarterPlane(new BABYLON.Vector3(0, 0, 0)),
      new BABYLON.Color4(0.5, 0.5, 1, 1),
    );
    this.makeMesh("XZ Quarter",
      this.makeQuarterPlane(new BABYLON.Vector3(0,Math.PI/2,0)),
      new BABYLON.Color4(0.5, 1, 0.5, 1),
    );
    this.makeMesh("YZ Quarter",
      this.makeQuarterPlane(new BABYLON.Vector3(-Math.PI / 2,0,0)),
      new BABYLON.Color4(1, 0.5, 0.5, 1),
    );
    this.makeMesh("Ring 1",
      this.makeRingRibbon(),
      new BABYLON.Color4(1, 0, 0, 1),
      true,
    );
    this.makeMesh("Ring 2",
      this.makeRingRibbon(),
      new BABYLON.Color4(0, 1, 0, 1),
      true,
    );
    this.makeMesh("Ring 3",
      this.makeRingRibbon(),
      new BABYLON.Color4(0, 0, 1, 1),
      true,
    );
    this.makeMesh("Cage 1",
      this.makeCage(),
      new BABYLON.Color4(1, 0, 0, 1),
      true,
    );
    this.makeMesh("Cage 2",
      this.makeCage(),
      new BABYLON.Color4(0, 1, 0, 1),
      true,
    );
    this.makeMesh("Cage 3",
      this.makeCage(),
      new BABYLON.Color4(0, 0, 1, 1),
      true,
    );

    // Outer cage to see view angle/zoom
    this.outerCage = new BABYLON.Mesh('outerCage', this.scene);
    this.makeCage(100, 0.1, BABYLON.Mesh.FRONTSIDE).applyToMesh(this.outerCage);
    this.outerCage.scaling = new BABYLON.Vector3(10, 10, 10);
  }

  makeMesh(name: string, vd:BABYLON.VertexData, color?:BABYLON.Color4, hasRadius:boolean=false) {
    let mesh = new MeshView(this.scene, name, vd, color);
    mesh.hasRadius = hasRadius;
    this.meshes.push(mesh);
  }

  makeSphere(sphereColor:BABYLON.Color4, cageColor:BABYLON.Color4) {
    // Combine a sphere and a cage so you can see it rotating
    var vd1 = BABYLON.VertexData.CreateIcoSphere({subdivisions:6, flat:false});
    colorVertexData(vd1, sphereColor);
    var vd2 = this.makeCage();
    colorVertexData(vd2, cageColor);
    vd1.merge(vd2);
    return vd1;
  }

  makeAxis(rotation:BABYLON.Vector3, width:number=3, lengthSegments:number=100, widthSegments:number=5) {
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
    var vd = BABYLON.VertexData.CreateRibbon({pathArray:paths,closePath:false,sideOrientation:BABYLON.Mesh.DOUBLESIDE})
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

  makeRingRibbon(segments:number = 100, width:number = 0.1, sideOrientation=BABYLON.Mesh.DOUBLESIDE) {
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
    var vd1 = this.makeRingRibbon(segments, width, sideOrientation);
    var vd2 = this.makeRingRibbon(segments, width, sideOrientation);
    vd2.transform(BABYLON.Matrix.RotationX(Math.PI / 2));
    var vd3 = this.makeRingRibbon(segments, width, sideOrientation);
    vd3.transform(BABYLON.Matrix.RotationY(Math.PI / 2));
    vd1.merge(vd2);
    vd1.merge(vd3);
    return vd1;
  }

  get material(): BABYLON.Material {
    return this._material;
  }

  set material(n: BABYLON.Material) {
    this._material = n;
    for (var mesh of this.meshes) {
      mesh.mesh.material = this._material;
    }
    this.outerCage.material = this._material;
  }
}
