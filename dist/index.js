/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babylonjs-materials/babylonjs.materials.min.js":
/*!*********************************************************************!*\
  !*** ./node_modules/babylonjs-materials/babylonjs.materials.min.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js")):0}("undefined"!=typeof self?self:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:this,(function(e){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=19)}([function(t,i){t.exports=e},function(e,t,i){"use strict";i.d(t,"b",(function(){return r})),i.d(t,"a",(function(){return o}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(e,t)};function r(e,t){function i(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}function o(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a}Object.create;Object.create},function(e,t){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t,i){"use strict";i.r(t),i.d(t,"CellMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\n\nvec3 computeCustomDiffuseLighting(lightingInfo info,vec3 diffuseBase,float shadow)\n{\ndiffuseBase=info.diffuse*shadow;\n#ifdef CELLBASIC\nfloat level=1.0;\nif (info.ndl<0.5)\nlevel=0.5;\ndiffuseBase.rgb*vec3(level,level,level);\n#else\nfloat ToonThresholds[4];\nToonThresholds[0]=0.95;\nToonThresholds[1]=0.5;\nToonThresholds[2]=0.2;\nToonThresholds[3]=0.03;\nfloat ToonBrightnessLevels[5];\nToonBrightnessLevels[0]=1.0;\nToonBrightnessLevels[1]=0.8;\nToonBrightnessLevels[2]=0.6;\nToonBrightnessLevels[3]=0.35;\nToonBrightnessLevels[4]=0.2;\nif (info.ndl>ToonThresholds[0])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[0];\n}\nelse if (info.ndl>ToonThresholds[1])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[1];\n}\nelse if (info.ndl>ToonThresholds[2])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[2];\n}\nelse if (info.ndl>ToonThresholds[3])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[3];\n}\nelse\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[4];\n}\n#endif\nreturn max(diffuseBase,vec3(0.2));\n}\nvoid main(void)\n{\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\nlightingInfo info;\nvec3 diffuseBase=vec3(0.,0.,0.);\nfloat shadow=1.;\nfloat glossiness=0.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.cellPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.cellVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.POINTSIZE=!1,t.FOG=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.NDOTL=!0,t.CUSTOMUSERLIGHTING=!0,t.CELLBASIC=!0,t.DEPTHPREPASS=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.diffuseColor=new r.Color3(1,1,1),n._computeHighLevel=!1,n._disableLighting=!1,n._maxSimultaneousLights=4,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&(n._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled)){if(!this._diffuseTexture.isReady())return!1;n._needUVs=!0,n.DIFFUSE=!0}if(n.CELLBASIC=!this.computeHighLevel,r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f,this.maxSimultaneousLights),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],d=["diffuseSampler"],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("cell",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights-1}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this._maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._diffuseTexture&&t.push(this._diffuseTexture),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||this._diffuseTexture===t},t.prototype.dispose=function(t){this._diffuseTexture&&this._diffuseTexture.dispose(),e.prototype.dispose.call(this,t)},t.prototype.getClassName=function(){return"CellMaterial"},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.CellMaterial",e},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),Object(n.a)([Object(r.serializeAsColor3)("diffuse")],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serialize)("computeHighLevel")],t.prototype,"_computeHighLevel",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"computeHighLevel",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.CellMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"FireMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n\nuniform sampler2D distortionSampler;\nuniform sampler2D opacitySampler;\n#ifdef DIFFUSE\nvarying vec2 vDistortionCoords1;\nvarying vec2 vDistortionCoords2;\nvarying vec2 vDistortionCoords3;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvec4 bx2(vec4 x)\n{\nreturn vec4(2.0)*x-vec4(1.0);\n}\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\n\nfloat alpha=1.0;\n#ifdef DIFFUSE\n\nconst float distortionAmount0=0.092;\nconst float distortionAmount1=0.092;\nconst float distortionAmount2=0.092;\nvec2 heightAttenuation=vec2(0.3,0.39);\nvec4 noise0=texture2D(distortionSampler,vDistortionCoords1);\nvec4 noise1=texture2D(distortionSampler,vDistortionCoords2);\nvec4 noise2=texture2D(distortionSampler,vDistortionCoords3);\nvec4 noiseSum=bx2(noise0)*distortionAmount0+bx2(noise1)*distortionAmount1+bx2(noise2)*distortionAmount2;\nvec4 perturbedBaseCoords=vec4(vDiffuseUV,0.0,1.0)+noiseSum*(vDiffuseUV.y*heightAttenuation.x+heightAttenuation.y);\nvec4 opacityColor=texture2D(opacitySampler,perturbedBaseCoords.xy);\n#ifdef ALPHATEST\nif (opacityColor.r<0.1)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor=texture2D(diffuseSampler,perturbedBaseCoords.xy)*2.0;\nbaseColor*=opacityColor;\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(1.0,1.0,1.0);\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n\nvec4 color=vec4(baseColor.rgb,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.firePixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n\nuniform float time;\nuniform float speed;\n#ifdef DIFFUSE\nvarying vec2 vDistortionCoords1;\nvarying vec2 vDistortionCoords2;\nvarying vec2 vDistortionCoords3;\n#endif\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n\n#ifdef DIFFUSE\nvDiffuseUV=uv;\nvDiffuseUV.y-=0.2;\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n#ifdef DIFFUSE\n\nvec3 layerSpeed=vec3(-0.2,-0.52,-0.1)*speed;\nvDistortionCoords1.x=uv.x;\nvDistortionCoords1.y=uv.y+layerSpeed.x*time/1000.0;\nvDistortionCoords2.x=uv.x;\nvDistortionCoords2.y=uv.y+layerSpeed.y*time/1000.0;\nvDistortionCoords3.x=uv.x;\nvDistortionCoords3.y=uv.y+layerSpeed.z*time/1000.0;\n#endif\n}\n";r.Effect.ShadersStore.fireVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.UV1=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.BonesPerMesh=0,t.NUM_BONE_INFLUENCERS=0,t.INSTANCES=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.diffuseColor=new r.Color3(1,1,1),n.speed=1,n._scaledDiffuse=new r.Color3,n._lastTime=0,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return!1},t.prototype.needAlphaTesting=function(){return!0},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&(n._needUVs=!1,this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled)){if(!this._diffuseTexture.isReady())return!1;n._needUVs=!0,n.DIFFUSE=!0}if(n.ALPHATEST=!!this._opacityTexture,n._areMiscDirty&&(n.POINTSIZE=this.pointsCloud||o.forcePointsCloud,n.FOG=o.fogEnabled&&e.applyFog&&o.fogMode!==r.Scene.FOGMODE_NONE&&this.fogEnabled),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!1,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.UV1&&l.push(r.VertexBuffer.UVKind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString();t.setEffect(o.getEngine().createEffect("fire",{attributes:l,uniformsNames:["world","view","viewProjection","vEyePosition","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","time","speed"],uniformBuffersNames:[],samplers:["diffuseSampler","distortionSampler","opacitySampler"],defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:null,maxSimultaneousLights:4,transformFeedbackVaryings:null},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene();if(i._materialDefines){var o=i.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,o)&&(this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix()),this._activeEffect.setTexture("distortionSampler",this._distortionTexture),this._activeEffect.setTexture("opacitySampler",this._opacityTexture)),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(o,n)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*t.visibility),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._lastTime+=n.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime),this._activeEffect.setFloat("speed",this.speed),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),this._distortionTexture&&this._distortionTexture.animations&&this._distortionTexture.animations.length>0&&e.push(this._distortionTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._diffuseTexture&&t.push(this._diffuseTexture),this._distortionTexture&&t.push(this._distortionTexture),this._opacityTexture&&t.push(this._opacityTexture),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||(this._diffuseTexture===t||(this._distortionTexture===t||this._opacityTexture===t))},t.prototype.getClassName=function(){return"FireMaterial"},t.prototype.dispose=function(t){this._diffuseTexture&&this._diffuseTexture.dispose(),this._distortionTexture&&this._distortionTexture.dispose(),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var t=e.prototype.serialize.call(this);return t.customType="BABYLON.FireMaterial",t.diffuseColor=this.diffuseColor.asArray(),t.speed=this.speed,this._diffuseTexture&&(t._diffuseTexture=this._diffuseTexture.serialize()),this._distortionTexture&&(t._distortionTexture=this._distortionTexture.serialize()),this._opacityTexture&&(t._opacityTexture=this._opacityTexture.serialize()),t},t.Parse=function(e,i,n){var o=new t(e.name,i);return o.diffuseColor=r.Color3.FromArray(e.diffuseColor),o.speed=e.speed,o.alpha=e.alpha,o.id=e.id,r.Tags.AddTagsTo(o,e.tags),o.backFaceCulling=e.backFaceCulling,o.wireframe=e.wireframe,e._diffuseTexture&&(o._diffuseTexture=r.Texture.Parse(e._diffuseTexture,i,n)),e._distortionTexture&&(o._distortionTexture=r.Texture.Parse(e._distortionTexture,i,n)),e._opacityTexture&&(o._opacityTexture=r.Texture.Parse(e._opacityTexture,i,n)),o},Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),Object(n.a)([Object(r.serializeAsTexture)("distortionTexture")],t.prototype,"_distortionTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"distortionTexture",void 0),Object(n.a)([Object(r.serializeAsTexture)("opacityTexture")],t.prototype,"_opacityTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"opacityTexture",void 0),Object(n.a)([Object(r.serializeAsColor3)("diffuse")],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"speed",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.FireMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"FurMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nuniform vec4 furColor;\nuniform float furLength;\nvarying vec3 vPositionW;\nvarying float vfur_length;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n\n#ifdef HIGHLEVEL\nuniform float furOffset;\nuniform float furOcclusion;\nuniform sampler2D furTexture;\nvarying vec2 vFurUV;\n#endif\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<fogFragmentDeclaration>\n#include<clipPlaneFragmentDeclaration>\nfloat Rand(vec3 rv) {\nfloat x=dot(rv,vec3(12.9898,78.233,24.65487));\nreturn fract(sin(x)*43758.5453);\n}\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=furColor;\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor*=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef HIGHLEVEL\n\nvec4 furTextureColor=texture2D(furTexture,vec2(vFurUV.x,vFurUV.y));\nif (furTextureColor.a<=0.0 || furTextureColor.g<furOffset) {\ndiscard;\n}\nfloat occlusion=mix(0.0,furTextureColor.b*1.2,furOffset);\nbaseColor=vec4(baseColor.xyz*max(occlusion,furOcclusion),1.1-furOffset);\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase.rgb*baseColor.rgb,0.0,1.0);\n\n#ifdef HIGHLEVEL\nvec4 color=vec4(finalDiffuse,alpha);\n#else\nfloat r=vfur_length/furLength*0.5;\nvec4 color=vec4(finalDiffuse*(0.5+r),alpha);\n#endif\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.furPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\nattribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\nuniform float furLength;\nuniform float furAngle;\n#ifdef HIGHLEVEL\nuniform float furOffset;\nuniform vec3 furGravity;\nuniform float furTime;\nuniform float furSpacing;\nuniform float furDensity;\n#endif\n#ifdef HEIGHTMAP\nuniform sampler2D heightTexture;\n#endif\n#ifdef HIGHLEVEL\nvarying vec2 vFurUV;\n#endif\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\nvarying float vfur_length;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nfloat Rand(vec3 rv) {\nfloat x=dot(rv,vec3(12.9898,78.233,24.65487));\nreturn fract(sin(x)*43758.5453);\n}\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\n\nfloat r=Rand(position);\n#ifdef HEIGHTMAP\n#if __VERSION__>100\nvfur_length=furLength*texture(heightTexture,uv).x;\n#else\nvfur_length=furLength*texture2D(heightTexture,uv).r;\n#endif\n#else\nvfur_length=(furLength*r);\n#endif\nvec3 tangent1=vec3(normal.y,-normal.x,0);\nvec3 tangent2=vec3(-normal.z,0,normal.x);\nr=Rand(tangent1*r);\nfloat J=(2.0+4.0*r);\nr=Rand(tangent2*r);\nfloat K=(2.0+2.0*r);\ntangent1=tangent1*J+tangent2*K;\ntangent1=normalize(tangent1);\nvec3 newPosition=position+normal*vfur_length*cos(furAngle)+tangent1*vfur_length*sin(furAngle);\n#ifdef HIGHLEVEL\n\nvec3 forceDirection=vec3(0.0,0.0,0.0);\nforceDirection.x=sin(furTime+position.x*0.05)*0.2;\nforceDirection.y=cos(furTime*0.7+position.y*0.04)*0.2;\nforceDirection.z=sin(furTime*0.7+position.z*0.04)*0.2;\nvec3 displacement=vec3(0.0,0.0,0.0);\ndisplacement=furGravity+forceDirection;\nfloat displacementFactor=pow(furOffset,3.0);\nvec3 aNormal=normal;\naNormal.xyz+=displacement*displacementFactor;\nnewPosition=vec3(newPosition.x,newPosition.y,newPosition.z)+(normalize(aNormal)*furOffset*furSpacing);\n#endif\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\ngl_Position=viewProjection*finalWorld*vec4(newPosition,1.0);\nvec4 worldPos=finalWorld*vec4(newPosition,1.0);\nvPositionW=vec3(worldPos);\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#ifdef HIGHLEVEL\nvFurUV=vDiffuseUV*furDensity;\n#endif\n#else\n#ifdef HIGHLEVEL\nvFurUV=uv*furDensity;\n#endif\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.furVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.HEIGHTMAP=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.HIGHLEVEL=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.diffuseColor=new r.Color3(1,1,1),n.furLength=1,n.furAngle=0,n.furColor=new r.Color3(.44,.21,.02),n.furOffset=0,n.furSpacing=12,n.furGravity=new r.Vector3(0,0,0),n.furSpeed=100,n.furDensity=20,n.furOcclusion=0,n._disableLighting=!1,n._maxSimultaneousLights=4,n.highLevelFur=!0,n._furTime=0,n}return Object(n.b)(t,e),Object.defineProperty(t.prototype,"furTime",{get:function(){return this._furTime},set:function(e){this._furTime=e},enumerable:!1,configurable:!0}),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.updateFur=function(){for(var e=1;e<this._meshes.length;e++){var t=this._meshes[e].material;t.furLength=this.furLength,t.furAngle=this.furAngle,t.furGravity=this.furGravity,t.furSpacing=this.furSpacing,t.furSpeed=this.furSpeed,t.furColor=this.furColor,t.diffuseTexture=this.diffuseTexture,t.furTexture=this.furTexture,t.highLevelFur=this.highLevelFur,t.furTime=this.furTime,t.furDensity=this.furDensity}},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&o.texturesEnabled){if(this.diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled){if(!this.diffuseTexture.isReady())return!1;n._needUVs=!0,n.DIFFUSE=!0}if(this.heightTexture&&a.getCaps().maxVertexTextureImageUnits){if(!this.heightTexture.isReady())return!1;n._needUVs=!0,n.HEIGHTMAP=!0}}if(this.highLevelFur!==n.HIGHLEVEL&&(n.HIGHLEVEL=!0,n.markAsUnprocessed()),r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f,this.maxSimultaneousLights),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","furLength","furAngle","furColor","furOffset","furGravity","furTime","furSpacing","furDensity","furOcclusion"],d=["diffuseSampler","heightTexture","furTexture"],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("fur",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),n.getCachedMaterial()!==this&&(this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),this._heightTexture&&this._activeEffect.setTexture("heightTexture",this._heightTexture),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this.maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._activeEffect.setFloat("furLength",this.furLength),this._activeEffect.setFloat("furAngle",this.furAngle),this._activeEffect.setColor4("furColor",this.furColor,1),this.highLevelFur&&(this._activeEffect.setVector3("furGravity",this.furGravity),this._activeEffect.setFloat("furOffset",this.furOffset),this._activeEffect.setFloat("furSpacing",this.furSpacing),this._activeEffect.setFloat("furDensity",this.furDensity),this._activeEffect.setFloat("furOcclusion",this.furOcclusion),this._furTime+=this.getScene().getEngine().getDeltaTime()/this.furSpeed,this._activeEffect.setFloat("furTime",this._furTime),this._activeEffect.setTexture("furTexture",this.furTexture)),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.heightTexture&&this.heightTexture.animations&&this.heightTexture.animations.length>0&&e.push(this.heightTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._diffuseTexture&&t.push(this._diffuseTexture),this._heightTexture&&t.push(this._heightTexture),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||(this.diffuseTexture===t||this._heightTexture===t)},t.prototype.dispose=function(t){if(this.diffuseTexture&&this.diffuseTexture.dispose(),this._meshes)for(var i=1;i<this._meshes.length;i++){var n=this._meshes[i].material;n&&n.dispose(t),this._meshes[i].dispose()}e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.FurMaterial",this._meshes&&(e.sourceMeshName=this._meshes[0].name,e.quality=this._meshes.length),e},t.prototype.getClassName=function(){return"FurMaterial"},t.Parse=function(e,i,n){var o=r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n);return e.sourceMeshName&&o.highLevelFur&&i.executeWhenReady((function(){var n=i.getMeshByName(e.sourceMeshName);if(n){var r=t.GenerateTexture("Fur Texture",i);o.furTexture=r,t.FurifyMesh(n,e.quality)}})),o},t.GenerateTexture=function(e,t){for(var i=new r.DynamicTexture("FurTexture "+e,256,t,!0),n=i.getContext(),o=0;o<2e4;++o)n.fillStyle="rgba(255, "+Math.floor(255*Math.random())+", "+Math.floor(255*Math.random())+", 1)",n.fillRect(Math.random()*i.getSize().width,Math.random()*i.getSize().height,2,2);return i.update(!1),i.wrapU=r.Texture.WRAP_ADDRESSMODE,i.wrapV=r.Texture.WRAP_ADDRESSMODE,i},t.FurifyMesh=function(e,i){var n,o=[e],a=e.material;if(!(a instanceof t))throw"The material of the source mesh must be a Fur Material";for(n=1;n<i;n++){var s=new t(a.name+n,e.getScene());e.getScene().materials.pop(),r.Tags.EnableFor(s),r.Tags.AddTagsTo(s,"furShellMaterial"),s.furLength=a.furLength,s.furAngle=a.furAngle,s.furGravity=a.furGravity,s.furSpacing=a.furSpacing,s.furSpeed=a.furSpeed,s.furColor=a.furColor,s.diffuseTexture=a.diffuseTexture,s.furOffset=n/i,s.furTexture=a.furTexture,s.highLevelFur=a.highLevelFur,s.furTime=a.furTime,s.furDensity=a.furDensity;var f=e.clone(e.name+n);f.material=s,f.skeleton=e.skeleton,f.position=r.Vector3.Zero(),o.push(f)}for(n=1;n<o.length;n++)o[n].parent=e;return e.material._meshes=o,o},Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),Object(n.a)([Object(r.serializeAsTexture)("heightTexture")],t.prototype,"_heightTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"heightTexture",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furLength",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furAngle",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"furColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furOffset",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furSpacing",void 0),Object(n.a)([Object(r.serializeAsVector3)()],t.prototype,"furGravity",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furSpeed",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furDensity",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furOcclusion",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"highLevelFur",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"furTime",null),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.FurMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"GradientMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\n\nuniform vec4 topColor;\nuniform vec4 bottomColor;\nuniform float offset;\nuniform float scale;\nuniform float smoothness;\n\nvarying vec3 vPositionW;\nvarying vec3 vPosition;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0]\n#include<__decl__lightFragment>[1]\n#include<__decl__lightFragment>[2]\n#include<__decl__lightFragment>[3]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\nfloat h=vPosition.y*scale+offset;\nfloat mysmoothness=clamp(smoothness,0.01,max(smoothness,10.));\nvec4 baseColor=mix(bottomColor,topColor,max(pow(max(h,0.0),mysmoothness),0.0));\n\nvec3 diffuseColor=baseColor.rgb;\n\nfloat alpha=baseColor.a;\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\n#ifdef EMISSIVE\nvec3 diffuseBase=baseColor.rgb;\n#else\nvec3 diffuseBase=vec3(0.,0.,0.);\n#endif\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";r.Effect.ShadersStore.gradientPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\nvarying vec3 vPosition;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\nvPosition=position;\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.gradientVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.EMISSIVE=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n._maxSimultaneousLights=4,n.topColor=new r.Color3(1,0,0),n.topColorAlpha=1,n.bottomColor=new r.Color3(0,0,1),n.bottomColorAlpha=1,n.offset=0,n.scale=1,n.smoothness=1,n._disableLighting=!1,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1||this.topColorAlpha<1||this.bottomColorAlpha<1},t.prototype.needAlphaTesting=function(){return!0},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),n.EMISSIVE=this._disableLighting,r.MaterialHelper.PrepareDefinesForAttributes(e,n,!1,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","topColor","bottomColor","offset","smoothness","scale"],d=[],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:4}),t.setEffect(o.getEngine().createEffect("gradient",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,a),this._mustRebind(n,a)&&(r.MaterialHelper.BindClipPlane(a,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this.maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._activeEffect.setColor4("topColor",this.topColor,this.topColorAlpha),this._activeEffect.setColor4("bottomColor",this.bottomColor,this.bottomColorAlpha),this._activeEffect.setFloat("offset",this.offset),this._activeEffect.setFloat("scale",this.scale),this._activeEffect.setFloat("smoothness",this.smoothness),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){return[]},t.prototype.dispose=function(t){e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.GradientMaterial",e},t.prototype.getClassName=function(){return"GradientMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"topColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"topColorAlpha",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"bottomColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"bottomColorAlpha",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"offset",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"scale",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"smoothness",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.GradientMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"GridMaterial",(function(){return f}));var n=i(1),r=i(0),o="#extension GL_OES_standard_derivatives : enable\n#define SQRT2 1.41421356\n#define PI 3.14159\nprecision highp float;\nuniform vec3 mainColor;\nuniform vec3 lineColor;\nuniform vec4 gridControl;\nuniform vec3 gridOffset;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n#include<fogFragmentDeclaration>\n\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform sampler2D opacitySampler;\nuniform vec2 vOpacityInfos;\n#endif\nfloat getVisibility(float position) {\n\nfloat majorGridFrequency=gridControl.y;\nif (floor(position+0.5) == floor(position/majorGridFrequency+0.5)*majorGridFrequency)\n{\nreturn 1.0;\n}\nreturn gridControl.z;\n}\nfloat getAnisotropicAttenuation(float differentialLength) {\nconst float maxNumberOfLines=10.0;\nreturn clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines,0.0,1.0);\n}\nfloat isPointOnLine(float position,float differentialLength) {\nfloat fractionPartOfPosition=position-floor(position+0.5);\nfractionPartOfPosition/=differentialLength;\nfractionPartOfPosition=clamp(fractionPartOfPosition,-1.,1.);\nfloat result=0.5+0.5*cos(fractionPartOfPosition*PI);\nreturn result;\n}\nfloat contributionOnAxis(float position) {\nfloat differentialLength=length(vec2(dFdx(position),dFdy(position)));\ndifferentialLength*=SQRT2;\n\nfloat result=isPointOnLine(position,differentialLength);\n\nfloat visibility=getVisibility(position);\nresult*=visibility;\n\nfloat anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);\nresult*=anisotropicAttenuation;\nreturn result;\n}\nfloat normalImpactOnAxis(float x) {\nfloat normalImpact=clamp(1.0-3.0*abs(x*x*x),0.0,1.0);\nreturn normalImpact;\n}\nvoid main(void) {\n\nfloat gridRatio=gridControl.x;\nvec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;\n\nfloat x=contributionOnAxis(gridPos.x);\nfloat y=contributionOnAxis(gridPos.y);\nfloat z=contributionOnAxis(gridPos.z);\n\nvec3 normal=normalize(vNormal);\nx*=normalImpactOnAxis(normal.x);\ny*=normalImpactOnAxis(normal.y);\nz*=normalImpactOnAxis(normal.z);\n\nfloat grid=clamp(x+y+z,0.,1.);\n\nvec3 color=mix(mainColor,lineColor,grid);\n#ifdef FOG\n#include<fogFragment>\n#endif\nfloat opacity=1.0;\n#ifdef TRANSPARENT\nopacity=clamp(grid,0.08,gridControl.w*grid);\n#endif\n#ifdef OPACITY\nopacity*=texture2D(opacitySampler,vOpacityUV).a;\n#endif\n\ngl_FragColor=vec4(color.rgb,opacity);\n#ifdef TRANSPARENT\n#ifdef PREMULTIPLYALPHA\ngl_FragColor.rgb*=opacity;\n#endif\n#else\n#endif\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.gridPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\nattribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#include<instancesDeclaration>\n\nuniform mat4 projection;\nuniform mat4 view;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n#include<fogVertexDeclaration>\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform mat4 opacityMatrix;\nuniform vec2 vOpacityInfos;\n#endif\nvoid main(void) {\n#include<instancesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\n#include<fogVertex>\nvec4 cameraSpacePosition=view*worldPos;\ngl_Position=projection*cameraSpacePosition;\n#ifdef OPACITY\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\nif (vOpacityInfos.x == 0.)\n{\nvOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\nvPosition=position;\nvNormal=normal;\n}";r.Effect.ShadersStore.gridVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.OPACITY=!1,t.TRANSPARENT=!1,t.FOG=!1,t.PREMULTIPLYALPHA=!1,t.UV1=!1,t.UV2=!1,t.INSTANCES=!1,t.THIN_INSTANCES=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.mainColor=r.Color3.Black(),n.lineColor=r.Color3.Teal(),n.gridRatio=1,n.gridOffset=r.Vector3.Zero(),n.majorUnitFrequency=10,n.minorUnitVisibility=.33,n.opacity=1,n.preMultiplyAlpha=!1,n._gridControl=new r.Vector4(n.gridRatio,n.majorUnitFrequency,n.minorUnitVisibility,n.opacity),n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.opacity<1||this._opacityTexture&&this._opacityTexture.isReady()},t.prototype.needAlphaBlendingForMesh=function(e){return this.needAlphaBlending()},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(n.TRANSPARENT!==this.opacity<1&&(n.TRANSPARENT=!n.TRANSPARENT,n.markAsUnprocessed()),n.PREMULTIPLYALPHA!=this.preMultiplyAlpha&&(n.PREMULTIPLYALPHA=!n.PREMULTIPLYALPHA,n.markAsUnprocessed()),n._areTexturesDirty&&(n._needUVs=!1,o.texturesEnabled&&this._opacityTexture&&r.MaterialFlags.OpacityTextureEnabled)){if(!this._opacityTexture.isReady())return!1;n._needUVs=!0,n.OPACITY=!0}if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,!1,this.fogEnabled,!1,n),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,o.getEngine(),n,!!i),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial(),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!1,!1);var a=[r.VertexBuffer.PositionKind,r.VertexBuffer.NormalKind];n.UV1&&a.push(r.VertexBuffer.UVKind),n.UV2&&a.push(r.VertexBuffer.UV2Kind),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess,r.MaterialHelper.PrepareAttributesForInstances(a,n);var f=n.toString();t.setEffect(o.getEngine().createEffect("grid",a,["projection","mainColor","lineColor","gridControl","gridOffset","vFogInfos","vFogColor","world","view","opacityMatrix","vOpacityInfos"],["opacitySampler"],f,void 0,this.onCompiled,this.onError),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,o.INSTANCES&&!o.THIN_INSTANCE||this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("view",n.getViewMatrix()),this._activeEffect.setMatrix("projection",n.getProjectionMatrix()),this._mustRebind(n,a)&&(this._activeEffect.setColor3("mainColor",this.mainColor),this._activeEffect.setColor3("lineColor",this.lineColor),this._activeEffect.setVector3("gridOffset",this.gridOffset),this._gridControl.x=this.gridRatio,this._gridControl.y=Math.round(this.majorUnitFrequency),this._gridControl.z=this.minorUnitVisibility,this._gridControl.w=this.opacity,this._activeEffect.setVector4("gridControl",this._gridControl),this._opacityTexture&&r.MaterialFlags.OpacityTextureEnabled&&(this._activeEffect.setTexture("opacitySampler",this._opacityTexture),this._activeEffect.setFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),this._activeEffect.setMatrix("opacityMatrix",this._opacityTexture.getTextureMatrix()))),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}},t.prototype.dispose=function(t){e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.GridMaterial",e},t.prototype.getClassName=function(){return"GridMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"mainColor",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"lineColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"gridRatio",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"gridOffset",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"majorUnitFrequency",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"minorUnitVisibility",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"opacity",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"preMultiplyAlpha",void 0),Object(n.a)([Object(r.serializeAsTexture)("opacityTexture")],t.prototype,"_opacityTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"opacityTexture",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.GridMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"LavaMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n\nuniform float time;\nuniform float speed;\nuniform float movingSpeed;\nuniform vec3 fogColor;\nuniform sampler2D noiseTexture;\nuniform float fogDensity;\n\nvarying float noise;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0]\n#include<__decl__lightFragment>[1]\n#include<__decl__lightFragment>[2]\n#include<__decl__lightFragment>[3]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nfloat random( vec3 scale,float seed ){\nreturn fract( sin( dot( gl_FragCoord.xyz+seed,scale ) )*43758.5453+seed ) ;\n}\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\n\nvec4 noiseTex=texture2D( noiseTexture,vDiffuseUV );\nvec2 T1=vDiffuseUV+vec2( 1.5,-1.5 )*time*0.02;\nvec2 T2=vDiffuseUV+vec2( -0.5,2.0 )*time*0.01*speed;\nT1.x+=noiseTex.x*2.0;\nT1.y+=noiseTex.y*2.0;\nT2.x-=noiseTex.y*0.2+time*0.001*movingSpeed;\nT2.y+=noiseTex.z*0.2+time*0.002*movingSpeed;\nfloat p=texture2D( noiseTexture,T1*3.0 ).a;\nvec4 lavaColor=texture2D( diffuseSampler,T2*4.0);\nvec4 temp=lavaColor*( vec4( p,p,p,p )*2. )+( lavaColor*lavaColor-0.1 );\nbaseColor=temp;\nfloat depth=gl_FragCoord.z*4.0;\nconst float LOG2=1.442695;\nfloat fogFactor=exp2(-fogDensity*fogDensity*depth*depth*LOG2 );\nfogFactor=1.0-clamp( fogFactor,0.0,1.0 );\nbaseColor=mix( baseColor,vec4( fogColor,baseColor.w ),fogFactor );\ndiffuseColor=baseColor.rgb;\n\n\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef UNLIT\nvec3 diffuseBase=vec3(1.,1.,1.);\n#else\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0]\n#include<lightFragment>[1]\n#include<lightFragment>[2]\n#include<lightFragment>[3]\n#endif\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.lavaPixelShader=o;var a="precision highp float;\n\nuniform float time;\nuniform float lowFrequencySpeed;\n\nvarying float noise;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n\n\nvec3 mod289(vec3 x)\n{\nreturn x-floor(x*(1.0/289.0))*289.0;\n}\nvec4 mod289(vec4 x)\n{\nreturn x-floor(x*(1.0/289.0))*289.0;\n}\nvec4 permute(vec4 x)\n{\nreturn mod289(((x*34.0)+1.0)*x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\nreturn 1.79284291400159-0.85373472095314*r;\n}\nvec3 fade(vec3 t) {\nreturn t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat pnoise(vec3 P,vec3 rep)\n{\nvec3 Pi0=mod(floor(P),rep);\nvec3 Pi1=mod(Pi0+vec3(1.0),rep);\nPi0=mod289(Pi0);\nPi1=mod289(Pi1);\nvec3 Pf0=fract(P);\nvec3 Pf1=Pf0-vec3(1.0);\nvec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);\nvec4 iy=vec4(Pi0.yy,Pi1.yy);\nvec4 iz0=Pi0.zzzz;\nvec4 iz1=Pi1.zzzz;\nvec4 ixy=permute(permute(ix)+iy);\nvec4 ixy0=permute(ixy+iz0);\nvec4 ixy1=permute(ixy+iz1);\nvec4 gx0=ixy0*(1.0/7.0);\nvec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;\ngx0=fract(gx0);\nvec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);\nvec4 sz0=step(gz0,vec4(0.0));\ngx0-=sz0*(step(0.0,gx0)-0.5);\ngy0-=sz0*(step(0.0,gy0)-0.5);\nvec4 gx1=ixy1*(1.0/7.0);\nvec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;\ngx1=fract(gx1);\nvec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);\nvec4 sz1=step(gz1,vec4(0.0));\ngx1-=sz1*(step(0.0,gx1)-0.5);\ngy1-=sz1*(step(0.0,gy1)-0.5);\nvec3 g000=vec3(gx0.x,gy0.x,gz0.x);\nvec3 g100=vec3(gx0.y,gy0.y,gz0.y);\nvec3 g010=vec3(gx0.z,gy0.z,gz0.z);\nvec3 g110=vec3(gx0.w,gy0.w,gz0.w);\nvec3 g001=vec3(gx1.x,gy1.x,gz1.x);\nvec3 g101=vec3(gx1.y,gy1.y,gz1.y);\nvec3 g011=vec3(gx1.z,gy1.z,gz1.z);\nvec3 g111=vec3(gx1.w,gy1.w,gz1.w);\nvec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));\ng000*=norm0.x;\ng010*=norm0.y;\ng100*=norm0.z;\ng110*=norm0.w;\nvec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));\ng001*=norm1.x;\ng011*=norm1.y;\ng101*=norm1.z;\ng111*=norm1.w;\nfloat n000=dot(g000,Pf0);\nfloat n100=dot(g100,vec3(Pf1.x,Pf0.yz));\nfloat n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));\nfloat n110=dot(g110,vec3(Pf1.xy,Pf0.z));\nfloat n001=dot(g001,vec3(Pf0.xy,Pf1.z));\nfloat n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));\nfloat n011=dot(g011,vec3(Pf0.x,Pf1.yz));\nfloat n111=dot(g111,Pf1);\nvec3 fade_xyz=fade(Pf0);\nvec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);\nvec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);\nfloat n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);\nreturn 2.2*n_xyz;\n}\n\nfloat turbulence( vec3 p ) {\nfloat w=100.0;\nfloat t=-.5;\nfor (float f=1.0 ; f<=10.0 ; f++ ){\nfloat power=pow( 2.0,f );\nt+=abs( pnoise( vec3( power*p ),vec3( 10.0,10.0,10.0 ) )/power );\n}\nreturn t;\n}\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\n#ifdef NORMAL\n\nnoise=10.0*-.10*turbulence( .5*normal+time*1.15 );\n\nfloat b=lowFrequencySpeed*5.0*pnoise( 0.05*position +vec3(time*1.025),vec3( 100.0 ) );\n\nfloat displacement =-1.5*noise+b;\n\nvec3 newPosition=position+normal*displacement;\ngl_Position=viewProjection*finalWorld*vec4( newPosition,1.0 );\nvec4 worldPos=finalWorld*vec4(newPosition,1.0);\nvPositionW=vec3(worldPos);\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}";r.Effect.ShadersStore.lavaVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.LIGHT0=!1,t.LIGHT1=!1,t.LIGHT2=!1,t.LIGHT3=!1,t.SPOTLIGHT0=!1,t.SPOTLIGHT1=!1,t.SPOTLIGHT2=!1,t.SPOTLIGHT3=!1,t.HEMILIGHT0=!1,t.HEMILIGHT1=!1,t.HEMILIGHT2=!1,t.HEMILIGHT3=!1,t.DIRLIGHT0=!1,t.DIRLIGHT1=!1,t.DIRLIGHT2=!1,t.DIRLIGHT3=!1,t.POINTLIGHT0=!1,t.POINTLIGHT1=!1,t.POINTLIGHT2=!1,t.POINTLIGHT3=!1,t.SHADOW0=!1,t.SHADOW1=!1,t.SHADOW2=!1,t.SHADOW3=!1,t.SHADOWS=!1,t.SHADOWESM0=!1,t.SHADOWESM1=!1,t.SHADOWESM2=!1,t.SHADOWESM3=!1,t.SHADOWPOISSON0=!1,t.SHADOWPOISSON1=!1,t.SHADOWPOISSON2=!1,t.SHADOWPOISSON3=!1,t.SHADOWPCF0=!1,t.SHADOWPCF1=!1,t.SHADOWPCF2=!1,t.SHADOWPCF3=!1,t.SHADOWPCSS0=!1,t.SHADOWPCSS1=!1,t.SHADOWPCSS2=!1,t.SHADOWPCSS3=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.UNLIT=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.speed=1,n.movingSpeed=1,n.lowFrequencySpeed=1,n.fogDensity=.15,n._lastTime=0,n.diffuseColor=new r.Color3(1,1,1),n._disableLighting=!1,n._unlit=!1,n._maxSimultaneousLights=4,n._scaledDiffuse=new r.Color3,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&(n._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled)){if(!this._diffuseTexture.isReady())return!1;n._needUVs=!0,n.DIFFUSE=!0}if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=!0,r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","time","speed","movingSpeed","fogColor","fogDensity","lowFrequencySpeed"],d=["diffuseSampler","noiseTexture"],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("lava",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,o.UNLIT=this._unlit,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(this.diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),this.noiseTexture&&this._activeEffect.setTexture("noiseTexture",this.noiseTexture),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*t.visibility),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._lastTime+=n.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime*this.speed/1e3),this.fogColor||(this.fogColor=r.Color3.Black()),this._activeEffect.setColor3("fogColor",this.fogColor),this._activeEffect.setFloat("fogDensity",this.fogDensity),this._activeEffect.setFloat("lowFrequencySpeed",this.lowFrequencySpeed),this._activeEffect.setFloat("movingSpeed",this.movingSpeed),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.noiseTexture&&this.noiseTexture.animations&&this.noiseTexture.animations.length>0&&e.push(this.noiseTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._diffuseTexture&&t.push(this._diffuseTexture),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||this.diffuseTexture===t},t.prototype.dispose=function(t){this.diffuseTexture&&this.diffuseTexture.dispose(),this.noiseTexture&&this.noiseTexture.dispose(),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.LavaMaterial",e},t.prototype.getClassName=function(){return"LavaMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),Object(n.a)([Object(r.serializeAsTexture)()],t.prototype,"noiseTexture",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"fogColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"speed",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"movingSpeed",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"lowFrequencySpeed",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"fogDensity",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("unlit")],t.prototype,"_unlit",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"unlit",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.LavaMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"MixMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform sampler2D mixMap1Sampler;\nuniform vec2 vTextureInfos;\n#ifdef MIXMAP2\nuniform sampler2D mixMap2Sampler;\n#endif\nuniform sampler2D diffuse1Sampler;\nuniform sampler2D diffuse2Sampler;\nuniform sampler2D diffuse3Sampler;\nuniform sampler2D diffuse4Sampler;\nuniform vec2 diffuse1Infos;\nuniform vec2 diffuse2Infos;\nuniform vec2 diffuse3Infos;\nuniform vec2 diffuse4Infos;\n#ifdef MIXMAP2\nuniform sampler2D diffuse5Sampler;\nuniform sampler2D diffuse6Sampler;\nuniform sampler2D diffuse7Sampler;\nuniform sampler2D diffuse8Sampler;\nuniform vec2 diffuse5Infos;\nuniform vec2 diffuse6Infos;\nuniform vec2 diffuse7Infos;\nuniform vec2 diffuse8Infos;\n#endif\n#endif\n\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 finalMixColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n#ifdef MIXMAP2\nvec4 mixColor2=vec4(1.,1.,1.,1.);\n#endif\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef DIFFUSE\nvec4 mixColor=texture2D(mixMap1Sampler,vTextureUV);\n#include<depthPrePass>\nmixColor.rgb*=vTextureInfos.y;\nvec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);\nvec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);\nvec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);\nvec4 diffuse4Color=texture2D(diffuse4Sampler,vTextureUV*diffuse4Infos);\ndiffuse1Color.rgb*=mixColor.r;\ndiffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,mixColor.g);\ndiffuse3Color.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,mixColor.b);\nfinalMixColor.rgb=mix(diffuse3Color.rgb,diffuse4Color.rgb,1.0-mixColor.a);\n#ifdef MIXMAP2\nmixColor=texture2D(mixMap2Sampler,vTextureUV);\nmixColor.rgb*=vTextureInfos.y;\nvec4 diffuse5Color=texture2D(diffuse5Sampler,vTextureUV*diffuse5Infos);\nvec4 diffuse6Color=texture2D(diffuse6Sampler,vTextureUV*diffuse6Infos);\nvec4 diffuse7Color=texture2D(diffuse7Sampler,vTextureUV*diffuse7Infos);\nvec4 diffuse8Color=texture2D(diffuse8Sampler,vTextureUV*diffuse8Infos);\ndiffuse5Color.rgb=mix(finalMixColor.rgb,diffuse5Color.rgb,mixColor.r);\ndiffuse6Color.rgb=mix(diffuse5Color.rgb,diffuse6Color.rgb,mixColor.g);\ndiffuse7Color.rgb=mix(diffuse6Color.rgb,diffuse7Color.rgb,mixColor.b);\nfinalMixColor.rgb=mix(diffuse7Color.rgb,diffuse8Color.rgb,1.0-mixColor.a);\n#endif\n#endif\n#ifdef VERTEXCOLOR\nfinalMixColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor*finalMixColor.rgb,0.0,1.0);\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";r.Effect.ShadersStore.mixPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform mat4 textureMatrix;\nuniform vec2 vTextureInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vTextureInfos.x == 0.)\n{\nvTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.mixVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.SPECULARTERM=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.MIXMAP2=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.diffuseColor=new r.Color3(1,1,1),n.specularColor=new r.Color3(0,0,0),n.specularPower=64,n._disableLighting=!1,n._maxSimultaneousLights=4,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(o.texturesEnabled){if(!this._mixTexture1||!this._mixTexture1.isReady())return!1;if(n._needUVs=!0,r.MaterialFlags.DiffuseTextureEnabled){if(!this._diffuseTexture1||!this._diffuseTexture1.isReady())return!1;if(n.DIFFUSE=!0,!this._diffuseTexture2||!this._diffuseTexture2.isReady())return!1;if(!this._diffuseTexture3||!this._diffuseTexture3.isReady())return!1;if(!this._diffuseTexture4||!this._diffuseTexture4.isReady())return!1;if(this._mixTexture2){if(!this._mixTexture2.isReady())return!1;if(n.MIXMAP2=!0,!this._diffuseTexture5||!this._diffuseTexture5.isReady())return!1;if(!this._diffuseTexture6||!this._diffuseTexture6.isReady())return!1;if(!this._diffuseTexture7||!this._diffuseTexture7.isReady())return!1;if(!this._diffuseTexture8||!this._diffuseTexture8.isReady())return!1}}}if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f,this.maxSimultaneousLights),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos","diffuse4Infos","diffuse5Infos","diffuse6Infos","diffuse7Infos","diffuse8Infos"],d=["mixMap1Sampler","mixMap2Sampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","diffuse4Sampler","diffuse5Sampler","diffuse6Sampler","diffuse7Sampler","diffuse8Sampler"],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("mix",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(this._mixTexture1&&(this._activeEffect.setTexture("mixMap1Sampler",this._mixTexture1),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture1.coordinatesIndex,this._mixTexture1.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture1.getTextureMatrix()),r.MaterialFlags.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale)),this._diffuseTexture4&&(this._activeEffect.setTexture("diffuse4Sampler",this._diffuseTexture4),this._activeEffect.setFloat2("diffuse4Infos",this._diffuseTexture4.uScale,this._diffuseTexture4.vScale)))),this._mixTexture2&&(this._activeEffect.setTexture("mixMap2Sampler",this._mixTexture2),r.MaterialFlags.DiffuseTextureEnabled&&(this._diffuseTexture5&&(this._activeEffect.setTexture("diffuse5Sampler",this._diffuseTexture5),this._activeEffect.setFloat2("diffuse5Infos",this._diffuseTexture5.uScale,this._diffuseTexture5.vScale)),this._diffuseTexture6&&(this._activeEffect.setTexture("diffuse6Sampler",this._diffuseTexture6),this._activeEffect.setFloat2("diffuse6Infos",this._diffuseTexture6.uScale,this._diffuseTexture6.vScale)),this._diffuseTexture7&&(this._activeEffect.setTexture("diffuse7Sampler",this._diffuseTexture7),this._activeEffect.setFloat2("diffuse7Infos",this._diffuseTexture7.uScale,this._diffuseTexture7.vScale)),this._diffuseTexture8&&(this._activeEffect.setTexture("diffuse8Sampler",this._diffuseTexture8),this._activeEffect.setFloat2("diffuse8Infos",this._diffuseTexture8.uScale,this._diffuseTexture8.vScale)))),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this.maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._mixTexture1&&this._mixTexture1.animations&&this._mixTexture1.animations.length>0&&e.push(this._mixTexture1),this._mixTexture2&&this._mixTexture2.animations&&this._mixTexture2.animations.length>0&&e.push(this._mixTexture2),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._mixTexture1&&t.push(this._mixTexture1),this._diffuseTexture1&&t.push(this._diffuseTexture1),this._diffuseTexture2&&t.push(this._diffuseTexture2),this._diffuseTexture3&&t.push(this._diffuseTexture3),this._diffuseTexture4&&t.push(this._diffuseTexture4),this._mixTexture2&&t.push(this._mixTexture2),this._diffuseTexture5&&t.push(this._diffuseTexture5),this._diffuseTexture6&&t.push(this._diffuseTexture6),this._diffuseTexture7&&t.push(this._diffuseTexture7),this._diffuseTexture8&&t.push(this._diffuseTexture8),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||(this._mixTexture1===t||(this._diffuseTexture1===t||(this._diffuseTexture2===t||(this._diffuseTexture3===t||(this._diffuseTexture4===t||(this._mixTexture2===t||(this._diffuseTexture5===t||(this._diffuseTexture6===t||(this._diffuseTexture7===t||this._diffuseTexture8===t)))))))))},t.prototype.dispose=function(t){this._mixTexture1&&this._mixTexture1.dispose(),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.MixMaterial",e},t.prototype.getClassName=function(){return"MixMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsTexture)("mixTexture1")],t.prototype,"_mixTexture1",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"mixTexture1",void 0),Object(n.a)([Object(r.serializeAsTexture)("mixTexture2")],t.prototype,"_mixTexture2",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"mixTexture2",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture1")],t.prototype,"_diffuseTexture1",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture1",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture2")],t.prototype,"_diffuseTexture2",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture2",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture3")],t.prototype,"_diffuseTexture3",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture3",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture4")],t.prototype,"_diffuseTexture4",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture4",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture1")],t.prototype,"_diffuseTexture5",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture5",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture2")],t.prototype,"_diffuseTexture6",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture6",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture3")],t.prototype,"_diffuseTexture7",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture7",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture4")],t.prototype,"_diffuseTexture8",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture8",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"specularColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"specularPower",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.MixMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"NormalMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef LIGHTING\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0]\n#include<__decl__lightFragment>[1]\n#include<__decl__lightFragment>[2]\n#include<__decl__lightFragment>[3]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#endif\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef NORMAL\nbaseColor=mix(baseColor,vec4(vNormalW,1.0),0.5);\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\n#ifdef LIGHTING\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0]\n#include<lightFragment>[1]\n#include<lightFragment>[2]\n#include<lightFragment>[3]\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n#else\nvec3 finalDiffuse=baseColor.rgb;\n#endif\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.normalPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.normalVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.LIGHT0=!1,t.LIGHT1=!1,t.LIGHT2=!1,t.LIGHT3=!1,t.SPOTLIGHT0=!1,t.SPOTLIGHT1=!1,t.SPOTLIGHT2=!1,t.SPOTLIGHT3=!1,t.HEMILIGHT0=!1,t.HEMILIGHT1=!1,t.HEMILIGHT2=!1,t.HEMILIGHT3=!1,t.DIRLIGHT0=!1,t.DIRLIGHT1=!1,t.DIRLIGHT2=!1,t.DIRLIGHT3=!1,t.POINTLIGHT0=!1,t.POINTLIGHT1=!1,t.POINTLIGHT2=!1,t.POINTLIGHT3=!1,t.SHADOW0=!1,t.SHADOW1=!1,t.SHADOW2=!1,t.SHADOW3=!1,t.SHADOWS=!1,t.SHADOWESM0=!1,t.SHADOWESM1=!1,t.SHADOWESM2=!1,t.SHADOWESM3=!1,t.SHADOWPOISSON0=!1,t.SHADOWPOISSON1=!1,t.SHADOWPOISSON2=!1,t.SHADOWPOISSON3=!1,t.SHADOWPCF0=!1,t.SHADOWPCF1=!1,t.SHADOWPCF2=!1,t.SHADOWPCF3=!1,t.SHADOWPCSS0=!1,t.SHADOWPCSS1=!1,t.SHADOWPCSS2=!1,t.SHADOWPCSS3=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.LIGHTING=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.diffuseColor=new r.Color3(1,1,1),n._disableLighting=!1,n._maxSimultaneousLights=4,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaBlendingForMesh=function(e){return this.needAlphaBlending()||e.visibility<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&(n._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled)){if(!this._diffuseTexture.isReady())return!1;n._needUVs=!0,n.DIFFUSE=!0}if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=!0,r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),n.LIGHTING=!this._disableLighting,r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],d=["diffuseSampler"],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:4}),t.setEffect(o.getEngine().createEffect("normal",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(this.diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._diffuseTexture&&t.push(this._diffuseTexture),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||this.diffuseTexture===t},t.prototype.dispose=function(t){this.diffuseTexture&&this.diffuseTexture.dispose(),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.NormalMaterial",e},t.prototype.getClassName=function(){return"NormalMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.NormalMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"ShadowOnlyMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform float alpha;\nuniform vec3 shadowColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0..1]\n\nvec4 color=vec4(shadowColor,(1.0-clamp(shadow,0.,1.))*alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.shadowOnlyPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.shadowOnlyVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.POINTSIZE=!1,t.FOG=!1,t.NORMAL=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n._needAlphaBlending=!0,n.shadowColor=r.Color3.Black(),n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this._needAlphaBlending},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},Object.defineProperty(t.prototype,"activeLight",{get:function(){return this._activeLight},set:function(e){this._activeLight=e},enumerable:!1,configurable:!0}),t.prototype._getFirstShadowLightForMesh=function(e){for(var t=0,i=e.lightSources;t<i.length;t++){var n=i[t];if(n.shadowEnabled)return n}return null},t.prototype.isReadyForSubMesh=function(e,t,i){var n;if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var o=t._materialDefines,a=this.getScene();if(this._isReadyForSubMesh(t))return!0;var f=a.getEngine();if(this._activeLight)for(var l=0,u=e.lightSources;l<u.length;l++){var c=u[l];if(c.shadowEnabled){if(this._activeLight===c)break;var d=e.lightSources.indexOf(this._activeLight);-1!==d&&(e.lightSources.splice(d,1),e.lightSources.splice(0,0,this._activeLight));break}}r.MaterialHelper.PrepareDefinesForFrameBoundValues(a,f,o,!!i),r.MaterialHelper.PrepareDefinesForMisc(e,a,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),o),o._needNormals=r.MaterialHelper.PrepareDefinesForLights(a,e,o,!1,1);var p=null===(n=this._getFirstShadowLightForMesh(e))||void 0===n?void 0:n.getShadowGenerator();if(this._needAlphaBlending=!0,p&&p.getClassName&&"CascadedShadowGenerator"===p.getClassName()){var h=p;this._needAlphaBlending=!h.autoCalcDepthBounds}if(r.MaterialHelper.PrepareDefinesForAttributes(e,o,!1,!0),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();var v=new r.EffectFallbacks;o.FOG&&v.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,v,1),o.NUM_BONE_INFLUENCERS>0&&v.addCPUSkinningFallback(0,e),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;var m=[r.VertexBuffer.PositionKind];o.NORMAL&&m.push(r.VertexBuffer.NormalKind),r.MaterialHelper.PrepareAttributesForBones(m,e,o,v),r.MaterialHelper.PrepareAttributesForInstances(m,o);var g=o.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","alpha","shadowColor","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6"],T=new Array,_=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:T,defines:o,maxSimultaneousLights:1}),t.setEffect(a.getEngine().createEffect("shadowOnly",{attributes:m,uniformsNames:x,uniformBuffersNames:_,samplers:T,defines:g,fallbacks:v,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:1}},f),o)}return!(!t.effect||!t.effect.isReady())&&(o._renderId=a.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;if(a){if(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._activeEffect.setFloat("alpha",this.alpha),this._activeEffect.setColor3("shadowColor",this.shadowColor),r.MaterialHelper.BindEyePosition(a,n)),n.lightsEnabled){r.MaterialHelper.BindLights(n,t,this._activeEffect,o,1);var s=this._getFirstShadowLightForMesh(t);s&&(s._renderId=-1)}(n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE||o.SHADOWCSM0)&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect)}}},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.ShadowOnlyMaterial",e},t.prototype.getClassName=function(){return"ShadowOnlyMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.ShadowOnlyMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"SimpleMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";r.Effect.ShadersStore.simplePixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.simpleVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.diffuseColor=new r.Color3(1,1,1),n._disableLighting=!1,n._maxSimultaneousLights=4,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&(n._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled)){if(!this._diffuseTexture.isReady())return!1;n._needUVs=!0,n.DIFFUSE=!0}if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f,this.maxSimultaneousLights),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],d=["diffuseSampler"],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("simple",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights-1}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(this._diffuseTexture&&r.MaterialFlags.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this.maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._diffuseTexture&&t.push(this._diffuseTexture),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||this.diffuseTexture===t},t.prototype.dispose=function(t){this._diffuseTexture&&this._diffuseTexture.dispose(),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.SimpleMaterial",e},t.prototype.getClassName=function(){return"SimpleMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),Object(n.a)([Object(r.serializeAsColor3)("diffuse")],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.SimpleMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"SkyMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\nuniform vec3 cameraPosition;\nuniform vec3 cameraOffset;\nuniform float luminance;\nuniform float turbidity;\nuniform float rayleigh;\nuniform float mieCoefficient;\nuniform float mieDirectionalG;\nuniform vec3 sunPosition;\n\n#include<fogFragmentDeclaration>\n\nconst float e=2.71828182845904523536028747135266249775724709369995957;\nconst float pi=3.141592653589793238462643383279502884197169;\nconst float n=1.0003;\nconst float N=2.545E25;\nconst float pn=0.035;\nconst vec3 lambda=vec3(680E-9,550E-9,450E-9);\nconst vec3 K=vec3(0.686,0.678,0.666);\nconst float v=4.0;\nconst float rayleighZenithLength=8.4E3;\nconst float mieZenithLength=1.25E3;\nconst vec3 up=vec3(0.0,1.0,0.0);\nconst float EE=1000.0;\nconst float sunAngularDiameterCos=0.999956676946448443553574619906976478926848692873900859324;\nconst float cutoffAngle=pi/1.95;\nconst float steepness=1.5;\nvec3 totalRayleigh(vec3 lambda)\n{\nreturn (8.0*pow(pi,3.0)*pow(pow(n,2.0)-1.0,2.0)*(6.0+3.0*pn))/(3.0*N*pow(lambda,vec3(4.0))*(6.0-7.0*pn));\n}\nvec3 simplifiedRayleigh()\n{\nreturn 0.0005/vec3(94,40,18);\n}\nfloat rayleighPhase(float cosTheta)\n{\nreturn (3.0/(16.0*pi))*(1.0+pow(cosTheta,2.0));\n}\nvec3 totalMie(vec3 lambda,vec3 K,float T)\n{\nfloat c=(0.2*T )*10E-18;\nreturn 0.434*c*pi*pow((2.0*pi)/lambda,vec3(v-2.0))*K;\n}\nfloat hgPhase(float cosTheta,float g)\n{\nreturn (1.0/(4.0*pi))*((1.0-pow(g,2.0))/pow(1.0-2.0*g*cosTheta+pow(g,2.0),1.5));\n}\nfloat sunIntensity(float zenithAngleCos)\n{\nreturn EE*max(0.0,1.0-exp((-(cutoffAngle-acos(zenithAngleCos))/steepness)));\n}\nfloat A=0.15;\nfloat B=0.50;\nfloat C=0.10;\nfloat D=0.20;\nfloat EEE=0.02;\nfloat F=0.30;\nfloat W=1000.0;\nvec3 Uncharted2Tonemap(vec3 x)\n{\nreturn ((x*(A*x+C*B)+D*EEE)/(x*(A*x+B)+D*F))-EEE/F;\n}\nvoid main(void) {\n\n#include<clipPlaneFragment>\n\nfloat sunfade=1.0-clamp(1.0-exp((sunPosition.y/450000.0)),0.0,1.0);\nfloat rayleighCoefficient=rayleigh-(1.0*(1.0-sunfade));\nvec3 sunDirection=normalize(sunPosition);\nfloat sunE=sunIntensity(dot(sunDirection,up));\nvec3 betaR=simplifiedRayleigh()*rayleighCoefficient;\nvec3 betaM=totalMie(lambda,K,turbidity)*mieCoefficient;\nfloat zenithAngle=acos(max(0.0,dot(up,normalize(vPositionW-cameraPosition+cameraOffset))));\nfloat sR=rayleighZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));\nfloat sM=mieZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));\nvec3 Fex=exp(-(betaR*sR+betaM*sM));\nfloat cosTheta=dot(normalize(vPositionW-cameraPosition),sunDirection);\nfloat rPhase=rayleighPhase(cosTheta*0.5+0.5);\nvec3 betaRTheta=betaR*rPhase;\nfloat mPhase=hgPhase(cosTheta,mieDirectionalG);\nvec3 betaMTheta=betaM*mPhase;\nvec3 Lin=pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*(1.0-Fex),vec3(1.5));\nLin*=mix(vec3(1.0),pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*Fex,vec3(1.0/2.0)),clamp(pow(1.0-dot(up,sunDirection),5.0),0.0,1.0));\nvec3 direction=normalize(vPositionW-cameraPosition);\nfloat theta=acos(direction.y);\nfloat phi=atan(direction.z,direction.x);\nvec2 uv=vec2(phi,theta)/vec2(2.0*pi,pi)+vec2(0.5,0.0);\nvec3 L0=vec3(0.1)*Fex;\nfloat sundisk=smoothstep(sunAngularDiameterCos,sunAngularDiameterCos+0.00002,cosTheta);\nL0+=(sunE*19000.0*Fex)*sundisk;\nvec3 whiteScale=1.0/Uncharted2Tonemap(vec3(W));\nvec3 texColor=(Lin+L0);\ntexColor*=0.04 ;\ntexColor+=vec3(0.0,0.001,0.0025)*0.3;\nfloat g_fMaxLuminance=1.0;\nfloat fLumScaled=0.1/luminance;\nfloat fLumCompressed=(fLumScaled*(1.0+(fLumScaled/(g_fMaxLuminance*g_fMaxLuminance))))/(1.0+fLumScaled);\nfloat ExposureBias=fLumCompressed;\nvec3 curr=Uncharted2Tonemap((log2(2.0/pow(luminance,4.0)))*texColor);\n\n\n\nvec3 retColor=curr*whiteScale;\n\n\nfloat alpha=1.0;\n#ifdef VERTEXCOLOR\nretColor.rgb*=vColor.rgb;\n#endif\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n\nvec4 color=clamp(vec4(retColor.rgb,alpha),0.0,1.0);\n\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";r.Effect.ShadersStore.skyPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n\nuniform mat4 world;\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\nvoid main(void) {\ngl_Position=viewProjection*world*vec4(position,1.0);\nvec4 worldPos=world*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.skyVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.POINTSIZE=!1,t.FOG=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.luminance=1,n.turbidity=10,n.rayleigh=2,n.mieCoefficient=.005,n.mieDirectionalG=.8,n.distance=500,n.inclination=.49,n.azimuth=.25,n.sunPosition=new r.Vector3(0,100,0),n.useSunPosition=!1,n.cameraOffset=r.Vector3.Zero(),n._cameraPosition=r.Vector3.Zero(),n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,!1,n),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!1),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var a=new r.EffectFallbacks;n.FOG&&a.addFallback(1,"FOG"),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var f=[r.VertexBuffer.PositionKind];n.VERTEXCOLOR&&f.push(r.VertexBuffer.ColorKind);var l=n.toString();t.setEffect(o.getEngine().createEffect("sky",f,["world","viewProjection","view","vFogInfos","vFogColor","pointSize","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","luminance","turbidity","rayleigh","mieCoefficient","mieDirectionalG","sunPosition","cameraPosition","cameraOffset"],[],l,a,this.onCompiled,this.onError),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene();if(i._materialDefines){var o=i.effect;if(o){this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),this._mustRebind(n,o)&&(r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize)),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect);var a=n.activeCamera;if(a){var s=a.getWorldMatrix();this._cameraPosition.x=s.m[12],this._cameraPosition.y=s.m[13],this._cameraPosition.z=s.m[14],this._activeEffect.setVector3("cameraPosition",this._cameraPosition)}if(this._activeEffect.setVector3("cameraOffset",this.cameraOffset),this.luminance>0&&this._activeEffect.setFloat("luminance",this.luminance),this._activeEffect.setFloat("turbidity",this.turbidity),this._activeEffect.setFloat("rayleigh",this.rayleigh),this._activeEffect.setFloat("mieCoefficient",this.mieCoefficient),this._activeEffect.setFloat("mieDirectionalG",this.mieDirectionalG),!this.useSunPosition){var f=Math.PI*(this.inclination-.5),l=2*Math.PI*(this.azimuth-.5);this.sunPosition.x=this.distance*Math.cos(l),this.sunPosition.y=this.distance*Math.sin(l)*Math.sin(f),this.sunPosition.z=this.distance*Math.sin(l)*Math.cos(f)}this._activeEffect.setVector3("sunPosition",this.sunPosition),this._afterBind(t,this._activeEffect)}}},t.prototype.getAnimatables=function(){return[]},t.prototype.dispose=function(t){e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.SkyMaterial",e},t.prototype.getClassName=function(){return"SkyMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serialize)()],t.prototype,"luminance",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"turbidity",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"rayleigh",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"mieCoefficient",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"mieDirectionalG",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"distance",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"inclination",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"azimuth",void 0),Object(n.a)([Object(r.serializeAsVector3)()],t.prototype,"sunPosition",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"useSunPosition",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"cameraOffset",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.SkyMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"TerrainMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform sampler2D textureSampler;\nuniform vec2 vTextureInfos;\nuniform sampler2D diffuse1Sampler;\nuniform sampler2D diffuse2Sampler;\nuniform sampler2D diffuse3Sampler;\nuniform vec2 diffuse1Infos;\nuniform vec2 diffuse2Infos;\nuniform vec2 diffuse3Infos;\n#endif\n#ifdef BUMP\nuniform sampler2D bump1Sampler;\nuniform sampler2D bump2Sampler;\nuniform sampler2D bump3Sampler;\n#endif\n\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\n\n#ifdef BUMP\n#extension GL_OES_standard_derivatives : enable\n\nmat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv)\n{\n\nvec3 dp1=dFdx(p);\nvec3 dp2=dFdy(p);\nvec2 duv1=dFdx(uv);\nvec2 duv2=dFdy(uv);\n\nvec3 dp2perp=cross(dp2,normal);\nvec3 dp1perp=cross(normal,dp1);\nvec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;\nvec3 binormal=dp2perp*duv1.y+dp1perp*duv2.y;\n\nfloat invmax=inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));\nreturn mat3(tangent*invmax,binormal*invmax,normal);\n}\nvec3 perturbNormal(vec3 viewDir,vec3 mixColor)\n{\nvec3 bump1Color=texture2D(bump1Sampler,vTextureUV*diffuse1Infos).xyz;\nvec3 bump2Color=texture2D(bump2Sampler,vTextureUV*diffuse2Infos).xyz;\nvec3 bump3Color=texture2D(bump3Sampler,vTextureUV*diffuse3Infos).xyz;\nbump1Color.rgb*=mixColor.r;\nbump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);\nvec3 map=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);\nmap=map*255./127.-128./127.;\nmat3 TBN=cotangent_frame(vNormalW*vTextureInfos.y,-viewDir,vTextureUV);\nreturn normalize(TBN*map);\n}\n#endif\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef DIFFUSE\nbaseColor=texture2D(textureSampler,vTextureUV);\n#if defined(BUMP) && defined(DIFFUSE)\nnormalW=perturbNormal(viewDirectionW,baseColor.rgb);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vTextureInfos.y;\nvec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);\nvec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);\nvec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);\ndiffuse1Color.rgb*=baseColor.r;\ndiffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,baseColor.g);\nbaseColor.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,baseColor.b);\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor*baseColor.rgb,0.0,1.0);\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";r.Effect.ShadersStore.terrainPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform mat4 textureMatrix;\nuniform vec2 vTextureInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vTextureInfos.x == 0.)\n{\nvTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.terrainVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSE=!1,t.BUMP=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.SPECULARTERM=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.diffuseColor=new r.Color3(1,1,1),n.specularColor=new r.Color3(0,0,0),n.specularPower=64,n._disableLighting=!1,n._maxSimultaneousLights=4,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(o.texturesEnabled){if(!this.mixTexture||!this.mixTexture.isReady())return!1;if(n._needUVs=!0,r.MaterialFlags.DiffuseTextureEnabled){if(!this.diffuseTexture1||!this.diffuseTexture1.isReady())return!1;if(!this.diffuseTexture2||!this.diffuseTexture2.isReady())return!1;if(!this.diffuseTexture3||!this.diffuseTexture3.isReady())return!1;n.DIFFUSE=!0}if(this.bumpTexture1&&this.bumpTexture2&&this.bumpTexture3&&r.MaterialFlags.BumpTextureEnabled){if(!this.bumpTexture1.isReady())return!1;if(!this.bumpTexture2.isReady())return!1;if(!this.bumpTexture3.isReady())return!1;n._needNormals=!0,n.BUMP=!0}}if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var f=new r.EffectFallbacks;n.FOG&&f.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,f,this.maxSimultaneousLights),n.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var l=[r.VertexBuffer.PositionKind];n.NORMAL&&l.push(r.VertexBuffer.NormalKind),n.UV1&&l.push(r.VertexBuffer.UVKind),n.UV2&&l.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&l.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(l,e,n,f),r.MaterialHelper.PrepareAttributesForInstances(l,n);var u=n.toString(),c=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos"],d=["textureSampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","bump1Sampler","bump2Sampler","bump3Sampler"],p=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("terrain",{attributes:l,uniformsNames:c,uniformBuffersNames:p,samplers:d,defines:u,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(this.mixTexture&&(this._activeEffect.setTexture("textureSampler",this._mixTexture),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture.coordinatesIndex,this._mixTexture.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture.getTextureMatrix()),r.MaterialFlags.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale))),r.MaterialFlags.BumpTextureEnabled&&n.getEngine().getCaps().standardDerivatives&&(this._bumpTexture1&&this._activeEffect.setTexture("bump1Sampler",this._bumpTexture1),this._bumpTexture2&&this._activeEffect.setTexture("bump2Sampler",this._bumpTexture2),this._bumpTexture3&&this._activeEffect.setTexture("bump3Sampler",this._bumpTexture3))),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this.maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._mixTexture&&t.push(this._mixTexture),this._diffuseTexture1&&t.push(this._diffuseTexture1),this._diffuseTexture2&&t.push(this._diffuseTexture2),this._diffuseTexture3&&t.push(this._diffuseTexture3),this._bumpTexture1&&t.push(this._bumpTexture1),this._bumpTexture2&&t.push(this._bumpTexture2),this._bumpTexture3&&t.push(this._bumpTexture3),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||(this._mixTexture===t||(this._diffuseTexture1===t||(this._diffuseTexture2===t||(this._diffuseTexture3===t||(this._bumpTexture1===t||(this._bumpTexture2===t||this._bumpTexture3===t))))))},t.prototype.dispose=function(t){this.mixTexture&&this.mixTexture.dispose(),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.TerrainMaterial",e},t.prototype.getClassName=function(){return"TerrainMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsTexture)("mixTexture")],t.prototype,"_mixTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"mixTexture",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture1")],t.prototype,"_diffuseTexture1",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture1",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture2")],t.prototype,"_diffuseTexture2",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture2",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexture3")],t.prototype,"_diffuseTexture3",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture3",void 0),Object(n.a)([Object(r.serializeAsTexture)("bumpTexture1")],t.prototype,"_bumpTexture1",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture1",void 0),Object(n.a)([Object(r.serializeAsTexture)("bumpTexture2")],t.prototype,"_bumpTexture2",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture2",void 0),Object(n.a)([Object(r.serializeAsTexture)("bumpTexture3")],t.prototype,"_bumpTexture3",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture3",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"specularColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"specularPower",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.TerrainMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"TriPlanarMaterial",(function(){return f}));var n=i(1),r=i(0),o="precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;\nuniform sampler2D diffuseSamplerX;\n#ifdef BUMPX\nuniform sampler2D normalSamplerX;\n#endif\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;\nuniform sampler2D diffuseSamplerY;\n#ifdef BUMPY\nuniform sampler2D normalSamplerY;\n#endif\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;\nuniform sampler2D diffuseSamplerZ;\n#ifdef BUMPZ\nuniform sampler2D normalSamplerZ;\n#endif\n#endif\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n#include<fogFragmentDeclaration>\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(0.,0.,0.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=tangentSpace[2];\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\nvec4 baseNormal=vec4(0.0,0.0,0.0,1.0);\nnormalW*=normalW;\n#ifdef DIFFUSEX\nbaseColor+=texture2D(diffuseSamplerX,vTextureUVX)*normalW.x;\n#ifdef BUMPX\nbaseNormal+=texture2D(normalSamplerX,vTextureUVX)*normalW.x;\n#endif\n#endif\n#ifdef DIFFUSEY\nbaseColor+=texture2D(diffuseSamplerY,vTextureUVY)*normalW.y;\n#ifdef BUMPY\nbaseNormal+=texture2D(normalSamplerY,vTextureUVY)*normalW.y;\n#endif\n#endif\n#ifdef DIFFUSEZ\nbaseColor+=texture2D(diffuseSamplerZ,vTextureUVZ)*normalW.z;\n#ifdef BUMPZ\nbaseNormal+=texture2D(normalSamplerZ,vTextureUVZ)*normalW.z;\n#endif\n#endif\n#ifdef NORMAL\nnormalW=normalize((2.0*baseNormal.xyz-1.0)*tangentSpace);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularBase=vec3(0.,0.,0.);\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";r.Effect.ShadersStore.triplanarPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;\n#endif\nuniform float tileSize;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void)\n{\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef DIFFUSEX\nvTextureUVX=worldPos.zy/tileSize;\n#endif\n#ifdef DIFFUSEY\nvTextureUVY=worldPos.xz/tileSize;\n#endif\n#ifdef DIFFUSEZ\nvTextureUVZ=worldPos.xy/tileSize;\n#endif\n#ifdef NORMAL\n\nvec3 xtan=vec3(0,0,1);\nvec3 xbin=vec3(0,1,0);\nvec3 ytan=vec3(1,0,0);\nvec3 ybin=vec3(0,0,1);\nvec3 ztan=vec3(1,0,0);\nvec3 zbin=vec3(0,1,0);\nvec3 normalizedNormal=normalize(normal);\nnormalizedNormal*=normalizedNormal;\nvec3 worldBinormal=normalize(xbin*normalizedNormal.x+ybin*normalizedNormal.y+zbin*normalizedNormal.z);\nvec3 worldTangent=normalize(xtan*normalizedNormal.x+ytan*normalizedNormal.y+ztan*normalizedNormal.z);\nworldTangent=(world*vec4(worldTangent,1.0)).xyz;\nworldBinormal=(world*vec4(worldBinormal,1.0)).xyz;\nvec3 worldNormal=(world*vec4(normalize(normal),1.0)).xyz;\ntangentSpace[0]=worldTangent;\ntangentSpace[1]=worldBinormal;\ntangentSpace[2]=worldNormal;\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";r.Effect.ShadersStore.triplanarVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.DIFFUSEX=!1,t.DIFFUSEY=!1,t.DIFFUSEZ=!1,t.BUMPX=!1,t.BUMPY=!1,t.BUMPZ=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.SPECULARTERM=!1,t.NORMAL=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.tileSize=1,n.diffuseColor=new r.Color3(1,1,1),n.specularColor=new r.Color3(.2,.2,.2),n.specularPower=64,n._disableLighting=!1,n._maxSimultaneousLights=4,n}return Object(n.b)(t,e),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&o.texturesEnabled){if(r.MaterialFlags.DiffuseTextureEnabled)for(var f=[this.diffuseTextureX,this.diffuseTextureY,this.diffuseTextureZ],l=["DIFFUSEX","DIFFUSEY","DIFFUSEZ"],u=0;u<f.length;u++)if(f[u]){if(!f[u].isReady())return!1;n[l[u]]=!0}if(r.MaterialFlags.BumpTextureEnabled)for(f=[this.normalTextureX,this.normalTextureY,this.normalTextureZ],l=["BUMPX","BUMPY","BUMPZ"],u=0;u<f.length;u++)if(f[u]){if(!f[u].isReady())return!1;n[l[u]]=!0}}if(r.MaterialHelper.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!1,this._maxSimultaneousLights,this._disableLighting),r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var c=new r.EffectFallbacks;n.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(n,c,this.maxSimultaneousLights),n.NUM_BONE_INFLUENCERS>0&&c.addCPUSkinningFallback(0,e),n.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var d=[r.VertexBuffer.PositionKind];n.NORMAL&&d.push(r.VertexBuffer.NormalKind),n.VERTEXCOLOR&&d.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(d,e,n,c),r.MaterialHelper.PrepareAttributesForInstances(d,n);var p=n.toString(),h=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","tileSize"],v=["diffuseSamplerX","diffuseSamplerY","diffuseSamplerZ","normalSamplerX","normalSamplerY","normalSamplerZ"],m=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:h,uniformBuffersNames:m,samplers:v,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("triplanar",{attributes:d,uniformsNames:h,uniformBuffersNames:m,samplers:v,defines:p,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._activeEffect.setFloat("tileSize",this.tileSize),n.getCachedMaterial()!==this&&(this.diffuseTextureX&&this._activeEffect.setTexture("diffuseSamplerX",this.diffuseTextureX),this.diffuseTextureY&&this._activeEffect.setTexture("diffuseSamplerY",this.diffuseTextureY),this.diffuseTextureZ&&this._activeEffect.setTexture("diffuseSamplerZ",this.diffuseTextureZ),this.normalTextureX&&this._activeEffect.setTexture("normalSamplerX",this.normalTextureX),this.normalTextureY&&this._activeEffect.setTexture("normalSamplerY",this.normalTextureY),this.normalTextureZ&&this._activeEffect.setTexture("normalSamplerZ",this.normalTextureZ),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this.maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._diffuseTextureX&&t.push(this._diffuseTextureX),this._diffuseTextureY&&t.push(this._diffuseTextureY),this._diffuseTextureZ&&t.push(this._diffuseTextureZ),this._normalTextureX&&t.push(this._normalTextureX),this._normalTextureY&&t.push(this._normalTextureY),this._normalTextureZ&&t.push(this._normalTextureZ),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||(this._diffuseTextureX===t||(this._diffuseTextureY===t||(this._diffuseTextureZ===t||(this._normalTextureX===t||(this._normalTextureY===t||this._normalTextureZ===t)))))},t.prototype.dispose=function(t){this.mixTexture&&this.mixTexture.dispose(),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);return e.customType="BABYLON.TriPlanarMaterial",e},t.prototype.getClassName=function(){return"TriPlanarMaterial"},t.Parse=function(e,i,n){return r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n)},Object(n.a)([Object(r.serializeAsTexture)()],t.prototype,"mixTexture",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTextureX")],t.prototype,"_diffuseTextureX",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTextureX",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTexturY")],t.prototype,"_diffuseTextureY",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTextureY",void 0),Object(n.a)([Object(r.serializeAsTexture)("diffuseTextureZ")],t.prototype,"_diffuseTextureZ",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTextureZ",void 0),Object(n.a)([Object(r.serializeAsTexture)("normalTextureX")],t.prototype,"_normalTextureX",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"normalTextureX",void 0),Object(n.a)([Object(r.serializeAsTexture)("normalTextureY")],t.prototype,"_normalTextureY",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"normalTextureY",void 0),Object(n.a)([Object(r.serializeAsTexture)("normalTextureZ")],t.prototype,"_normalTextureZ",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"normalTextureZ",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"tileSize",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"specularColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"specularPower",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.TriPlanarMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"WaterMaterial",(function(){return f}));var n=i(1),r=i(0),o="#ifdef LOGARITHMICDEPTH\n#extension GL_EXT_frag_depth : enable\n#endif\nprecision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n#include<imageProcessingDeclaration>\n#include<imageProcessingFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef BUMP\nvarying vec2 vNormalUV;\nvarying vec2 vNormalUV2;\nuniform sampler2D normalSampler;\nuniform vec2 vNormalInfos;\n#endif\nuniform sampler2D refractionSampler;\nuniform sampler2D reflectionSampler;\n\nconst float LOG2=1.442695;\nuniform vec3 cameraPosition;\nuniform vec4 waterColor;\nuniform float colorBlendFactor;\nuniform vec4 waterColor2;\nuniform float colorBlendFactor2;\nuniform float bumpHeight;\nuniform float time;\n\nvarying vec3 vRefractionMapTexCoord;\nvarying vec3 vReflectionMapTexCoord;\nvarying vec3 vPosition;\n#include<clipPlaneFragmentDeclaration>\n#include<logDepthDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef BUMP\n#ifdef BUMPSUPERIMPOSE\nbaseColor=0.6*texture2D(normalSampler,vNormalUV)+0.4*texture2D(normalSampler,vec2(vNormalUV2.x,vNormalUV2.y));\n#else\nbaseColor=texture2D(normalSampler,vNormalUV);\n#endif\nvec3 bumpColor=baseColor.rgb;\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\nbaseColor.rgb*=vNormalInfos.y;\n#else\nvec3 bumpColor=vec3(1.0);\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec2 perturbation=bumpHeight*(baseColor.rg-0.5);\n#ifdef BUMPAFFECTSREFLECTION\nvec3 normalW=normalize(vNormalW+vec3(perturbation.x*8.0,0.0,perturbation.y*8.0));\nif (normalW.y<0.0) {\nnormalW.y=-normalW.y;\n}\n#else\nvec3 normalW=normalize(vNormalW);\n#endif\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\nvec2 perturbation=bumpHeight*(vec2(1.0,1.0)-0.5);\n#endif\n#ifdef FRESNELSEPARATE\n#ifdef REFLECTION\n\nvec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation*0.5,0.0,1.0);\nvec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);\n#ifdef IS_REFRACTION_LINEAR\nrefractiveColor.rgb=toGammaSpace(refractiveColor.rgb);\n#endif\nvec2 projectedReflectionTexCoords=clamp(vec2(\nvReflectionMapTexCoord.x/vReflectionMapTexCoord.z+perturbation.x*0.3,\nvReflectionMapTexCoord.y/vReflectionMapTexCoord.z+perturbation.y\n),0.0,1.0);\nvec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);\n#ifdef IS_REFLECTION_LINEAR\nreflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);\n#endif\nvec3 upVector=vec3(0.0,1.0,0.0);\nfloat fresnelTerm=clamp(abs(pow(dot(viewDirectionW,upVector),3.0)),0.05,0.65);\nfloat IfresnelTerm=1.0-fresnelTerm;\nrefractiveColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*refractiveColor;\nreflectiveColor=IfresnelTerm*colorBlendFactor2*waterColor+(1.0-colorBlendFactor2*IfresnelTerm)*reflectiveColor;\nvec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*IfresnelTerm;\nbaseColor=combinedColor;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularBase=vec3(0.,0.,0.);\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\nvec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\n#else\n#ifdef REFLECTION\n\nvec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation,0.0,1.0);\nvec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);\n#ifdef IS_REFRACTION_LINEAR\nrefractiveColor.rgb=toGammaSpace(refractiveColor.rgb);\n#endif\nvec2 projectedReflectionTexCoords=clamp(vReflectionMapTexCoord.xy/vReflectionMapTexCoord.z+perturbation,0.0,1.0);\nvec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);\n#ifdef IS_REFLECTION_LINEAR\nreflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);\n#endif\nvec3 upVector=vec3(0.0,1.0,0.0);\nfloat fresnelTerm=max(dot(viewDirectionW,upVector),0.0);\nvec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*(1.0-fresnelTerm);\nbaseColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*combinedColor;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularBase=vec3(0.,0.,0.);\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\nvec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\n#endif\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<logDepthFragment>\n#include<fogFragment>\n\n\n#ifdef IMAGEPROCESSINGPOSTPROCESS\ncolor.rgb=toLinearSpace(color.rgb);\n#elif defined(IMAGEPROCESSING)\ncolor.rgb=toLinearSpace(color.rgb);\ncolor=applyImageProcessing(color);\n#endif\ngl_FragColor=color;\n}\n";r.Effect.ShadersStore.waterPixelShader=o;var a="precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef BUMP\nvarying vec2 vNormalUV;\n#ifdef BUMPSUPERIMPOSE\nvarying vec2 vNormalUV2;\n#endif\nuniform mat4 normalMatrix;\nuniform vec2 vNormalInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<logDepthDeclaration>\n\nuniform mat4 worldReflectionViewProjection;\nuniform vec2 windDirection;\nuniform float waveLength;\nuniform float time;\nuniform float windForce;\nuniform float waveHeight;\nuniform float waveSpeed;\nuniform float waveCount;\n\nvarying vec3 vPosition;\nvarying vec3 vRefractionMapTexCoord;\nvarying vec3 vReflectionMapTexCoord;\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef BUMP\nif (vNormalInfos.x == 0.)\n{\nvNormalUV=vec2(normalMatrix*vec4((uv*1.0)/waveLength+time*windForce*windDirection,1.0,0.0));\n#ifdef BUMPSUPERIMPOSE\nvNormalUV2=vec2(normalMatrix*vec4((uv*0.721)/waveLength+time*1.2*windForce*windDirection,1.0,0.0));\n#endif\n}\nelse\n{\nvNormalUV=vec2(normalMatrix*vec4((uv2*1.0)/waveLength+time*windForce*windDirection ,1.0,0.0));\n#ifdef BUMPSUPERIMPOSE\nvNormalUV2=vec2(normalMatrix*vec4((uv2*0.721)/waveLength+time*1.2*windForce*windDirection ,1.0,0.0));\n#endif\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\nfloat finalWaveCount=1.0/(waveCount*0.5);\nvec3 p=position;\nfloat newY=(sin(((p.x/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.x*5.0)\n+(cos(((p.z/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.y*5.0);\np.y+=abs(newY);\ngl_Position=viewProjection*finalWorld*vec4(p,1.0);\n#ifdef REFLECTION\nworldPos=viewProjection*finalWorld*vec4(p,1.0);\n\nvPosition=position;\nvRefractionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);\nvRefractionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);\nvRefractionMapTexCoord.z=worldPos.w;\nworldPos=worldReflectionViewProjection*vec4(position,1.0);\nvReflectionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);\nvReflectionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);\nvReflectionMapTexCoord.z=worldPos.w;\n#endif\n#include<logDepthVertex>\n}\n";r.Effect.ShadersStore.waterVertexShader=a;var s=function(e){function t(){var t=e.call(this)||this;return t.BUMP=!1,t.REFLECTION=!1,t.CLIPPLANE=!1,t.CLIPPLANE2=!1,t.CLIPPLANE3=!1,t.CLIPPLANE4=!1,t.CLIPPLANE5=!1,t.CLIPPLANE6=!1,t.ALPHATEST=!1,t.DEPTHPREPASS=!1,t.POINTSIZE=!1,t.FOG=!1,t.NORMAL=!1,t.UV1=!1,t.UV2=!1,t.VERTEXCOLOR=!1,t.VERTEXALPHA=!1,t.NUM_BONE_INFLUENCERS=0,t.BonesPerMesh=0,t.INSTANCES=!1,t.SPECULARTERM=!1,t.LOGARITHMICDEPTH=!1,t.FRESNELSEPARATE=!1,t.BUMPSUPERIMPOSE=!1,t.BUMPAFFECTSREFLECTION=!1,t.IMAGEPROCESSING=!1,t.VIGNETTE=!1,t.VIGNETTEBLENDMODEMULTIPLY=!1,t.VIGNETTEBLENDMODEOPAQUE=!1,t.TONEMAPPING=!1,t.TONEMAPPING_ACES=!1,t.CONTRAST=!1,t.EXPOSURE=!1,t.COLORCURVES=!1,t.COLORGRADING=!1,t.COLORGRADING3D=!1,t.SAMPLER3DGREENDEPTH=!1,t.SAMPLER3DBGRMAP=!1,t.IMAGEPROCESSINGPOSTPROCESS=!1,t.rebuild(),t}return Object(n.b)(t,e),t}(r.MaterialDefines),f=function(e){function t(t,i,n){void 0===n&&(n=new r.Vector2(512,512));var o=e.call(this,t,i)||this;return o.renderTargetSize=n,o.diffuseColor=new r.Color3(1,1,1),o.specularColor=new r.Color3(0,0,0),o.specularPower=64,o._disableLighting=!1,o._maxSimultaneousLights=4,o.windForce=6,o.windDirection=new r.Vector2(0,1),o.waveHeight=.4,o.bumpHeight=.4,o._bumpSuperimpose=!1,o._fresnelSeparate=!1,o._bumpAffectsReflection=!1,o.waterColor=new r.Color3(.1,.1,.6),o.colorBlendFactor=.2,o.waterColor2=new r.Color3(.1,.1,.6),o.colorBlendFactor2=.2,o.waveLength=.1,o.waveSpeed=1,o.waveCount=20,o.disableClipPlane=!1,o._renderTargets=new r.SmartArray(16),o._mesh=null,o._reflectionTransform=r.Matrix.Zero(),o._lastTime=0,o._lastDeltaTime=0,o._createRenderTargets(i,n),o.getRenderTargetTextures=function(){return o._renderTargets.reset(),o._renderTargets.push(o._reflectionRTT),o._renderTargets.push(o._refractionRTT),o._renderTargets},o._imageProcessingConfiguration=o.getScene().imageProcessingConfiguration,o._imageProcessingConfiguration&&(o._imageProcessingObserver=o._imageProcessingConfiguration.onUpdateParameters.add((function(){o._markAllSubMeshesAsImageProcessingDirty()}))),o}return Object(n.b)(t,e),Object.defineProperty(t.prototype,"hasRenderTargetTextures",{get:function(){return!0},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"useLogarithmicDepth",{get:function(){return this._useLogarithmicDepth},set:function(e){this._useLogarithmicDepth=e&&this.getScene().getEngine().getCaps().fragmentDepthSupported,this._markAllSubMeshesAsMiscDirty()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"refractionTexture",{get:function(){return this._refractionRTT},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"reflectionTexture",{get:function(){return this._reflectionRTT},enumerable:!1,configurable:!0}),t.prototype.addToRenderList=function(e){this._refractionRTT&&this._refractionRTT.renderList&&this._refractionRTT.renderList.push(e),this._reflectionRTT&&this._reflectionRTT.renderList&&this._reflectionRTT.renderList.push(e)},t.prototype.enableRenderTargets=function(e){var t=e?1:0;this._refractionRTT&&(this._refractionRTT.refreshRate=t),this._reflectionRTT&&(this._reflectionRTT.refreshRate=t)},t.prototype.getRenderList=function(){return this._refractionRTT?this._refractionRTT.renderList:[]},Object.defineProperty(t.prototype,"renderTargetsEnabled",{get:function(){return!(this._refractionRTT&&0===this._refractionRTT.refreshRate)},enumerable:!1,configurable:!0}),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t._materialDefines||(t._materialDefines=new s);var n=t._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;var a=o.getEngine();if(n._areTexturesDirty&&(n._needUVs=!1,o.texturesEnabled)){if(this.bumpTexture&&r.MaterialFlags.BumpTextureEnabled){if(!this.bumpTexture.isReady())return!1;n._needUVs=!0,n.BUMP=!0}r.MaterialFlags.ReflectionTextureEnabled&&(n.REFLECTION=!0)}if(r.MaterialHelper.PrepareDefinesForFrameBoundValues(o,a,n,!!i),r.MaterialHelper.PrepareDefinesForMisc(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),n),n._areMiscDirty&&(this._fresnelSeparate&&(n.FRESNELSEPARATE=!0),this._bumpSuperimpose&&(n.BUMPSUPERIMPOSE=!0),this._bumpAffectsReflection&&(n.BUMPAFFECTSREFLECTION=!0)),n._needNormals=r.MaterialHelper.PrepareDefinesForLights(o,e,n,!0,this._maxSimultaneousLights,this._disableLighting),n._areImageProcessingDirty&&this._imageProcessingConfiguration){if(!this._imageProcessingConfiguration.isReady())return!1;this._imageProcessingConfiguration.prepareDefines(n),n.IS_REFLECTION_LINEAR=null!=this.reflectionTexture&&!this.reflectionTexture.gammaSpace,n.IS_REFRACTION_LINEAR=null!=this.refractionTexture&&!this.refractionTexture.gammaSpace}if(r.MaterialHelper.PrepareDefinesForAttributes(e,n,!0,!0),this._mesh=e,this._waitingRenderList){for(var f=0;f<this._waitingRenderList.length;f++)this.addToRenderList(o.getNodeByID(this._waitingRenderList[f]));this._waitingRenderList=null}if(n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();var l=new r.EffectFallbacks;n.FOG&&l.addFallback(1,"FOG"),n.LOGARITHMICDEPTH&&l.addFallback(0,"LOGARITHMICDEPTH"),r.MaterialHelper.HandleFallbacksForShadows(n,l,this.maxSimultaneousLights),n.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e);var u=[r.VertexBuffer.PositionKind];n.NORMAL&&u.push(r.VertexBuffer.NormalKind),n.UV1&&u.push(r.VertexBuffer.UVKind),n.UV2&&u.push(r.VertexBuffer.UV2Kind),n.VERTEXCOLOR&&u.push(r.VertexBuffer.ColorKind),r.MaterialHelper.PrepareAttributesForBones(u,e,n,l),r.MaterialHelper.PrepareAttributesForInstances(u,n);var c=n.toString(),d=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vNormalInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","normalMatrix","logarithmicDepthConstant","worldReflectionViewProjection","windDirection","waveLength","time","windForce","cameraPosition","bumpHeight","waveHeight","waterColor","waterColor2","colorBlendFactor","colorBlendFactor2","waveSpeed","waveCount"],p=["normalSampler","refractionSampler","reflectionSampler"],h=new Array;r.ImageProcessingConfiguration&&(r.ImageProcessingConfiguration.PrepareUniforms(d,n),r.ImageProcessingConfiguration.PrepareSamplers(p,n)),r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:h,samplers:p,defines:n,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect("water",{attributes:u,uniformsNames:d,uniformBuffersNames:h,samplers:p,defines:c,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights}},a),n)}return!(!t.effect||!t.effect.isReady())&&(n._renderId=o.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,t,i){var n=this.getScene(),o=i._materialDefines;if(o){var a=i.effect;if(a&&this._mesh){this._activeEffect=a,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",n.getTransformMatrix()),r.MaterialHelper.BindBonesParameters(t,this._activeEffect),this._mustRebind(n,a)&&(this.bumpTexture&&r.MaterialFlags.BumpTextureEnabled&&(this._activeEffect.setTexture("normalSampler",this.bumpTexture),this._activeEffect.setFloat2("vNormalInfos",this.bumpTexture.coordinatesIndex,this.bumpTexture.level),this._activeEffect.setMatrix("normalMatrix",this.bumpTexture.getTextureMatrix())),r.MaterialHelper.BindClipPlane(this._activeEffect,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),r.MaterialHelper.BindEyePosition(a,n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),n.lightsEnabled&&!this.disableLighting&&r.MaterialHelper.BindLights(n,t,this._activeEffect,o,this.maxSimultaneousLights),n.fogEnabled&&t.applyFog&&n.fogMode!==r.Scene.FOGMODE_NONE&&this._activeEffect.setMatrix("view",n.getViewMatrix()),r.MaterialHelper.BindFogParameters(n,t,this._activeEffect),r.MaterialHelper.BindLogDepth(o,this._activeEffect,n),r.MaterialFlags.ReflectionTextureEnabled&&(this._activeEffect.setTexture("refractionSampler",this._refractionRTT),this._activeEffect.setTexture("reflectionSampler",this._reflectionRTT));var s=this._mesh.getWorldMatrix().multiply(this._reflectionTransform).multiply(n.getProjectionMatrix()),f=n.getEngine().getDeltaTime();f!==this._lastDeltaTime&&(this._lastDeltaTime=f,this._lastTime+=this._lastDeltaTime),this._activeEffect.setMatrix("worldReflectionViewProjection",s),this._activeEffect.setVector2("windDirection",this.windDirection),this._activeEffect.setFloat("waveLength",this.waveLength),this._activeEffect.setFloat("time",this._lastTime/1e5),this._activeEffect.setFloat("windForce",this.windForce),this._activeEffect.setFloat("waveHeight",this.waveHeight),this._activeEffect.setFloat("bumpHeight",this.bumpHeight),this._activeEffect.setColor4("waterColor",this.waterColor,1),this._activeEffect.setFloat("colorBlendFactor",this.colorBlendFactor),this._activeEffect.setColor4("waterColor2",this.waterColor2,1),this._activeEffect.setFloat("colorBlendFactor2",this.colorBlendFactor2),this._activeEffect.setFloat("waveSpeed",this.waveSpeed),this._activeEffect.setFloat("waveCount",this.waveCount),this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.applyByPostProcess&&this._imageProcessingConfiguration.bind(this._activeEffect),this._afterBind(t,this._activeEffect)}}},t.prototype._createRenderTargets=function(e,t){var i,n=this;this._refractionRTT=new r.RenderTargetTexture(name+"_refraction",{width:t.x,height:t.y},e,!1,!0),this._refractionRTT.wrapU=r.Constants.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.wrapV=r.Constants.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.ignoreCameraViewport=!0,this._reflectionRTT=new r.RenderTargetTexture(name+"_reflection",{width:t.x,height:t.y},e,!1,!0),this._reflectionRTT.wrapU=r.Constants.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.wrapV=r.Constants.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.ignoreCameraViewport=!0;var o,a=null,s=r.Matrix.Zero();this._refractionRTT.onBeforeRender=function(){if(n._mesh&&(i=n._mesh.isVisible,n._mesh.isVisible=!1),!n.disableClipPlane){a=e.clipPlane;var t=n._mesh?n._mesh.position.y:0;e.clipPlane=r.Plane.FromPositionAndNormal(new r.Vector3(0,t+.05,0),new r.Vector3(0,1,0))}},this._refractionRTT.onAfterRender=function(){n._mesh&&(n._mesh.isVisible=i),n.disableClipPlane||(e.clipPlane=a)},this._reflectionRTT.onBeforeRender=function(){if(n._mesh&&(i=n._mesh.isVisible,n._mesh.isVisible=!1),!n.disableClipPlane){a=e.clipPlane;var t=n._mesh?n._mesh.position.y:0;e.clipPlane=r.Plane.FromPositionAndNormal(new r.Vector3(0,t-.05,0),new r.Vector3(0,-1,0)),r.Matrix.ReflectionToRef(e.clipPlane,s)}o=e.getViewMatrix(),s.multiplyToRef(o,n._reflectionTransform),e.setTransformMatrix(n._reflectionTransform,e.getProjectionMatrix()),e.getEngine().cullBackFaces=!1,e._mirroredCameraPosition=r.Vector3.TransformCoordinates(e.activeCamera.position,s)},this._reflectionRTT.onAfterRender=function(){n._mesh&&(n._mesh.isVisible=i),e.clipPlane=a,e.setTransformMatrix(o,e.getProjectionMatrix()),e.getEngine().cullBackFaces=!0,e._mirroredCameraPosition=null}},t.prototype.getAnimatables=function(){var e=[];return this.bumpTexture&&this.bumpTexture.animations&&this.bumpTexture.animations.length>0&&e.push(this.bumpTexture),this._reflectionRTT&&this._reflectionRTT.animations&&this._reflectionRTT.animations.length>0&&e.push(this._reflectionRTT),this._refractionRTT&&this._refractionRTT.animations&&this._refractionRTT.animations.length>0&&e.push(this._refractionRTT),e},t.prototype.getActiveTextures=function(){var t=e.prototype.getActiveTextures.call(this);return this._bumpTexture&&t.push(this._bumpTexture),t},t.prototype.hasTexture=function(t){return!!e.prototype.hasTexture.call(this,t)||this._bumpTexture===t},t.prototype.dispose=function(t){this.bumpTexture&&this.bumpTexture.dispose();var i=this.getScene().customRenderTargets.indexOf(this._refractionRTT);-1!=i&&this.getScene().customRenderTargets.splice(i,1),i=-1,-1!=(i=this.getScene().customRenderTargets.indexOf(this._reflectionRTT))&&this.getScene().customRenderTargets.splice(i,1),this._reflectionRTT&&this._reflectionRTT.dispose(),this._refractionRTT&&this._refractionRTT.dispose(),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),e.prototype.dispose.call(this,t)},t.prototype.clone=function(e){var i=this;return r.SerializationHelper.Clone((function(){return new t(e,i.getScene())}),this)},t.prototype.serialize=function(){var e=r.SerializationHelper.Serialize(this);if(e.customType="BABYLON.WaterMaterial",e.renderList=[],this._refractionRTT&&this._refractionRTT.renderList)for(var t=0;t<this._refractionRTT.renderList.length;t++)e.renderList.push(this._refractionRTT.renderList[t].id);return e},t.prototype.getClassName=function(){return"WaterMaterial"},t.Parse=function(e,i,n){var o=r.SerializationHelper.Parse((function(){return new t(e.name,i)}),e,i,n);return o._waitingRenderList=e.renderList,o},t.CreateDefaultMesh=function(e,t){return r.Mesh.CreateGround(e,512,512,32,t,!1)},Object(n.a)([Object(r.serializeAsTexture)("bumpTexture")],t.prototype,"_bumpTexture",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"diffuseColor",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"specularColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"specularPower",void 0),Object(n.a)([Object(r.serialize)("disableLighting")],t.prototype,"_disableLighting",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),Object(n.a)([Object(r.serialize)("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"windForce",void 0),Object(n.a)([Object(r.serializeAsVector2)()],t.prototype,"windDirection",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"waveHeight",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"bumpHeight",void 0),Object(n.a)([Object(r.serialize)("bumpSuperimpose")],t.prototype,"_bumpSuperimpose",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsMiscDirty")],t.prototype,"bumpSuperimpose",void 0),Object(n.a)([Object(r.serialize)("fresnelSeparate")],t.prototype,"_fresnelSeparate",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsMiscDirty")],t.prototype,"fresnelSeparate",void 0),Object(n.a)([Object(r.serialize)("bumpAffectsReflection")],t.prototype,"_bumpAffectsReflection",void 0),Object(n.a)([Object(r.expandToProperty)("_markAllSubMeshesAsMiscDirty")],t.prototype,"bumpAffectsReflection",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"waterColor",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"colorBlendFactor",void 0),Object(n.a)([Object(r.serializeAsColor3)()],t.prototype,"waterColor2",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"colorBlendFactor2",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"waveLength",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"waveSpeed",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"waveCount",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"disableClipPlane",void 0),Object(n.a)([Object(r.serialize)()],t.prototype,"useLogarithmicDepth",null),t}(r.PushMaterial);r._TypeStore.RegisteredTypes["BABYLON.WaterMaterial"]=f},function(e,t,i){"use strict";i.r(t),i.d(t,"CustomShaderStructure",(function(){return o})),i.d(t,"ShaderSpecialParts",(function(){return a})),i.d(t,"CustomMaterial",(function(){return s})),i.d(t,"ShaderAlebdoParts",(function(){return f})),i.d(t,"PBRCustomMaterial",(function(){return l}));var n=i(1),r=i(0),o=function(){},a=function(){},s=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.CustomParts=new a,n.customShaderNameResolve=n.Builder,n.FragmentShader=r.Effect.ShadersStore.defaultPixelShader,n.VertexShader=r.Effect.ShadersStore.defaultVertexShader,n}return Object(n.b)(t,e),t.prototype.AttachAfterBind=function(e,t){if(this._newUniformInstances)for(var i in this._newUniformInstances){"vec2"==(n=i.toString().split("-"))[0]?t.setVector2(n[1],this._newUniformInstances[i]):"vec3"==n[0]?t.setVector3(n[1],this._newUniformInstances[i]):"vec4"==n[0]?t.setVector4(n[1],this._newUniformInstances[i]):"mat4"==n[0]?t.setMatrix(n[1],this._newUniformInstances[i]):"float"==n[0]&&t.setFloat(n[1],this._newUniformInstances[i])}if(this._newSamplerInstances)for(var i in this._newSamplerInstances){var n;"sampler2D"==(n=i.toString().split("-"))[0]&&this._newSamplerInstances[i].isReady&&this._newSamplerInstances[i].isReady()&&t.setTexture(n[1],this._newSamplerInstances[i])}},t.prototype.ReviewUniform=function(e,t){if("uniform"==e&&this._newUniforms)for(var i=0;i<this._newUniforms.length;i++)-1==this._customUniform[i].indexOf("sampler")&&t.push(this._newUniforms[i]);if("sampler"==e&&this._newUniforms)for(i=0;i<this._newUniforms.length;i++)-1!=this._customUniform[i].indexOf("sampler")&&t.push(this._newUniforms[i]);return t},t.prototype.Builder=function(e,i,n,o,a,s){var f=this;if(s&&this._customAttributes&&this._customAttributes.length>0&&s.push.apply(s,this._customAttributes),this.ReviewUniform("uniform",i),this.ReviewUniform("sampler",o),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,t.ShaderIndexer++;var l="custom_"+t.ShaderIndexer,u=this._afterBind.bind(this);return this._afterBind=function(e,t){if(t){f.AttachAfterBind(e,t);try{u(e,t)}catch(t){}}},r.Effect.ShadersStore[l+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join("\n"):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&(r.Effect.ShadersStore[l+"VertexShader"]=r.Effect.ShadersStore[l+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),r.Effect.ShadersStore[l+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join("\n"):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE",this.CustomParts.Fragment_Custom_Diffuse?this.CustomParts.Fragment_Custom_Diffuse:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:""),this.CustomParts.Fragment_Before_Fog&&(r.Effect.ShadersStore[l+"PixelShader"]=r.Effect.ShadersStore[l+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=l,l},t.prototype.AddUniform=function(e,t,i){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),i&&(-1!=t.indexOf("sampler")?this._newSamplerInstances[t+"-"+e]=i:this._newUniformInstances[t+"-"+e]=i),this._customUniform.push("uniform "+t+" "+e+";"),this._newUniforms.push(e),this},t.prototype.AddAttribute=function(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this},t.prototype.Fragment_Begin=function(e){return this.CustomParts.Fragment_Begin=e,this},t.prototype.Fragment_Definitions=function(e){return this.CustomParts.Fragment_Definitions=e,this},t.prototype.Fragment_MainBegin=function(e){return this.CustomParts.Fragment_MainBegin=e,this},t.prototype.Fragment_Custom_Diffuse=function(e){return this.CustomParts.Fragment_Custom_Diffuse=e.replace("result","diffuseColor"),this},t.prototype.Fragment_Custom_Alpha=function(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this},t.prototype.Fragment_Before_Lights=function(e){return this.CustomParts.Fragment_Before_Lights=e,this},t.prototype.Fragment_Before_Fog=function(e){return this.CustomParts.Fragment_Before_Fog=e,this},t.prototype.Fragment_Before_FragColor=function(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this},t.prototype.Vertex_Begin=function(e){return this.CustomParts.Vertex_Begin=e,this},t.prototype.Vertex_Definitions=function(e){return this.CustomParts.Vertex_Definitions=e,this},t.prototype.Vertex_MainBegin=function(e){return this.CustomParts.Vertex_MainBegin=e,this},t.prototype.Vertex_Before_PositionUpdated=function(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this},t.prototype.Vertex_Before_NormalUpdated=function(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this},t.prototype.Vertex_After_WorldPosComputed=function(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this},t.prototype.Vertex_MainEnd=function(e){return this.CustomParts.Vertex_MainEnd=e,this},t.ShaderIndexer=1,t}(r.StandardMaterial);r._TypeStore.RegisteredTypes["BABYLON.CustomMaterial"]=s;var f=function(){},l=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.CustomParts=new f,n.customShaderNameResolve=n.Builder,n.FragmentShader=r.Effect.ShadersStore.pbrPixelShader,n.VertexShader=r.Effect.ShadersStore.pbrVertexShader,n.FragmentShader=n.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g,r.Effect.IncludesShadersStore.pbrBlockAlbedoOpacity),n.FragmentShader=n.FragmentShader.replace(/#include<pbrBlockReflectivity>/g,r.Effect.IncludesShadersStore.pbrBlockReflectivity),n.FragmentShader=n.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g,r.Effect.IncludesShadersStore.pbrBlockFinalColorComposition),n}return Object(n.b)(t,e),t.prototype.AttachAfterBind=function(e,t){if(this._newUniformInstances)for(var i in this._newUniformInstances){"vec2"==(n=i.toString().split("-"))[0]?t.setVector2(n[1],this._newUniformInstances[i]):"vec3"==n[0]?t.setVector3(n[1],this._newUniformInstances[i]):"vec4"==n[0]?t.setVector4(n[1],this._newUniformInstances[i]):"mat4"==n[0]?t.setMatrix(n[1],this._newUniformInstances[i]):"float"==n[0]&&t.setFloat(n[1],this._newUniformInstances[i])}if(this._newSamplerInstances)for(var i in this._newSamplerInstances){var n;"sampler2D"==(n=i.toString().split("-"))[0]&&this._newSamplerInstances[i].isReady&&this._newSamplerInstances[i].isReady()&&t.setTexture(n[1],this._newSamplerInstances[i])}},t.prototype.ReviewUniform=function(e,t){if("uniform"==e&&this._newUniforms)for(var i=0;i<this._newUniforms.length;i++)-1==this._customUniform[i].indexOf("sampler")&&t.push(this._newUniforms[i]);if("sampler"==e&&this._newUniforms)for(i=0;i<this._newUniforms.length;i++)-1!=this._customUniform[i].indexOf("sampler")&&t.push(this._newUniforms[i]);return t},t.prototype.Builder=function(e,i,n,o,a,s){var f=this;if(s&&this._customAttributes&&this._customAttributes.length>0&&s.push.apply(s,this._customAttributes),this.ReviewUniform("uniform",i),this.ReviewUniform("sampler",o),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,t.ShaderIndexer++;var l="custom_"+t.ShaderIndexer,u=this._afterBind.bind(this);return this._afterBind=function(e,t){if(t){f.AttachAfterBind(e,t);try{u(e,t)}catch(t){}}},r.Effect.ShadersStore[l+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join("\n"):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&(r.Effect.ShadersStore[l+"VertexShader"]=r.Effect.ShadersStore[l+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),r.Effect.ShadersStore[l+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join("\n"):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_ALBEDO",this.CustomParts.Fragment_Custom_Albedo?this.CustomParts.Fragment_Custom_Albedo:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS",this.CustomParts.Fragment_Custom_MetallicRoughness?this.CustomParts.Fragment_Custom_MetallicRoughness:"").replace("#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE",this.CustomParts.Fragment_Custom_MicroSurface?this.CustomParts.Fragment_Custom_MicroSurface:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:""),this.CustomParts.Fragment_Before_Fog&&(r.Effect.ShadersStore[l+"PixelShader"]=r.Effect.ShadersStore[l+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=l,l},t.prototype.AddUniform=function(e,t,i){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),i&&(-1!=t.indexOf("sampler")?this._newSamplerInstances[t+"-"+e]=i:this._newUniformInstances[t+"-"+e]=i),this._customUniform.push("uniform "+t+" "+e+";"),this._newUniforms.push(e),this},t.prototype.AddAttribute=function(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this},t.prototype.Fragment_Begin=function(e){return this.CustomParts.Fragment_Begin=e,this},t.prototype.Fragment_Definitions=function(e){return this.CustomParts.Fragment_Definitions=e,this},t.prototype.Fragment_MainBegin=function(e){return this.CustomParts.Fragment_MainBegin=e,this},t.prototype.Fragment_Custom_Albedo=function(e){return this.CustomParts.Fragment_Custom_Albedo=e.replace("result","surfaceAlbedo"),this},t.prototype.Fragment_Custom_Alpha=function(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this},t.prototype.Fragment_Before_Lights=function(e){return this.CustomParts.Fragment_Before_Lights=e,this},t.prototype.Fragment_Custom_MetallicRoughness=function(e){return this.CustomParts.Fragment_Custom_MetallicRoughness=e,this},t.prototype.Fragment_Custom_MicroSurface=function(e){return this.CustomParts.Fragment_Custom_MicroSurface=e,this},t.prototype.Fragment_Before_Fog=function(e){return this.CustomParts.Fragment_Before_Fog=e,this},t.prototype.Fragment_Before_FragColor=function(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this},t.prototype.Vertex_Begin=function(e){return this.CustomParts.Vertex_Begin=e,this},t.prototype.Vertex_Definitions=function(e){return this.CustomParts.Vertex_Definitions=e,this},t.prototype.Vertex_MainBegin=function(e){return this.CustomParts.Vertex_MainBegin=e,this},t.prototype.Vertex_Before_PositionUpdated=function(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this},t.prototype.Vertex_Before_NormalUpdated=function(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this},t.prototype.Vertex_After_WorldPosComputed=function(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this},t.prototype.Vertex_MainEnd=function(e){return this.CustomParts.Vertex_MainEnd=e,this},t.ShaderIndexer=1,t}(r.PBRMaterial);r._TypeStore.RegisteredTypes["BABYLON.PBRCustomMaterial"]=l},function(e,t,i){"use strict";i.r(t);var n=i(3);i.d(t,"CellMaterial",(function(){return n.CellMaterial}));var r=i(17);i.d(t,"CustomShaderStructure",(function(){return r.CustomShaderStructure})),i.d(t,"ShaderSpecialParts",(function(){return r.ShaderSpecialParts})),i.d(t,"CustomMaterial",(function(){return r.CustomMaterial})),i.d(t,"ShaderAlebdoParts",(function(){return r.ShaderAlebdoParts})),i.d(t,"PBRCustomMaterial",(function(){return r.PBRCustomMaterial}));var o=i(4);i.d(t,"FireMaterial",(function(){return o.FireMaterial}));var a=i(5);i.d(t,"FurMaterial",(function(){return a.FurMaterial}));var s=i(6);i.d(t,"GradientMaterial",(function(){return s.GradientMaterial}));var f=i(7);i.d(t,"GridMaterial",(function(){return f.GridMaterial}));var l=i(8);i.d(t,"LavaMaterial",(function(){return l.LavaMaterial}));var u=i(9);i.d(t,"MixMaterial",(function(){return u.MixMaterial}));var c=i(10);i.d(t,"NormalMaterial",(function(){return c.NormalMaterial}));var d=i(11);i.d(t,"ShadowOnlyMaterial",(function(){return d.ShadowOnlyMaterial}));var p=i(12);i.d(t,"SimpleMaterial",(function(){return p.SimpleMaterial}));var h=i(13);i.d(t,"SkyMaterial",(function(){return h.SkyMaterial}));var v=i(14);i.d(t,"TerrainMaterial",(function(){return v.TerrainMaterial}));var m=i(15);i.d(t,"TriPlanarMaterial",(function(){return m.TriPlanarMaterial}));var g=i(16);i.d(t,"WaterMaterial",(function(){return g.WaterMaterial}))},function(e,t,i){"use strict";i.r(t),function(e){var n=i(18);i.d(t,"CellMaterial",(function(){return n.CellMaterial})),i.d(t,"CustomShaderStructure",(function(){return n.CustomShaderStructure})),i.d(t,"ShaderSpecialParts",(function(){return n.ShaderSpecialParts})),i.d(t,"CustomMaterial",(function(){return n.CustomMaterial})),i.d(t,"ShaderAlebdoParts",(function(){return n.ShaderAlebdoParts})),i.d(t,"PBRCustomMaterial",(function(){return n.PBRCustomMaterial})),i.d(t,"FireMaterial",(function(){return n.FireMaterial})),i.d(t,"FurMaterial",(function(){return n.FurMaterial})),i.d(t,"GradientMaterial",(function(){return n.GradientMaterial})),i.d(t,"GridMaterial",(function(){return n.GridMaterial})),i.d(t,"LavaMaterial",(function(){return n.LavaMaterial})),i.d(t,"MixMaterial",(function(){return n.MixMaterial})),i.d(t,"NormalMaterial",(function(){return n.NormalMaterial})),i.d(t,"ShadowOnlyMaterial",(function(){return n.ShadowOnlyMaterial})),i.d(t,"SimpleMaterial",(function(){return n.SimpleMaterial})),i.d(t,"SkyMaterial",(function(){return n.SkyMaterial})),i.d(t,"TerrainMaterial",(function(){return n.TerrainMaterial})),i.d(t,"TriPlanarMaterial",(function(){return n.TriPlanarMaterial})),i.d(t,"WaterMaterial",(function(){return n.WaterMaterial}));var r=void 0!==e?e:"undefined"!=typeof window?window:void 0;if(void 0!==r)for(var o in r.BABYLON=r.BABYLON||{},n)r.BABYLON[o]=n[o]}.call(this,i(2))}])}));

/***/ }),

