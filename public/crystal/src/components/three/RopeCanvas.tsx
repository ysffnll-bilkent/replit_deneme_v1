import React, { useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useDrop } from "react-dnd";
import * as THREE from "three";
import StoneMesh from "./StoneMesh";
import Loader from "./Loader";
import { 
  generateLinePositions, 
  findNearestEmptyLinePosition, 
  occupyLinePosition, 
  freeLinePosition,
  LinePosition 
} from "../../utils/generateLinePositions";
import { STONE_SIZE } from "../../utils/sceneConfig";

interface RopeCanvasProps {
  stones: Array<{
    id: string;
    url: string;
    position: [number, number, number];
    positionIndex?: number;
  }>;
  onStoneAdd: (data: { url: string; position: [number, number, number] }) => void;
  onStoneRemove: (id: string) => void;
}

// Düz ip bileşeni
function LineRope({ length = 4 }) {
  const points = [
    new THREE.Vector3(-length / 2, 0, 0),
    new THREE.Vector3(length / 2, 0, 0)
  ];
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <mesh>
      <boxGeometry args={[length, 0.05, 0.05]} />
      <meshBasicMaterial color="#8B4513" />
    </mesh>
  );
}

export default function RopeCanvas({ stones, onStoneAdd, onStoneRemove }: RopeCanvasProps) {
  const ropeLength = 4;
  const maxPositions = 20;
  
  // Pozisyon yönetimi
  const [positions, setPositions] = useState<LinePosition[]>(() => 
    generateLinePositions(ropeLength, STONE_SIZE, maxPositions)
  );
  
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
    const worldX = x * 2.5; // Kamera FOV'a göre ayarlandı
    const worldY = y * 2.5;
    const worldZ = 0;
    
    return [worldX, worldY, worldZ];
  }, []);
  
  // Drop target for stones
  const [, dropStone] = useDrop({
    accept: "STONE",
    drop: (item: { url: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;
      
      const worldPos = screenToWorld(offset.x, offset.y);
      
      // En yakın boş pozisyonu bul
      const nearestIndex = findNearestEmptyLinePosition(positions, worldPos);
      
      if (nearestIndex === -1) {
        console.warn("İp üzerinde boş pozisyon bulunamadı");
        return;
      }
      
      const selectedPosition = positions[nearestIndex];
      
      // Pozisyonu işgal et
      setPositions(prev => {
        const newPositions = [...prev];
        occupyLinePosition(newPositions, nearestIndex);
        return newPositions;
      });
      
      // Taş ID'sini pozisyon indeksi ile eşle
      const stoneId = `${item.url}_${Date.now()}_${Math.random()}`;
      stonePositionMap.current.set(stoneId, nearestIndex);
      
      // Taş ekle (Y ekseni biraz yukarı al ki ip içine gömülmesin)
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
      // Pozisyonu boşalt
      setPositions(prev => {
        const newPositions = [...prev];
        freeLinePosition(newPositions, positionIndex);
        return newPositions;
      });
      
      // Map'ten kaldır
      stonePositionMap.current.delete(stoneId);
    }
    
    onStoneRemove(stoneId);
  }, [onStoneRemove]);
  
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
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        <React.Suspense fallback={<Loader />}>
          {/* Düz ip */}
          <LineRope length={ropeLength} />
          
          {/* Taşlar */}
          {stones.map((stone) => (
            <StoneMesh
              key={stone.id}
              url={stone.url}
              position={stone.position}
              id={stone.id}
              onRemove={handleStoneRemove}
              rotation={[0, 0, 0]} // Düz ip için rotasyon yok
            />
          ))}
        </React.Suspense>
        
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}