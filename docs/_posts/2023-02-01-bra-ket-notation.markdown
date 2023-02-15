---
layout: post
title:  "Bra-Ket notation"
date:   2023-02-01 21:23:17 +1030
categories: braket
local-javascript-list:
 - "/assets/js/main.bundle.js"
---

# Describing Spinors

-	We have invented a new way to describe spinors that is very simple and intuitive.
- We have called this the "Bra-Ket" method as it uses matched pairs of brackets.
- It consists of just the symbols `<`, `s`, and `>`.
-	It's easy to implement with standard 3D rendering methods.
-	It describes a volumetric spin function – not just the spin at a point. This means that we can visualize the connection of a spin function to surrounding space.
- We have intentionally kept things simple, only considering components with the same relative phase and speed.
    - Each matched pair of `<` and `>` *could* be at a different speed compared to the others.
    - Each `s` *could* be at a different angle.

# Bra

As spin is based on rotations we use left and right pointy brackets to denote some dynamic rotation in time and its opposite (inverse). For example, `<` left rotation, `>` right rotation.

> These windows are interactive. Left click and drag to rotate view, scroll to zoom.
> If nothing is visible, switch browsers. Chrome, Edge and Brave are known to work.

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
  var s1 = new SpinVisualizer.SpinorScene("cbra1", "<");
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
  var s2 = new SpinVisualizer.SpinorScene("cbra2", ">");
  setup(s2);

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

&nbsp;
# Ket

We use a kernel function to describe a fold in space, `s`. This fold in space is on some plane that would cause a rotation to turn into its inverse. So a left rotation folded over, `<s`, would result in a right rotation `>` (in the center of the fold).

<canvas id="cket" touch-action="none" style="width:100%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("cket", "s", "{{ site.baseurl }}/assets");
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

</script>

Note how folding a rotation over (`<` to `<s`) causes the rotation of the sphere to reverse direction.

<canvas id="creverse" touch-action="none" style="width:100%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("creverse", "<s", "{{ site.baseurl }}/assets");
  s.shader.period = 2;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRingHalf({
      innerRadius:2,
    }),
    alpha:0.2,
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
  /*new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.AxisTube({
    }),
    meshColor: new BABYLON.Color4(0, 0, 1, 0.5),
    rotation:new BABYLON.Vector3(0,0,Math.PI/2),
  });*/

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

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:10,
      arc:Math.PI*2-0.2,
      width:1,
      arrowWidth:4,
      arrowArc:0.2,
    }),
    meshColor: new BABYLON.Color4(0,0.9,0.5,1),
  });

  s.makeGui();

  var anim = new SpinVisualizer.ScrubAnimation(s);
  anim.add(
    [
      [3,0],
      [4,1],
      [7,1],
    ],
    s.shader.kernelWinds, '0');

</script>

&nbsp;
# Spin ½

Continuing from above, cancelling the original rotation (`<s` to `<s>`) returns the outside to normal, but doubles the rotation speed of the sphere.

<canvas id="creversedouble" touch-action="none" style="width:100%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("creversedouble", "<s>", "{{ site.baseurl }}/assets");
  s.shader.period = 2;
  s.shader.center = 3.5;

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRingHalf({
      innerRadius:2,
    }),
    alpha:0.2,
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
  /*new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.AxisTube({
    }),
    meshColor: new BABYLON.Color4(0, 0, 1, 0.5),
    rotation:new BABYLON.Vector3(0,0,Math.PI/2),
  });*/

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

  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ArrowRing({
      radius:10,
      arc:Math.PI*2-0.2,
      width:1,
      arrowWidth:4,
      arrowArc:0.2,
    }),
    meshColor: new BABYLON.Color4(0,0.9,0.5,1),
  });

  s.makeGui();

  var anim = new SpinVisualizer.ScrubAnimation(s);
  anim.add(
    [
      [0,0],
      [3,0],
      [4,-1],
      [7,-1],
    ],
    s.shader.stepSpeeds, '1');
  document.anim = anim;

</script>

This shows where the 2 rotations from spin ½ come from. Every type of spin has a fold that flips rotation at some radius over to the inverse rotation at another radius. The means that the result – the thing in the middle – gets rotated twice per cycle. If we just look at the thing in the middle, when it has done one rotation the whole spinor is only half done, thus it is called spin ½. 

Traditional mathematical treatments to spin just look at the result at some point and talk about something with spin knowing its connection to space. Here we show the connection of the spin result to the surrounding space. We show spin from the inside to the outside – but if you created a spinning wave in space then the central spin would extend out forever, falling off at $$ 1/r^2 $$. Interestingly there is still some radius where the fold in space happens and there is a maximum folding-spin of space.

# Spin ½, ¼ and so on…

We can combine folds and rotations further to produce more complicated spinors. Some of these take more than two revolutions of the inner sphere to return to the same condition. We can end up with any multiple of two rotations resulting in spin $$ 1/2n $$.

