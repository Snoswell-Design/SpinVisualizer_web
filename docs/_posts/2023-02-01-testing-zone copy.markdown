---
layout: post
title:  "Testing Zone"
date:   2023-02-01 13:23:17 +1030
categories: braket
local-javascript-list:
 - "/assets/js/main.bundle.js"
---

Here is a sphere:

<div><canvas id="renderCanvas01" touch-action="none" style="width:100%;"></canvas></div>
<script type="module">
  var s1 = new SpinVisualizer.SpinorScene(document.getElementById("renderCanvas01"));
  new SpinVisualizer.MeshView({mesh:SpinVisualizer.Sphere(), scale:5});
</script>

Here is a ring and a cage:

<div><canvas id="renderCanvas02" touch-action="none" style="width:100%;"></canvas></div>
<script type="module">
  var s2 = new SpinVisualizer.SpinorScene(document.getElementById("renderCanvas02"));
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Ring(),
    meshColor: new BABYLON.Color4(1,0,0,1),
    scale:5});
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Cage(),
    meshColor: new BABYLON.Color4(0,0,1,1),
    scale:3});
</script>

Here are some axes:

<div><canvas id="renderCanvas03" touch-action="none" style="width:100%;"></canvas></div>
<script type="module">
  var s3 = new SpinVisualizer.SpinorScene(document.getElementById("renderCanvas03"));
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis(),
    meshColor: new BABYLON.Color4(1,0,0,1),
    rotation: new BABYLON.Vector3(0,0,0),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis(),
    meshColor: new BABYLON.Color4(0,1,0,1),
    rotation: new BABYLON.Vector3(0,0,Math.PI/2),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis(),
    meshColor: new BABYLON.Color4(0,0,1,1),
    rotation: new BABYLON.Vector3(0,Math.PI/2,0),
  });
</script>

Here is a particle plane:

<div><canvas id="renderCanvas04" touch-action="none" style="width:100%;"></canvas></div>
<script type="module">
  var s4 = new SpinVisualizer.SpinorScene(document.getElementById("renderCanvas04"));
  //s4.shader.kernelWinds[0] = 0;
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlane(),
    meshColor: new BABYLON.Color4(1,0,0,1),
    });
</script>

Here is some bottom text