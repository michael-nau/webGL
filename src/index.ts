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
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshPhongMaterial({ flatShading: true });
const cube = new Mesh(geometry, material);

function main() {
  const { effect, renderer } = createBasicCube();
  create3dText();
  const controls = new TrackballControls(camera, effect.domElement);
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
    effect.render(scene, camera);
  }
  animate();
}

function create3dText() {
  const loader = new FontLoader();
  loader.load("./fonts/Apple_Garamond_Regular.json", (font) => {
    console.log(font);
    let tGeometry = new TextGeometry("Michael Naughton", {
      font: font,
      size: 70,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    const textMesh = new Mesh(tGeometry, [
      new MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveIntensity: 0.5,
        flatShading: true,
      }),
      new MeshPhongMaterial({ color: 0x000000, flatShading: true }),
    ]);

    scene.add(textMesh);
    textMesh.position.set(0, 5, 0);
  });
}

function createBasicCube() {
  scene.background = new Color(0, 0, 0);

  camera.position.z = 5;

  // add light sources
  const pointLight1 = new PointLight(0xffffff);
  pointLight1.position.set(500, 500, 500);
  scene.add(pointLight1);

  const pointLight2 = new PointLight(0xffffff, 0.25);
  pointLight2.position.set(-500, -500, -500);
  scene.add(pointLight2);

  // create a cube
  scene.add(cube);

  // // create a plane
  // const plane = new Mesh(
  //   new PlaneGeometry(400, 400),
  //   new MeshBasicMaterial({ color: 0xe0e0e0 })
  // );
  // plane.position.y = -200;
  // plane.rotation.x = -Math.PI / 2;
  // scene.add(plane);

  // create a renderer
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";

  document.body.appendChild(effect.domElement);
  document.body.appendChild(renderer.domElement);
  return { effect, renderer };
}

window.onload = main;
