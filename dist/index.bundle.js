/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gui.ts":
/*!********************!*\
  !*** ./src/gui.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.makeGUI = void 0;\r\n//import * as dat from 'dat.gui';\r\nvar GUI = __webpack_require__(/*! babylonjs-gui */ \"./node_modules/babylonjs-gui/babylon.gui.js\");\r\nvar meshes_1 = __webpack_require__(/*! ./meshes */ \"./src/meshes.ts\");\r\nfunction makeGUI(scene, shader) {\r\n    //scene.debugLayer.show();\r\n    var gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI(\"UI\");\r\n    var meshClass = new meshes_1.Meshes();\r\n    meshClass.material = shader.shader;\r\n    var panel = new GUI.StackPanel(\"Meshes\");\r\n    panel.width = \"200px\";\r\n    panel.isVertical = true;\r\n    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;\r\n    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;\r\n    panel.background = \"#99999999\";\r\n    gui.addControl(panel);\r\n    for (var _i = 0, _a = meshClass.meshes; _i < _a.length; _i++) {\r\n        var meshView = _a[_i];\r\n        panel.addControl(meshView.createControl());\r\n    }\r\n}\r\nexports.makeGUI = makeGUI;\r\n/*\r\n  let gui : dat.GUI = new dat.GUI();\r\n  gui.domElement.style.marginTop = \"100px\";\r\n  gui.domElement.id = \"datGUI\";\r\n\r\n  var options = {\r\n    speed: 1.0,\r\n    time: 0.0,\r\n    radius: 5.0,\r\n    power: 1.5,\r\n    center: 2.0,\r\n    \"Sphere\": false,\r\n    \"Sphere Radius\": 1.0,\r\n    \"X Axis\": false,\r\n    \"Y Axis\": false,\r\n    \"Z Axis\": false,\r\n    \"XY Plane\": false,\r\n    \"XZ Plane\": false,\r\n    \"YZ Plane\": false,\r\n    \"XY Quarter\": false,\r\n    \"XZ Quarter\": false,\r\n    \"YZ Quarter\": false,\r\n    field: false,\r\n    \"Ring 1\": \"Off\",\r\n    \"Ring 1 Radius\": 1.0,\r\n    \"Ring 2\": \"Off\",\r\n    \"Ring 2 Radius\": 1.0,\r\n    \"Ring 3\": \"Off\",\r\n    \"Ring 3 Radius\": 1.0,\r\n    \"Cage 1\": false,\r\n    \"Cage 1 Radius\": 1.0,\r\n    \"Cage 2\": false,\r\n    \"Cage 2 Radius\": 1.0,\r\n    \"Cage 3\": false,\r\n    \"Cage 3 Radius\": 1.0,\r\n  }\r\n  let meshes: Record<string, any> = {};\r\n  let controllers : Record<string, dat.GUIController> = {};\r\n\r\n  var meshClass = new Meshes();\r\n  meshClass.material = shader.shader;\r\n\r\n\r\n  let spinSettings = gui.addFolder(\"Spin settings\")\r\n\r\n  controllers.speed = spinSettings.add(options, \"speed\", 0, 5, 0.1).onChange((value) => {\r\n    shader.speed = value;\r\n  });\r\n\r\n  controllers.time = spinSettings.add(options, \"time\", 0, 1, 0.01);\r\n  controllers.time.listen();\r\n  scene.registerAfterRender(() => {\r\n    options.time = (shader.time / Math.PI / 2) % 1;\r\n  });\r\n  controllers.time.onChange((value) => {\r\n    shader.time = value * Math.PI * 2;\r\n  });\r\n\r\n\r\n  //controllers.radius = spinSettings.add(options, \"radius\", 1, 10, 0.5).onChange((value) => {\r\n  //  shader.radius = value;\r\n  //});\r\n  controllers.power = spinSettings.add(options, \"power\", 0.1, 3, 0.1).onChange((value) => {\r\n    shader.power = value;\r\n  });\r\n  controllers.center = spinSettings.add(options, \"center\", 0.1, 10, 0.1).onChange((value) => {\r\n    shader.center = value;\r\n  });\r\n\r\n  var objects = gui.addFolder(\"Objects\");\r\n\r\n  controllers.field = objects.add(options, \"field\").onChange((value) => {\r\n    var mesh : Array<BABYLON.Mesh> = meshes.field;\r\n    if (value && mesh == null) {\r\n      mesh = Array<BABYLON.Mesh>(10*10*10);\r\n      let i = 0;\r\n      for (var x = 0; x <= 10; x++) {\r\n          for (var y = 0; y <= 10; y++) {\r\n              for (var z = 0; z <= 10; z++) {\r\n                  var box = BABYLON.Mesh.CreateBox(\"Box\", 0.1, scene);\r\n                  box.material = shader.shader;\r\n                  box.position = new BABYLON.Vector3(5-x,5-y,5-z);\r\n                  mesh[i] = box;\r\n                  i++;\r\n              }\r\n          }\r\n      }\r\n      meshes.field = mesh;\r\n    }\r\n    if (!value && mesh != null) {\r\n      for (let m of mesh) {\r\n        m.dispose();\r\n      }\r\n      delete meshes.field;\r\n    }\r\n  });\r\n\r\n  function onOffControl(option:string, meshname:string) {\r\n    controllers[option] = objects.add(options, option).onChange((value) => {\r\n      meshClass[meshname].isVisible = value;\r\n    });\r\n  }\r\n\r\n  onOffControl(\"X Axis\", \"xAxis\");\r\n  onOffControl(\"Y Axis\", \"yAxis\");\r\n  onOffControl(\"Z Axis\", \"zAxis\");\r\n  onOffControl(\"XY Plane\", \"xyPlane\");\r\n  onOffControl(\"XZ Plane\", \"xzPlane\");\r\n  onOffControl(\"YZ Plane\", \"yzPlane\");\r\n  onOffControl(\"XY Quarter\", \"xyQuarter\");\r\n  onOffControl(\"XZ Quarter\", \"xzQuarter\");\r\n  onOffControl(\"YZ Quarter\", \"yzQuarter\");\r\n\r\n  function radiusControl(option:string, meshname:string) {\r\n    controllers[option] = objects.add(options, option).onChange((value) => {\r\n        meshClass[meshname].isVisible = value;\r\n    });\r\n    controllers[option + \"Radius\"] = objects.add(options, option + \" Radius\", 0.1, 10, 0.1).onChange((value) => {\r\n      meshClass[meshname].scaling = new BABYLON.Vector3(value, value, value);\r\n    });\r\n  }\r\n\r\n  radiusControl(\"Sphere\", \"sphere\");\r\n  radiusControl(\"Cage 1\", \"cage1\");\r\n  radiusControl(\"Cage 2\", \"cage2\");\r\n  radiusControl(\"Cage 3\", \"cage3\");\r\n\r\n  function ringControl(option:string, meshname:string) {\r\n    controllers[option] = objects.add(options, option, [\"Off\", \"XY\", \"XZ\", \"YZ\"]).onChange((value) => {\r\n      switch (value) {\r\n        case \"XY\":\r\n          meshClass[meshname].isVisible = true;\r\n          meshClass[meshname].rotation = new BABYLON.Vector3(0, 0, 0);\r\n          break;\r\n        case \"XZ\":\r\n          meshClass[meshname].isVisible = true;\r\n          meshClass[meshname].rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);\r\n          break;\r\n        case \"YZ\":\r\n          meshClass[meshname].isVisible = true;\r\n          meshClass[meshname].rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);\r\n          break;\r\n        default:\r\n          meshClass[meshname].isVisible = false;\r\n          break;\r\n      }\r\n    });\r\n    controllers[option + \"Radius\"] = objects.add(options, option + \" Radius\", 0.1, 10, 0.1).onChange((value) => {\r\n      meshClass[meshname].scaling = new BABYLON.Vector3(value, value, value);\r\n    });\r\n  }\r\n\r\n  ringControl(\"Ring 1\", \"ring1\");\r\n  ringControl(\"Ring 2\", \"ring2\");\r\n  ringControl(\"Ring 3\", \"ring3\");\r\n\r\n\r\n  controllers[\"Sphere\"].setValue(true);\r\n  controllers[\"X Axis\"].setValue(true);\r\n  controllers[\"Y Axis\"].setValue(true);\r\n  controllers[\"Z Axis\"].setValue(true);\r\n}*/ \r\n\n\n//# sourceURL=webpack:///./src/gui.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar BABYLON = __webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\");\r\nvar gui_1 = __webpack_require__(/*! ./gui */ \"./src/gui.ts\");\r\nvar shader_1 = __webpack_require__(/*! ./shader */ \"./src/shader.ts\");\r\nvar canvas = document.getElementById(\"renderCanvas\");\r\nvar engine = new BABYLON.Engine(canvas, true);\r\nvar createScene = function () {\r\n    var scene = new BABYLON.Scene(engine);\r\n    scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);\r\n    var camera = new BABYLON.ArcRotateCamera(\"Camera\", Math.PI / 4, Math.PI / 4, 20, BABYLON.Vector3.Zero(), scene);\r\n    camera.attachControl(canvas, true);\r\n    camera.upVector = new BABYLON.Vector3(0, 0, 1);\r\n    camera.wheelPrecision = 20;\r\n    camera.lowerRadiusLimit = 2;\r\n    camera.upperRadiusLimit = 30;\r\n    camera.lockedTarget = BABYLON.Vector3.Zero();\r\n    var shader = new shader_1.SpinorShader(scene);\r\n    var light = new BABYLON.HemisphericLight(\"light\", new BABYLON.Vector3(1, 1, 0), scene);\r\n    (0, gui_1.makeGUI)(scene, shader);\r\n    //scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;\r\n    //scene.fogStart = 10;\r\n    //scene.fogEnd = 30;\r\n    //scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.9);\r\n    return scene;\r\n};\r\nvar scene = createScene();\r\nengine.runRenderLoop(function () {\r\n    scene.render();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/meshes.ts":
