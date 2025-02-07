import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@latest/examples/jsm/loaders/GLTFLoader.js";

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 8;

const scene = new THREE.Scene();
const loader = new GLTFLoader();
let ring;
loader.load('../3D-models/gold_ring.glb',
    function (glb) {
        ring = glb.scene;
        scene.add(ring);
        ring.position.x = 0.5
        ring.scale.set(1, 1, 1);
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const pointLight1 = new THREE.PointLight(0xffd700, 2, 10); // Warm golden light
pointLight1.position.set(2, 3, 2);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 10); // Cool white highlight
pointLight2.position.set(-2, -3, 2);
scene.add(pointLight2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

const toplight = new THREE.DirectionalLight(0xffffff, 20);
directionalLight.position.set(0, 8, 0);
scene.add(directionalLight);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

const amblight = new THREE.AmbientLight(0xffffff, 100)
scene.add(amblight)

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
};
reRender3D();

function animate() {
    requestAnimationFrame(animate);
    if (ring) {
        ring.rotation.y += 0.01; // Slowly rotate Earth
        ring.rotation.x += 0.01
    }
    renderer.render(scene, camera);
}
// animate();

window.addEventListener('click', () => {
    animate()
}, { once: true });