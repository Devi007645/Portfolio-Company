// Fresnel-based glow fragment shader
uniform vec3 uColor;
uniform float uIntensity;
uniform float uOpacity;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 3.0);
  vec3 glow = uColor * fresnel * uIntensity;
  gl_FragColor = vec4(glow, fresnel * uOpacity);
}