/***/ "./node_modules/babylonjs/babylon.js":
/*!*******************************************!*\
  !*** ./node_modules/babylonjs/babylon.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():0}("undefined"!=typeof self?self:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:this,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=169)}([function(e,t,i){"use strict";i.d(t,"d",(function(){return c})),i.d(t,"e",(function(){return l})),i.d(t,"f",(function(){return u})),i.d(t,"b",(function(){return h})),i.d(t,"a",(function(){return d})),i.d(t,"c",(function(){return p}));var n=i(14),r=i(28),o=i(44),a=i(11),s=i(74),c=function(){function e(e,t){void 0===e&&(e=0),void 0===t&&(t=0),this.x=e,this.y=t}return e.prototype.toString=function(){return"{X: "+this.x+" Y: "+this.y+"}"},e.prototype.getClassName=function(){return"Vector2"},e.prototype.getHashCode=function(){var e=0|this.x;return e=397*e^(0|this.y)},e.prototype.toArray=function(e,t){return void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,this},e.prototype.fromArray=function(t,i){return void 0===i&&(i=0),e.FromArrayToRef(t,i,this),this},e.prototype.asArray=function(){var e=new Array;return this.toArray(e,0),e},e.prototype.copyFrom=function(e){return this.x=e.x,this.y=e.y,this},e.prototype.copyFromFloats=function(e,t){return this.x=e,this.y=t,this},e.prototype.set=function(e,t){return this.copyFromFloats(e,t)},e.prototype.add=function(t){return new e(this.x+t.x,this.y+t.y)},e.prototype.addToRef=function(e,t){return t.x=this.x+e.x,t.y=this.y+e.y,this},e.prototype.addInPlace=function(e){return this.x+=e.x,this.y+=e.y,this},e.prototype.addVector3=function(t){return new e(this.x+t.x,this.y+t.y)},e.prototype.subtract=function(t){return new e(this.x-t.x,this.y-t.y)},e.prototype.subtractToRef=function(e,t){return t.x=this.x-e.x,t.y=this.y-e.y,this},e.prototype.subtractInPlace=function(e){return this.x-=e.x,this.y-=e.y,this},e.prototype.multiplyInPlace=function(e){return this.x*=e.x,this.y*=e.y,this},e.prototype.multiply=function(t){return new e(this.x*t.x,this.y*t.y)},e.prototype.multiplyToRef=function(e,t){return t.x=this.x*e.x,t.y=this.y*e.y,this},e.prototype.multiplyByFloats=function(t,i){return new e(this.x*t,this.y*i)},e.prototype.divide=function(t){return new e(this.x/t.x,this.y/t.y)},e.prototype.divideToRef=function(e,t){return t.x=this.x/e.x,t.y=this.y/e.y,this},e.prototype.divideInPlace=function(e){return this.divideToRef(e,this)},e.prototype.negate=function(){return new e(-this.x,-this.y)},e.prototype.negateInPlace=function(){return this.x*=-1,this.y*=-1,this},e.prototype.negateToRef=function(e){return e.copyFromFloats(-1*this.x,-1*this.y)},e.prototype.scaleInPlace=function(e){return this.x*=e,this.y*=e,this},e.prototype.scale=function(t){var i=new e(0,0);return this.scaleToRef(t,i),i},e.prototype.scaleToRef=function(e,t){return t.x=this.x*e,t.y=this.y*e,this},e.prototype.scaleAndAddToRef=function(e,t){return t.x+=this.x*e,t.y+=this.y*e,this},e.prototype.equals=function(e){return e&&this.x===e.x&&this.y===e.y},e.prototype.equalsWithEpsilon=function(e,t){return void 0===t&&(t=r.a),e&&n.a.WithinEpsilon(this.x,e.x,t)&&n.a.WithinEpsilon(this.y,e.y,t)},e.prototype.floor=function(){return new e(Math.floor(this.x),Math.floor(this.y))},e.prototype.fract=function(){return new e(this.x-Math.floor(this.x),this.y-Math.floor(this.y))},e.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},e.prototype.lengthSquared=function(){return this.x*this.x+this.y*this.y},e.prototype.normalize=function(){var e=this.length();return 0===e||(this.x/=e,this.y/=e),this},e.prototype.clone=function(){return new e(this.x,this.y)},e.Zero=function(){return new e(0,0)},e.One=function(){return new e(1,1)},e.FromArray=function(t,i){return void 0===i&&(i=0),new e(t[i],t[i+1])},e.FromArrayToRef=function(e,t,i){i.x=e[t],i.y=e[t+1]},e.CatmullRom=function(t,i,n,r,o){var a=o*o,s=o*a;return new e(.5*(2*i.x+(-t.x+n.x)*o+(2*t.x-5*i.x+4*n.x-r.x)*a+(-t.x+3*i.x-3*n.x+r.x)*s),.5*(2*i.y+(-t.y+n.y)*o+(2*t.y-5*i.y+4*n.y-r.y)*a+(-t.y+3*i.y-3*n.y+r.y)*s))},e.Clamp=function(t,i,n){var r=t.x;r=(r=r>n.x?n.x:r)<i.x?i.x:r;var o=t.y;return new e(r,o=(o=o>n.y?n.y:o)<i.y?i.y:o)},e.Hermite=function(t,i,n,r,o){var a=o*o,s=o*a,c=2*s-3*a+1,l=-2*s+3*a,u=s-2*a+o,h=s-a;return new e(t.x*c+n.x*l+i.x*u+r.x*h,t.y*c+n.y*l+i.y*u+r.y*h)},e.Lerp=function(t,i,n){return new e(t.x+(i.x-t.x)*n,t.y+(i.y-t.y)*n)},e.Dot=function(e,t){return e.x*t.x+e.y*t.y},e.Normalize=function(e){var t=e.clone();return t.normalize(),t},e.Minimize=function(t,i){return new e(t.x<i.x?t.x:i.x,t.y<i.y?t.y:i.y)},e.Maximize=function(t,i){return new e(t.x>i.x?t.x:i.x,t.y>i.y?t.y:i.y)},e.Transform=function(t,i){var n=e.Zero();return e.TransformToRef(t,i,n),n},e.TransformToRef=function(e,t,i){var n=t.m,r=e.x*n[0]+e.y*n[4]+n[12],o=e.x*n[1]+e.y*n[5]+n[13];i.x=r,i.y=o},e.PointInTriangle=function(e,t,i,n){var r=.5*(-i.y*n.x+t.y*(-i.x+n.x)+t.x*(i.y-n.y)+i.x*n.y),o=r<0?-1:1,a=(t.y*n.x-t.x*n.y+(n.y-t.y)*e.x+(t.x-n.x)*e.y)*o,s=(t.x*i.y-t.y*i.x+(t.y-i.y)*e.x+(i.x-t.x)*e.y)*o;return a>0&&s>0&&a+s<2*r*o},e.Distance=function(t,i){return Math.sqrt(e.DistanceSquared(t,i))},e.DistanceSquared=function(e,t){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n},e.Center=function(e,t){var i=e.add(t);return i.scaleInPlace(.5),i},e.DistanceOfPointFromSegment=function(t,i,n){var r=e.DistanceSquared(i,n);if(0===r)return e.Distance(t,i);var o=n.subtract(i),a=Math.max(0,Math.min(1,e.Dot(t.subtract(i),o)/r)),s=i.add(o.multiplyByFloats(a,a));return e.Distance(t,s)},e}(),l=function(){function e(e,t,i){void 0===e&&(e=0),void 0===t&&(t=0),void 0===i&&(i=0),this._isDirty=!0,this._x=e,this._y=t,this._z=i}return Object.defineProperty(e.prototype,"x",{get:function(){return this._x},set:function(e){this._x=e,this._isDirty=!0},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._y},set:function(e){this._y=e,this._isDirty=!0},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"z",{get:function(){return this._z},set:function(e){this._z=e,this._isDirty=!0},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return"{X: "+this._x+" Y:"+this._y+" Z:"+this._z+"}"},e.prototype.getClassName=function(){return"Vector3"},e.prototype.getHashCode=function(){var e=0|this._x;return e=397*(e=397*e^(0|this._y))^(0|this._z)},e.prototype.asArray=function(){var e=[];return this.toArray(e,0),e},e.prototype.toArray=function(e,t){return void 0===t&&(t=0),e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,this},e.prototype.fromArray=function(t,i){return void 0===i&&(i=0),e.FromArrayToRef(t,i,this),this},e.prototype.toQuaternion=function(){return h.RotationYawPitchRoll(this._y,this._x,this._z)},e.prototype.addInPlace=function(e){return this.addInPlaceFromFloats(e._x,e._y,e._z)},e.prototype.addInPlaceFromFloats=function(e,t,i){return this.x+=e,this.y+=t,this.z+=i,this},e.prototype.add=function(t){return new e(this._x+t._x,this._y+t._y,this._z+t._z)},e.prototype.addToRef=function(e,t){return t.copyFromFloats(this._x+e._x,this._y+e._y,this._z+e._z)},e.prototype.subtractInPlace=function(e){return this.x-=e._x,this.y-=e._y,this.z-=e._z,this},e.prototype.subtract=function(t){return new e(this._x-t._x,this._y-t._y,this._z-t._z)},e.prototype.subtractToRef=function(e,t){return this.subtractFromFloatsToRef(e._x,e._y,e._z,t)},e.prototype.subtractFromFloats=function(t,i,n){return new e(this._x-t,this._y-i,this._z-n)},e.prototype.subtractFromFloatsToRef=function(e,t,i,n){return n.copyFromFloats(this._x-e,this._y-t,this._z-i)},e.prototype.negate=function(){return new e(-this._x,-this._y,-this._z)},e.prototype.negateInPlace=function(){return this.x*=-1,this.y*=-1,this.z*=-1,this},e.prototype.negateToRef=function(e){return e.copyFromFloats(-1*this._x,-1*this._y,-1*this._z)},e.prototype.scaleInPlace=function(e){return this.x*=e,this.y*=e,this.z*=e,this},e.prototype.scale=function(t){return new e(this._x*t,this._y*t,this._z*t)},e.prototype.scaleToRef=function(e,t){return t.copyFromFloats(this._x*e,this._y*e,this._z*e)},e.prototype.scaleAndAddToRef=function(e,t){return t.addInPlaceFromFloats(this._x*e,this._y*e,this._z*e)},e.prototype.projectOnPlane=function(t,i){var n=e.Zero();return this.projectOnPlaneToRef(t,i,n),n},e.prototype.projectOnPlaneToRef=function(t,i,n){var r=t.normal,o=t.d,a=f.Vector3[0];this.subtractToRef(i,a),a.normalize();var s=e.Dot(a,r),c=-(e.Dot(i,r)+o)/s,l=a.scaleInPlace(c);i.addToRef(l,n)},e.prototype.equals=function(e){return e&&this._x===e._x&&this._y===e._y&&this._z===e._z},e.prototype.equalsWithEpsilon=function(e,t){return void 0===t&&(t=r.a),e&&n.a.WithinEpsilon(this._x,e._x,t)&&n.a.WithinEpsilon(this._y,e._y,t)&&n.a.WithinEpsilon(this._z,e._z,t)},e.prototype.equalsToFloats=function(e,t,i){return this._x===e&&this._y===t&&this._z===i},e.prototype.multiplyInPlace=function(e){return this.x*=e._x,this.y*=e._y,this.z*=e._z,this},e.prototype.multiply=function(e){return this.multiplyByFloats(e._x,e._y,e._z)},e.prototype.multiplyToRef=function(e,t){return t.copyFromFloats(this._x*e._x,this._y*e._y,this._z*e._z)},e.prototype.multiplyByFloats=function(t,i,n){return new e(this._x*t,this._y*i,this._z*n)},e.prototype.divide=function(t){return new e(this._x/t._x,this._y/t._y,this._z/t._z)},e.prototype.divideToRef=function(e,t){return t.copyFromFloats(this._x/e._x,this._y/e._y,this._z/e._z)},e.prototype.divideInPlace=function(e){return this.divideToRef(e,this)},e.prototype.minimizeInPlace=function(e){return this.minimizeInPlaceFromFloats(e._x,e._y,e._z)},e.prototype.maximizeInPlace=function(e){return this.maximizeInPlaceFromFloats(e._x,e._y,e._z)},e.prototype.minimizeInPlaceFromFloats=function(e,t,i){return e<this._x&&(this.x=e),t<this._y&&(this.y=t),i<this._z&&(this.z=i),this},e.prototype.maximizeInPlaceFromFloats=function(e,t,i){return e>this._x&&(this.x=e),t>this._y&&(this.y=t),i>this._z&&(this.z=i),this},e.prototype.isNonUniformWithinEpsilon=function(e){var t=Math.abs(this._x),i=Math.abs(this._y);if(!n.a.WithinEpsilon(t,i,e))return!0;var r=Math.abs(this._z);return!n.a.WithinEpsilon(t,r,e)||!n.a.WithinEpsilon(i,r,e)},Object.defineProperty(e.prototype,"isNonUniform",{get:function(){var e=Math.abs(this._x);return e!==Math.abs(this._y)||e!==Math.abs(this._z)},enumerable:!1,configurable:!0}),e.prototype.floor=function(){return new e(Math.floor(this._x),Math.floor(this._y),Math.floor(this._z))},e.prototype.fract=function(){return new e(this._x-Math.floor(this._x),this._y-Math.floor(this._y),this._z-Math.floor(this._z))},e.prototype.length=function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z)},e.prototype.lengthSquared=function(){return this._x*this._x+this._y*this._y+this._z*this._z},e.prototype.normalize=function(){return this.normalizeFromLength(this.length())},e.prototype.reorderInPlace=function(e){var t=this;return"xyz"===(e=e.toLowerCase())||(f.Vector3[0].copyFrom(this),["x","y","z"].forEach((function(i,n){t[i]=f.Vector3[0][e[n]]}))),this},e.prototype.rotateByQuaternionToRef=function(t,i){return t.toRotationMatrix(f.Matrix[0]),e.TransformCoordinatesToRef(this,f.Matrix[0],i),i},e.prototype.rotateByQuaternionAroundPointToRef=function(e,t,i){return this.subtractToRef(t,f.Vector3[0]),f.Vector3[0].rotateByQuaternionToRef(e,f.Vector3[0]),t.addToRef(f.Vector3[0],i),i},e.prototype.cross=function(t){return e.Cross(this,t)},e.prototype.normalizeFromLength=function(e){return 0===e||1===e?this:this.scaleInPlace(1/e)},e.prototype.normalizeToNew=function(){var t=new e(0,0,0);return this.normalizeToRef(t),t},e.prototype.normalizeToRef=function(e){var t=this.length();return 0===t||1===t?e.copyFromFloats(this._x,this._y,this._z):this.scaleToRef(1/t,e)},e.prototype.clone=function(){return new e(this._x,this._y,this._z)},e.prototype.copyFrom=function(e){return this.copyFromFloats(e._x,e._y,e._z)},e.prototype.copyFromFloats=function(e,t,i){return this.x=e,this.y=t,this.z=i,this},e.prototype.set=function(e,t,i){return this.copyFromFloats(e,t,i)},e.prototype.setAll=function(e){return this.x=this.y=this.z=e,this},e.GetClipFactor=function(t,i,n,r){var o=e.Dot(t,n)-r;return o/(o-(e.Dot(i,n)-r))},e.GetAngleBetweenVectors=function(t,i,n){var r=t.normalizeToRef(f.Vector3[1]),o=i.normalizeToRef(f.Vector3[2]),a=e.Dot(r,o),s=f.Vector3[3];return e.CrossToRef(r,o,s),e.Dot(s,n)>0?Math.acos(a):-Math.acos(a)},e.FromArray=function(t,i){return void 0===i&&(i=0),new e(t[i],t[i+1],t[i+2])},e.FromFloatArray=function(t,i){return e.FromArray(t,i)},e.FromArrayToRef=function(e,t,i){i.x=e[t],i.y=e[t+1],i.z=e[t+2]},e.FromFloatArrayToRef=function(t,i,n){return e.FromArrayToRef(t,i,n)},e.FromFloatsToRef=function(e,t,i,n){n.copyFromFloats(e,t,i)},e.Zero=function(){return new e(0,0,0)},e.One=function(){return new e(1,1,1)},e.Up=function(){return new e(0,1,0)},Object.defineProperty(e,"UpReadOnly",{get:function(){return e._UpReadOnly},enumerable:!1,configurable:!0}),Object.defineProperty(e,"ZeroReadOnly",{get:function(){return e._ZeroReadOnly},enumerable:!1,configurable:!0}),e.Down=function(){return new e(0,-1,0)},e.Forward=function(t){return void 0===t&&(t=!1),new e(0,0,t?-1:1)},e.Backward=function(t){return void 0===t&&(t=!1),new e(0,0,t?1:-1)},e.Right=function(){return new e(1,0,0)},e.Left=function(){return new e(-1,0,0)},e.TransformCoordinates=function(t,i){var n=e.Zero();return e.TransformCoordinatesToRef(t,i,n),n},e.TransformCoordinatesToRef=function(t,i,n){e.TransformCoordinatesFromFloatsToRef(t._x,t._y,t._z,i,n)},e.TransformCoordinatesFromFloatsToRef=function(e,t,i,n,r){var o=n.m,a=e*o[0]+t*o[4]+i*o[8]+o[12],s=e*o[1]+t*o[5]+i*o[9]+o[13],c=e*o[2]+t*o[6]+i*o[10]+o[14],l=1/(e*o[3]+t*o[7]+i*o[11]+o[15]);r.x=a*l,r.y=s*l,r.z=c*l},e.TransformNormal=function(t,i){var n=e.Zero();return e.TransformNormalToRef(t,i,n),n},e.TransformNormalToRef=function(e,t,i){this.TransformNormalFromFloatsToRef(e._x,e._y,e._z,t,i)},e.TransformNormalFromFloatsToRef=function(e,t,i,n,r){var o=n.m;r.x=e*o[0]+t*o[4]+i*o[8],r.y=e*o[1]+t*o[5]+i*o[9],r.z=e*o[2]+t*o[6]+i*o[10]},e.CatmullRom=function(t,i,n,r,o){var a=o*o,s=o*a;return new e(.5*(2*i._x+(-t._x+n._x)*o+(2*t._x-5*i._x+4*n._x-r._x)*a+(-t._x+3*i._x-3*n._x+r._x)*s),.5*(2*i._y+(-t._y+n._y)*o+(2*t._y-5*i._y+4*n._y-r._y)*a+(-t._y+3*i._y-3*n._y+r._y)*s),.5*(2*i._z+(-t._z+n._z)*o+(2*t._z-5*i._z+4*n._z-r._z)*a+(-t._z+3*i._z-3*n._z+r._z)*s))},e.Clamp=function(t,i,n){var r=new e;return e.ClampToRef(t,i,n,r),r},e.ClampToRef=function(e,t,i,n){var r=e._x;r=(r=r>i._x?i._x:r)<t._x?t._x:r;var o=e._y;o=(o=o>i._y?i._y:o)<t._y?t._y:o;var a=e._z;a=(a=a>i._z?i._z:a)<t._z?t._z:a,n.copyFromFloats(r,o,a)},e.CheckExtends=function(e,t,i){t.minimizeInPlace(e),i.maximizeInPlace(e)},e.Hermite=function(t,i,n,r,o){var a=o*o,s=o*a,c=2*s-3*a+1,l=-2*s+3*a,u=s-2*a+o,h=s-a;return new e(t._x*c+n._x*l+i._x*u+r._x*h,t._y*c+n._y*l+i._y*u+r._y*h,t._z*c+n._z*l+i._z*u+r._z*h)},e.Lerp=function(t,i,n){var r=new e(0,0,0);return e.LerpToRef(t,i,n,r),r},e.LerpToRef=function(e,t,i,n){n.x=e._x+(t._x-e._x)*i,n.y=e._y+(t._y-e._y)*i,n.z=e._z+(t._z-e._z)*i},e.Dot=function(e,t){return e._x*t._x+e._y*t._y+e._z*t._z},e.Cross=function(t,i){var n=e.Zero();return e.CrossToRef(t,i,n),n},e.CrossToRef=function(e,t,i){var n=e._y*t._z-e._z*t._y,r=e._z*t._x-e._x*t._z,o=e._x*t._y-e._y*t._x;i.copyFromFloats(n,r,o)},e.Normalize=function(t){var i=e.Zero();return e.NormalizeToRef(t,i),i},e.NormalizeToRef=function(e,t){e.normalizeToRef(t)},e.Project=function(t,i,n,r){var o=new e;return e.ProjectToRef(t,i,n,r,o),o},e.ProjectToRef=function(t,i,n,r,o){var a=r.width,s=r.height,c=r.x,l=r.y,u=f.Matrix[1];d.FromValuesToRef(a/2,0,0,0,0,-s/2,0,0,0,0,.5,0,c+a/2,s/2+l,.5,1,u);var h=f.Matrix[0];return i.multiplyToRef(n,h),h.multiplyToRef(u,h),e.TransformCoordinatesToRef(t,h,o),o},e._UnprojectFromInvertedMatrixToRef=function(t,i,r){e.TransformCoordinatesToRef(t,i,r);var o=i.m,a=t._x*o[3]+t._y*o[7]+t._z*o[11]+o[15];n.a.WithinEpsilon(a,1)&&r.scaleInPlace(1/a)},e.UnprojectFromTransform=function(t,i,n,r,o){var a=f.Matrix[0];r.multiplyToRef(o,a),a.invert(),t.x=t._x/i*2-1,t.y=-(t._y/n*2-1);var s=new e;return e._UnprojectFromInvertedMatrixToRef(t,a,s),s},e.Unproject=function(t,i,n,r,o,a){var s=e.Zero();return e.UnprojectToRef(t,i,n,r,o,a,s),s},e.UnprojectToRef=function(t,i,n,r,o,a,s){e.UnprojectFloatsToRef(t._x,t._y,t._z,i,n,r,o,a,s)},e.UnprojectFloatsToRef=function(t,i,n,r,o,a,s,c,l){var u=f.Matrix[0];a.multiplyToRef(s,u),u.multiplyToRef(c,u),u.invert();var h=f.Vector3[0];h.x=t/r*2-1,h.y=-(i/o*2-1),h.z=2*n-1,e._UnprojectFromInvertedMatrixToRef(h,u,l)},e.Minimize=function(e,t){var i=e.clone();return i.minimizeInPlace(t),i},e.Maximize=function(e,t){var i=e.clone();return i.maximizeInPlace(t),i},e.Distance=function(t,i){return Math.sqrt(e.DistanceSquared(t,i))},e.DistanceSquared=function(e,t){var i=e._x-t._x,n=e._y-t._y,r=e._z-t._z;return i*i+n*n+r*r},e.Center=function(e,t){var i=e.add(t);return i.scaleInPlace(.5),i},e.RotationFromAxis=function(t,i,n){var r=e.Zero();return e.RotationFromAxisToRef(t,i,n,r),r},e.RotationFromAxisToRef=function(e,t,i,n){var r=f.Quaternion[0];h.RotationQuaternionFromAxisToRef(e,t,i,r),r.toEulerAnglesToRef(n)},e._UpReadOnly=e.Up(),e._ZeroReadOnly=e.Zero(),e}(),u=function(){function e(e,t,i,n){this.x=e,this.y=t,this.z=i,this.w=n}return e.prototype.toString=function(){return"{X: "+this.x+" Y:"+this.y+" Z:"+this.z+" W:"+this.w+"}"},e.prototype.getClassName=function(){return"Vector4"},e.prototype.getHashCode=function(){var e=0|this.x;return e=397*(e=397*(e=397*e^(0|this.y))^(0|this.z))^(0|this.w)},e.prototype.asArray=function(){var e=new Array;return this.toArray(e,0),e},e.prototype.toArray=function(e,t){return void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,this},e.prototype.fromArray=function(t,i){return void 0===i&&(i=0),e.FromArrayToRef(t,i,this),this},e.prototype.addInPlace=function(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this},e.prototype.add=function(t){return new e(this.x+t.x,this.y+t.y,this.z+t.z,this.w+t.w)},e.prototype.addToRef=function(e,t){return t.x=this.x+e.x,t.y=this.y+e.y,t.z=this.z+e.z,t.w=this.w+e.w,this},e.prototype.subtractInPlace=function(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this},e.prototype.subtract=function(t){return new e(this.x-t.x,this.y-t.y,this.z-t.z,this.w-t.w)},e.prototype.subtractToRef=function(e,t){return t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z,t.w=this.w-e.w,this},e.prototype.subtractFromFloats=function(t,i,n,r){return new e(this.x-t,this.y-i,this.z-n,this.w-r)},e.prototype.subtractFromFloatsToRef=function(e,t,i,n,r){return r.x=this.x-e,r.y=this.y-t,r.z=this.z-i,r.w=this.w-n,this},e.prototype.negate=function(){return new e(-this.x,-this.y,-this.z,-this.w)},e.prototype.negateInPlace=function(){return this.x*=-1,this.y*=-1,this.z*=-1,this.w*=-1,this},e.prototype.negateToRef=function(e){return e.copyFromFloats(-1*this.x,-1*this.y,-1*this.z,-1*this.w)},e.prototype.scaleInPlace=function(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this},e.prototype.scale=function(t){return new e(this.x*t,this.y*t,this.z*t,this.w*t)},e.prototype.scaleToRef=function(e,t){return t.x=this.x*e,t.y=this.y*e,t.z=this.z*e,t.w=this.w*e,this},e.prototype.scaleAndAddToRef=function(e,t){return t.x+=this.x*e,t.y+=this.y*e,t.z+=this.z*e,t.w+=this.w*e,this},e.prototype.equals=function(e){return e&&this.x===e.x&&this.y===e.y&&this.z===e.z&&this.w===e.w},e.prototype.equalsWithEpsilon=function(e,t){return void 0===t&&(t=r.a),e&&n.a.WithinEpsilon(this.x,e.x,t)&&n.a.WithinEpsilon(this.y,e.y,t)&&n.a.WithinEpsilon(this.z,e.z,t)&&n.a.WithinEpsilon(this.w,e.w,t)},e.prototype.equalsToFloats=function(e,t,i,n){return this.x===e&&this.y===t&&this.z===i&&this.w===n},e.prototype.multiplyInPlace=function(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this},e.prototype.multiply=function(t){return new e(this.x*t.x,this.y*t.y,this.z*t.z,this.w*t.w)},e.prototype.multiplyToRef=function(e,t){return t.x=this.x*e.x,t.y=this.y*e.y,t.z=this.z*e.z,t.w=this.w*e.w,this},e.prototype.multiplyByFloats=function(t,i,n,r){return new e(this.x*t,this.y*i,this.z*n,this.w*r)},e.prototype.divide=function(t){return new e(this.x/t.x,this.y/t.y,this.z/t.z,this.w/t.w)},e.prototype.divideToRef=function(e,t){return t.x=this.x/e.x,t.y=this.y/e.y,t.z=this.z/e.z,t.w=this.w/e.w,this},e.prototype.divideInPlace=function(e){return this.divideToRef(e,this)},e.prototype.minimizeInPlace=function(e){return e.x<this.x&&(this.x=e.x),e.y<this.y&&(this.y=e.y),e.z<this.z&&(this.z=e.z),e.w<this.w&&(this.w=e.w),this},e.prototype.maximizeInPlace=function(e){return e.x>this.x&&(this.x=e.x),e.y>this.y&&(this.y=e.y),e.z>this.z&&(this.z=e.z),e.w>this.w&&(this.w=e.w),this},e.prototype.floor=function(){return new e(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z),Math.floor(this.w))},e.prototype.fract=function(){return new e(this.x-Math.floor(this.x),this.y-Math.floor(this.y),this.z-Math.floor(this.z),this.w-Math.floor(this.w))},e.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},e.prototype.lengthSquared=function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},e.prototype.normalize=function(){var e=this.length();return 0===e?this:this.scaleInPlace(1/e)},e.prototype.toVector3=function(){return new l(this.x,this.y,this.z)},e.prototype.clone=function(){return new e(this.x,this.y,this.z,this.w)},e.prototype.copyFrom=function(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this},e.prototype.copyFromFloats=function(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this},e.prototype.set=function(e,t,i,n){return this.copyFromFloats(e,t,i,n)},e.prototype.setAll=function(e){return this.x=this.y=this.z=this.w=e,this},e.FromArray=function(t,i){return i||(i=0),new e(t[i],t[i+1],t[i+2],t[i+3])},e.FromArrayToRef=function(e,t,i){i.x=e[t],i.y=e[t+1],i.z=e[t+2],i.w=e[t+3]},e.FromFloatArrayToRef=function(t,i,n){e.FromArrayToRef(t,i,n)},e.FromFloatsToRef=function(e,t,i,n,r){r.x=e,r.y=t,r.z=i,r.w=n},e.Zero=function(){return new e(0,0,0,0)},e.One=function(){return new e(1,1,1,1)},e.Normalize=function(t){var i=e.Zero();return e.NormalizeToRef(t,i),i},e.NormalizeToRef=function(e,t){t.copyFrom(e),t.normalize()},e.Minimize=function(e,t){var i=e.clone();return i.minimizeInPlace(t),i},e.Maximize=function(e,t){var i=e.clone();return i.maximizeInPlace(t),i},e.Distance=function(t,i){return Math.sqrt(e.DistanceSquared(t,i))},e.DistanceSquared=function(e,t){var i=e.x-t.x,n=e.y-t.y,r=e.z-t.z,o=e.w-t.w;return i*i+n*n+r*r+o*o},e.Center=function(e,t){var i=e.add(t);return i.scaleInPlace(.5),i},e.TransformNormal=function(t,i){var n=e.Zero();return e.TransformNormalToRef(t,i,n),n},e.TransformNormalToRef=function(e,t,i){var n=t.m,r=e.x*n[0]+e.y*n[4]+e.z*n[8],o=e.x*n[1]+e.y*n[5]+e.z*n[9],a=e.x*n[2]+e.y*n[6]+e.z*n[10];i.x=r,i.y=o,i.z=a,i.w=e.w},e.TransformNormalFromFloatsToRef=function(e,t,i,n,r,o){var a=r.m;o.x=e*a[0]+t*a[4]+i*a[8],o.y=e*a[1]+t*a[5]+i*a[9],o.z=e*a[2]+t*a[6]+i*a[10],o.w=n},e.FromVector3=function(t,i){return void 0===i&&(i=0),new e(t._x,t._y,t._z,i)},e}(),h=function(){function e(e,t,i,n){void 0===e&&(e=0),void 0===t&&(t=0),void 0===i&&(i=0),void 0===n&&(n=1),this._isDirty=!0,this._x=e,this._y=t,this._z=i,this._w=n}return Object.defineProperty(e.prototype,"x",{get:function(){return this._x},set:function(e){this._x=e,this._isDirty=!0},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._y},set:function(e){this._y=e,this._isDirty=!0},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"z",{get:function(){return this._z},set:function(e){this._z=e,this._isDirty=!0},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"w",{get:function(){return this._w},set:function(e){this._w=e,this._isDirty=!0},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return"{X: "+this._x+" Y:"+this._y+" Z:"+this._z+" W:"+this._w+"}"},e.prototype.getClassName=function(){return"Quaternion"},e.prototype.getHashCode=function(){var e=0|this._x;return e=397*(e=397*(e=397*e^(0|this._y))^(0|this._z))^(0|this._w)},e.prototype.asArray=function(){return[this._x,this._y,this._z,this._w]},e.prototype.equals=function(e){return e&&this._x===e._x&&this._y===e._y&&this._z===e._z&&this._w===e._w},e.prototype.equalsWithEpsilon=function(e,t){return void 0===t&&(t=r.a),e&&n.a.WithinEpsilon(this._x,e._x,t)&&n.a.WithinEpsilon(this._y,e._y,t)&&n.a.WithinEpsilon(this._z,e._z,t)&&n.a.WithinEpsilon(this._w,e._w,t)},e.prototype.clone=function(){return new e(this._x,this._y,this._z,this._w)},e.prototype.copyFrom=function(e){return this.x=e._x,this.y=e._y,this.z=e._z,this.w=e._w,this},e.prototype.copyFromFloats=function(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this},e.prototype.set=function(e,t,i,n){return this.copyFromFloats(e,t,i,n)},e.prototype.add=function(t){return new e(this._x+t._x,this._y+t._y,this._z+t._z,this._w+t._w)},e.prototype.addInPlace=function(e){return this._x+=e._x,this._y+=e._y,this._z+=e._z,this._w+=e._w,this},e.prototype.subtract=function(t){return new e(this._x-t._x,this._y-t._y,this._z-t._z,this._w-t._w)},e.prototype.scale=function(t){return new e(this._x*t,this._y*t,this._z*t,this._w*t)},e.prototype.scaleToRef=function(e,t){return t.x=this._x*e,t.y=this._y*e,t.z=this._z*e,t.w=this._w*e,this},e.prototype.scaleInPlace=function(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this},e.prototype.scaleAndAddToRef=function(e,t){return t.x+=this._x*e,t.y+=this._y*e,t.z+=this._z*e,t.w+=this._w*e,this},e.prototype.multiply=function(t){var i=new e(0,0,0,1);return this.multiplyToRef(t,i),i},e.prototype.multiplyToRef=function(e,t){var i=this._x*e._w+this._y*e._z-this._z*e._y+this._w*e._x,n=-this._x*e._z+this._y*e._w+this._z*e._x+this._w*e._y,r=this._x*e._y-this._y*e._x+this._z*e._w+this._w*e._z,o=-this._x*e._x-this._y*e._y-this._z*e._z+this._w*e._w;return t.copyFromFloats(i,n,r,o),this},e.prototype.multiplyInPlace=function(e){return this.multiplyToRef(e,this),this},e.prototype.conjugateToRef=function(e){return e.copyFromFloats(-this._x,-this._y,-this._z,this._w),this},e.prototype.conjugateInPlace=function(){return this.x*=-1,this.y*=-1,this.z*=-1,this},e.prototype.conjugate=function(){return new e(-this._x,-this._y,-this._z,this._w)},e.prototype.length=function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},e.prototype.normalize=function(){var e=this.length();if(0===e)return this;var t=1/e;return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this},e.prototype.toEulerAngles=function(e){void 0===e&&(e="YZX");var t=l.Zero();return this.toEulerAnglesToRef(t),t},e.prototype.toEulerAnglesToRef=function(e){var t=this._z,i=this._x,n=this._y,r=this._w,o=r*r,a=t*t,s=i*i,c=n*n,l=n*t-i*r;return l<-.4999999?(e.y=2*Math.atan2(n,r),e.x=Math.PI/2,e.z=0):l>.4999999?(e.y=2*Math.atan2(n,r),e.x=-Math.PI/2,e.z=0):(e.z=Math.atan2(2*(i*n+t*r),-a-s+c+o),e.x=Math.asin(-2*(t*n-i*r)),e.y=Math.atan2(2*(t*i+n*r),a-s-c+o)),this},e.prototype.toRotationMatrix=function(e){return d.FromQuaternionToRef(this,e),this},e.prototype.fromRotationMatrix=function(t){return e.FromRotationMatrixToRef(t,this),this},e.FromRotationMatrix=function(t){var i=new e;return e.FromRotationMatrixToRef(t,i),i},e.FromRotationMatrixToRef=function(e,t){var i,n=e.m,r=n[0],o=n[4],a=n[8],s=n[1],c=n[5],l=n[9],u=n[2],h=n[6],d=n[10],f=r+c+d;f>0?(i=.5/Math.sqrt(f+1),t.w=.25/i,t.x=(h-l)*i,t.y=(a-u)*i,t.z=(s-o)*i):r>c&&r>d?(i=2*Math.sqrt(1+r-c-d),t.w=(h-l)/i,t.x=.25*i,t.y=(o+s)/i,t.z=(a+u)/i):c>d?(i=2*Math.sqrt(1+c-r-d),t.w=(a-u)/i,t.x=(o+s)/i,t.y=.25*i,t.z=(l+h)/i):(i=2*Math.sqrt(1+d-r-c),t.w=(s-o)/i,t.x=(a+u)/i,t.y=(l+h)/i,t.z=.25*i)},e.Dot=function(e,t){return e._x*t._x+e._y*t._y+e._z*t._z+e._w*t._w},e.AreClose=function(t,i){return e.Dot(t,i)>=0},e.Zero=function(){return new e(0,0,0,0)},e.Inverse=function(t){return new e(-t._x,-t._y,-t._z,t._w)},e.InverseToRef=function(e,t){return t.set(-e._x,-e._y,-e._z,e._w),t},e.Identity=function(){return new e(0,0,0,1)},e.IsIdentity=function(e){return e&&0===e._x&&0===e._y&&0===e._z&&1===e._w},e.RotationAxis=function(t,i){return e.RotationAxisToRef(t,i,new e)},e.RotationAxisToRef=function(e,t,i){var n=Math.sin(t/2);return e.normalize(),i.w=Math.cos(t/2),i.x=e._x*n,i.y=e._y*n,i.z=e._z*n,i},e.FromArray=function(t,i){return i||(i=0),new e(t[i],t[i+1],t[i+2],t[i+3])},e.FromArrayToRef=function(e,t,i){i.x=e[t],i.y=e[t+1],i.z=e[t+2],i.w=e[t+3]},e.FromEulerAngles=function(t,i,n){var r=new e;return e.RotationYawPitchRollToRef(i,t,n,r),r},e.FromEulerAnglesToRef=function(t,i,n,r){return e.RotationYawPitchRollToRef(i,t,n,r),r},e.FromEulerVector=function(t){var i=new e;return e.RotationYawPitchRollToRef(t._y,t._x,t._z,i),i},e.FromEulerVectorToRef=function(t,i){return e.RotationYawPitchRollToRef(t._y,t._x,t._z,i),i},e.RotationYawPitchRoll=function(t,i,n){var r=new e;return e.RotationYawPitchRollToRef(t,i,n,r),r},e.RotationYawPitchRollToRef=function(e,t,i,n){var r=.5*i,o=.5*t,a=.5*e,s=Math.sin(r),c=Math.cos(r),l=Math.sin(o),u=Math.cos(o),h=Math.sin(a),d=Math.cos(a);n.x=d*l*c+h*u*s,n.y=h*u*c-d*l*s,n.z=d*u*s-h*l*c,n.w=d*u*c+h*l*s},e.RotationAlphaBetaGamma=function(t,i,n){var r=new e;return e.RotationAlphaBetaGammaToRef(t,i,n,r),r},e.RotationAlphaBetaGammaToRef=function(e,t,i,n){var r=.5*(i+e),o=.5*(i-e),a=.5*t;n.x=Math.cos(o)*Math.sin(a),n.y=Math.sin(o)*Math.sin(a),n.z=Math.sin(r)*Math.cos(a),n.w=Math.cos(r)*Math.cos(a)},e.RotationQuaternionFromAxis=function(t,i,n){var r=new e(0,0,0,0);return e.RotationQuaternionFromAxisToRef(t,i,n,r),r},e.RotationQuaternionFromAxisToRef=function(t,i,n,r){var o=f.Matrix[0];d.FromXYZAxesToRef(t.normalize(),i.normalize(),n.normalize(),o),e.FromRotationMatrixToRef(o,r)},e.Slerp=function(t,i,n){var r=e.Identity();return e.SlerpToRef(t,i,n,r),r},e.SlerpToRef=function(e,t,i,n){var r,o,a=e._x*t._x+e._y*t._y+e._z*t._z+e._w*t._w,s=!1;if(a<0&&(s=!0,a=-a),a>.999999)o=1-i,r=s?-i:i;else{var c=Math.acos(a),l=1/Math.sin(c);o=Math.sin((1-i)*c)*l,r=s?-Math.sin(i*c)*l:Math.sin(i*c)*l}n.x=o*e._x+r*t._x,n.y=o*e._y+r*t._y,n.z=o*e._z+r*t._z,n.w=o*e._w+r*t._w},e.Hermite=function(t,i,n,r,o){var a=o*o,s=o*a,c=2*s-3*a+1,l=-2*s+3*a,u=s-2*a+o,h=s-a;return new e(t._x*c+n._x*l+i._x*u+r._x*h,t._y*c+n._y*l+i._y*u+r._y*h,t._z*c+n._z*l+i._z*u+r._z*h,t._w*c+n._w*l+i._w*u+r._w*h)},e}(),d=function(){function e(){this._isIdentity=!1,this._isIdentityDirty=!0,this._isIdentity3x2=!0,this._isIdentity3x2Dirty=!0,this.updateFlag=-1,s.a.MatrixTrackPrecisionChange&&s.a.MatrixTrackedMatrices.push(this),this._m=new s.a.MatrixCurrentType(16),this._updateIdentityStatus(!1)}return Object.defineProperty(e,"Use64Bits",{get:function(){return s.a.MatrixUse64Bits},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"m",{get:function(){return this._m},enumerable:!1,configurable:!0}),e.prototype._markAsUpdated=function(){this.updateFlag=e._updateFlagSeed++,this._isIdentity=!1,this._isIdentity3x2=!1,this._isIdentityDirty=!0,this._isIdentity3x2Dirty=!0},e.prototype._updateIdentityStatus=function(t,i,n,r){void 0===i&&(i=!1),void 0===n&&(n=!1),void 0===r&&(r=!0),this.updateFlag=e._updateFlagSeed++,this._isIdentity=t,this._isIdentity3x2=t||n,this._isIdentityDirty=!this._isIdentity&&i,this._isIdentity3x2Dirty=!this._isIdentity3x2&&r},e.prototype.isIdentity=function(){if(this._isIdentityDirty){this._isIdentityDirty=!1;var e=this._m;this._isIdentity=1===e[0]&&0===e[1]&&0===e[2]&&0===e[3]&&0===e[4]&&1===e[5]&&0===e[6]&&0===e[7]&&0===e[8]&&0===e[9]&&1===e[10]&&0===e[11]&&0===e[12]&&0===e[13]&&0===e[14]&&1===e[15]}return this._isIdentity},e.prototype.isIdentityAs3x2=function(){return this._isIdentity3x2Dirty&&(this._isIdentity3x2Dirty=!1,1!==this._m[0]||1!==this._m[5]||1!==this._m[15]||0!==this._m[1]||0!==this._m[2]||0!==this._m[3]||0!==this._m[4]||0!==this._m[6]||0!==this._m[7]||0!==this._m[8]||0!==this._m[9]||0!==this._m[10]||0!==this._m[11]||0!==this._m[12]||0!==this._m[13]||0!==this._m[14]?this._isIdentity3x2=!1:this._isIdentity3x2=!0),this._isIdentity3x2},e.prototype.determinant=function(){if(!0===this._isIdentity)return 1;var e=this._m,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],s=e[6],c=e[7],l=e[8],u=e[9],h=e[10],d=e[11],f=e[12],p=e[13],_=e[14],m=e[15],g=h*m-_*d,v=u*m-p*d,b=u*_-p*h,y=l*m-f*d,T=l*_-h*f,E=l*p-f*u;return t*+(a*g-s*v+c*b)+i*-(o*g-s*y+c*T)+n*+(o*v-a*y+c*E)+r*-(o*b-a*T+s*E)},e.prototype.toArray=function(){return this._m},e.prototype.asArray=function(){return this._m},e.prototype.invert=function(){return this.invertToRef(this),this},e.prototype.reset=function(){return e.FromValuesToRef(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,this),this._updateIdentityStatus(!1),this},e.prototype.add=function(t){var i=new e;return this.addToRef(t,i),i},e.prototype.addToRef=function(e,t){for(var i=this._m,n=t._m,r=e.m,o=0;o<16;o++)n[o]=i[o]+r[o];return t._markAsUpdated(),this},e.prototype.addToSelf=function(e){for(var t=this._m,i=e.m,n=0;n<16;n++)t[n]+=i[n];return this._markAsUpdated(),this},e.prototype.invertToRef=function(t){if(!0===this._isIdentity)return e.IdentityToRef(t),this;var i=this._m,n=i[0],r=i[1],o=i[2],a=i[3],s=i[4],c=i[5],l=i[6],u=i[7],h=i[8],d=i[9],f=i[10],p=i[11],_=i[12],m=i[13],g=i[14],v=i[15],b=f*v-g*p,y=d*v-m*p,T=d*g-m*f,E=h*v-_*p,S=h*g-f*_,A=h*m-_*d,P=+(c*b-l*y+u*T),C=-(s*b-l*E+u*S),R=+(s*y-c*E+u*A),x=-(s*T-c*S+l*A),O=n*P+r*C+o*R+a*x;if(0===O)return t.copyFrom(this),this;var M=1/O,I=l*v-g*u,D=c*v-m*u,N=c*g-m*l,L=s*v-_*u,w=s*g-_*l,F=s*m-_*c,B=l*p-f*u,U=c*p-d*u,V=c*f-d*l,k=s*p-h*u,z=s*f-h*l,G=s*d-h*c,j=-(r*b-o*y+a*T),W=+(n*b-o*E+a*S),H=-(n*y-r*E+a*A),X=+(n*T-r*S+o*A),Y=+(r*I-o*D+a*N),K=-(n*I-o*L+a*w),Q=+(n*D-r*L+a*F),q=-(n*N-r*w+o*F),Z=-(r*B-o*U+a*V),J=+(n*B-o*k+a*z),$=-(n*U-r*k+a*G),ee=+(n*V-r*z+o*G);return e.FromValuesToRef(P*M,j*M,Y*M,Z*M,C*M,W*M,K*M,J*M,R*M,H*M,Q*M,$*M,x*M,X*M,q*M,ee*M,t),this},e.prototype.addAtIndex=function(e,t){return this._m[e]+=t,this._markAsUpdated(),this},e.prototype.multiplyAtIndex=function(e,t){return this._m[e]*=t,this._markAsUpdated(),this},e.prototype.setTranslationFromFloats=function(e,t,i){return this._m[12]=e,this._m[13]=t,this._m[14]=i,this._markAsUpdated(),this},e.prototype.addTranslationFromFloats=function(e,t,i){return this._m[12]+=e,this._m[13]+=t,this._m[14]+=i,this._markAsUpdated(),this},e.prototype.setTranslation=function(e){return this.setTranslationFromFloats(e._x,e._y,e._z)},e.prototype.getTranslation=function(){return new l(this._m[12],this._m[13],this._m[14])},e.prototype.getTranslationToRef=function(e){return e.x=this._m[12],e.y=this._m[13],e.z=this._m[14],this},e.prototype.removeRotationAndScaling=function(){var t=this.m;return e.FromValuesToRef(1,0,0,0,0,1,0,0,0,0,1,0,t[12],t[13],t[14],t[15],this),this._updateIdentityStatus(0===t[12]&&0===t[13]&&0===t[14]&&1===t[15]),this},e.prototype.multiply=function(t){var i=new e;return this.multiplyToRef(t,i),i},e.prototype.copyFrom=function(e){e.copyToArray(this._m);var t=e;return this._updateIdentityStatus(t._isIdentity,t._isIdentityDirty,t._isIdentity3x2,t._isIdentity3x2Dirty),this},e.prototype.copyToArray=function(e,t){void 0===t&&(t=0);var i=this._m;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],this},e.prototype.multiplyToRef=function(e,t){return this._isIdentity?(t.copyFrom(e),this):e._isIdentity?(t.copyFrom(this),this):(this.multiplyToArray(e,t._m,0),t._markAsUpdated(),this)},e.prototype.multiplyToArray=function(e,t,i){var n=this._m,r=e.m,o=n[0],a=n[1],s=n[2],c=n[3],l=n[4],u=n[5],h=n[6],d=n[7],f=n[8],p=n[9],_=n[10],m=n[11],g=n[12],v=n[13],b=n[14],y=n[15],T=r[0],E=r[1],S=r[2],A=r[3],P=r[4],C=r[5],R=r[6],x=r[7],O=r[8],M=r[9],I=r[10],D=r[11],N=r[12],L=r[13],w=r[14],F=r[15];return t[i]=o*T+a*P+s*O+c*N,t[i+1]=o*E+a*C+s*M+c*L,t[i+2]=o*S+a*R+s*I+c*w,t[i+3]=o*A+a*x+s*D+c*F,t[i+4]=l*T+u*P+h*O+d*N,t[i+5]=l*E+u*C+h*M+d*L,t[i+6]=l*S+u*R+h*I+d*w,t[i+7]=l*A+u*x+h*D+d*F,t[i+8]=f*T+p*P+_*O+m*N,t[i+9]=f*E+p*C+_*M+m*L,t[i+10]=f*S+p*R+_*I+m*w,t[i+11]=f*A+p*x+_*D+m*F,t[i+12]=g*T+v*P+b*O+y*N,t[i+13]=g*E+v*C+b*M+y*L,t[i+14]=g*S+v*R+b*I+y*w,t[i+15]=g*A+v*x+b*D+y*F,this},e.prototype.equals=function(e){var t=e;if(!t)return!1;if((this._isIdentity||t._isIdentity)&&!this._isIdentityDirty&&!t._isIdentityDirty)return this._isIdentity&&t._isIdentity;var i=this.m,n=t.m;return i[0]===n[0]&&i[1]===n[1]&&i[2]===n[2]&&i[3]===n[3]&&i[4]===n[4]&&i[5]===n[5]&&i[6]===n[6]&&i[7]===n[7]&&i[8]===n[8]&&i[9]===n[9]&&i[10]===n[10]&&i[11]===n[11]&&i[12]===n[12]&&i[13]===n[13]&&i[14]===n[14]&&i[15]===n[15]},e.prototype.clone=function(){var t=new e;return t.copyFrom(this),t},e.prototype.getClassName=function(){return"Matrix"},e.prototype.getHashCode=function(){for(var e=0|this._m[0],t=1;t<16;t++)e=397*e^(0|this._m[t]);return e},e.prototype.decompose=function(t,i,n){if(this._isIdentity)return n&&n.setAll(0),t&&t.setAll(1),i&&i.copyFromFloats(0,0,0,1),!0;var r=this._m;if(n&&n.copyFromFloats(r[12],r[13],r[14]),(t=t||f.Vector3[0]).x=Math.sqrt(r[0]*r[0]+r[1]*r[1]+r[2]*r[2]),t.y=Math.sqrt(r[4]*r[4]+r[5]*r[5]+r[6]*r[6]),t.z=Math.sqrt(r[8]*r[8]+r[9]*r[9]+r[10]*r[10]),this.determinant()<=0&&(t.y*=-1),0===t._x||0===t._y||0===t._z)return i&&i.copyFromFloats(0,0,0,1),!1;if(i){var o=1/t._x,a=1/t._y,s=1/t._z;e.FromValuesToRef(r[0]*o,r[1]*o,r[2]*o,0,r[4]*a,r[5]*a,r[6]*a,0,r[8]*s,r[9]*s,r[10]*s,0,0,0,0,1,f.Matrix[0]),h.FromRotationMatrixToRef(f.Matrix[0],i)}return!0},e.prototype.getRow=function(e){if(e<0||e>3)return null;var t=4*e;return new u(this._m[t+0],this._m[t+1],this._m[t+2],this._m[t+3])},e.prototype.setRow=function(e,t){return this.setRowFromFloats(e,t.x,t.y,t.z,t.w)},e.prototype.transpose=function(){return e.Transpose(this)},e.prototype.transposeToRef=function(t){return e.TransposeToRef(this,t),this},e.prototype.setRowFromFloats=function(e,t,i,n,r){if(e<0||e>3)return this;var o=4*e;return this._m[o+0]=t,this._m[o+1]=i,this._m[o+2]=n,this._m[o+3]=r,this._markAsUpdated(),this},e.prototype.scale=function(t){var i=new e;return this.scaleToRef(t,i),i},e.prototype.scaleToRef=function(e,t){for(var i=0;i<16;i++)t._m[i]=this._m[i]*e;return t._markAsUpdated(),this},e.prototype.scaleAndAddToRef=function(e,t){for(var i=0;i<16;i++)t._m[i]+=this._m[i]*e;return t._markAsUpdated(),this},e.prototype.toNormalMatrix=function(t){var i=f.Matrix[0];this.invertToRef(i),i.transposeToRef(t);var n=t._m;e.FromValuesToRef(n[0],n[1],n[2],0,n[4],n[5],n[6],0,n[8],n[9],n[10],0,0,0,0,1,t)},e.prototype.getRotationMatrix=function(){var t=new e;return this.getRotationMatrixToRef(t),t},e.prototype.getRotationMatrixToRef=function(t){var i=f.Vector3[0];if(!this.decompose(i))return e.IdentityToRef(t),this;var n=this._m,r=1/i._x,o=1/i._y,a=1/i._z;return e.FromValuesToRef(n[0]*r,n[1]*r,n[2]*r,0,n[4]*o,n[5]*o,n[6]*o,0,n[8]*a,n[9]*a,n[10]*a,0,0,0,0,1,t),this},e.prototype.toggleModelMatrixHandInPlace=function(){var e=this._m;e[2]*=-1,e[6]*=-1,e[8]*=-1,e[9]*=-1,e[14]*=-1,this._markAsUpdated()},e.prototype.toggleProjectionMatrixHandInPlace=function(){var e=this._m;e[8]*=-1,e[9]*=-1,e[10]*=-1,e[11]*=-1,this._markAsUpdated()},e.FromArray=function(t,i){void 0===i&&(i=0);var n=new e;return e.FromArrayToRef(t,i,n),n},e.FromArrayToRef=function(e,t,i){for(var n=0;n<16;n++)i._m[n]=e[n+t];i._markAsUpdated()},e.FromFloat32ArrayToRefScaled=function(e,t,i,n){for(var r=0;r<16;r++)n._m[r]=e[r+t]*i;n._markAsUpdated()},Object.defineProperty(e,"IdentityReadOnly",{get:function(){return e._identityReadOnly},enumerable:!1,configurable:!0}),e.FromValuesToRef=function(e,t,i,n,r,o,a,s,c,l,u,h,d,f,p,_,m){var g=m._m;g[0]=e,g[1]=t,g[2]=i,g[3]=n,g[4]=r,g[5]=o,g[6]=a,g[7]=s,g[8]=c,g[9]=l,g[10]=u,g[11]=h,g[12]=d,g[13]=f,g[14]=p,g[15]=_,m._markAsUpdated()},e.FromValues=function(t,i,n,r,o,a,s,c,l,u,h,d,f,p,_,m){var g=new e,v=g._m;return v[0]=t,v[1]=i,v[2]=n,v[3]=r,v[4]=o,v[5]=a,v[6]=s,v[7]=c,v[8]=l,v[9]=u,v[10]=h,v[11]=d,v[12]=f,v[13]=p,v[14]=_,v[15]=m,g._markAsUpdated(),g},e.Compose=function(t,i,n){var r=new e;return e.ComposeToRef(t,i,n,r),r},e.ComposeToRef=function(e,t,i,n){var r=n._m,o=t._x,a=t._y,s=t._z,c=t._w,l=o+o,u=a+a,h=s+s,d=o*l,f=o*u,p=o*h,_=a*u,m=a*h,g=s*h,v=c*l,b=c*u,y=c*h,T=e._x,E=e._y,S=e._z;r[0]=(1-(_+g))*T,r[1]=(f+y)*T,r[2]=(p-b)*T,r[3]=0,r[4]=(f-y)*E,r[5]=(1-(d+g))*E,r[6]=(m+v)*E,r[7]=0,r[8]=(p+b)*S,r[9]=(m-v)*S,r[10]=(1-(d+_))*S,r[11]=0,r[12]=i._x,r[13]=i._y,r[14]=i._z,r[15]=1,n._markAsUpdated()},e.Identity=function(){var t=e.FromValues(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return t._updateIdentityStatus(!0),t},e.IdentityToRef=function(t){e.FromValuesToRef(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,t),t._updateIdentityStatus(!0)},e.Zero=function(){var t=e.FromValues(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);return t._updateIdentityStatus(!1),t},e.RotationX=function(t){var i=new e;return e.RotationXToRef(t,i),i},e.Invert=function(t){var i=new e;return t.invertToRef(i),i},e.RotationXToRef=function(t,i){var n=Math.sin(t),r=Math.cos(t);e.FromValuesToRef(1,0,0,0,0,r,n,0,0,-n,r,0,0,0,0,1,i),i._updateIdentityStatus(1===r&&0===n)},e.RotationY=function(t){var i=new e;return e.RotationYToRef(t,i),i},e.RotationYToRef=function(t,i){var n=Math.sin(t),r=Math.cos(t);e.FromValuesToRef(r,0,-n,0,0,1,0,0,n,0,r,0,0,0,0,1,i),i._updateIdentityStatus(1===r&&0===n)},e.RotationZ=function(t){var i=new e;return e.RotationZToRef(t,i),i},e.RotationZToRef=function(t,i){var n=Math.sin(t),r=Math.cos(t);e.FromValuesToRef(r,n,0,0,-n,r,0,0,0,0,1,0,0,0,0,1,i),i._updateIdentityStatus(1===r&&0===n)},e.RotationAxis=function(t,i){var n=new e;return e.RotationAxisToRef(t,i,n),n},e.RotationAxisToRef=function(e,t,i){var n=Math.sin(-t),r=Math.cos(-t),o=1-r;e.normalize();var a=i._m;a[0]=e._x*e._x*o+r,a[1]=e._x*e._y*o-e._z*n,a[2]=e._x*e._z*o+e._y*n,a[3]=0,a[4]=e._y*e._x*o+e._z*n,a[5]=e._y*e._y*o+r,a[6]=e._y*e._z*o-e._x*n,a[7]=0,a[8]=e._z*e._x*o-e._y*n,a[9]=e._z*e._y*o+e._x*n,a[10]=e._z*e._z*o+r,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,i._markAsUpdated()},e.RotationAlignToRef=function(e,t,i){var n=l.Cross(t,e),r=l.Dot(t,e),o=1/(1+r),a=i._m;a[0]=n._x*n._x*o+r,a[1]=n._y*n._x*o-n._z,a[2]=n._z*n._x*o+n._y,a[3]=0,a[4]=n._x*n._y*o+n._z,a[5]=n._y*n._y*o+r,a[6]=n._z*n._y*o-n._x,a[7]=0,a[8]=n._x*n._z*o-n._y,a[9]=n._y*n._z*o+n._x,a[10]=n._z*n._z*o+r,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,i._markAsUpdated()},e.RotationYawPitchRoll=function(t,i,n){var r=new e;return e.RotationYawPitchRollToRef(t,i,n,r),r},e.RotationYawPitchRollToRef=function(e,t,i,n){h.RotationYawPitchRollToRef(e,t,i,f.Quaternion[0]),f.Quaternion[0].toRotationMatrix(n)},e.Scaling=function(t,i,n){var r=new e;return e.ScalingToRef(t,i,n,r),r},e.ScalingToRef=function(t,i,n,r){e.FromValuesToRef(t,0,0,0,0,i,0,0,0,0,n,0,0,0,0,1,r),r._updateIdentityStatus(1===t&&1===i&&1===n)},e.Translation=function(t,i,n){var r=new e;return e.TranslationToRef(t,i,n,r),r},e.TranslationToRef=function(t,i,n,r){e.FromValuesToRef(1,0,0,0,0,1,0,0,0,0,1,0,t,i,n,1,r),r._updateIdentityStatus(0===t&&0===i&&0===n)},e.Lerp=function(t,i,n){var r=new e;return e.LerpToRef(t,i,n,r),r},e.LerpToRef=function(e,t,i,n){for(var r=n._m,o=e.m,a=t.m,s=0;s<16;s++)r[s]=o[s]*(1-i)+a[s]*i;n._markAsUpdated()},e.DecomposeLerp=function(t,i,n){var r=new e;return e.DecomposeLerpToRef(t,i,n,r),r},e.DecomposeLerpToRef=function(t,i,n,r){var o=f.Vector3[0],a=f.Quaternion[0],s=f.Vector3[1];t.decompose(o,a,s);var c=f.Vector3[2],u=f.Quaternion[1],d=f.Vector3[3];i.decompose(c,u,d);var p=f.Vector3[4];l.LerpToRef(o,c,n,p);var _=f.Quaternion[2];h.SlerpToRef(a,u,n,_);var m=f.Vector3[5];l.LerpToRef(s,d,n,m),e.ComposeToRef(p,_,m,r)},e.LookAtLH=function(t,i,n){var r=new e;return e.LookAtLHToRef(t,i,n,r),r},e.LookAtLHToRef=function(t,i,n,r){var o=f.Vector3[0],a=f.Vector3[1],s=f.Vector3[2];i.subtractToRef(t,s),s.normalize(),l.CrossToRef(n,s,o);var c=o.lengthSquared();0===c?o.x=1:o.normalizeFromLength(Math.sqrt(c)),l.CrossToRef(s,o,a),a.normalize();var u=-l.Dot(o,t),h=-l.Dot(a,t),d=-l.Dot(s,t);e.FromValuesToRef(o._x,a._x,s._x,0,o._y,a._y,s._y,0,o._z,a._z,s._z,0,u,h,d,1,r)},e.LookAtRH=function(t,i,n){var r=new e;return e.LookAtRHToRef(t,i,n,r),r},e.LookAtRHToRef=function(t,i,n,r){var o=f.Vector3[0],a=f.Vector3[1],s=f.Vector3[2];t.subtractToRef(i,s),s.normalize(),l.CrossToRef(n,s,o);var c=o.lengthSquared();0===c?o.x=1:o.normalizeFromLength(Math.sqrt(c)),l.CrossToRef(s,o,a),a.normalize();var u=-l.Dot(o,t),h=-l.Dot(a,t),d=-l.Dot(s,t);e.FromValuesToRef(o._x,a._x,s._x,0,o._y,a._y,s._y,0,o._z,a._z,s._z,0,u,h,d,1,r)},e.OrthoLH=function(t,i,n,r){var o=new e;return e.OrthoLHToRef(t,i,n,r,o),o},e.OrthoLHToRef=function(t,i,n,r,o){var a=2/t,s=2/i,c=2/(r-n),l=-(r+n)/(r-n);e.FromValuesToRef(a,0,0,0,0,s,0,0,0,0,c,0,0,0,l,1,o),o._updateIdentityStatus(1===a&&1===s&&1===c&&0===l)},e.OrthoOffCenterLH=function(t,i,n,r,o,a){var s=new e;return e.OrthoOffCenterLHToRef(t,i,n,r,o,a,s),s},e.OrthoOffCenterLHToRef=function(t,i,n,r,o,a,s){var c=2/(i-t),l=2/(r-n),u=2/(a-o),h=-(a+o)/(a-o),d=(t+i)/(t-i),f=(r+n)/(n-r);e.FromValuesToRef(c,0,0,0,0,l,0,0,0,0,u,0,d,f,h,1,s),s._markAsUpdated()},e.OrthoOffCenterRH=function(t,i,n,r,o,a){var s=new e;return e.OrthoOffCenterRHToRef(t,i,n,r,o,a,s),s},e.OrthoOffCenterRHToRef=function(t,i,n,r,o,a,s){e.OrthoOffCenterLHToRef(t,i,n,r,o,a,s),s._m[10]*=-1},e.PerspectiveLH=function(t,i,n,r){var o=new e,a=2*n/t,s=2*n/i,c=(r+n)/(r-n),l=-2*r*n/(r-n);return e.FromValuesToRef(a,0,0,0,0,s,0,0,0,0,c,1,0,0,l,0,o),o._updateIdentityStatus(!1),o},e.PerspectiveFovLH=function(t,i,n,r){var o=new e;return e.PerspectiveFovLHToRef(t,i,n,r,o),o},e.PerspectiveFovLHToRef=function(t,i,n,r,o,a){void 0===a&&(a=!0);var s=n,c=r,l=1/Math.tan(.5*t),u=a?l/i:l,h=a?l:l*i,d=(c+s)/(c-s),f=-2*c*s/(c-s);e.FromValuesToRef(u,0,0,0,0,h,0,0,0,0,d,1,0,0,f,0,o),o._updateIdentityStatus(!1)},e.PerspectiveFovReverseLHToRef=function(t,i,n,r,o,a){void 0===a&&(a=!0);var s=1/Math.tan(.5*t),c=a?s/i:s,l=a?s:s*i;e.FromValuesToRef(c,0,0,0,0,l,0,0,0,0,-n,1,0,0,1,0,o),o._updateIdentityStatus(!1)},e.PerspectiveFovRH=function(t,i,n,r){var o=new e;return e.PerspectiveFovRHToRef(t,i,n,r,o),o},e.PerspectiveFovRHToRef=function(t,i,n,r,o,a){void 0===a&&(a=!0);var s=n,c=r,l=1/Math.tan(.5*t),u=a?l/i:l,h=a?l:l*i,d=-(c+s)/(c-s),f=-2*c*s/(c-s);e.FromValuesToRef(u,0,0,0,0,h,0,0,0,0,d,-1,0,0,f,0,o),o._updateIdentityStatus(!1)},e.PerspectiveFovReverseRHToRef=function(t,i,n,r,o,a){void 0===a&&(a=!0);var s=1/Math.tan(.5*t),c=a?s/i:s,l=a?s:s*i;e.FromValuesToRef(c,0,0,0,0,l,0,0,0,0,-n,-1,0,0,-1,0,o),o._updateIdentityStatus(!1)},e.PerspectiveFovWebVRToRef=function(e,t,i,n,r){void 0===r&&(r=!1);var o=r?-1:1,a=Math.tan(e.upDegrees*Math.PI/180),s=Math.tan(e.downDegrees*Math.PI/180),c=Math.tan(e.leftDegrees*Math.PI/180),l=Math.tan(e.rightDegrees*Math.PI/180),u=2/(c+l),h=2/(a+s),d=n._m;d[0]=u,d[1]=d[2]=d[3]=d[4]=0,d[5]=h,d[6]=d[7]=0,d[8]=(c-l)*u*.5,d[9]=-(a-s)*h*.5,d[10]=-i/(t-i),d[11]=1*o,d[12]=d[13]=d[15]=0,d[14]=-2*i*t/(i-t),n._markAsUpdated()},e.GetFinalMatrix=function(t,i,n,r,o,a){var s=t.width,c=t.height,l=t.x,u=t.y,h=e.FromValues(s/2,0,0,0,0,-c/2,0,0,0,0,a-o,0,l+s/2,c/2+u,o,1),d=f.Matrix[0];return i.multiplyToRef(n,d),d.multiplyToRef(r,d),d.multiply(h)},e.GetAsMatrix2x2=function(e){var t=e.m,i=[t[0],t[1],t[4],t[5]];return s.a.MatrixUse64Bits?i:new Float32Array(i)},e.GetAsMatrix3x3=function(e){var t=e.m,i=[t[0],t[1],t[2],t[4],t[5],t[6],t[8],t[9],t[10]];return s.a.MatrixUse64Bits?i:new Float32Array(i)},e.Transpose=function(t){var i=new e;return e.TransposeToRef(t,i),i},e.TransposeToRef=function(e,t){var i=t._m,n=e.m;i[0]=n[0],i[1]=n[4],i[2]=n[8],i[3]=n[12],i[4]=n[1],i[5]=n[5],i[6]=n[9],i[7]=n[13],i[8]=n[2],i[9]=n[6],i[10]=n[10],i[11]=n[14],i[12]=n[3],i[13]=n[7],i[14]=n[11],i[15]=n[15],t._updateIdentityStatus(e._isIdentity,e._isIdentityDirty)},e.Reflection=function(t){var i=new e;return e.ReflectionToRef(t,i),i},e.ReflectionToRef=function(t,i){t.normalize();var n=t.normal.x,r=t.normal.y,o=t.normal.z,a=-2*n,s=-2*r,c=-2*o;e.FromValuesToRef(a*n+1,s*n,c*n,0,a*r,s*r+1,c*r,0,a*o,s*o,c*o+1,0,a*t.d,s*t.d,c*t.d,1,i)},e.FromXYZAxesToRef=function(t,i,n,r){e.FromValuesToRef(t._x,t._y,t._z,0,i._x,i._y,i._z,0,n._x,n._y,n._z,0,0,0,0,1,r)},e.FromQuaternionToRef=function(e,t){var i=e._x*e._x,n=e._y*e._y,r=e._z*e._z,o=e._x*e._y,a=e._z*e._w,s=e._z*e._x,c=e._y*e._w,l=e._y*e._z,u=e._x*e._w;t._m[0]=1-2*(n+r),t._m[1]=2*(o+a),t._m[2]=2*(s-c),t._m[3]=0,t._m[4]=2*(o-a),t._m[5]=1-2*(r+i),t._m[6]=2*(l+u),t._m[7]=0,t._m[8]=2*(s+c),t._m[9]=2*(l-u),t._m[10]=1-2*(n+i),t._m[11]=0,t._m[12]=0,t._m[13]=0,t._m[14]=0,t._m[15]=1,t._markAsUpdated()},e._updateFlagSeed=0,e._identityReadOnly=e.Identity(),e}(),f=function(){function e(){}return e.Vector3=o.a.BuildArray(6,l.Zero),e.Matrix=o.a.BuildArray(2,d.Identity),e.Quaternion=o.a.BuildArray(3,h.Zero),e}(),p=function(){function e(){}return e.Vector2=o.a.BuildArray(3,c.Zero),e.Vector3=o.a.BuildArray(13,l.Zero),e.Vector4=o.a.BuildArray(3,u.Zero),e.Quaternion=o.a.BuildArray(2,h.Zero),e.Matrix=o.a.BuildArray(8,d.Identity),e}();a.a.RegisteredTypes["BABYLON.Vector2"]=c,a.a.RegisteredTypes["BABYLON.Vector3"]=l,a.a.RegisteredTypes["BABYLON.Vector4"]=u,a.a.RegisteredTypes["BABYLON.Matrix"]=d},function(e,t,i){"use strict";i.d(t,"d",(function(){return r})),i.d(t,"a",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"b",(function(){return s})),i.d(t,"e",(function(){return c})),i.d(t,"f",(function(){return l}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/***/ }),

