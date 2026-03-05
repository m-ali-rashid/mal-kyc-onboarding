import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { WebView } from 'react-native-webview'

// Renders the exact Three.js globe scene inside a WebView:
//   circle  → flat-shaded IcosahedronGeometry planet (white/pink/cyan facets)
//   skelet  → wireframe IcosahedronGeometry shell
//   particle→ TetrahedronGeometry cloud scattered around the globe
// Gradient background: teal (#11E8BB) → purple (#8200C9)

type Props = {
  width?: number
  height?: number
  style?: StyleProp<ViewStyle>
}

const HTML = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 100%; height: 100%; overflow: hidden;
    background: linear-gradient(180deg, #11E8BB 0%, #5b6abf 50%, #8200C9 100%);
  }
  canvas { display: block; }
</style>
</head>
<body>
<div id="canvas"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
var renderer, scene, camera, circle, skelet, particle;

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  circle   = new THREE.Object3D();
  skelet   = new THREE.Object3D();
  particle = new THREE.Object3D();
  scene.add(circle);
  scene.add(skelet);
  scene.add(particle);

  var geometry = new THREE.TetrahedronGeometry(2, 0);
  var geom     = new THREE.IcosahedronGeometry(7, 1);
  var geom2    = new THREE.IcosahedronGeometry(15, 1);

  var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize()
      .multiplyScalar(90 + Math.random() * 700);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var mat  = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
  var mat2 = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true, side: THREE.DoubleSide });

  var planet = new THREE.Mesh(geom, mat);
  planet.scale.set(16, 16, 16);
  circle.add(planet);

  var planet2 = new THREE.Mesh(geom2, mat2);
  planet2.scale.set(10, 10, 10);
  skelet.add(planet2);

  scene.add(new THREE.AmbientLight(0x999999));

  var l0 = new THREE.DirectionalLight(0xffffff, 1); l0.position.set(1, 0, 0);
  var l1 = new THREE.DirectionalLight(0x11E8BB, 1); l1.position.set(0.75, 1, 0.5);
  var l2 = new THREE.DirectionalLight(0x8200C9, 1); l2.position.set(-0.75, -1, 0.5);
  scene.add(l0); scene.add(l1); scene.add(l2);

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  particle.rotation.y -= 0.0040;
  circle.rotation.x   -= 0.0020;
  circle.rotation.y   -= 0.0030;
  skelet.rotation.x   -= 0.0010;
  skelet.rotation.y   += 0.0020;
  renderer.clear();
  renderer.render(scene, camera);
}

init();
animate();
</script>
</body>
</html>`

export default function GlobeAnimation({ width = 340, height = 340, style }: Props) {
  return (
    <WebView
      source={{ html: HTML }}
      style={[{ width, height, backgroundColor: 'transparent' }, style]}
      scrollEnabled={false}
      bounces={false}
      overScrollMode="never"
      originWhitelist={['*']}
    />
  )
}
