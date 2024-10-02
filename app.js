// Setup basic scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set camera position
camera.position.z = 5;

// Interactivity variables
let isMouseDown = false;
let mouseX = 0, mouseY = 0;

// Mouse events
const onDocumentMouseDown = (event) => {
    isMouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
};

const onDocumentMouseMove = (event) => {
    if (!isMouseDown) return;

    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    cube.rotation.y += deltaX * 0.01;
    cube.rotation.x += deltaY * 0.01;

    mouseX = event.clientX;
    mouseY = event.clientY;
};

const onDocumentMouseUp = () => {
    isMouseDown = false;
};

// Touch events (for mobile)
const onDocumentTouchStart = (event) => {
    if (event.touches.length === 1) { // Only track single touch
        isMouseDown = true;
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
    }
};

const onDocumentTouchMove = (event) => {
    if (!isMouseDown || event.touches.length !== 1) return;

    const deltaX = event.touches[0].clientX - mouseX;
    const deltaY = event.touches[0].clientY - mouseY;

    cube.rotation.y += deltaX * 0.01;
    cube.rotation.x += deltaY * 0.01;

    mouseX = event.touches[0].clientX;
    mouseY = event.touches[0].clientY;
};

const onDocumentTouchEnd = () => {
    isMouseDown = false;
};

// Add event listeners for mouse and touch controls
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

document.addEventListener('touchstart', onDocumentTouchStart, false);
document.addEventListener('touchmove', onDocumentTouchMove, false);
document.addEventListener('touchend', onDocumentTouchEnd, false);

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
