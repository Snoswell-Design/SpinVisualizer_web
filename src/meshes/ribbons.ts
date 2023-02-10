import * as BABYLON from 'babylonjs';
import {MeshDefinition} from './meshdef';

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
      paths[j][i] = new BABYLON.Vector3(
        -10 + 20 * (i / (lengthSegments-1)),
        -width/2 + width * (j / (widthSegments-1)),
        0,
      );
    }
  }
  var vd1 = BABYLON.CreateRibbonVertexData({pathArray:paths,closePath:false,sideOrientation:BABYLON.Mesh.DOUBLESIDE});
  return {vertexData:vd1, hasRadius:false, defaultName:"Axis"};
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

export function makeCage(segments:number = 100, width:number = 0.1, sideOrientation=BABYLON.Mesh.DOUBLESIDE) : BABYLON.VertexData {
  var vd1 = makeRingRibbon(segments, width, sideOrientation);
  var vd2 = makeRingRibbon(segments, width, sideOrientation);
  vd2.transform(BABYLON.Matrix.RotationX(Math.PI / 2));
  var vd3 = makeRingRibbon(segments, width, sideOrientation);
  vd3.transform(BABYLON.Matrix.RotationY(Math.PI / 2));
  vd1.merge(vd2);
  vd1.merge(vd3);
  return vd1;
}
