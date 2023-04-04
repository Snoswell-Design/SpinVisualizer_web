---
layout: post
title:  "Testing Zone"
date:   2023-04-04 13:23:17 +1030
categories: testing
local-javascript-list:
 - "/assets/js/vendors.bundle.js"
 - "/assets/js/runtime.bundle.js"
 - "/assets/js/SpinVisualizer.bundle.js"
 - "/assets/js/Braket.bundle.js"
---

 > `<s<s>>`, trail test

<canvas id="ctest" touch-action="none" style="width:100%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("ctest", Braket.New("<s<s>>"), "{{ site.baseurl }}/assets");
  s.material.center = 1;

  /*new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRingHalf({
      innerRadius:2,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
    rotation:new BABYLON.Vector3(0,0,Math.PI),
  });*/
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis({
      width:0.5,
      half:true,
    }),
    meshColor: new BABYLON.Color4(0, 0, 1, 1),
    rotation: new BABYLON.Vector3(0,Math.PI/2,0),
    alpha:0.3,
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis({
      width:0.5,
      half:true,
    }),
    meshColor: new BABYLON.Color4(0, 0, 1, 1),
    rotation: new BABYLON.Vector3(0,Math.PI/2*3,0),
  });

  var sphere = new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.SphereRainbow(),
    scale:0.95,
    alpha:0.3,
  });
  var trail = new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Trail({
      numParticles: 500,
      position: new BABYLON.Vector3(0, 0, 1),
      normal: new BABYLON.Vector3(0, 0, 1),
      backfaces: true,
      size:0.1,
    }),
    meshColor: new BABYLON.Color4(0, 0, 1, 1),
  });

  var anim = new SpinVisualizer.ScrubAnimation(s);
  anim.add(
    [
      [0,1],
      [10,10],
    ],
    sphere, 'scale');
  anim.add(
    [
      [0,1],
      [10,10],
    ],
    trail, 'scale');

</script>