/***/ "./node_modules/dat.gui/build/dat.gui.module.js":
/*!******************************************************!*\
  !*** ./node_modules/dat.gui/build/dat.gui.module.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "color": () => (/* binding */ color),
/* harmony export */   "controllers": () => (/* binding */ controllers),
/* harmony export */   "dom": () => (/* binding */ dom$1),
/* harmony export */   "gui": () => (/* binding */ gui),
/* harmony export */   "GUI": () => (/* binding */ GUI$1),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return obj instanceof Function;
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
      this.__state.space = 'HEX';
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);
//# sourceMappingURL=dat.gui.module.js.map


/***/ }),

/***/ "./gui.ts":
/*!****************!*\
  !*** ./gui.ts ***!
  \****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeGUI = void 0;
var BABYLON = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
var dat = __webpack_require__(/*! dat.gui */ "./node_modules/dat.gui/build/dat.gui.module.js");
function makeGUI(scene, shader) {
    var oldgui = document.getElementById("datGUI");
    if (oldgui != null) {
        oldgui.remove();
    }
    var gui = new dat.GUI();
    gui.domElement.style.marginTop = "100px";
    gui.domElement.id = "datGUI";
    var options = {
        speed: 1.0,
        time: 0.0,
        radius: 5.0,
        power: 1.5,
        center: 2.0,
        sphere: false,
        sphereRadius: 1.0,
        xaxis: false,
        yaxis: false,
        zaxis: false,
        xyplane: false,
        xzplane: false,
        yzplane: false,
        field: false,
    };
    var meshes = {};
    var controllers = {};
    var spinSettings = gui.addFolder("Spin settings");
    controllers.speed = spinSettings.add(options, "speed", 0, 5, 0.1).onChange(function (value) {
        shader.speed = value;
    });
    controllers.time = spinSettings.add(options, "time", 0, 1, 0.01);
    controllers.time.listen();
    scene.registerAfterRender(function () {
        options.time = (shader.time / Math.PI / 2) % 1;
    });
    controllers.time.onChange(function (value) {
        shader.time = value * Math.PI * 2;
    });
    controllers.radius = spinSettings.add(options, "radius", 1, 10, 0.5).onChange(function (value) {
        shader.radius = value;
    });
    controllers.power = spinSettings.add(options, "power", 0.1, 3, 0.1).onChange(function (value) {
        shader.power = value;
    });
    controllers.center = spinSettings.add(options, "center", 0.1, 10, 0.1).onChange(function (value) {
        shader.center = value;
    });
    var objects = gui.addFolder("Objects");
    controllers.sphere = objects.add(options, "sphere").onChange(function (value) {
        var sphere = meshes.sphere;
        if (value && sphere == null) {
            sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { segments: 32, diameter: 1 }, scene);
            var scale = options.sphereRadius;
            sphere.scaling = new BABYLON.Vector3(scale, scale, scale);
            sphere.material = shader.shader;
            meshes.sphere = sphere;
        }
        if (!value && sphere != null) {
            sphere.dispose();
            delete meshes.sphere;
        }
    });
    controllers.sphereRadius = objects.add(options, "sphereRadius", 0.1, 10, 0.1).onChange(function (value) {
        var sphere = meshes.sphere;
        if (sphere != null) {
            sphere.scaling = new BABYLON.Vector3(value, value, value);
        }
    });
    controllers.xaxis = objects.add(options, "xaxis").onChange(function (value) {
        var mesh = meshes.xAxis;
        if (value && mesh == null) {
            mesh = BABYLON.MeshBuilder.CreateCylinder('xAxis', { height: 10, diameter: 0.1, subdivisions: 100 });
            mesh.material = shader.shader;
            mesh.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
            meshes.xAxis = mesh;
        }
        if (!value && mesh != null) {
            mesh.dispose();
            delete meshes.xAxis;
        }
    });
    controllers.yaxis = objects.add(options, "yaxis").onChange(function (value) {
        var mesh = meshes.yAxis;
        if (value && mesh == null) {
            mesh = BABYLON.MeshBuilder.CreateCylinder('yAxis', { height: 10, diameter: 0.1, subdivisions: 100 });
            mesh.material = shader.shader;
            mesh.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
            meshes.yAxis = mesh;
        }
        if (!value && mesh != null) {
            mesh.dispose();
            delete meshes.yAxis;
        }
    });
    controllers.zaxis = objects.add(options, "zaxis").onChange(function (value) {
        var mesh = meshes.zAxis;
        if (value && mesh == null) {
            mesh = BABYLON.MeshBuilder.CreateCylinder('zAxis', { height: 10, diameter: 0.1, subdivisions: 100 });
            mesh.material = shader.shader;
            meshes.zAxis = mesh;
        }
        if (!value && mesh != null) {
            mesh.dispose();
            delete meshes.zAxis;
        }
    });
    controllers.xyplane = objects.add(options, "xyplane").onChange(function (value) {
        var mesh = meshes.xyplane;
        if (value && mesh == null) {
            mesh = Array(2);
            var m1 = BABYLON.MeshBuilder.CreateGround('xyplane', { width: 10, height: 10, subdivisions: 100 }, scene);
            m1.position = new BABYLON.Vector3(0, 0.01, 0);
            m1.material = shader.shader;
            //m1.visibility = 0;
            var m2 = m1.createInstance('xyplane_back');
            m2.rotation = new BABYLON.Vector3(Math.PI, 0, 0);
            m2.position = new BABYLON.Vector3(0, -0.01, 0);
            mesh[0] = m1;
            mesh[1] = m2;
            meshes.xyplane = mesh;
        }
        if (!value && mesh != null) {
            for (var _i = 0, mesh_1 = mesh; _i < mesh_1.length; _i++) {
                var m = mesh_1[_i];
                m.dispose();
            }
            delete meshes.xyplane;
        }
    });
    controllers.xzplane = objects.add(options, "xzplane").onChange(function (value) {
        var mesh = meshes.xzplane;
        if (value && mesh == null) {
            mesh = Array(2);
            var m1 = BABYLON.MeshBuilder.CreateGround('xzplane', { width: 10, height: 10, subdivisions: 100 }, scene);
            m1.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
            m1.position = new BABYLON.Vector3(0, 0, 0.01);
            m1.material = shader.shader;
            //m1.visibility = 0;
            var m2 = m1.createInstance('xzplane_back');
            m2.rotation = new BABYLON.Vector3(Math.PI / 2, Math.PI, 0);
            m2.position = new BABYLON.Vector3(0, 0, -0.01);
            mesh[0] = m1;
            mesh[1] = m2;
            meshes.xzplane = mesh;
        }
        if (!value && mesh != null) {
            for (var _i = 0, mesh_2 = mesh; _i < mesh_2.length; _i++) {
                var m = mesh_2[_i];
                m.dispose();
            }
            delete meshes.xzplane;
        }
    });
    controllers.yzplane = objects.add(options, "yzplane").onChange(function (value) {
        var mesh = meshes.yzplane;
        if (value && mesh == null) {
            mesh = Array(2);
            var m1 = BABYLON.MeshBuilder.CreateGround('yzplane', { width: 10, height: 10, subdivisions: 100 }, scene);
            m1.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
            m1.position = new BABYLON.Vector3(0.01, 0, 0);
            m1.material = shader.shader;
            var m2 = m1.createInstance('yzplane_back');
            m2.rotation = new BABYLON.Vector3(0, Math.PI, Math.PI / 2);
            m2.position = new BABYLON.Vector3(-0.01, 0, 0);
            mesh[0] = m1;
            mesh[1] = m2;
            meshes.yzplane = mesh;
        }
        if (!value && mesh != null) {
            for (var _i = 0, mesh_3 = mesh; _i < mesh_3.length; _i++) {
                var m = mesh_3[_i];
                m.dispose();
            }
            delete meshes.yzplane;
        }
    });
    controllers.field = objects.add(options, "field").onChange(function (value) {
        var mesh = meshes.field;
        if (value && mesh == null) {
            mesh = Array(10 * 10 * 10);
            var i = 0;
            for (var x = 0; x <= 10; x++) {
                for (var y = 0; y <= 10; y++) {
                    for (var z = 0; z <= 10; z++) {
                        var box = BABYLON.Mesh.CreateBox("Box", 0.1, scene);
                        box.material = shader.shader;
                        box.position = new BABYLON.Vector3(5 - x, 5 - y, 5 - z);
                        mesh[i] = box;
                        i++;
                    }
                }
            }
            meshes.field = mesh;
        }
        if (!value && mesh != null) {
            for (var _i = 0, mesh_4 = mesh; _i < mesh_4.length; _i++) {
                var m = mesh_4[_i];
                m.dispose();
            }
            delete meshes.field;
        }
    });
    controllers.sphere.setValue(true);
    controllers.xaxis.setValue(true);
    controllers.yaxis.setValue(true);
    controllers.zaxis.setValue(true);
}
exports.makeGUI = makeGUI;


