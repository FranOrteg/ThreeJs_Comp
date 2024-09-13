import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);  // Luz ambiental
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);  // Luz direccional
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);  // Luz direccional adicional
directionalLight2.position.set(-5, -5, 5);  // Luz desde abajo
scene.add(directionalLight2);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);  // Luz puntual con intensidad 1
pointLight.position.set(5, 5, 5);  // Posiciona la luz por encima y cerca del coche
scene.add(pointLight);

// scene.background = new THREE.Color(0xffffff);  // Fondo blanco


const loader = new GLTFLoader();
loader.load('./models/peugeot.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(1,1,1); 
    scene.add(model);
}, undefined, function (error) {
    console.error('Error cargando el modelo:', error);
});

// Agrega los controles de órbita para mover la cámara
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Actualiza los controles de cámara
    renderer.render(scene, camera);
}
animate();  // Inicia el bucle de animación
