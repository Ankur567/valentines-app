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
let teddy;
loader.load('../3D-models/panda.glb',
    function (glb) {
        teddy = glb.scene;
        scene.add(teddy);
        // teddy.position.y = -0.5
        // teddy.position.x = 1.5
        // teddy.rotation.y = 2.094;
        teddy.scale.set(0.5, 0.5, 0.5);
    },
    function (xhr) {},
    function (error) {}
);

const whitelight = new THREE.DirectionalLight(0xffffff, 2);
whitelight.position.set( 5, 5, 5);
whitelight.casteShadow = true
scene.add(whitelight);  

const amblight = new THREE.AmbientLight(0xffffff, 1)
scene.add(amblight)

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
        teddy.rotation.y += 0.005
    }
    else {
        teddy.rotation.y -= 0.005
    }
});