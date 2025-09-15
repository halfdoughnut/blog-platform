import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';

// --- Shaders (These are unchanged and correct) ---
const vertexShader = `
  varying vec2 vUv;
  void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); vUv = uv; }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  float noise (vec2 st) {
      vec2 i = floor(st); vec2 f = fract(st);
      float a = random(i); float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 st) {
      float value = 0.0; float amplitude = .5;
      for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st); st *= 2.; amplitude *= .5;
      }
      return value;
  }
  void main() {
    vec2 pos = vec2(vUv * 3.0); float t = uTime * 0.1;
    float a = fbm(pos + t); float b = fbm(pos + a); float c = fbm(pos + b);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.15, distance(vUv, uMouse));
    c += mouseInfluence * 0.2;
    vec3 deepSpaceColor = vec3(0.05, 0.0, 0.1); vec3 nebulaCoreColor = vec3(0.3, 0.1, 0.4);
    vec3 starColor = vec3(0.8, 0.9, 1.0);
    vec3 mixedColor = mix(deepSpaceColor, nebulaCoreColor, c);
    mixedColor = mix(mixedColor, starColor, smoothstep(0.8, 1.0, c));
    float vignette = 1.0 - length(vUv - 0.5) * 0.9;
    gl_FragColor = vec4(mixedColor * vignette, 1.0);
  }
`;

// --- React Components ---

function NebulaScene() {
  const shaderRef = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 },
    uMouse: { value: new Vector2(0.5, 0.5) },
  }), []);

  useFrame(({ clock, mouse }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.uMouse.value.x = mouse.x * 0.5 + 0.5;
      shaderRef.current.uniforms.uMouse.value.y = mouse.y * 0.5 + 0.5;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial ref={shaderRef} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}


// This is the component you import into App.jsx
function AnimatedNebula() {
  // === THIS IS THE CRUCIAL CHANGE ===
  // We wrap the Canvas in a standard div. This div handles all the styling.
  // This approach is more stable and predictable for browser rendering.
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <NebulaScene />
      </Canvas>
    </div>
  );
}

export default AnimatedNebula;