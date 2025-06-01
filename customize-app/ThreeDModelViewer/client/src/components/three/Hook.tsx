import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface HookProps {
  position: [number, number, number];
  onDrag: (pos: [number, number, number]) => void;
}

const Hook: React.FC<HookProps> = ({ position, onDrag }) => {
  const ref = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { camera, gl } = useThree();

  // Basit hook modeli (mevcut modellerden birini kullan)
  const { scene } = useGLTF('./models/Box.glb');

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    gl.domElement.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    gl.domElement.style.cursor = 'auto';
  };

  const handlePointerMove = (event: any) => {
    if (!isDragging || !ref.current) return;

    event.stopPropagation();

    // Basit hareket hesaplama
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    const sensitivity = 0.01;
    const newX = ref.current.position.x + movementX * sensitivity;
    const newY = ref.current.position.y - movementY * sensitivity;
    const newZ = ref.current.position.z;

    ref.current.position.set(newX, newY, newZ);
    onDrag([newX, newY, newZ]);
  };

  return (
    <group
      ref={ref}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <primitive object={scene.clone()} scale={[0.1, 0.1, 0.1]} />
      {/* Hook görselleştirmesi için basit silindir */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Hook ucu için küre */}
      <mesh position={[0.15, 0, 0]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

export default Hook;