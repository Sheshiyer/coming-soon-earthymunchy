import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MistShader = {
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_res;
    uniform float u_intensity;
    varying vec2 vUv;

    // tiny hash + noise
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0,0.0));
      float c = hash(i + vec2(0.0,1.0));
      float d = hash(i + vec2(1.0,1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
    }

    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      for(int i=0;i<4;i++){
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main(){
      vec2 uv = vUv;
      // drift
      uv += vec2(0.02, 0.01) * u_time;
      // swirl
      uv += 0.02 * vec2(sin(u_time*0.2 + uv.y*6.0), cos(u_time*0.2 + uv.x*6.0));

      float n = fbm(uv * 3.0);
      // soft threshold
      float fog = smoothstep(0.45, 0.85, n);

      // vignette attenuation - center around top-middleish or just general
      float d = distance(vUv, vec2(0.55, 0.45));
      float attn = smoothstep(0.9, 0.2, d);

      float alpha = fog * attn * u_intensity;
      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
  `
};

const MistPlane = () => {
    const mesh = useRef();

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_intensity: { value: 0.12 }
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            // Slow down time a bit for dreaminess
            mesh.current.material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={MistShader.vertexShader}
                fragmentShader={MistShader.fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                depthTest={false}
                blending={THREE.AdditiveBlending} // Or maybe NormalBlending with low alpha? Prompt said "soft-light or screen". WebGL blending is tricky. 
            // Let's try NormalBlending since we output alpha. Or ScreenBlending.
            // Additive might blow out the whites.
            // Let's stick to default (Normal) and rely on the alpha output, or maybe Custom.
            />
        </mesh>
    );
};

const MistCanvas = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return null;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 12, pointerEvents: 'none', mixBlendMode: 'screen' }}>
            <Canvas
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: false }}
                camera={{ position: [0, 0, 1], zoom: 1 }} // Orthographic default
            >
                <MistPlane />
            </Canvas>
        </div>
    );
};

export default MistCanvas;
