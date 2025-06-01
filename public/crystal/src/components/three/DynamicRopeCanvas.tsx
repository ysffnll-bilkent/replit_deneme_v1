import React, { useState, useRef, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { useDrop } from "react-dnd";
import * as THREE from "three";
import StoneMesh from "./StoneMesh";
import EndModel from "./EndModel";
import SimpleDynamicRope from "./SimpleDynamicRope";
import Loader from "./Loader";
import { 
  generateTriangleSupports,
  generateRopePositions,
  findNearestEmptyRopePosition,
  generateEndModelPositions
} from "../../utils/generateTriangleSupports";
import { STONE_SIZE } from "../../utils/sceneConfig";

interface DynamicRopeCanvasProps {
  stones: Array<{
    id: string;
    url: string;
    position: [number, number, number];
    positionIndex?: number;
  }>;
  onStoneAdd: (data: { url: string; position: [number, number, number] }) => void;
  onStoneRemove: (id: string) => void;
}

// Destek sopası bileşeni
function SupportPole({ position, height = 0.4 }: { position: [number, number, number]; height?: number }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.02, 0.02, height, 8]} />
      <meshBasicMaterial color="#654321" />
    </mesh>
  );
}

export default function DynamicRopeCanvas({ stones, onStoneAdd, onStoneRemove }: DynamicRopeCanvasProps) {
  const baseWidth = 3;
  const height = 2;
  const ropeSegments = 20;
  
  // Destek pozisyonları
  const supports = useMemo(() => generateTriangleSupports(baseWidth, height), [baseWidth, height]);
  
  // İp pozisyonları
  const [ropePositions, setRopePositions] = useState(() => 
    generateRopePositions(supports, ropeSegments)
  );
  
  // Uç model pozisyonları
  const endPositions = useMemo(() => generateEndModelPositions(supports), [supports]);
  
  // Mouse koordinatını 3D world koordinatına çevirmek için
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Taş pozisyon indeksleri takibi
  const stonePositionMap = useRef<Map<string, number>>(new Map());
  
  // Screen koordinatını 3D world koordinatına çevir
  const screenToWorld = useCallback((clientX: number, clientY: number): [number, number, number] => {
    if (!canvasRef.current) return [0, 0, 0];
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    
    // Basit projeksiyon (kamera pozisyonu [0, 0, 5])
    const worldX = x * 3; // Kamera FOV'a göre ayarlandı
    const worldY = y * 3;
    const worldZ = 0;
    
    return [worldX, worldY, worldZ];
  }, []);
  
  // Pozisyonu işgal et
  const occupyPosition = useCallback((index: number) => {
    setRopePositions(prev => {
      const newPositions = [...prev];
      const position = newPositions.find(p => p.index === index);
      if (position) {
        position.occupied = true;
      }
      return newPositions;
    });
  }, []);
  
  // Pozisyonu boşalt
  const freePosition = useCallback((index: number) => {
    setRopePositions(prev => {
      const newPositions = [...prev];
      const position = newPositions.find(p => p.index === index);
      if (position) {
        position.occupied = false;
      }
      return newPositions;
    });
  }, []);
  
  // Uç model pozisyonunda taş varsa sil
  const removeStoneAtEndPosition = useCallback((endX: number, endY: number, endZ: number) => {
    const tolerance = 0.3; // Çakışma toleransı
    
    stones.forEach(stone => {
      const [stoneX, stoneY, stoneZ] = stone.position;
      const distance = Math.sqrt(
        Math.pow(stoneX - endX, 2) +
        Math.pow(stoneY - endY, 2) +
        Math.pow(stoneZ - endZ, 2)
      );
      
      if (distance < tolerance) {
        onStoneRemove(stone.id);
        
        // Pozisyonu da boşalt
        const positionIndex = stonePositionMap.current.get(stone.id);
        if (positionIndex !== undefined) {
          freePosition(positionIndex);
          stonePositionMap.current.delete(stone.id);
        }
      }
    });
  }, [stones, onStoneRemove, freePosition]);
  
  // Drop target for stones
  const [, dropStone] = useDrop({
    accept: "STONE",
    drop: (item: { url: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;
      
      const worldPos = screenToWorld(offset.x, offset.y);
      
      // En yakın boş pozisyonu bul
      const nearestIndex = findNearestEmptyRopePosition(ropePositions, worldPos);
      
      if (nearestIndex === -1) {
        console.warn("İp üzerinde boş pozisyon bulunamadı");
        return;
      }
      
      const selectedPosition = ropePositions.find(p => p.index === nearestIndex);
      if (!selectedPosition) return;
      
      // Pozisyonu işgal et
      occupyPosition(nearestIndex);
      
      // Taş ID'sini pozisyon indeksi ile eşle
      const stoneId = `${item.url}_${Date.now()}_${Math.random()}`;
      stonePositionMap.current?.set(stoneId, nearestIndex);
      
      // Uç model pozisyonlarında taş varsa sil
      endPositions.forEach(endPos => {
        removeStoneAtEndPosition(endPos.x, endPos.y, endPos.z);
      });
      
      // Taş ekle (Y ekseni hafif yukarı al ki ip içine gömülmesin)
      onStoneAdd({
        url: item.url,
        position: [selectedPosition.x, selectedPosition.y + 0.1, selectedPosition.z]
      });
    },
  });
  
  // Taş kaldırma işlemi
  const handleStoneRemove = useCallback((stoneId: string) => {
    const positionIndex = stonePositionMap.current.get(stoneId);
    
    if (positionIndex !== undefined) {
      freePosition(positionIndex);
      stonePositionMap.current.delete(stoneId);
    }
    
    onStoneRemove(stoneId);
  }, [onStoneRemove, freePosition]);
  
  return (
    <div 
      ref={(node) => {
        if (node) {
          canvasRef.current = node;
          dropStone(node);
        }
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        <Physics
          gravity={[0, -9.8, 0]}
          iterations={20}
          maxSubSteps={3}
          allowSleep={true}
        >
          <React.Suspense fallback={<Loader />}>
            {/* Destek sopaları */}
            {supports.map((support, index) => (
              <SupportPole
                key={`support-${index}`}
                position={[support.x, support.y, support.z]}
                height={0.4}
              />
            ))}
            
            {/* Dinamik ip */}
            <SimpleDynamicRope
              segmentCount={ropeSegments}
              length={4}
              mass={0.1}
              maxForce={1000}
            />
            
            {/* Uç modeller */}
            {endPositions.map((endPos, index) => (
              <EndModel
                key={`end-${index}`}
                position={[endPos.x, endPos.y, endPos.z]}
                stoneScale={STONE_SIZE}
                id={`end-${endPos.name}`}
              />
            ))}
            
            {/* Taşlar */}
            {stones.map((stone) => (
              <StoneMesh
                key={stone.id}
                url={stone.url}
                position={stone.position}
                id={stone.id}
                onRemove={handleStoneRemove}
                rotation={[0, 0, 0]}
              />
            ))}
          </React.Suspense>
        </Physics>
        
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}