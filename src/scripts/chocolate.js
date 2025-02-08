import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@latest/examples/jsm/loaders/GLTFLoader.js";

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 18;

const scene = new THREE.Scene();
const loader = new GLTFLoader();
let chocolate;
loader.load('../3D-models/hot_chocolate.glb',
    function (glb) {
        chocolate = glb.scene;
        scene.add(chocolate);
        chocolate.position.y = -0.5
        chocolate.rotation.y = 2.094;
        chocolate.scale.set(0.5, 0.5, 0.5);
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
};
reRender3D();

window.addEventListener('mousemove', (event) => {
    if(event.movementX > 0) {
        chocolate.rotation.y += 0.01
    }
    else {
        chocolate.rotation.y -= 0.01
    }
});