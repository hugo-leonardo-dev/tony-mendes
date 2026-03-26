"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Float, PerspectiveCamera, OrbitControls, Environment, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const { mouse } = useThree();
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Subtle mouse-based parallax
      textRef.current.rotation.y = THREE.MathUtils.lerp(
        textRef.current.rotation.y,
        (mouse.x * Math.PI) / 10,
        0.1
      );
      textRef.current.rotation.x = THREE.MathUtils.lerp(
        textRef.current.rotation.x,
        (-mouse.y * Math.PI) / 10,
        0.1
      );
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Environment preset="city" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Center ref={textRef}>
          <Text3D
            font="https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            TONY MENDES
            <meshStandardMaterial 
              color="#ffffff" 
              metalness={0.8} 
              roughness={0.2} 
              emissive="#ffffff"
              emissiveIntensity={0.1}
            />
          </Text3D>
        </Center>
      </Float>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4.5}
      />
      
      {/* Particles / Glow Effect */}
      <Points />
    </>
  );
}

function Points() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export function Hero3DText() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}
