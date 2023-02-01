---
layout: post
title:  "Bra-ket notation"
date:   2023-02-01 13:23:17 +1030
categories: braket
local-javascript-list:
 - "/assets/js/main.bundle.js"
---

Our spinors are made up through several stacked operations.

`<`, `>` are rotations, increasing over time, in opposite directions.

<div><canvas id="renderCanvas01" touch-action="none" style="width:100%;"></canvas></div>
<script type="module">
  var s1 = new SpinVisualizer.SpinorScene(document.getElementById("renderCanvas01"));
  var box = BABYLON.MeshBuilder.CreateBox("Box", {size: 2}, s1.scene);
  box.position.y = 0.5;
  var mat = new BABYLON.PBRMetallicRoughnessMaterial("mat", s1.scene);
  mat.metallic = 1;
  mat.roughness = 0.5;
  box.material = mat;

  SpinVisualizer.engine.inputElement = document.getElementById("renderCanvas01");
</script>


