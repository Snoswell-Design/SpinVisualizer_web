---
layout: post
title:  "Bra-Ket notation"
date:   2023-02-01 21:23:17 +1030
categories: braket
local-javascript-list:
 - "/assets/js/main.bundle.js"
---

This is a basic spinor `<s>`

<canvas id="c1" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  function addViews(s) {
    new SpinVisualizer.MeshView({
      mesh:SpinVisualizer.ParticlePlaneRing({
        innerRadius:3,
      }),
      meshColor: new BABYLON.Color4(1,0,0,1),
    });
    new SpinVisualizer.MeshView({
      mesh:SpinVisualizer.RainbowSphere(),
      scale:3,
    });
    s.shader.center = 3.5;
  }
  window.addViews = addViews;

  let s = new SpinVisualizer.SpinorScene("c1");
  window.addViews(s);
</script>

It is constructed out of three components: `<`, `s`, and `>`.

`<` and `>` are rotations in space, increasing over time, in opposite directions.

Here is `<`:

<canvas id="c2" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c2");
  window.addViews(s);
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time),
    ];
  };
  s.shader.kernelWinds[0] = 0;
</script>

And then `>`:

<canvas id="c3" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c3");
  window.addViews(s);
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.Identity(),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s.shader.kernelWinds[0] = 0;
</script>

Combine them together and they cancel out:

<canvas id="c4" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c4");
  window.addViews(s);
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s.shader.kernelWinds[0] = 0;
</script>

Then we have the "kernel" components. They do a fold in space, falling off with radius:

<canvas id="c5" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c5");
  window.addViews(s);
  s.shader.stepFunction = (time) => {
    return [
    ];
  };
  s.shader.kernelWinds[0] = 1;
</script>

Stick the kernel in between the folds, and instead of cancelling everywhere, the `<` and `>` rotations double in the centre, and falloff to cancelling as the radius increases.

<canvas id="c6" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c6");
  window.addViews(s);
</script>

Here is a more complicated spinor `<<s>s>`, still made in the same way:

<canvas id="c7" touch-action="none" style="width:80%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("c7");
  window.addViews(s);
  s.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time * 2),
      BABYLON.Matrix.RotationZ(time).transpose(),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s.shader.kernelWinds[0] = 1;
  s.shader.kernelWinds[1] = 1;
</script>