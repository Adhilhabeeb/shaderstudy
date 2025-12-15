  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
		uniform float thickness;
		uniform float fvalue;
varying vec3 vposition;
varying vec3 vnormal;

float rand(vec2 n) {
  return fract(
    sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453123
  );
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n);
  vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));

  return mix(
    mix(rand(b), rand(b + d.yx), f.x),
    mix(rand(b + d.xy), rand(b + d.yy), f.x),
    f.y
  );
}


// float noise(float p){
// 	float fl = floor(p);
//   float fc = fract(p);
// 	return mix(rand(fl), rand(fl + 1.0), fc);
// }
	


  void main() { 
    vec2 uv=vUv;
     vec3 normal=normalize(vnormal);
    if (!gl_FrontFacing)  normal*=-1.;
    #include <tonemapping_fragment>
     #include <colorspace_fragment>
   

    uv-=0.5;
   
float  stripes= vposition.y;
stripes= fract(stripes*10.+uTime);
// stripes=pow(stripes,2.);
//  


 vec3 viewdier=normalize(vposition -cameraPosition);

float   fernasel=  dot(viewdier,normal);
fernasel=pow(fernasel,2.);
float noise1=noise(vposition.xy);

vec3 color=vec3(1.,1.,0.);
				gl_FragColor=vec4( vec3(uColor ),  1.-  smoothstep(0.2,0.4,fernasel)* 1.-stripes );

  }