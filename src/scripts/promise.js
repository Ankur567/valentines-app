import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@latest/examples/jsm/loaders/GLTFLoader.js";

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 18;
camera.position.y = 8;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const loader = new GLTFLoader();
let flower;
let mixer;
loader.load(
  "../3D-models/glowing_flower.glb",
  function (glb) {
    flower = glb.scene;
    scene.add(flower);
    flower.position.y = -0.8;
    flower.position.x = 1.5
    // flower.rotation.y = 2.094;
    flower.scale.set(0.3, 0.3, 0.3);
    mixer = new THREE.AnimationMixer(flower);
    mixer.clipAction(glb.animations[0]).play();
    mixer.update(0.01);
  },
  function (xhr) {},
  function (error) {}
);

const blueLight = new THREE.DirectionalLight(0x000c59, 1);
blueLight.position.set(5, 5, 0);
blueLight.casteShadow = true;
scene.add(blueLight);

const pointLight = new THREE.PointLight(0x009bff, 0.4, 1);
pointLight.position.set(1.5,-0.4, 0);
scene.add(pointLight);

const pinklight = new THREE.PointLight(0xf39eff, 0.2, 1);
pinklight.position.set(1.5,-0.8, 0);
scene.add(pinklight);

const pointLight2 = new THREE.PointLight(0xffffff, 1, 1);
pointLight2.position.set(1, 0.3, 0);
scene.add(pointLight2);

// const amblight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(amblight);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
  if (mixer) mixer.update(0.01);
};
reRender3D();

window.addEventListener("mousemove", (event) => {
  if (event.movementX > 0) {
    flower.rotation.y += 0.005;
  } else {
    flower.rotation.y -= 0.005;
  }
});
