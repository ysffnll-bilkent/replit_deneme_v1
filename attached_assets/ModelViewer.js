// src/viewer/ModelViewer.js
import React, { useMemo, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TasModelGLTF from './TasModelGLTF';
import { generators } from '../utils/shapeGenerators';
import { Raycaster, Vector2 } from 'three';

// HTML drag&drop olaylarını Three.js sahnesiyle eşleyen bileşen
const DropHandler = ({ dragModelPath, onStoneDrop }) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const dom = gl.domElement;

    const handleDragOver = e => e.preventDefault();
    const handleDrop = e => {
      if (!dragModelPath) return;
      e.preventDefault();
      const rect = dom.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const mouse = new Vector2(x, y);

      const ray = new Raycaster();
      ray.setFromCamera(mouse, camera);
      const hits = ray.intersectObjects(scene.children, true);

      for (let hit of hits) {
        let obj = hit.object;
        while (obj && obj.userData.idx === undefined) obj = obj.parent;
        if (obj && obj.userData.idx !== undefined) {
          onStoneDrop(obj.userData.idx);
          break;
        }
      }
    };

    dom.addEventListener('dragover', handleDragOver);
    dom.addEventListener('drop', handleDrop);
    return () => {
      dom.removeEventListener('dragover', handleDragOver);
      dom.removeEventListener('drop', handleDrop);
    };
  }, [gl, scene, camera, dragModelPath, onStoneDrop]);

  return null;
};

const ModelViewer = ({
  stoneModels,
  stoneScales,
  selectedIndexes,
  toggleIndex,
  dragModelPath,
  onStoneDrop,
  shapeType = 'circle',         // circle veya rope
  shapeParams = {}              // rope için kontrol noktaları, vb.
}) => {
  // Taş yarıçap listesi
  const radii = useMemo(() => stoneScales, [stoneScales]);

  // Seçilen shape generator’a göre pozisyonları üret
  const positions = useMemo(() => {
    const gen = generators[shapeType] || generators.circle;
    return gen({ radii, ...shapeParams });
  }, [shapeType, shapeParams, radii]);

  return (
    <Canvas style={{ flex: 1, overflow: 'hidden' }} camera={{ position: [0, 0, 6], fov: 50 }}>
      <DropHandler dragModelPath={dragModelPath} onStoneDrop={onStoneDrop} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {positions.map((pos, idx) => (
        <TasModelGLTF
          key={idx}
          index={idx}
          position={pos}
          scale={stoneScales[idx]}
          modelYolu={stoneModels[idx]}
          isSelected={selectedIndexes.includes(idx)}
          onClick={() => toggleIndex(idx)}
        />
      ))}

      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
