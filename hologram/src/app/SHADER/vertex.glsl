  varying vec2 vUv;
uniform  float  uTime;
attribute vec3 center;
			varying vec3 vCenter;

  void main() {
    vUv = uv;
    	vCenter = center;
    float wave = sin(length(uv) * 10.0 + uTime) * 0.5 + 0.5;
  vec3   vposition= position* vec3(wave);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

 
  }