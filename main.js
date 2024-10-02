import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('#c');

let scene, camera, renderer;
let color, intensity, light;
const clock = new THREE.Clock();



let book = null;
let thrown_down = false;
let mixer;

init();

function init(){
	console.log("init");
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	color = 0xFFFFFF;
	intensity = 1;
	light = new THREE.AmbientLight(color, intensity);
	scene.add(light);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	camera.position.z = 3;

	resizeRendererToDisplaySize(renderer)

	const loader = new GLTFLoader();

loader.load( 'book.glb', function  ( gltf ) {

	gltf.scene.scale.set(2,2,2);
	scene.add( gltf.scene );
	book = gltf;
	book_set_position();
	book_set_rotate();
	mixer = new THREE.AnimationMixer(gltf.scene)
	const clips = gltf.animations;
	const clip = THREE.AnimationClip.findByName(clips, 'Animation');
	const action = mixer.clipAction(clip);
	action.play();
	renderer.setAnimationLoop(animate);

}, undefined, function ( error ) {

	console.error( error );
	console.log("BOOM")
}

);
}


function animate() 
{
		mixer.update(clock.getDelta());
		renderer.render(scene, camera);
}


function book_helper()
{
	const axesHelper = new THREE.AxesHelper( 5 ); scene.add( axesHelper );
	const dir = new THREE.Vector3( rotation_x, rotation_y, rotation_z ); 
	const origin = new THREE.Vector3( 0, 0, 0 ); 
	const length = 1; const hex = 0xffff00; 
	const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex ); 

	dir.normalize(); 
	scene.add( arrowHelper );
}


function book_set_position()
{
	book.scene.position.x = -0.8
	book.scene.position.y = 1.0
	book.scene.position.z = -5.0
}

function book_set_rotate(){
	let rotation_x = 2;
	let rotation_y = 0;
	let rotation_z = 0;

	book.scene.rotation.x = rotation_x;
	book.scene.rotation.y = rotation_y;
	book.scene.rotation.z = rotation_z;
}


function slide_book()
{
	if(book.scene.position.x <= 0.5)
	{
		book.scene.position.x += 0.03;
	}
}


function throw_down() {
	if (book.scene.position.z > 3.5)
	{
		book.scene.position.z -= 0.02;
		book.scene.position.y += 0.01;
		book.scene.rotation.x -= 0.01;
	}
	else
	{
		thrown_down = true;
	}
}


function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
	  renderer.setSize(width, height, false);
	}
	return needResize;
  }

