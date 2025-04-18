// 初始化3D产品模型
function init3DViewer() {
    const container = document.getElementById('product-3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);
    
    // 添加产品模型（示例使用基础几何体）
    const geometry = new THREE.CylinderGeometry(1, 1, 1.5, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x2E8B57,
        specular: 0x111111,
        shininess: 30
    });
    const product = new THREE.Mesh(geometry, material);
    scene.add(product);
    
    // 添加灯光
    const light1 = new THREE.DirectionalLight(0xFFFFFF, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    
    const light2 = new THREE.AmbientLight(0x404040);
    scene.add(light2);
    
    camera.position.z = 3;
    
    // 添加控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

// 粒子背景初始化
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#E8F5E9" },
            "shape": { "type": "image", "image": { "src": "images/leaf-particle.png", "width": 20, "height": 20 } },
            "move": { 
                "enable": true,
                "speed": 2,
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        }
    });
}

// 对比滑块功能
function setupComparisonSlider() {
    const slider = document.getElementById('comparison-slider');
    slider.addEventListener('input', function() {
        const value = this.value;
        document.querySelector('.before').style.width = value + '%';
    });
}

// 视频模态框控制
function setupVideoModal() {
    const modal = document.getElementById('video-modal');
    const videoThumbs = document.querySelectorAll('.video-thumbnail');
    const closeBtn = document.querySelector('.close');
    const videoPlayer = document.getElementById('modal-video');
    
    videoThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const videoType = this.getAttribute('data-video');
            videoPlayer.src = `videos/${videoType}.mp4`;
            modal.style.display = "block";
            videoPlayer.play();
        });
    });
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
        videoPlayer.pause();
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            videoPlayer.pause();
        }
    }
}

// 表单提交处理
function handleFormSubmission() {
    const form = document.getElementById('download-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // 这里添加实际表单处理逻辑
        alert('报告已发送至您的邮箱！优惠码：ZXZP2025');
    });
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    init3DViewer();
    initParticles();
    setupComparisonSlider();
    setupVideoModal();
    handleFormSubmission();
});
