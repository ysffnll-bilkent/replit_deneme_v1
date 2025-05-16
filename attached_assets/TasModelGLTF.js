import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

const TasModelGLTF = ({
  index,
  position,
  scale,
  modelYolu,
  isSelected,
  onClick
}) => {
  const { scene } = useGLTF(process.env.PUBLIC_URL + modelYolu);

  // Sahneyi klonlayıp seçili renk uygulama
  const cloned = useMemo(() => {
    const c = clone(scene);
    c.traverse(child => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set(isSelected ? 'gold' : 'white');
      }
    });
    return c;
  }, [scene, isSelected]);

  return (
    <group
      userData={{ idx: index }}
      position={position}
      scale={[scale, scale, scale]}
      onPointerDown={e => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={e => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={cloned} />
    </group>
  );
};

export default TasModelGLTF;
