'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface EmberProps {
  count?: number;
}

function EmberParticles({ count = 350 }: EmberProps) {
  const mesh = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();

  // Generate particle data: positions, velocities, scales, lifecycles, and colors
  const { positions, velocities, scales, lifespans, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const life = new Float32Array(count);
    const col = new Float32Array(count * 3);

    // Warm ember colors: gold (#fbbf24), radiant orange (#f97316), flame crimson (#ef4444)
    const colorPalette = [
      new THREE.Color('#fbbf24'),
      new THREE.Color('#f97316'),
      new THREE.Color('#ea580c'),
      new THREE.Color('#ef4444'),
      new THREE.Color('#fdba74'),
    ];

    for (let i = 0; i < count; i++) {
      // Spread across width and vertical span
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      // Velocities: upwards drift + horizontal breeze
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = 0.015 + Math.random() * 0.025; // upward rise
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;

      sca[i] = 1.0 + Math.random() * 2.5;
      life[i] = Math.random() * Math.PI * 2;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return {
      positions: pos,
      velocities: vel,
      scales: sca,
      lifespans: life,
      colors: col,
    };
  }, [count]);

  // Texture for rounded glowing particles
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(254, 215, 170, 0.9)');
      gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.5)');
      gradient.addColorStop(0.8, 'rgba(220, 38, 38, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Smooth mouse interpolation
    mouse.current.targetX = (state.pointer.x * viewport.width) / 2;
    mouse.current.targetY = (state.pointer.y * viewport.height) / 2;
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    const posAttr = mesh.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      lifespans[i] += delta * 1.5;

      // Base upward movement with sine turbulence
      posArray[i3 + 1] += velocities[i3 + 1] + Math.sin(time * 2 + i) * 0.003;
      posArray[i3] += velocities[i3] + Math.cos(time * 1.5 + i) * 0.005;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Mouse heat repulsion
      const dx = posArray[i3] - mouse.current.x;
      const dy = posArray[i3 + 1] - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.5 && dist > 0.1) {
        const force = (3.5 - dist) * 0.015;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force + 0.01;
      }

      // Reset when particle floats too high or out of bounds
      if (posArray[i3 + 1] > 6) {
        posArray[i3 + 1] = -5 - Math.random() * 2;
        posArray[i3] = (Math.random() - 0.5) * 14;
        posArray[i3 + 2] = (Math.random() - 0.5) * 5;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        map={particleTexture}
        transparent
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={0.85}
      />
    </points>
  );
}

function AmbientGlowHearth() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.intensity = 2.0 + Math.sin(t * 4) * 0.4 + Math.cos(t * 7) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight
        ref={lightRef}
        position={[0, -3, 1]}
        color="#ff7700"
        distance={12}
        decay={2}
      />
      <pointLight position={[3, 2, -1]} color="#f59e0b" intensity={0.5} distance={8} />
    </>
  );
}

export default function EmberHeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <AmbientGlowHearth />
        <EmberParticles count={280} />
      </Canvas>
      {/* Seamless radial and bottom gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[at_50%_40%] from-transparent via-stone-950/60 to-stone-950 pointer-events-none" />
    </div>
  );
}
