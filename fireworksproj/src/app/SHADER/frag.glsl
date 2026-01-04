  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  uniform   float fvalue;

  uniform sampler2D imgtexture;

varying  float vzdepth;



  void main() { 
    vec2 uv=vUv;
 
    vec4 texturecolor= texture( imgtexture, gl_PointCoord );

   

				gl_FragColor=vec4( vec3(1.,0.,0. ),  texturecolor.r);

  }