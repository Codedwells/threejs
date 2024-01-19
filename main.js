import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const dirLight = new THREE.DirectionalLight('#f06292', 1)
const ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
scene.add(dirLight,ambientLight)

const geometry = new THREE.IcosahedronGeometry()
const material = new THREE.MeshStandardMaterial({
    onBeforeCompile: shader => {
        shader.fragmentShader= shader.fragmentShader.replace(
            `#include <normal_fragment_begin>
            `,
            `#include <color_fragment>
            diffuseColor = vec(1,1,0,1);`
        )

    }
})
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)
camera.position.z = 5

function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.02
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}

animate()
