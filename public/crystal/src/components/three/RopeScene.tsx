import React from 'react';
import { Physics } from '@react-three/cannon';
import DynamicRope from './DynamicRope';
import Ground from './Ground';

export default function RopeScene() {
  return (
    <Physics
      gravity={[0, -9.81, 0]}
      defaultContactMaterial={{ restitution: 0.3, friction: 0.5 }}
    >
      <DynamicRope />
      <Ground />
    </Physics>
  );
}