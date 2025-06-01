import React, { useState, useRef, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useDrop } from "react-dnd";
import * as THREE from "three";
import StoneMesh from "./StoneMesh";
import Loader from "./Loader";
import { 
  generateCirclePositions, 
  findNearestEmptyPosition, 
  occupyPosition, 
  freePosition,
  CirclePosition 
} from "../../utils/generateCirclePositions";

interface BraceletCanvasProps {
  stones: Array<{
    id: string;
    url: string;
    position: [number, number, number];
    positionIndex?: number;
  }>;
  onStoneAdd: (data: { url: string; position: [number, number, number] }) => void;
  onStoneRemove: (id: string) => void;
}

// Çember ip bileşeni
function CircleRope({ radius = 1.5 }) {
  const points = [];
  
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ));
  }
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <mesh>
      <torusGeometry args={[radius, 0.02, 8, 100]} />
      <meshBasicMaterial color="#8B4513" />
    </mesh>
  );
}

export default function BraceletCanvas({ stones, onStoneAdd, onStoneRemove }: BraceletCanvasProps) {
  const radius = 1.5;
  const maxPositions = 32;
  
  // Pozisyon yönetimi
  const [positions, setPositions] = useState<CirclePosition[]>(() => 
    generateCirclePositions(radius, maxPositions)
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
      const nearestIndex = findNearestEmptyPosition(positions, worldPos);
      
      if (nearestIndex === -1) {
        console.warn("Çember üzerinde boş pozisyon bulunamadı");
        return;
      }
      
      const selectedPosition = positions[nearestIndex];
      
      // Pozisyonu işgal et
      setPositions(prev => {
        const newPositions = [...prev];
        occupyPosition(newPositions, nearestIndex);
        return newPositions;
      });
      
      // Taş ID'sini pozisyon indeksi ile eşle (geçici çözüm)
      const stoneId = `${item.url}_${Date.now()}_${Math.random()}`;
      if (stonePositionMap.current) {
        stonePositionMap.current.set(stoneId, nearestIndex);
      }
      
      // Taş ekle (Z ekseni biraz öne al ki ip içine gömülmesin)
      onStoneAdd({
        url: item.url,
        position: [selectedPosition.x, selectedPosition.y, selectedPosition.z + 0.1]
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
        freePosition(newPositions, positionIndex);
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
          {/* Çember ip */}
          <CircleRope radius={radius} />
          
          {/* Taşlar */}
          {stones.map((stone) => (
            <StoneMesh
              key={stone.id}
              url={stone.url}
              position={stone.position}
              id={stone.id}
              onRemove={handleStoneRemove}
              // Çember doğrultusuna göre rotasyon
              rotation={[0, 0, 0]} // İsteğe göre açı hesaplanabilir
            />
          ))}
        </React.Suspense>
        
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}