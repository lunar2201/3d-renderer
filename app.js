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

document.addEventListener('touchstart', onTouchStart, false);
document.addEventListener('touchmove', onTouchMove, false);
document.addEventListener('touchend', onTouchEnd, false);

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
