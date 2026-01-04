precision highp float;
  uniform float uTime;
  attribute float randsize;
varying vec2 vUv;
varying vec3 vposition;
varying vec3 vnormal;
  uniform   float fvalue;
varying  float vzdepth;

  uniform   float thickness;
uniform  vec2 uresolution;
//https://chatgpt.com/share/69595842-2d2c-8003-8717-a74509dab6c6     
//   go to this 
float remap(
    float value,
    float inMin,
    float inMax,
    float outMin,
    float outMax
) {
    return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}


float explode(vec3 p, float radius) {
    return clamp(1.0 - length(p) / radius, 0.0, 1.0);
}

void main() {
  vUv = uv;
 

//  modelmatrix is used to make the rotation and scaloinga nd chanhing the posituin    ennal  
//  nammal  ength cheythalum like position change ,rotation change ,scaling enth cheythalum the vectior will not change or move 
 
 vec3 newposition=position;
// newposition.y=sin(uTime + newposition.x * 5.0) * fvalue;

  float strength = remap(
    fvalue,        // value
    0.0,         // near
    1.,    // far
    0.0,         // strong near
    1.0          // weak far
);
strength=clamp(strength,0.,1.);
strength=pow(1.-strength,3.);
  newposition *=  1.-  strength  ;
//fslling
float fallingstrnegth = remap(
    fvalue,        // value
    0.0,         // near
    1.,    // far
    0.1,         // strong near
    0.5          // weak far
);

// fallingstrnegth=clamp(fallingstrnegth,0.,1.);
// fallingstrnegth=1.-pow(1.-fallingstrnegth,3.);
newposition.y -= fallingstrnegth * 2.0; // Adjust the multiplier as


//size increase

float sizeincrease = remap(
    fvalue,        // value
    0.0,         // near
    0.,    // far
    0.0,         // small near
    1.0          // large far 
);



float sizeincrease2 = remap(
    fvalue,        // value
    0.,         // near
    1.,    // far
    1.0,         // small near
    0.0          // large far 
);




float minsize=min(sizeincrease,sizeincrease2);

//twinking

float twinkling = remap(
    fvalue,        // value
    0.0,         // near
    0.8,    // far
    0.0,         // no twinkling near
    1.0          // full twinkling far
);  
twinkling=clamp(twinkling,0.,1.);

twinkling=twinkling* sin(uTime * 10.0) * 0.5 + 0.5; // Oscillate between 0 and 1




  vec4 modelposition= modelMatrix * vec4(newposition, 1.0);
  
    vec4 viewposition = viewMatrix * modelposition;     // is it thw each vertex posiiton in the view space  it is in like the negative z like(0,0,-5)  // it is in the camera space    
    //  viewposition  ennal ithu   aa oro vertex inteyum camaraviewspace il yulla posiiton  
  gl_Position = projectionMatrix * viewposition; 
 gl_PointSize =  thickness * uresolution.y *randsize *minsize *twinkling  ;

// gl_PointSize = randsize *uresolution.y  ;   
float fog = 1.0 / -viewposition.z;   // it wil mke like     when 
//  the viewpositioin.z ( ee viewposiion.z ennath negative ayirokkum)   appol athine positive akkan _  use cheth 
//  1.0 / -viewposition.z;    ennal  aa vertex aduth verumbiol aa value kudum  dureanel kurayum 
 
vzdepth= fog ;

gl_PointSize*= 1./- viewposition.z ;      

}
