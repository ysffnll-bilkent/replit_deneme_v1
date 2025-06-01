import React from "react";
import { STONE_SIZE } from "../../utils/sceneConfig";

interface EndModelProps {
  position: [number, number, number];
  stoneScale?: number;
  id?: string;
  onRemove?: (id: string) => void;
}

export default function EndModel({ 
  position, 
  stoneScale = STONE_SIZE, 
  id,
  onRemove 
}: EndModelProps) {
  // Click handler
  const handleClick = (event: any) => {
    event.stopPropagation();
    if (onRemove && id) {
      onRemove(id);
    }
  };
  
  // Uç model taşlardan %30 daha büyük olacak
  const endModelSize = stoneScale * 1.3;
  
  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'default';
      }}
    >
      {/* Basit geometrik uç model */}
      <mesh>
        <octahedronGeometry args={[endModelSize]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Hafif gölge efekti */}
      <mesh position={[0, -endModelSize, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[stoneScale * 0.8, 16]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.2} 
        />
      </mesh>
    </group>
  );
}