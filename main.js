import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


let scene, camera, renderer, cube, controls;
let cubes = [];

let mouseX = 0, mouseY = 0
let mouseDown = false;

const white = new THREE.Color(0xFFFFFF);
const pink = new THREE.Color(0xF007C9);
const green = new THREE.Color(0x0CE84E);
const blue = new THREE.Color(0x05B3F7)
const orange = new THREE.Color(0xFF5608);
const yellow = new THREE.Color(0xFFF708);

document.addEventListener('pointermove', onPointerMove, false);
document.addEventListener('pointerdown', onPointerDown, false);
document.addEventListener('pointerup', onPointerUp, false);

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 10;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop(animate);
    document.body.appendChild( renderer.domElement );
    controls = new OrbitControls(camera, renderer.domElement);



    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({        
        vertexColors: true
    });

    const positionAttribute = geometry.getAttribute('position');
    const colors = new Float32Array([
        green.r, green.g, green.b,
        green.r, green.g, green.b,
        green.r, green.g, green.b,
        green.r, green.g, green.b,

        blue.r, blue.g, blue.b,
        blue.r, blue.g, blue.b,
        blue.r, blue.g, blue.b,
        blue.r, blue.g, blue.b,

        yellow.r, yellow.g, yellow.b,
        yellow.r, yellow.g, yellow.b,
        yellow.r, yellow.g, yellow.b,
        yellow.r, yellow.g, yellow.b,

        white.r, white.g, white.b,
        white.r, white.g, white.b,
        white.r, white.g, white.b,
        white.r, white.g, white.b,

        
        pink.r, pink.g, pink.b,
        pink.r, pink.g, pink.b,
        pink.r, pink.g, pink.b,
        pink.r, pink.g, pink.b,

        orange.r, orange.g, orange.b,
        orange.r, orange.g, orange.b,
        orange.r, orange.g, orange.b,
        orange.r, orange.g, orange.b,
    ]);

    for(let z = -1; z <= 1; z += 1){
        for(let x = -1; x <= 1; x += 1){
            for(let y = -1; y <= 1; y += 1){
                geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
                cube = new THREE.Mesh( geometry, material );
                cube.position.z = z;
                cube.position.x = x;
                cube.position.y = y;

                const colorAttribute = new THREE.BufferAttribute(colors, 3);
                geometry.setAttribute("aVertexColor", colorAttribute);
                


                
                const edges = new THREE.EdgesGeometry( geometry );
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) ); 
                line.position.z = z;
                line.position.x = x;
                line.position.y = y;
                
                scene.add(line);
                scene.add(cube);
                
            }
        }
    }

    
    cube = new THREE.Mesh( geometry, material );
    

    scene.add( cube );

    
}

function animate() {
    renderer.render( scene, camera );
    controls.update();
}


function onPointerDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onPointerUp(event){
    mouseDown = false;
}

function onPointerMove(event){
    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    mouseX = event.clientX;

    mouseY = event.clientY;

    if(mouseDown){
        const rotationSpeed = 0.01;
        cube.rotation.y += deltaX * rotationSpeed;
        cube.rotation.x += deltaY * rotationSpeed;
    }
}

init();