// Setup basic scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Load texture
const textureLoader = new THREE.TextureLoader();
const cubeTexture = textureLoader.load('texture.png'); // Adjust the path if needed

// Create a cube with the texture
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ map: cubeTexture }); // Use MeshStandardMaterial for better lighting
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // White directional light
directionalLight.position.set(5, 5, 5); // Set light position
scene.add(directionalLight);

// Set camera position
camera.position.z = 5;

// Interactivity variables
let isInteracting = false;
let startX = 0, startY = 0;

// Mouse events
const onMouseDown = (event) => {
    isInteracting = true;
    startX = event.clientX;
    startY = event.clientY;
};

const onMouseMove = (event) => {
    if (!isInteracting) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    cube.rotation.y += deltaX * 0.01;
    cube.rotation.x += deltaY * 0.01;

    startX = event.clientX;
    startY = event.clientY;
};

const onMouseUp = () => {
    isInteracting = false;
};

// Touch events (for mobile)
const onTouchStart = (event) => {
    if (event.touches.length === 1) {
        isInteracting = true;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;

        // Prevent default to avoid scrolling
        event.preventDefault();
    }
};

const onTouchMove = (event) => {
    if (!isInteracting || event.touches.length !== 1) return;

    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    cube.rotation.y += deltaX * 0.01;
    cube.rotation.x += deltaY * 0.01;

    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    // Prevent default to avoid scrolling
    event.preventDefault();
};

const onTouchEnd = () => {
    isInteracting = false;
};

// Add event listeners for mouse and touch controls
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

// Specify passive: false to allow preventDefault
document.addEventListener('touchstart', onTouchStart, { passive: false });
document.addEventListener('touchmove', onTouchMove, { passive: false });
document.addEventListener('touchend', onTouchEnd, { passive: false });

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
