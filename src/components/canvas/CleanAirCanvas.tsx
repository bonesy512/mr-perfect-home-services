'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleWaveProps {
  count?: number;
}

function CleanAirParticles({ count = 280 }: ParticleWaveProps) {
  const mesh = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();

  // Create clean air particle data: fresh cyan, emerald mint green, electric blue
  const { positions, velocities, scales, offsets, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const off = new Float32Array(count);
    const col = new Float32Array(count * 3);

    // Brand color palette: Mint Green (#3DCB7D), Fresh Cyan (#5DCCD3), Vivid Blue (#0376F4), White Air Sparkle (#E0F2FE)
    const brandColors = [
      new THREE.Color('#3DCB7D'),
      new THREE.Color('#5DCCD3'),
      new THREE.Color('#0376F4'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#e0f2fe'),
    ];

    for (let i = 0; i < count; i++) {
      // Flowing wave positions across screen
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      // Velocities: gentle horizontal breeze + harmonic wave drift
      vel[i * 3] = 0.008 + Math.random() * 0.015;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;

      sca[i] = 1.0 + Math.random() * 2.2;
      off[i] = Math.random() * Math.PI * 2;

      const c = brandColors[Math.floor(Math.random() * brandColors.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return {
      positions: pos,
      velocities: vel,
      scales: sca,
      offsets: off,
      colors: col,
    };
  }, [count]);

  // Clean glow circle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(93, 204, 211, 0.9)');
      gradient.addColorStop(0.6, 'rgba(61, 203, 125, 0.4)');
      gradient.addColorStop(0.9, 'rgba(3, 118, 244, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Smooth cursor interpolation
    mouse.current.targetX = (state.pointer.x * viewport.width) / 2;
    mouse.current.targetY = (state.pointer.y * viewport.height) / 2;
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    const posAttr = mesh.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Horizontal air breeze + sinusoidal clean air oscillation
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += Math.sin(time * 1.2 + offsets[i] + posArray[i3] * 0.3) * 0.01;
      posArray[i3 + 2] += Math.cos(time * 0.8 + offsets[i]) * 0.005;

      // Cursor clean air dispersion reaction
      const dx = posArray[i3] - mouse.current.x;
      const dy = posArray[i3 + 1] - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3.2 && dist > 0.1) {
        const force = (3.2 - dist) * 0.015;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }

      // Loop particles seamlessly across screen boundary
      if (posArray[i3] > 8.5) {
        posArray[i3] = -8.5;
        posArray[i3 + 1] = (Math.random() - 0.5) * 10;
        posArray[i3 + 2] = (Math.random() - 0.5) * 5;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        map={particleTexture}
        transparent
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={0.8}
      />
    </points>
  );
}

function AmbientAirLights() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight
        ref={lightRef}
        position={[2, 2, 2]}
        color="#5DCCD3"
        distance={14}
        decay={2}
      />
      <pointLight position={[-3, -2, 1]} color="#3DCB7D" intensity={1.0} distance={10} />
      <pointLight position={[0, -4, 0]} color="#0376F4" intensity={0.8} distance={12} />
    </>
  );
}

export default function CleanAirCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <AmbientAirLights />
        <CleanAirParticles count={260} />
      </Canvas>
      {/* Pristine atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d19] via-[#080d19]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[at_50%_30%] from-transparent via-[#080d19]/60 to-[#080d19] pointer-events-none" />
    </div>
  );
}
