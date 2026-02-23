"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

interface TetrisBlockProps {
  position: [number, number, number];
  color: string;
  isGhost?: boolean;
  isClearing?: boolean;
}

export default function TetrisBlock({
  position,
  color,
  isGhost = false,
  isClearing = false,
}: TetrisBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    return new RoundedBoxGeometry(0.88, 0.88, 0.88, 4, 0.12);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (isClearing) {
      meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), delta * 5);
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.opacity = Math.max(
          0,
          meshRef.current.material.opacity - delta * 3
        );
      }
    } else {
      meshRef.current.scale.set(1, 1, 1);
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.opacity = isGhost ? 0.2 : 1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry} castShadow>
      <meshStandardMaterial
        color={color}
        transparent={isGhost || isClearing}
        opacity={isGhost ? 0.15 : 1}
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}
