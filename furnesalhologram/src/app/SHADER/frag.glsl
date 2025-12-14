  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
		uniform float thickness;
		uniform float fvalue;
varying vec3 vposition;
varying vec3 vnormal;




  void main() {
    #include <tonemapping_fragment>
     #include <colorspace_fragment>
    vec2 uv=vUv;
     vec3 normal=normalize(vnormal);

    uv-=0.5;
   
// float  stripes= vposition.y;
// stripes= fract(stripes*10.+uTime);
// stripes=pow(stripes,2.);
// //  


 vec3 viewdier=normalize(vposition -cameraPosition);

float   fernasel=  dot(viewdier,normal);
fernasel=pow(fernasel,2.);

				gl_FragColor=vec4( vec3(fernasel),  1.- step(0.3,fernasel)  );

  }