/*!***********************!*\
  !*** ./src/meshes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Meshes = exports.MeshView = void 0;\r\nvar BABYLON = __webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\");\r\nvar babylonjs_1 = __webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\");\r\nvar GUI = __webpack_require__(/*! babylonjs-gui */ \"./node_modules/babylonjs-gui/babylon.gui.js\");\r\nfunction colorVertexData(vd, color) {\r\n    var l = vd.positions.length / 3;\r\n    var colorsUnfolded = new Array(l * 4);\r\n    for (var i = 0; i < l; i++) {\r\n        color.toArray(colorsUnfolded, i * 4);\r\n    }\r\n    vd.colors = colorsUnfolded;\r\n}\r\nvar MeshView = /** @class */ (function () {\r\n    function MeshView(scene, name, vd, color) {\r\n        this.hasRadius = false;\r\n        this.prettyName = name;\r\n        if (color != null) {\r\n            colorVertexData(vd, color);\r\n            this.color = color;\r\n        }\r\n        else {\r\n            this.color = new BABYLON.Color4(0, 0, 0, 1);\r\n        }\r\n        this.mesh = new BABYLON.Mesh(name.toLowerCase().replace(' ', ''), scene);\r\n        vd.applyToMesh(this.mesh);\r\n        this.mesh.isVisible = false;\r\n    }\r\n    MeshView.prototype.createControl = function () {\r\n        var _this = this;\r\n        var colorHex = this.color.toHexString(true);\r\n        var c = new GUI.Checkbox(this.mesh.name + '_checkbox');\r\n        c.width = '20px';\r\n        c.height = '20px';\r\n        c.color = colorHex;\r\n        c.background = \"white\";\r\n        c.horizontalAlignment = 0; // left\r\n        c.onIsCheckedChangedObservable.add(function (visible) {\r\n            _this.mesh.isVisible = visible;\r\n        });\r\n        var h = new GUI.TextBlock(this.mesh.name + '_label');\r\n        h.text = this.prettyName;\r\n        h.height = '30px';\r\n        h.color = 'black';\r\n        h.textHorizontalAlignment = 0;\r\n        h.paddingLeftInPixels = 5;\r\n        var headerPanel = new GUI.StackPanel(this.mesh.name + '_header');\r\n        headerPanel.isVertical = false;\r\n        headerPanel.width = '100%';\r\n        headerPanel.adaptHeightToChildren = true;\r\n        headerPanel.addControl(c);\r\n        headerPanel.addControl(h);\r\n        var panel = new GUI.StackPanel(this.mesh.name + 'controls');\r\n        panel.setPaddingInPixels(5);\r\n        panel.addControl(headerPanel);\r\n        if (this.hasRadius) {\r\n            var s = new GUI.Slider(this.mesh.name + '_radius');\r\n            s.width = '100%';\r\n            s.height = '20px';\r\n            s.value = 0.1;\r\n            s.minimum = 0.1;\r\n            s.maximum = 10;\r\n            s.color = colorHex;\r\n            s.onValueChangedObservable.add(function (radius) {\r\n                _this.mesh.scaling = new BABYLON.Vector3(radius, radius, radius);\r\n                if (!c.isChecked) {\r\n                    c.isChecked = true;\r\n                }\r\n            });\r\n            panel.addControl(s);\r\n        }\r\n        return panel;\r\n    };\r\n    return MeshView;\r\n}());\r\nexports.MeshView = MeshView;\r\nvar Meshes = /** @class */ (function () {\r\n    function Meshes() {\r\n        this.meshes = [];\r\n        this.makeMesh('Sphere', this.makeSphere(new BABYLON.Color4(0.8, 0.4, 0.4, 1), new BABYLON.Color4(0.2, 0, 0, 1)), null, true);\r\n        this.makeMesh('X Axis', this.makeAxis(new BABYLON.Vector3(0, 0, 0)), new BABYLON.Color4(1, 0, 0, 1));\r\n        this.makeMesh('Y Axis', this.makeAxis(new BABYLON.Vector3(0, 0, Math.PI / 2)), new BABYLON.Color4(0, 1, 0, 1));\r\n        this.makeMesh('Z Axis', this.makeAxis(new BABYLON.Vector3(Math.PI / 2, 0, 0)), new BABYLON.Color4(0, 0, 1, 1));\r\n        this.makeMesh(\"XY Plane\", this.makePlane(new BABYLON.Vector3(0, 0, 0)), new BABYLON.Color4(0.5, 0.5, 1, 1));\r\n        this.makeMesh(\"XZ Plane\", this.makePlane(new BABYLON.Vector3(0, Math.PI / 2, 0)), new BABYLON.Color4(0.5, 1, 0.5, 1));\r\n        this.makeMesh(\"YZ Plane\", this.makePlane(new BABYLON.Vector3(Math.PI / 2, 0, 0)), new BABYLON.Color4(1, 0.5, 0.5, 1));\r\n        this.makeMesh(\"XY Quarter\", this.makeQuarterPlane(new BABYLON.Vector3(0, 0, 0)), new BABYLON.Color4(0.5, 0.5, 1, 1));\r\n        this.makeMesh(\"XZ Quarter\", this.makeQuarterPlane(new BABYLON.Vector3(0, Math.PI / 2, 0)), new BABYLON.Color4(0.5, 1, 0.5, 1));\r\n        this.makeMesh(\"YZ Quarter\", this.makeQuarterPlane(new BABYLON.Vector3(-Math.PI / 2, 0, 0)), new BABYLON.Color4(1, 0.5, 0.5, 1));\r\n        this.makeMesh(\"Ring 1\", this.makeRingRibbon(), new BABYLON.Color4(1, 0, 0, 1), true);\r\n        this.makeMesh(\"Ring 2\", this.makeRingRibbon(), new BABYLON.Color4(0, 1, 0, 1), true);\r\n        this.makeMesh(\"Ring 3\", this.makeRingRibbon(), new BABYLON.Color4(0, 0, 1, 1), true);\r\n        this.makeMesh(\"Cage 1\", this.makeCage(), new BABYLON.Color4(1, 0, 0, 1), true);\r\n        this.makeMesh(\"Cage 2\", this.makeCage(), new BABYLON.Color4(0, 1, 0, 1), true);\r\n        this.makeMesh(\"Cage 3\", this.makeCage(), new BABYLON.Color4(0, 0, 1, 1), true);\r\n        // Outer cage to see view angle/zoom\r\n        this.outerCage = new BABYLON.Mesh('outerCage', this.scene);\r\n        this.makeCage(100, 0.1, BABYLON.Mesh.FRONTSIDE).applyToMesh(this.outerCage);\r\n        this.outerCage.scaling = new BABYLON.Vector3(10, 10, 10);\r\n    }\r\n    Meshes.prototype.makeMesh = function (name, vd, color, hasRadius) {\r\n        if (hasRadius === void 0) { hasRadius = false; }\r\n        var mesh = new MeshView(this.scene, name, vd, color);\r\n        mesh.hasRadius = hasRadius;\r\n        this.meshes.push(mesh);\r\n    };\r\n    Meshes.prototype.makeSphere = function (sphereColor, cageColor) {\r\n        // Combine a sphere and a cage so you can see it rotating\r\n        var vd1 = BABYLON.VertexData.CreateIcoSphere({ subdivisions: 6, flat: false });\r\n        colorVertexData(vd1, sphereColor);\r\n        var vd2 = this.makeCage();\r\n        colorVertexData(vd2, cageColor);\r\n        vd1.merge(vd2);\r\n        return vd1;\r\n    };\r\n    Meshes.prototype.makeAxis = function (rotation, width, lengthSegments, widthSegments) {\r\n        if (width === void 0) { width = 3; }\r\n        if (lengthSegments === void 0) { lengthSegments = 100; }\r\n        if (widthSegments === void 0) { widthSegments = 5; }\r\n        var paths = new Array(widthSegments);\r\n        for (var j = 0; j < widthSegments; j++) {\r\n            paths[j] = new Array(lengthSegments);\r\n        }\r\n        for (var i = 0; i < lengthSegments; i++) {\r\n            for (var j = 0; j < widthSegments; j++) {\r\n                paths[j][i] = new babylonjs_1.Vector3(-10 + 20 * (i / (lengthSegments - 1)), -width / 2 + width * (j / (widthSegments - 1)), 0);\r\n            }\r\n        }\r\n        var vd = BABYLON.VertexData.CreateRibbon({ pathArray: paths, closePath: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE });\r\n        vd.transform(BABYLON.Matrix.RotationYawPitchRoll(rotation.y, rotation.x, rotation.z + Math.PI / 2));\r\n        return vd;\r\n    };\r\n    Meshes.prototype.makeQuarterPlane = function (rotation, size, segments) {\r\n        if (size === void 0) { size = 10; }\r\n        if (segments === void 0) { segments = 50; }\r\n        // Using ribbon because babylon doesn't give you a nice subdivided plane that also can be doublesided\r\n        var paths = new Array(segments + 1);\r\n        for (var x = 0; x <= segments; x++) {\r\n            paths[x] = new Array(segments + 1);\r\n        }\r\n        for (var x = 0; x <= segments; x++) {\r\n            for (var y = 0; y <= segments; y++) {\r\n                paths[x][y] = new BABYLON.Vector3(x / segments * size, y / segments * size, 0);\r\n            }\r\n        }\r\n        var vd = BABYLON.VertexData.CreateRibbon({ pathArray: paths, sideOrientation: BABYLON.Mesh.DOUBLESIDE });\r\n        vd.transform(BABYLON.Matrix.RotationYawPitchRoll(rotation.y, rotation.x, rotation.z));\r\n        return vd;\r\n    };\r\n    Meshes.prototype.makePlane = function (rotation, size, segments) {\r\n        if (size === void 0) { size = 20; }\r\n        if (segments === void 0) { segments = 100; }\r\n        // Using ribbon because babylon doesn't give you a nice subdivided plane that also can be doublesided\r\n        var paths = new Array(segments + 1);\r\n        for (var x = 0; x <= segments; x++) {\r\n            paths[x] = new Array(segments + 1);\r\n        }\r\n        for (var x = 0; x <= segments; x++) {\r\n            for (var y = 0; y <= segments; y++) {\r\n                paths[x][y] = new BABYLON.Vector3(x / segments * size - size / 2, y / segments * size - size / 2, 0);\r\n            }\r\n        }\r\n        var vd = BABYLON.VertexData.CreateRibbon({ pathArray: paths, sideOrientation: BABYLON.Mesh.DOUBLESIDE });\r\n        vd.transform(BABYLON.Matrix.RotationYawPitchRoll(rotation.y, rotation.x, rotation.z));\r\n        return vd;\r\n    };\r\n    Meshes.prototype.makeRingRibbon = function (segments, width, sideOrientation) {\r\n        if (segments === void 0) { segments = 100; }\r\n        if (width === void 0) { width = 0.1; }\r\n        if (sideOrientation === void 0) { sideOrientation = BABYLON.Mesh.DOUBLESIDE; }\r\n        var path1 = new Array(segments);\r\n        var path2 = new Array(segments);\r\n        for (var i = 0; i < segments; i++) {\r\n            var rad = 2.0 * Math.PI * i / segments;\r\n            var x = Math.cos(rad);\r\n            var y = Math.sin(rad);\r\n            path1[i] = new BABYLON.Vector3(x, y, width / 2);\r\n            path2[i] = new BABYLON.Vector3(x, y, -width / 2);\r\n        }\r\n        var vd = BABYLON.VertexData.CreateRibbon({ pathArray: [path1, path2], closePath: true, sideOrientation: sideOrientation });\r\n        return vd;\r\n    };\r\n    Meshes.prototype.makeCage = function (segments, width, sideOrientation) {\r\n        if (segments === void 0) { segments = 100; }\r\n        if (width === void 0) { width = 0.1; }\r\n        if (sideOrientation === void 0) { sideOrientation = BABYLON.Mesh.DOUBLESIDE; }\r\n        var vd1 = this.makeRingRibbon(segments, width, sideOrientation);\r\n        var vd2 = this.makeRingRibbon(segments, width, sideOrientation);\r\n        vd2.transform(BABYLON.Matrix.RotationX(Math.PI / 2));\r\n        var vd3 = this.makeRingRibbon(segments, width, sideOrientation);\r\n        vd3.transform(BABYLON.Matrix.RotationY(Math.PI / 2));\r\n        vd1.merge(vd2);\r\n        vd1.merge(vd3);\r\n        return vd1;\r\n    };\r\n    Object.defineProperty(Meshes.prototype, \"material\", {\r\n        get: function () {\r\n            return this._material;\r\n        },\r\n        set: function (n) {\r\n            this._material = n;\r\n            for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {\r\n                var mesh = _a[_i];\r\n                mesh.mesh.material = this._material;\r\n            }\r\n            this.outerCage.material = this._material;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    return Meshes;\r\n}());\r\nexports.Meshes = Meshes;\r\n\n\n//# sourceURL=webpack:///./src/meshes.ts?");

