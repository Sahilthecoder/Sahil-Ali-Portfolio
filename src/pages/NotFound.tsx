'use client';
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Text3D, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Wormhole shader
function Wormhole() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms?.time) {
        material.uniforms.time.value = clock.getElapsedTime();
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]}>
      <cylinderGeometry args={[5, 5, 60, 64, 1, true]} />
      <shaderMaterial
        side={THREE.BackSide}
        transparent
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float time;
          void main() {
            float wave = sin(vUv.y * 20.0 + time * 5.0) * 0.05;
            vec3 color = mix(vec3(0.0, 0.8, 1.0), vec3(0.5, 0.0, 1.0), vUv.y + wave);
            gl_FragColor = vec4(color, 0.8);
          }
        `}
      />
    </mesh>
  );
}

// Asteroids with warp speed
function Asteroids() {
  const group = useRef<THREE.Group>(null!);
  const count = 150;
  const temp = new Array(count).fill(0);

  useFrame(() => {
    group.current.children.forEach((asteroid) => {
      asteroid.position.z += 0.8;
      if (asteroid.position.z > 10) {
        asteroid.position.z = -200;
        asteroid.position.x = Math.random() * 100 - 50;
        asteroid.position.y = Math.random() * 100 - 50;
      }
      asteroid.rotation.x += 0.02;
      asteroid.rotation.y += 0.02;
    });
  });

  return (
    <group ref={group}>
      {temp.map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * -200,
          ]}
        >
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#aaa" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Spacetime bending 404 text
function WarpText() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.position.z = Math.sin(clock.getElapsedTime()) * 0.5;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <Text3D
      ref={ref}
      font="/fonts/helvetiker_regular.typeface.json"
      size={2}
      height={0.3}
      curveSegments={12}
      bevelEnabled
      bevelSize={0.04}
      bevelSegments={5}
      position={[-3, 0, 0]}
    >
      404
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.9} />
    </Text3D>
  );
}

export default function NotFound() {
  const [start, setStart] = useState(false);

  return (
    <div className="w-screen h-screen bg-black relative">
      {/* Overlay UI */}
      <AnimatePresence>
        {!start && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 bg-black bg-opacity-90"
          >
            <motion.h1
              className="text-6xl font-bold mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Lost in a Wormhole
            </motion.h1>
            <p className="text-lg mb-6">Click to warp through spacetime...</p>
            <button
              onClick={() => setStart(true)}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-lg font-semibold"
            >
              Enter the Rift
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Scene */}
      {start && (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="night" />
            <Stars radius={300} depth={100} count={10000} factor={5} />
            <Wormhole />
            <Asteroids />
            <WarpText />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
