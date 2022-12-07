let scene, camera, renderer, cube;
let id;
let spin = true;

function init() {
    // シーン
    scene = new THREE.Scene();

    // カメラ
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // レンダラー
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // ボックスのサイズ決定、メッシュ、追加
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const texture = new THREE.TextureLoader().load('textures/Great.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
}

// アニメーション制御
const animate = function () {
    id = requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

const animate2 = function () {
    id = requestAnimationFrame(animate2);

    cube.rotation.x -= 0.01;
    cube.rotation.y -= 0.01;
    renderer.render(scene, camera);
}

// ウィンドウ変更時にサイズを維持する処理
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

init();
animate();

function click() {
    cancelAnimationFrame(id);
    if (spin) {
        animate2();
        spin = false;
    } else {
        animate();
        spin = true;
    }

}
window.addEventListener("click", click);