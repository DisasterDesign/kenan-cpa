"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import type { GameState } from "@/lib/tetris-types";
import TetrisBoard from "./TetrisBoard";

const ROWS = 3;
const BASE_ROTATION_Y = 0.69; // ~39.5 degrees

const BASE_TILT_X = 0.16;
const BASE_TILT_Z = -0.18;

interface TetrisSceneProps {
  gameState: GameState;
}

export default function TetrisScene({ gameState }: TetrisSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { gl, size } = useThree();

  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;

  // Responsive positioning
  const groupX = isMobile ? -1.5 : isTablet ? -2 : -3.1;
  const groupY = isMobile ? 0 : isTablet ? -0.8 : -1.3;
  const groupScale = isMobile ? 0.45 : isTablet ? 0.55 : 0.65;

  // Enable shadow maps on the renderer
  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);

  // Track mouse — only on desktop (no mouse on mobile)
  useEffect(() => {
    if (isMobile) {
      mouseRef.current = { x: 0, y: 0 };
      return;
    }
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    return () => canvas.removeEventListener("mousemove", onMove);
  }, [gl, isMobile]);

  // Smooth parallax rotation each frame (layered on top of keyboard-tuned base)
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      BASE_ROTATION_Y + mouseRef.current.x * 0.12,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      BASE_TILT_X + (-mouseRef.current.y * 0.08),
      0.04
    );
  });

  const floorY = -(ROWS - 1) / 2 - 0.44;

  return (
    <>
      <Environment files="/monochrome_studio_02_1k.hdr" environmentIntensity={0.5} environmentRotation={[0, Math.PI, 0]} />

      <ambientLight intensity={0.9} />
      <directionalLight
        position={[4, 10, 6]}
        intensity={1.7}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.002}
      />
      <directionalLight position={[-3, 4, -3]} intensity={0.7} color="#97A9CA" />
      <pointLight position={[0, -1, 5]} intensity={0.8} color="#224988" distance={15} />

      <group position={[groupX, groupY, 0]} scale={groupScale}>
        <group ref={groupRef} rotation={[BASE_TILT_X, BASE_ROTATION_Y, BASE_TILT_Z]}>
          <TetrisBoard gameState={gameState} />

          {/* Invisible floor that receives shadows */}
          <mesh
            position={[0, floorY, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[250, 250]} />
            <shadowMaterial transparent opacity={0.15} />
          </mesh>
        </group>
      </group>
    </>
  );
}
