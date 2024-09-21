import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 5;



let book = null;
let test = 0;
let thrown_down = false;
let slid_book = false;

const loader = new GLTFLoader();

loader.load( 'book/scene.gltf',  ( gltf ) => {

	gltf.scene.rotation.x = 2;
	gltf.scene.rotation.y = 0.0;
	gltf.scene.rotation.z = 0.0;

	gltf.scene.scale.set(2,2,2);
	scene.add( gltf.scene );

	book = gltf;
	test = 5;
	book.scene.position.x = -0.8
	book.scene.position.y = -1.0
	book.scene.position.z = 5.0

}, undefined, function ( error ) {

	console.error( error );

} 

);	



function animate() {

	if (book)
	{
		throw_down()

		if(thrown_down)
		{
			slide_book()
		}
		renderer.render( scene, camera );
	}
}
renderer.setAnimationLoop( animate );


function throw_down() {

	if (book.scene.position.z > 3.5)
	{
		book.scene.position.z -= 0.02;
		book.scene.position.y += 0.01
		book.scene.rotation.x -= 0.01

		console.log(book.scene.position.z)
	}

	else
	{
		thrown_down = true;
	}

}

function slide_book()
{


	if(book.scene.position.x <= 0.5)
	{
		book.scene.position.x += 0.03;
	}


}