import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface StoneModelProps {
  index: number;
  position: [number, number, number];
  scale: number;
  modelPath: string;
  isSelected: boolean;
  onClick: () => void;
}

export const StoneModel = ({
  index,
  position,
  scale,
  modelPath,
  isSelected,
  onClick
}: StoneModelProps) => {
  // For now, we'll use a simple sphere as a placeholder
  // In a real app, you would use useGLTF to load the model
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Determine color based on selection
  const color = isSelected ? "#d4af37" : "#ffffff"; // Gold if selected, white if not
  
  // Add a subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8 + index) * 0.05;
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, scale]}
      userData={{ index }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.4} 
        metalness={isSelected ? 0.8 : 0.3} 
      />
    </mesh>
  );
};