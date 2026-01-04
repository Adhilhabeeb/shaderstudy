"use client";



import { Sky } from 'three/addons/objects/Sky.js';
import sparkimg from "@/../../public/symbol_02.png";
import { useEffect, useRef } from "react";
import *  as THREE from "three"
import { GUI } from "dat.gui";
import vertexShader from "@/app/SHADER/vertex.glsl";
import fragmentShader from "@/app/SHADER/frag.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
console.log(Sky,"is sky")
export default function Cube() {
  
			let sky:any, sun :any;
 const mountRef = useRef<HTMLDivElement | null>(null);

let startmaterilq:any, startgeomtry1:any;

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
const clock = new THREE.Clock();

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
      thickness:0.2,
      resolution:new THREE.Vector2(window.innerWidth, window.innerHeight),
      pixelratio: Math.min(window.devicePixelRatio, 2),
    };


    cubeSettings.resolution.set(window.innerWidth   *cubeSettings.pixelratio, window.innerHeight  *cubeSettings.pixelratio);
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
    // Cube


  
let gui=new GUI();

let isplayimging=false;
 
  function createfire(count:number,position=new THREE.Vector3(0,0,0)){ 

    
   


    console.log("firework created");
   
      let  geometruy=new THREE.BufferGeometry();
let  positionarray=new Float32Array(count*3)
let randsize=new Float32Array(count)
      for (let i = 0; i < count; i++) {
         
let cylendfc = new THREE.Spherical(
    2,                               // radius
    Math.random() * Math.PI ,     // theta (angle)
     Math.random() * Math.PI*2   // height (y)
  );
      let position=new THREE.Vector3().setFromSpherical(cylendfc)
       let  i3=i*3
        // positionarray[i3+0]=(Math.random()-0.5)
        // positionarray[i3+1]=(Math.random()-0.5)
        // positionarray[i3+2]=(Math.random()-0.5)
                positionarray[i3+0]=position.x
        positionarray[i3+1]=position.y
        positionarray[i3+2]=position.z
     randsize[i] = Math.random() ;

      }
console.log(randsize,"is randsize")
      geometruy.setAttribute('position',new THREE.Float32BufferAttribute(positionarray,3))
 geometruy.setAttribute('randsize',new THREE.Float32BufferAttribute(randsize,1))


                    let material = new THREE.ShaderMaterial({
                      vertexShader: vertexShader,
                      fragmentShader: fragmentShader,

                      uniforms:{

                        imgtexture:{value:new THREE.TextureLoader().load(sparkimg.src)},
uTime:new THREE.Uniform(0),
uresolution:new THREE.Uniform(cubeSettings.resolution),
                        fvalue:new THREE.Uniform(cubeSettings.fvalue),
                        thickness:new THREE.Uniform(cubeSettings.thickness),
              
                      },
                      transparent:true,
                      depthWrite:false,
                      blending:THREE.AdditiveBlending,
                    });


startmaterilq=material

      let points = new THREE.Points(geometruy, material);
      points.name="fireworkpoints"
      scene.add(points);
// points.position.copy(position)
      // Animate fvalue from 10 to 0 over 4 seconds
      gsap.to(material.uniforms.fvalue, {
  value: 1,
  duration: 2,
  ease: "power2.out",
  onUpdate: () => {
    console.log("updating")
    // material.uniforms.fvalue.value = cubeSettings.fvalue;
  },
onComplete:()=>{

startmaterilq=null
  scene.remove(points);
  geometruy.dispose();
  material.dispose();
}
});




      return [material,geometruy]
    }
    


	const effectController = {
					turbidity: 10,
					rayleigh: 3,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.7,
					elevation: 2,
					azimuth: 180,
					exposure: renderer.toneMappingExposure
				};
    
    

    //sky
    	function initSky() {

				// Add Sky
				sky = new Sky();
				sky.scale.setScalar( 450000 );
				scene.add( sky );

				sun = new THREE.Vector3();
function guiChanged() {

					const uniforms = sky.material.uniforms;
					uniforms[ 'turbidity' ].value = effectController.turbidity;
					uniforms[ 'rayleigh' ].value = effectController.rayleigh;
					uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
					uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

					const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
					const theta = THREE.MathUtils.degToRad( effectController.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					uniforms[ 'sunPosition' ].value.copy( sun );

					renderer.toneMappingExposure = effectController.exposure;
					renderer.render( scene, camera );

				}

return {guiChanged};
      }

      let {guiChanged}=initSky();
 
	gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

				guiChanged()

  //gui


  gui.add(cubeSettings,"thickness",0,10,0.01).onChange((value:number)=>{



    // startmateril.uniforms.thickness.value = value;
  })




  //

  const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// Define a hypothetical plane at z=0 (or adjust as needed)
const targetPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

const intersectionPoint = new THREE.Vector3();
function onMouseMove(event) {
  console.log(event,"w")
    // Update the mouse position (NDC)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find the intersection point with the targetPlane
    if (raycaster.ray.intersectPlane(targetPlane, intersectionPoint)) {
        console.log(`Scene Position: X: ${intersectionPoint.x.toFixed(2)}, Y: ${intersectionPoint.y.toFixed(2)}, Z: ${intersectionPoint.z.toFixed(2)}`);
 
  let [startmateril,startgeomtry]=createfire(1000,new THREE.Vector3(Number(intersectionPoint.x.toFixed(2)),Number(intersectionPoint.x.toFixed(2)),0)  )

      }


}

window.addEventListener("click", onMouseMove,false);
  //
  const texture = new THREE.CanvasTexture(renderer.domElement);

// 3. Use the texture in a material and mesh
// const material = new THREE.MeshBasicMaterial({ map: texture });
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// mesh.position.set(2,0,0)

// console.log()
// ===== TONE MAPPING GUI =====
const params = {
  toneMapping: "ACESFilmic",
  exposure: 1.0,
};

const toneMappingOptions :any= {
  NoToneMapping: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
};

const params1= {
  blending: "Normal",
};




    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
    let  elapes=clock.getElapsedTime()
    // console.log(elapes,"is wlps ")
// startmateril.uniforms.uTime.value=elapes
  if (startmaterilq) {
    console.log("ond",startmaterilq,elapes)
    startmaterilq.uniforms.uTime.value = elapes;
  }

    

controls.update();














      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();


      //

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      cubeSettings.pixelratio= Math.min(window.devicePixelRatio, 2);
      //
      renderer.setSize(window.innerWidth, window.innerHeight);

      cubeSettings.resolution.set(window.innerWidth   *cubeSettings.pixelratio, window.innerHeight  *cubeSettings.pixelratio);
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
