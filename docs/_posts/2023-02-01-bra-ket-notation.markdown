---
layout: post
title:  "Bra-Ket notation"
date:   2023-02-01 21:23:17 +1030
categories: braket
local-javascript-list:
 - "/assets/js/main.bundle.js"
---

<nav class="toc-fixed" markdown="1">
* TOC
{:toc}
</nav>

## Basic Spinor

This is a basic spinor `<s>`

<canvas id="c1" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c1");
  s.shader.center = 3.5;
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRing({
      innerRadius:3,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
    rotation:new BABYLON.Vector3(0,0,Math.PI/2),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.SphereRainbow(),
    scale:2.8,
  });
</script>

It is constructed out of three components: `<`, `s`, and `>`.

`<` and `>` are rotations in space, increasing over time, in opposite directions.

Here is `<`:

<canvas id="c2" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c2");
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time),
    ];
  };
  s.shader.kernelWinds[0] = 0;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRing({
      innerRadius:3,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
  });
  /*new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Sphere(),
    scale:2.8,
    meshColor: new BABYLON.Color4(1, 0, 0, 0.5),
    alpha:0.2,
  });*/
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.SphereRainbow(),
    scale:2,
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:2.9,
      arc:Math.PI*2-0.2,
      width:0.5,
      arrowWidth:2,
      arrowArc:0.5,
    }),
    meshColor: new BABYLON.Color4(0,0.5,0.9,1),
  });
</script>

And then `>`:

<canvas id="c3" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c3");
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.Identity(),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s.shader.kernelWinds[0] = 0;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRing({
      innerRadius:3,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.SphereRainbow(),
    scale:2,
  });

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:2.9,
      arc:Math.PI*2-0.2,
      width:0.5,
      arrowWidth:2,
      arrowArc:0.5,
    }),
    rotation: new BABYLON.Vector3(Math.PI, 0, 0),
    meshColor: new BABYLON.Color4(0,0.9,0.5,1),
  });
</script>

Combine them together and they cancel out:

<canvas id="c4" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c4");
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s.shader.kernelWinds[0] = 0;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRing({
      innerRadius:3,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.SphereRainbow(),
    scale:2,
  });

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:2.9,
      arc:Math.PI*2-0.2,
      width:0.5,
      arrowWidth:2,
      arrowArc:0.5,
    }),
    meshColor: new BABYLON.Color4(0,0.5,0.9,1),
    translation: new BABYLON.Vector3(0, 0, 1),
    rotation: new BABYLON.Vector3(0, 0, -Math.PI/4),
  });

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:2.9,
      arc:Math.PI*2-0.2,
      width:0.5,
      arrowWidth:2,
      arrowArc:0.5,
    }),
    rotation: new BABYLON.Vector3(Math.PI, 0, Math.PI/4),
    meshColor: new BABYLON.Color4(0,0.9,0.5,1),
    translation: new BABYLON.Vector3(0, 0, -1),
  });
</script>

Then we have the "kernel" component `s`. It does a fold in space, falling off with radius:

<canvas id="c5" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c5");
  s.shader.stepFunction = (time) => {
    return [
    ];
  };
  s.shader.kernelWinds[0] = 1;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRingHalf({
      innerRadius:3,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
    rotation:new BABYLON.Vector3(0,0,Math.PI),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.SphereRainbow(),
    scale:2,
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis({
      width:0.5,
    }),
    meshColor: new BABYLON.Color4(1, 0, 0, 0.5),
    rotation: new BABYLON.Vector3(0,0,Math.PI/2),
  });
</script>

Stick the kernel in between the folds, and instead of cancelling everywhere, the `<` and `>` rotations double in the centre, and falloff to cancelling as the radius increases.

<canvas id="c6" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c6");
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRingHalf({
      innerRadius:3,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
    rotation:new BABYLON.Vector3(0,0,Math.PI/2),
    alpha: 0.2,
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.SphereRainbow(),
    scale:2,
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis({
      width:0.5,
    }),
    meshColor: new BABYLON.Color4(1, 0, 0, 0.5),
  });

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:2.9,
      arc:Math.PI*2-0.2,
      width:0.5,
      arrowWidth:2,
      arrowArc:0.5,
    }),
    meshColor: new BABYLON.Color4(0,0.7,0.7,1),
  });

</script>

## Quaternion Spinor

Here is a more complicated spinor `<<s>s>`, still made in the same way:

<canvas id="c7" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c7");
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time * 2),
      BABYLON.Matrix.RotationZ(time).transpose(),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s.shader.kernelWinds[0] = 1;
  s.shader.kernelWinds[1] = 1;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRingHalf({
      innerRadius:3,
    }),
    meshColor: new BABYLON.Color4(1,0,0,1),
    rotation:new BABYLON.Vector3(0,0,Math.PI/2),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Sphere(),
    scale:2.8,
    meshColor: new BABYLON.Color4(1, 0, 0, 0.5),
    alpha:0.2,
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis({
      width:0.5,
    }),
    meshColor: new BABYLON.Color4(1, 0, 0, 0.5),
  });
</script>