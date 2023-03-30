---
layout: post
title:  "Spin Visualizer Introduction"
date:   2023-02-01 13:23:17 +1030
categories: braket
local-javascript-list:
 - "/assets/js/main.bundle.js"
---

 > `<s<s>>`, trail test

<canvas id="ctest" touch-action="none" style="width:100%;"></canvas>
<script type="module">
  let s = new SpinVisualizer.SpinorScene("ctest", "<s<s>>", "{{ site.baseurl }}/assets");
  s.shader.center = 1;

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

  s.makeGui();

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

# Spin Visualizer introduction:
In 2008 we developed a real-time spin visualization system for our own use. We did this to better understand spin of the fermions (electrons, protons and neutrons) with the goal of developing ways to tap spin energy. Now we can reliably produce anomalous energy from Cold Fusion reactors at low levels. On one occasion we even triggered the output of approximately 1KWh of excess energy with zero input – something we are working on understanding and reliably repeating.
We are now making a web version of the spin visualizer available to everyone. It uses a new method we discovered that can generate full volumetric spin fields of any dimension or complexity. The infinitely countable set of spin types we can generate includes descriptions of spin used by mainstream science to describe the fermions.
This web version has just a small subset of the features of our in-house software. We will add new features to this web version as quickly as we can. For now, the web version focuses on generating and visualizing solitary 3D spinors in real-time and in an intuitive way. It does not illustrate the connection to classical mathematical descriptions of spin – we welcome contributions from mathematically adept users towards this goal. The 4D spinors we generate in our in-house software best matches the classical descriptions of spin of the fermions.

# Better understanding will lead to revolutionary new technologies:
Spin is a property of electrons, protons and neutrons. There is a vast amount of energy tied up in the spin of the fermions. Energy we believe could be tapped to provide a revolution in production of safe and clean energy that is effectively inexhaustible. To aid in this we need better tools to build intuitive understandings of what spin is and how to manipulate it.
There are almost no spin visualizations – and until now there have been no interactive 3D visualizers. Up until now, the understanding of the fundamental properties and behaviours of spin have been limited to mathematically inclined experts.

# Are there existing intuitive, and visual, explanations of spin?
We read many papers on spin looking for a simple intuitive answer to what spin is… something that we could animate in real-time. We didn’t find any – in many cases knowledgeable experts claim that you can’t picture spin, and as a quantum mechanical property you must use mathematics to understand it. We took that as a challenge and developed a new and intuitive method for generating an infinitely countable set of spin classes and then animating them in real-time... and the method is intuitively simple.  
Spin is a property of a volumetric spin wave with a spherical structure. Concentric spheres can have different rotations with their relative rotations differing by a multiple of 2. The concentric regions can be distorted but have a spherical topology. Spin can occur in 3 or more dimensions – we can demonstrate particularly elegant solutions to the three- and four-dimensional spinors, which are described by two, four and eight dimensional algebras – the complex, Quaternion and Octionion numbers and their associated algebras.

