  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
		uniform float thickness;

			varying vec3 vCenter;

  void main() {
    vec2 uv=vUv;

    uv-=0.5;
   

  float dist = length(uv);
float fr = fract(dist  -uTime);
	vec3 afwidth = fwidth( vCenter.xyz );

				vec3 edge3 = step(  thickness * afwidth, vCenter.xyz );

				float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );
        	vec3 smm= gl_FrontFacing ? vec3( 0.) : vec3( 0. );
          float f=step(0.8,fr);
   vec3 gg=mix(vec3(0.),vec3(uColor),f);

gl_FragColor = vec4(gg, 1.0);

			
				gl_FragColor.a *= edge;

  }