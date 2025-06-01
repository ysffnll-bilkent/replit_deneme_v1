import React from 'react';
import { usePlane } from '@react-three/cannon';

export default function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
    args: [10, 10],
  }));
  
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}