/***/ }),

/***/ "./shader.ts":
/*!*******************!*\
  !*** ./shader.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpinorShader = void 0;
var BABYLON = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
var babylonjs_materials_1 = __webpack_require__(/*! babylonjs-materials */ "./node_modules/babylonjs-materials/babylonjs.materials.min.js");
var numKernels = 3;
var SpinorShader = /** @class */ (function () {
    function SpinorShader(scene) {
        var _this = this;
        this.steps = Array(numKernels + 1);
        for (var i = 0; i < numKernels + 1; i++) {
            this.steps[i] = BABYLON.Matrix.Identity();
        }
        this.kernelWinds = new Float32Array(numKernels);
        this.kernelPhases = new Float32Array(numKernels);
        this.time = 0;
        this.speed = 1;
        this.radius = 5;
        this.power = 1.5;
        this.center = 2;
        this.shader = new babylonjs_materials_1.CustomMaterial("spinorMaterial", scene);
        this.shader.AddUniform('numSteps', 'int', numKernels + 1);
        this.shader.AddUniform("steps", "mat4[" + (numKernels + 1) + "]", null);
        this.shader.AddUniform('kernelWinds', 'float[' + numKernels + ']', null);
        this.shader.AddUniform('kernelPhases', 'float[' + numKernels + ']', null);
        this.shader.AddUniform('time', 'float', 0);
        this.shader.AddUniform('radial_radius', 'float', 0);
        this.shader.AddUniform('radial_power', 'float', 0);
        this.shader.AddUniform('radial_center', 'float', 0);
        this.shader.Vertex_Definitions("\n      mat4 rotXY(float a) {\n            float c = cos(a);\n            float s = sin(a);\n            return mat4(\n                 c, s, 0, 0,\n                -s, c, 0, 0,\n                 0, 0, 1, 0,\n                 0, 0, 0, 1);\n        }\n        mat4 rotYZ(float a) {\n            float c = cos(a);\n            float s = sin(a);\n            return mat4(\n                1, 0, 0, 0,\n                0, c, s, 0,\n                0,-s, c, 0,\n                0, 0, 0, 1);\n        }\n        mat4 foldXY(float amount, float angle) {\n            mat4 angleMat = rotXY(angle);\n            return angleMat * rotYZ(amount) * transpose(angleMat);\n        }\n    ");
        this.shader.Vertex_After_WorldPosComputed("\n        float r = 1.0 - length(worldPos) / radial_radius;\n        r = clamp(pow(r, radial_power) * radial_center, 0.0, 1.0);\n        mat4 rotation = mat4(1.0);\n        for (int i = 0; i < numSteps-1; i++) {\n            rotation = rotation * steps[i];\n            rotation = rotation * foldXY(r * PI * kernelWinds[i], kernelPhases[i]);\n        }\n        rotation = rotation * steps[numSteps-1];\n        worldPos = worldPos * rotation;\n        vNormalW = vec3(vec4(vNormalW, 1.0) * rotation);\n    ");
        this.shader.onBindObservable.add(function () {
            _this.shader.getEffect().setFloat('time', _this.time);
            //TEMPORARY, needs to be based on actual spinor we're rendering
            _this.steps[0] = BABYLON.Matrix.RotationZ(_this.time);
            _this.steps[1] = _this.steps[0].transpose();
            _this.shader.getEffect().setInt("numSteps", _this.steps.length);
            var stepsUnfolded = new Float32Array(_this.steps.length * 16);
            for (var i = 0; i < _this.steps.length; i++) {
                stepsUnfolded.set(_this.steps[i].asArray(), i * 16);
            }
            _this.shader.getEffect().setMatrices("steps", stepsUnfolded);
            _this.shader.getEffect().setFloatArray("kernelWinds", _this.kernelWinds);
            _this.shader.getEffect().setFloatArray("kernelPhases", _this.kernelPhases);
            _this.shader.getEffect().setFloat('radial_radius', _this.radius);
            _this.shader.getEffect().setFloat('radial_power', _this.power);
            _this.shader.getEffect().setFloat('radial_center', _this.center);
        });
        scene.registerBeforeRender(function () {
            _this.time += scene.getEngine().getDeltaTime() / 500 * _this.speed;
        });
        //TEMPORARY
        this.kernelWinds[0] = 1;
    }
    return SpinorShader;
}());
exports.SpinorShader = SpinorShader;


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
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var BABYLON = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
var gui_1 = __webpack_require__(/*! ./gui */ "./gui.ts");
var shader_1 = __webpack_require__(/*! ./shader */ "./shader.ts");
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 20, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    var shader = new shader_1.SpinorShader(scene);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    //var sphere = BABYLON.MeshBuilder.CreateSphere("Sphere", { diameter: 5}, scene);
    //sphere.material = shader.shader;
    //var box = BABYLON.MeshBuilder.CreateBox("Box", {size:1}, scene);
    /*for (var x = 0; x <= 10; x++) {
        for (var y = 0; y <= 10; y++) {
            for (var z = 0; z <= 10; z++) {
                var box = BABYLON.Mesh.CreateBox("Box", 0.1, scene);
                box.material = shader.shader;
                box.position = new BABYLON.Vector3(5-x,5-y,5-z);
            }
        }
    }*/
    gui_1.makeGUI(scene, shader);
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogStart = 10;
    scene.fogEnd = 30;
    return scene;
};
var scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});

})();

/******/ })()
;
//# sourceMappingURL=index.js.map