/***/ }),

/***/ "./src/shader.ts":
/*!***********************!*\
  !*** ./src/shader.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.SpinorShader = void 0;\r\nvar BABYLON = __webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\");\r\nvar babylonjs_materials_1 = __webpack_require__(/*! babylonjs-materials */ \"./node_modules/babylonjs-materials/babylonjs.materials.js\");\r\nvar numKernels = 3;\r\nvar SpinorShader = /** @class */ (function () {\r\n    function SpinorShader(scene) {\r\n        var _this = this;\r\n        this.steps = Array(numKernels + 1);\r\n        for (var i = 0; i < numKernels + 1; i++) {\r\n            this.steps[i] = BABYLON.Matrix.Identity();\r\n        }\r\n        this.kernelWinds = new Float32Array(numKernels);\r\n        this.kernelPhases = new Float32Array(numKernels);\r\n        this.time = 0;\r\n        this.speed = 1;\r\n        this.radius = 10;\r\n        this.power = 1.5;\r\n        this.center = 1.3;\r\n        this.shader = new babylonjs_materials_1.CustomMaterial(\"spinorMaterial\", scene);\r\n        this.shader.AddUniform('numSteps', 'int', numKernels + 1);\r\n        this.shader.AddUniform(\"steps\", \"mat4[\" + (numKernels + 1) + \"]\", null);\r\n        this.shader.AddUniform('kernelWinds', 'float[' + numKernels + ']', null);\r\n        this.shader.AddUniform('kernelPhases', 'float[' + numKernels + ']', null);\r\n        this.shader.AddUniform('time', 'float', 0);\r\n        this.shader.AddUniform('radial_radius', 'float', 0);\r\n        this.shader.AddUniform('radial_power', 'float', 0);\r\n        this.shader.AddUniform('radial_center', 'float', 0);\r\n        this.shader.Vertex_Definitions(\"\\n      mat4 rotXY(float a) {\\n            float c = cos(a);\\n            float s = sin(a);\\n            return mat4(\\n                 c, s, 0, 0,\\n                -s, c, 0, 0,\\n                 0, 0, 1, 0,\\n                 0, 0, 0, 1);\\n        }\\n        mat4 rotYZ(float a) {\\n            float c = cos(a);\\n            float s = sin(a);\\n            return mat4(\\n                1, 0, 0, 0,\\n                0, c, s, 0,\\n                0,-s, c, 0,\\n                0, 0, 0, 1);\\n        }\\n        mat4 foldXY(float amount, float angle) {\\n            mat4 angleMat = rotXY(angle);\\n            return angleMat * rotYZ(amount) * transpose(angleMat);\\n        }\\n    \");\r\n        this.shader.Vertex_After_WorldPosComputed(\"\\n        float r = 1.0 - length(worldPos) / radial_radius;\\n        r = clamp(pow(r, radial_power) * radial_center, 0.0, 1.0);\\n        mat4 rotation = mat4(1.0);\\n        for (int i = 0; i < numSteps-1; i++) {\\n            rotation = rotation * steps[i];\\n            rotation = rotation * foldXY(r * PI * kernelWinds[i], kernelPhases[i]);\\n        }\\n        rotation = rotation * steps[numSteps-1];\\n        worldPos = worldPos * rotation;\\n        vNormalW = vec3(vec4(vNormalW, 1.0) * rotation);\\n    \");\r\n        this.shader.onBindObservable.add(function () {\r\n            _this.shader.getEffect().setFloat('time', _this.time);\r\n            //TEMPORARY, needs to be based on actual spinor we're rendering\r\n            _this.steps[0] = BABYLON.Matrix.RotationZ(_this.time);\r\n            _this.steps[1] = _this.steps[0].transpose();\r\n            _this.shader.getEffect().setInt(\"numSteps\", _this.steps.length);\r\n            var stepsUnfolded = new Float32Array(_this.steps.length * 16);\r\n            for (var i = 0; i < _this.steps.length; i++) {\r\n                stepsUnfolded.set(_this.steps[i].asArray(), i * 16);\r\n            }\r\n            _this.shader.getEffect().setMatrices(\"steps\", stepsUnfolded);\r\n            _this.shader.getEffect().setFloatArray(\"kernelWinds\", _this.kernelWinds);\r\n            _this.shader.getEffect().setFloatArray(\"kernelPhases\", _this.kernelPhases);\r\n            _this.shader.getEffect().setFloat('radial_radius', _this.radius);\r\n            _this.shader.getEffect().setFloat('radial_power', _this.power);\r\n            _this.shader.getEffect().setFloat('radial_center', _this.center);\r\n        });\r\n        scene.registerBeforeRender(function () {\r\n            _this.time += scene.getEngine().getDeltaTime() / 500 * _this.speed;\r\n        });\r\n        //TEMPORARY\r\n        this.kernelWinds[0] = 1;\r\n    }\r\n    return SpinorShader;\r\n}());\r\nexports.SpinorShader = SpinorShader;\r\n\n\n//# sourceURL=webpack:///./src/shader.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_babylonjs-gui_babylon_gui_js-node_modules_babylonjs-materials_babylonjs_-c102cb"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;