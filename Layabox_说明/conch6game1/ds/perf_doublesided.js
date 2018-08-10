/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
function layaNativeAdpt(gl){
    gl.getShaderPrecisionFormat=function(shadertype, precisiontype){
        return {
            rangeMin:127,
            rangeMax:127,
            precision:23
        };   
    }
}

var container;
/**@type {THREE.PerspectiveCamera} */
var camera;
/**@type {THREE.scene} */
var scene;
/**@type {THREE.WebGLRenderer} */
var renderer;
var mesh, geometry;
var mouseX = 0, mouseY = 0;
var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;

var windowHalfX = SCREEN_WIDTH / 2;
var windowHalfY = SCREEN_HEIGHT / 2;
var webgl = null;

init();
//setTimeout(animate,2000);
var startRender=false;
setTimeout(()=>{startRender=true;},1000);
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 20000 );
    camera.position.z = 3200;

    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0x050505 ) );

    var light = new THREE.PointLight( 0x0011ff, 1, 5500 );
    light.position.set( 4000, 0, 0 );
    scene.add( light );

    var light = new THREE.PointLight( 0xff1100, 1, 5500 );
    light.position.set( -4000, 0, 0 );
    scene.add( light );

    var light = new THREE.PointLight( 0xffaa00, 2, 3000 );
    light.position.set( 0, 0, 0 );
    scene.add( light );

    var path = "examples/textures/cube/SwedishRoyalCastle/";
    var format = '.jpg';
    var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];

    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;

    var material = new THREE.MeshPhongMaterial( { specular: 0x101010, shininess: 100, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1, side: THREE.DoubleSide } );

    var geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI );

    for ( var i = 0; i < 500; i ++ ) {

        var mesh = new THREE.Mesh( geometry, material );

        mesh.position.x = Math.random() * 10000 - 5000;
        mesh.position.y = Math.random() * 10000 - 5000;
        mesh.position.z = Math.random() * 10000 - 5000;

        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50 + 100;

        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        scene.add( mesh );

    }
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x050505 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

    webgl = renderer.context;
    if(webgl == null){
        alert("do not support webgl");
        return;
    }
}

//
function onWindowResize( event ) {

    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();

    windowHalfX = SCREEN_WIDTH / 2;
    windowHalfY = SCREEN_HEIGHT / 2;

}

function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;

}

//

function animate() {
    requestAnimationFrame( animate );
    if(startRender)
        render();
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
