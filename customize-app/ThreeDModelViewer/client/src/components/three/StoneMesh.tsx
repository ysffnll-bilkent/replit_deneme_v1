import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fitToCubeMeshOnly } from "../../utils/fitToCubeMeshOnly";
import { STONE_SIZE } from "../../utils/sceneConfig";

interface StoneMeshProps {
  url: string;
  position: [number, number, number];
  id: string;
  onRemove?: (id: string) => void;
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export default function StoneMesh({ 
  url, 
  position, 
  id, 
  onRemove, 
  rotation = [0, 0, 0],
  scale = [1, 1, 1]
}: StoneMeshProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  
  // Model klonlama ve boyutlandırma (sadece bir kez)
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    fitToCubeMeshOnly(cloned, STONE_SIZE);
    return cloned;
  }, [scene]);
  
  // Hover efekti için state
  const [hovered, setHovered] = React.useState(false);
  
  // Hover animasyonu
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.02;
    } else if (meshRef.current) {
      meshRef.current.position.y = position[1];
    }
  });
  
  // Click handler
  const handleClick = (event: any) => {
    event.stopPropagation();
    if (onRemove) {
      onRemove(id);
    }
  };
  
  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      onClick={handleClick}
    >
      <primitive object={clonedScene} />
      
      {/* Hover efekti için ince outline */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[STONE_SIZE * 0.6, 16, 16]} />
          <meshBasicMaterial 
            color="#00ff00" 
            transparent 
            opacity={0.1} 
            wireframe 
          />
        </mesh>
      )}
    </group>
  );
}