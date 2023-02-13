---
layout: post
title:  "Bra-Ket notation"
date:   2023-02-01 21:23:17 +1030
categories: braket
local-javascript-list:
 - "/assets/js/main.bundle.js"
---

Describing Spinors – modified Bra-Ket notation.

-	We have invented a new way to describe spinors that is very simple and intuitive. 
-	It’s easy to implement with standard 3D rendering methods.
-	It describes a full volumetric spin function – not just the mathematical result of spin at some point. This means that, for the first time, we can visualize the full spin function with its connection to surrounding space. 

# Bra

As spin is based on rotations we use left and right pointy brackets to denote some dynamic rotation in time and its opposite (inverse). For example, `<` left rotation, `>` right rotation.

<canvas id="cbra1" touch-action="none" style="width:50%;float:left;"></canvas>
<canvas id="cbra2" touch-action="none" style="width:50%;float:left;"></canvas>

<script type="module">
  function setup(s) {
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
  }

  // <
  var s1 = new SpinVisualizer.SpinorScene("cbra1");
  setup(s1);
  s1.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time),
    ];
  };
  s1.shader.kernelWinds[0] = 0;

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

  // >
  var s2 = new SpinVisualizer.SpinorScene("cbra2");
  setup(s2);
  s2.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.Identity(),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s2.shader.kernelWinds[0] = 0;

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

  SpinVisualizer.SpinorScene.LinkCameras(s1, s2);
</script>

# Ket

We use a kernel function to describe a fold in space, `s`. This fold in space is on some plane that would cause a rotation to turn into its inverse. So a left rotation folded over, `<s`, would result in a right rotation, `>` (in the center of the fold).

<canvas id="cket" touch-action="none" style="width:100%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("cket", "{{ site.baseurl }}/assets");
  s.shader.stepFunction = (time) => {
    return [
    ];
  };
  s.shader.kernelWinds[0] = 1;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRingHalf({
      innerRadius:2,
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

  s.makeGui();

  var anim = new SpinVisualizer.ScrubAnimation(s);
  anim.add(
    [
      [1,0],
      [2,1],
      [3,1],
    ],
    s.shader.kernelWinds, '0');

  /*var [panel, slider] = SpinVisualizer.TopSlider(
    "Fold Amount",
    0, 1, 0.01,
    (value) => {
      s.shader.kernelWinds[0] = value;
    },
  );
  s.gui.addControl(panel);*/
</script>

# Spin ½

This shows where the 2 rotations come from. Every type of spin has a fold that flips rotation at some radius over to the inverse rotation at another radius. The means that the result – the thing in the middle – gets rotated twice per cycle. If we just look at the thing in the middle, when it has done one rotation the whole spinor is only half done, thus it is called spin ½. 

Traditional mathematical treatments to spin just look at the result at some point and talk about something with spin knowing its connection to space. Here we show the connection of the spin result to the surrounding space. We show spin from the inside to the outside – but if you created a spinning wave in space then the central spin would extend out forever, falling off at $$ 1/r^2 $$. Interestingly there is still some radius where the fold in space happens and there is a maximum folding-spin of space.
Spin ½, ¼ and so on…
Of course, we could start with a double rotation and fold space this would create a spin ¼. We can go one with any number of rotations resulting in spin $$ 1/2^n $$.

Left: `<s>`, spin ½. Right: `<<s>s>`, spin ¼.

<canvas id="chalf1" touch-action="none" style="width:50%;float:left;"></canvas>
<canvas id="chalf2" touch-action="none" style="width:50%;float:left;"></canvas>

<script type="module">
  function setup(s) {
    s.shader.center = 3.5;
    new SpinVisualizer.MeshView({
      mesh:SpinVisualizer.ParticlePlaneRing({
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
  }

  // <
  var s1 = new SpinVisualizer.SpinorScene("chalf1");
  setup(s1);

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

  // >
  var s2 = new SpinVisualizer.SpinorScene("chalf2");
  setup(s2);
  s2.shader.stepFunction = (time) => {
    return [
      BABYLON.Matrix.RotationZ(time * 2),
      BABYLON.Matrix.RotationZ(time).transpose(),
      BABYLON.Matrix.RotationZ(time).transpose(),
    ];
  };
  s2.shader.kernelWinds[0] = 1;
  s2.shader.kernelWinds[1] = 1;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:2.9,
      arc:Math.PI*2-0.2,
      width:0.5,
      arrowWidth:2,
      arrowArc:0.5,
    }),
    meshColor: new BABYLON.Color4(0,0.9,0.5,1),
  });

  SpinVisualizer.SpinorScene.LinkCameras(s1, s2);
</script>

The simple spinor created with `<s>` matches the spinor others have sometimes illustrated and described by Paul Driac as the Dirac spinor.
If we use a Quaternion algebra to describe a simple spinor the result is a little more complicated and is shown by the simplest 2 fold spinors in our notation. `<<s>s>`

Illustrate the `<<s>s>` spinor