Left: `<s>`, spin ½. Right: `<s>>s>`, spin ¼.

> The sphere completes one revolution per colored section of the slider.

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

  var s1 = new SpinVisualizer.SpinorScene("chalf1", "<s>", "{{ site.baseurl }}/assets");
  s1.makeGui();
  SpinVisualizer.AddCycleSlider(s1);
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

  var s2 = new SpinVisualizer.SpinorScene("chalf2", "<s>>s<", "{{ site.baseurl }}/assets");
  s2.makeGui();
  SpinVisualizer.AddCycleSlider(s2);
  setup(s2);

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

&nbsp;
# Quaternions!?

The simple spinor created with `<s>` matches the spinor others have sometimes illustrated and described by Paul Dirac as the Dirac spinor.
If we use a Quaternion algebra to describe a simple spinor the result is a little more complicated and is shown by the simplest of the 2 fold spinors in our notation, `<<s>s>`.

<canvas id="cquat" touch-action="none" style="width:100%"></canvas>
<script type="module">
  var s = new SpinVisualizer.SpinorScene("cquat", "<<s>s>", "{{ site.baseurl }}/assets");
  s.shader.center = 3.5;
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRing({
      innerRadius:2,
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
      width:1,
      lengthSegments:500,
    }),
    meshColor: new BABYLON.Color4(1, 0, 0, 0.5),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis({
      width:1,
      lengthSegments:500,
    }),
    meshColor: new BABYLON.Color4(0, 0, 1, 0.5),
    rotation:new BABYLON.Vector3(0,Math.PI/2,0),
  });
</script>

&nbsp;
# An infinite set...

By combining the Bra and Ket functions we can generate an infinitely countable set of ever more complicated spinors classified by how many Kernel functions they have.

Here is a list of the first four orders of the simple 2D spinors with their spin. Note that a spin of zero still encodes a real spinor.

> (Click on a cell to change the visible spinor)

<table id="braket_table"></table>
<p>
<canvas id="spinorlist" touch-action="none" style="width:100%;"></canvas>

<script type="module">
  var table = document.getElementById("braket_table");

  const brakets = [
    ["<s>"],
    ["<s<s>>", "<s>>s<"],
    ["<s<s>s>", "<s>s<s>", "<s>s>s<", "<s<<s>s>>"],
    ["<s>>s>s<<", "<s<s>>>s<", "<s<s<s>>>", "<s>>s<<s>"],
    ["<s>s>s>s<<","<s>s>s<<s>","<s>s<s>>s<","<s>>s<<s>>s<"],
    ["<s>s<s<s>>","<s>>s>s>s<<<","<s>>s>>s<s<<","<s>>s>s<s<"],
    ["<s<s>>s>s<","<s<s>>s<s>","<s<s>>>s>s<<","<s<s>>>>s<s<"],
    ["<s<s>>>s<<s>","<s<s>s>>s<","<s<s>s<s>>","<s<s<s>>>>s<"],
    ["<s<s<s>>s>","<s<s<s>s>>","<s<s<s<s>>>>","<s<s<<s>s>>>"],
    ["<s<<s>s>>>s<","<s<<s<s>>s>>","<s<<<s>s>s>>",],
];

  var s = new SpinVisualizer.SpinorScene("spinorlist", "<s>", "{{ site.baseurl }}/assets");
  s.makeGui();
  SpinVisualizer.AddCycleSlider(s);
  s.shader.center = 3.5;
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.ParticlePlaneRing({
      innerRadius:2,
      particlesPerSide:200,
      particleSize:0.05,
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
      width:1,
      lengthSegments:500,
    }),
    meshColor: new BABYLON.Color4(1, 0, 0, 0.5),
  });
  new SpinVisualizer.MeshView({
    mesh:SpinVisualizer.Axis({
      width:1,
      lengthSegments:500,
    }),
    meshColor: new BABYLON.Color4(0, 0, 1, 0.5),
    rotation:new BABYLON.Vector3(0,Math.PI/2,0),
  });

  for (let i = 0; i < brakets.length; i++) {
    for (let j = 0; j < brakets[i].length; j++) {
      s.shader.parseBraKet(brakets[i][j]);
      let spinText = '';
      if (s.shader.spin == 0) {
        spinText = '0';
      } else if (s.shader.spin < 0) {
        spinText = "-" + SpinVisualizer.HTML.makeFraction(1,Math.abs(s.shader.spin));
      } else {
        spinText = SpinVisualizer.HTML.makeFraction(1,Math.abs(s.shader.spin));
      }
      brakets[i][j] += " (" + spinText + ")"
    }
  }
  s.shader.parseBraKet(brakets[0][0]);

  function changeSpinor(cell) {
    cell = cell.split(" ")[0];
    s.shader.parseBraKet(cell);
  }


  SpinVisualizer.HTML.makeClickableTable(table, brakets, changeSpinor);

</script>
