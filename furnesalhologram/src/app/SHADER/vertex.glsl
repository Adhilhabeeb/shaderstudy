precision highp float;

varying vec2 vUv;
varying vec3 vposition;
varying vec3 vnormal;

//https://chatgpt.com/share/693e9f98-ea34-8003-b163-31688e2945e0      
//   go to this 
void main() {
  vUv = uv;
 

//  modelmatrix is used to make the rotation and scaloinga nd chanhing the posituin    ennal  
//  nammal  ength cheythalum like position change ,rotation change ,scaling enth cheythalum the vectior will not change or move 
  vec4 modelposition= modelMatrix * vec4(position, 1.0);
  //  thazhethel  ithile  ippol model roation or posituoin changinhor scalling vannalum the  nomal athoini ansarich maran
  vec4 modelnorml= modelMatrix * vec4(normal, 0.0);

  gl_Position = projectionMatrix * viewMatrix*modelposition;
  vposition=modelposition.xyz;
  vnormal=modelnorml.xyz;

}
