"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  varying vec2 vUv;
  
  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec2 uv = vUv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    float time = u_time * 0.15;
    
    // Mouse influence — visible aurora shift on cursor movement
    vec2 mouse = u_mouse * 1.0;
    
    // Layered noise for aurora effect — mouse affects all layers
    float n1 = snoise(vec3(uv * 1.2 + mouse * 0.4, time * 0.8));
    float n2 = snoise(vec3(uv * 2.4 - 0.5 + mouse * 0.25, time * 0.6 + 10.0));
    float n3 = snoise(vec3(uv * 0.8 + 0.3 + mouse * 0.15, time * 0.4 + 20.0));
    float n4 = snoise(vec3(uv * 3.0 + mouse * 0.1, time * 1.0 + 5.0));
    
    // Combine noise layers
    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.15 + n4 * 0.05;
    
    // Color palette — deep reds, blacks, subtle blue edges
    vec3 color1 = vec3(0.75, 0.75, 0.75);  // #c0c0c0ff — vibrant red
    vec3 color2 = vec3(0.07, 0.18, 0.76);  // #122fc1ff — deep red
    vec3 color3 = vec3(0.05, 0.02, 0.05);  // near black
    vec3 color4 = vec3(0.15, 0.05, 0.20);  // dark purple hint
    vec3 color5 = vec3(0.04, 0.04, 0.12);  // dark blue edge
    
    // Create aurora flow
    float flow1 = smoothstep(-0.2, 0.8, noise + sin(uv.y * 2.0 + time) * 0.3);
    float flow2 = smoothstep(0.0, 1.0, n2 * 0.5 + 0.5);
    float flow3 = smoothstep(-0.5, 0.5, n3);
    
    // Position-based gradient — more generous coverage
    float verticalGrad = smoothstep(-0.1, 0.55, vUv.y);
    float horizontalFlow = sin(vUv.x * 3.14159 + time * 0.5) * 0.5 + 0.5;
    
    // Mix colors — blues and whites more prominent
    vec3 color = color3; // start with near-black
    color = mix(color, color5, verticalGrad * 0.5); // stronger blue base
    color = mix(color, color2, flow1 * verticalGrad * 0.9); // deep blue flow
    color = mix(color, color1, flow2 * flow1 * 0.75); // white/silver highlights — boosted
    color = mix(color, color4, flow3 * 0.25); // subtle purple
    color = mix(color, color1, pow(flow1 * horizontalFlow * verticalGrad, 1.6) * 0.8); // bright white hotspots — more visible
    color = mix(color, vec3(0.85, 0.88, 0.95), pow(flow2 * verticalGrad, 3.0) * 0.3); // extra soft white glow
    
    // Vignette — darken edges
    vec2 vigUv = vUv - 0.5;
    float vignette = 1.0 - dot(vigUv, vigUv) * 0.8;
    color *= vignette;
    
    // Subtle grain
    float grain = fract(sin(dot(vUv * u_time, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.015;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Shader material
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      uniforms.u_time.value = (Date.now() - startTime) * 0.001;

      // Smooth mouse lerp
      uniforms.u_mouse.value.x +=
        (mouseRef.current.x - uniforms.u_mouse.value.x) * 0.05;
      uniforms.u_mouse.value.y +=
        (mouseRef.current.y - uniforms.u_mouse.value.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
