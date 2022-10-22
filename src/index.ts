import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
// import js ascii effect
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
// import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

function main() {
  const scene = new Scene();
  scene.background = new Color(0, 0, 0);
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  // add light sources
  const pointLight1 = new PointLight(0xffffff);
  pointLight1.position.set(500, 500, 500);
  scene.add(pointLight1);

  const pointLight2 = new PointLight(0xffffff, 0.25);
  pointLight2.position.set(-500, -500, -500);
  scene.add(pointLight2);

  // create a cube
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ flatShading: true });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  // create a plane
  const plane = new Mesh(
    new PlaneGeometry(400, 400),
    new MeshBasicMaterial({ color: 0xe0e0e0 })
  );
  plane.position.y = -200;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  // create a renderer
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";

  camera.position.z = 5;
  // document.body.appendChild(renderer.domElement);
  document.body.appendChild(effect.domElement);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // renderer.render(scene, camera);
    effect.render(scene, camera);
  }
  animate();
}

window.onload = main;
