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
let rose;
loader.load('../3D-models/red_rose.glb',
    function (glb) {
        rose = glb.scene;
        scene.add(rose);
        rose.position.y = -1.8
        rose.position.x = 1.5
        rose.scale.set(1, 1, 1);
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const whitelight = new THREE.DirectionalLight(0xffffff, 2);
whitelight.position.set( 50, 50, 50);
scene.add(whitelight);  

const amblight = new THREE.AmbientLight(0xffffff, 1)
scene.add(amblight)

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
};
reRender3D();

function animate() {
    requestAnimationFrame(animate);
    if (rose) {
        rose.rotation.y += 0.01; // Slowly rotate Earth
    }
    renderer.render(scene, camera);
}
animate();