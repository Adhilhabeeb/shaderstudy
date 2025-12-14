"use client";





import { useEffect, useRef } from "react";
import *  as THREE from "three"
import { GUI } from "dat.gui";
import vertexShader from "@/app/SHADER/vertex.glsl";
import fragmentShader from "@/app/SHADER/frag.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Cube() {
 const mountRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
 
    const cubeSettings = {
      color: "#ff0000",
      check1:0,
      fvalue:0,
      thickness:1
    };
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
    // Cube
    const geometry = new THREE.SphereGeometry(1,15,32);
  const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        fvalue:{value:0.4},
        thickness:{value:cubeSettings.thickness},
        uTime: { value: cubeSettings.check1},
        uColor: { value: new THREE.Color("#00ffff") },
      },side:THREE.DoubleSide,alphaToCoverage:true,transparent:true
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    setupAttributes(geometry)
// const material2 = new THREE.ShaderMaterial( {

// 						uniforms: { 'thickness': { value: cubeSettings.thickness } },
// 						vertexShader: document.getElementById( 'vertexShader' ).textContent,
// 						fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
// 						side: THREE.DoubleSide,
// 						alphaToCoverage: true // only works when WebGLRenderer's "antialias" is set to "true"

// 					} );

// 					mesh2 = new THREE.Mesh( geometry, material2 );
    // dat.GUI
    const gui = new GUI();
    	gui.add( cubeSettings, 'fvalue', 0, 4,0.01 ).onChange( function (value) {

					material.uniforms.fvalue.value = value;
			

				} );
		gui.add( cubeSettings, 'thickness', 0, 4 ).onChange( function (value) {

					material.uniforms.thickness.value = value;
			

				} );

gui.add(cubeSettings, 'check1',0,1,0.1).onChange(value=>{
  //  material.uniforms.uTime.value = value;

})

			function setupAttributes( geometry:THREE.BufferGeometry ) {

				const vectors = [
					new THREE.Vector3( 1, 0, 0 ),
					new THREE.Vector3( 0, 1, 0 ),
					new THREE.Vector3( 0, 0, 1 )
				];

				const position = geometry.attributes.position;
				const centers = new Float32Array( position.count * 3*3 );

				for ( let i = 0, l = position.count*3; i < l; i ++ ) {

					vectors[ i % 3 ].toArray( centers, i * 3 );

				}

				geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

			}

    gui.addColor(cubeSettings, "color").onChange((value) => {
     material.uniforms.uColor.value.set(value);

    });
const clock = new THREE.Clock();
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
    let  elapes=clock.getElapsedTime()

    console.log(elapes)
material.uniforms.uTime.value=elapes
    

controls.update();














      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      gui.destroy();
      renderer.dispose();
   
      if (mountRef.current) {
  mountRef.current.removeChild(renderer.domElement);
}

    };
  }, []);

  return <div ref={mountRef} />;
}
