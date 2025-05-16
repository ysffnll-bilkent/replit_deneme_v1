import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Box3, Sphere } from 'three';

// Thumbnail’u drag-drop’tan korur
const ModelThumbnail = ({ modelPath }) => {
  const { scene } = useGLTF(process.env.PUBLIC_URL + modelPath);
  const { center, scaleFactor } = React.useMemo(() => {
    const cloneScene = scene.clone();
    const box = new Box3().setFromObject(cloneScene);
    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    const maxDim = sphere.radius * 2;
    return { center: sphere.center, scaleFactor: (1 / maxDim) * 0.8 };
  }, [scene]);

  return (
    <div onDragOver={e => e.stopPropagation()} onDrop={e => e.stopPropagation()}>
      <Canvas style={{ width: '80px', height: '80px' }} camera={{ position: [0, 0, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <primitive
          object={scene.clone()}
          position={[
            -center.x * scaleFactor,
            -center.y * scaleFactor,
            -center.z * scaleFactor
          ]}
          scale={[scaleFactor, scaleFactor, scaleFactor]}
        />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate />
      </Canvas>
    </div>
  );
};

