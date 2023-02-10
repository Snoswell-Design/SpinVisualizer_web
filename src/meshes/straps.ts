import * as BABYLON from 'babylonjs';
import {MeshDefinition} from './meshdef';

export function RingStrap(options: {
  radius?:number,
  height?:number,
  width?:number,
  arcSegments?:number,
  heightSegments?:number,
  widthSegments?:number,
}) : MeshDefinition {
  var {
    radius = 1,
    height = 0.5,
    width = 0.1,
    arcSegments = 100,
    heightSegments = 1,
    widthSegments = 1,
  } = options;
  // Make 4 sides
  var inner = makeRingRibbon(
    radius - width / 2,
    height,
    0,
    arcSegments,
    heightSegments,
    BABYLON.Mesh.BACKSIDE);
  var outer = makeRingRibbon(
    radius + width / 2,
    height,
    0,
    arcSegments,
    heightSegments,
    BABYLON.Mesh.FRONTSIDE);
  var top = makeCircleRibbon(
    radius - width / 2,
    radius + width / 2,
    height / 2,
    0,
    arcSegments,
    widthSegments,
    BABYLON.Mesh.BACKSIDE);
  var bottom = makeCircleRibbon(
    radius - width / 2,
    radius + width / 2,
    -height / 2,
    0,
    arcSegments,
    widthSegments,
    BABYLON.Mesh.FRONTSIDE);
  inner.merge(outer);
  inner.merge(top);
  inner.merge(bottom);
  return {vertexData:inner, hasRadius:true, defaultName:"Ring"};
}

export function AxisStrap(options: {
  length?:number,
  width?:number,
  height?:number,
  lengthSegments?:number,
  widthSegments?:number,
  heightSegments?:number,
}) : MeshDefinition {
  var {
    length = 10,
    width = 1,
    height = 1,
    lengthSegments = 100,
    widthSegments = 5,
    heightSegments = 5,
  } = options;
  var corners:BABYLON.Vector3[] = [
    new BABYLON.Vector3(-width/2,-height/2,-length), // 0,lower, -x-y
    new BABYLON.Vector3(-width/2,+height/2,-length), // 1,lower, -x+y
    new BABYLON.Vector3(+width/2,+height/2,-length), // 2,lower, +x+y
    new BABYLON.Vector3(+width/2,-height/2,-length), // 3,lower, +x-y
    new BABYLON.Vector3(-width/2,-height/2,+length), // 4,upper, -x-y
    new BABYLON.Vector3(-width/2,+height/2,+length), // 5,upper, -x+y
    new BABYLON.Vector3(+width/2,+height/2,+length), // 6,upper, +x+y
    new BABYLON.Vector3(+width/2,-height/2,+length), // 7,upper, +x-y
  ];
  var vd = makePlane(
    corners[0],
    corners[1],
    corners[4],
    corners[5],
    widthSegments, lengthSegments,BABYLON.Mesh.FRONTSIDE);
  vd.merge(makePlane(
    corners[2],
    corners[3],
    corners[6],
    corners[7],
    widthSegments, lengthSegments,BABYLON.Mesh.FRONTSIDE));
  vd.merge(makePlane(
    corners[1],
    corners[2],
    corners[5],
    corners[6],
    heightSegments, lengthSegments,BABYLON.Mesh.FRONTSIDE));
  vd.merge(makePlane(
    corners[3],
    corners[0],
    corners[7],
    corners[4],
    heightSegments, lengthSegments,BABYLON.Mesh.FRONTSIDE));
  return {vertexData:vd, hasRadius:false, defaultName:"Axis"};
}

function makePlane(bl:BABYLON.Vector3, br:BABYLON.Vector3, tl:BABYLON.Vector3, tr:BABYLON.Vector3, widthSegments:number, heightSegments:number, sideOrientation:number) {
  var paths = new Array<Array<BABYLON.Vector3>>(widthSegments+1);
  for (var x = 0; x <= widthSegments; x++) {
    paths[x] = new Array<BABYLON.Vector3>(heightSegments+1);
  }
  for (var y = 0; y <= heightSegments; y++) {
    let yl = BABYLON.Vector3.Lerp(bl,tl,y/heightSegments);
    let yr = BABYLON.Vector3.Lerp(br,tr,y/heightSegments);
    for (var x = 0; x <= widthSegments; x++) {
      paths[x][y] = BABYLON.Vector3.Lerp(yl, yr, x / widthSegments);
    }
  }
  return BABYLON.CreateRibbonVertexData({pathArray:paths,closePath:false,sideOrientation});
}

function makeRingRibbon(radius:number, width:number, arc:number=0, arcSegments:number, widthSegments:number, sideOrientation:number) : BABYLON.VertexData {
  var paths = new Array<Array<BABYLON.Vector3>>(widthSegments+1);
  var isFullCircle = (arc <= 0);
  var ac = (isFullCircle ? arcSegments : arcSegments + 1)
  for (var w = 0; w <= widthSegments; w++) {
    paths[w] = new Array<BABYLON.Vector3>(ac);
  }
  for (let a = 0; a < ac; a++) {
    let angle = (a / arcSegments);
    if (arc <= 0) {
      angle *= Math.PI * 2;
    } else {
      angle *= arc;
    }
    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;
    for (var w = 0; w <= widthSegments; w++) {
      paths[w][a] = new BABYLON.Vector3(
        x,
        y,
        ((w / widthSegments) - 0.5) * width);
    }
  }
  return BABYLON.CreateRibbonVertexData({pathArray:paths,sideOrientation,closePath:isFullCircle});
}

function makeCircleRibbon(
  innerRadius:number,
  outerRadius:number,
  height:number,
  arc:number=0,
  arcSegments:number,
  widthSegments:number,
  sideOrientation:number
) : BABYLON.VertexData {
  var paths = new Array<Array<BABYLON.Vector3>>(widthSegments+1);
  var isFullCircle = (arc <= 0);
  var ac = (isFullCircle ? arcSegments : arcSegments + 1)
  for (var w = 0; w <= widthSegments; w++) {
    paths[w] = new Array<BABYLON.Vector3>(ac);
  }
  for (let a = 0; a < ac; a++) {
    let angle = (a / arcSegments);
    if (arc <= 0) {
      angle *= Math.PI * 2;
    } else {
      angle *= arc;
    }
    for (var w = 0; w <= widthSegments; w++) {
      let radius = innerRadius + (w / widthSegments) * (outerRadius - innerRadius);
      let x = Math.cos(angle) * radius;
      let y = Math.sin(angle) * radius;
      paths[w][a] = new BABYLON.Vector3(
        x,
        y,
        height);
    }
  }
  return BABYLON.CreateRibbonVertexData({pathArray:paths,sideOrientation,closePath:isFullCircle});
}