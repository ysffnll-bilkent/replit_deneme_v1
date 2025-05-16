import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Define types for our stone data
interface Stone {
  id: string;
  name: string;
  color: string;
}

// Available stones
const availableStones: Stone[] = [
  { id: "amethyst", name: "Amethyst", color: "#9b5de5" },
  { id: "citrine", name: "Citrine", color: "#f9c74f" },
  { id: "rose-quartz", name: "Rose Quartz", color: "#f8a6c1" },
  { id: "lapis-lazuli", name: "Lapis Lazuli", color: "#2a6fc9" },
  { id: "obsidian", name: "Obsidian", color: "#2d2d2d" },
  { id: "clear-quartz", name: "Clear Quartz", color: "#f1f1f1" },
  { id: "tigers-eye", name: "Tiger's Eye", color: "#b5651d" },
  { id: "moonstone", name: "Moonstone", color: "#e6e6fa" },
  { id: "turquoise", name: "Turquoise", color: "#40e0d0" },
  { id: "onyx", name: "Onyx", color: "#353839" }
];

// Simple jewelry model component
const JewelryModel = ({ itemType, material }: { itemType: string; material: string }) => {
  const group = useRef<THREE.Group>(null);
  
  // Determine color based on material selection
  const materialColor = material === 'gold' ? '#FFD700' : 
                         material === 'silver' ? '#C0C0C0' : 
                         material === 'rose-gold' ? '#B76E79' : '#C0C0C0';
  
  useFrame((state) => {
    if (group.current) {
      // Add subtle rotation to the model
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  // Determine the size based on the item type
  const radius = itemType === 'necklace' ? 1.5 : 
                 itemType === 'bracelet' ? 1.0 : 
                 itemType === 'anklet' ? 1.2 : 1.0;
                 
  const thickness = itemType === 'necklace' ? 0.05 : 
                    itemType === 'bracelet' ? 0.1 : 
                    itemType === 'anklet' ? 0.08 : 0.1;
  
  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[radius, thickness, 16, 100]} />
        <meshStandardMaterial color={materialColor} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Stones component
const Stones = ({ 
  itemType, 
  selectedCrystal
}: { 
  itemType: string; 
  selectedCrystal: string;
}) => {
  // Find the selected stone
  const selectedStone = availableStones.find(s => s.id === selectedCrystal) || availableStones[0];
  
  // Determine the radius for stone placement based on the item type
  const radius = itemType === 'necklace' ? 1.5 : 
                 itemType === 'bracelet' ? 1.0 : 
                 itemType === 'anklet' ? 1.2 : 1.0;
  
  // Create stones at fixed positions
  const stonePositions = [];
  const count = 5; // Number of stones to place
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    stonePositions.push({
      id: `stone-${i}`,
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ] as [number, number, number]
    });
  }
  
  return (
    <>
      {stonePositions.map((stone) => (
        <mesh key={stone.id} position={stone.position}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color={selectedStone.color} roughness={0.4} metalness={0.3} />
        </mesh>
      ))}
    </>
  );
};

// StoneSelector component for the left panel
const StoneSelector = ({ 
  setSelectedCrystal 
}: { 
  setSelectedCrystal: (id: string) => void;
}) => {
  return (
    <div className="stone-selector">
      <h3 className="text-lg font-semibold mb-3">Choose Your Crystal</h3>
      <div className="grid grid-cols-2 gap-2">
        {availableStones.map(stone => (
          <div 
            key={stone.id}
            className="stone-item p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCrystal(stone.id)}
          >
            <div 
              className="stone-preview w-10 h-10 rounded-full mx-auto mb-2" 
              style={{ backgroundColor: stone.color }}
            ></div>
            <p className="text-center text-sm">{stone.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main 3D Customizer Preview component
interface CustomizerPreview3DProps {
  selectedItemType: string;
  selectedCrystal: string;
  selectedMaterial: string;
  selectedLength: string;
  setSelectedCrystal: (crystal: string) => void;
}

export const CustomizerPreview3D = ({
  selectedItemType,
  selectedCrystal,
  selectedMaterial,
  selectedLength,
  setSelectedCrystal
}: CustomizerPreview3DProps) => {
  const crystalDisplayNames: Record<string, string> = {
    "amethyst": "Amethyst",
    "rose-quartz": "Rose Quartz",
    "clear-quartz": "Clear Quartz",
    "turquoise": "Turquoise"
  };
  
  const materialDisplayNames: Record<string, string> = {
    "silver": "Silver",
    "gold": "Gold",
    "rose-gold": "Rose Gold"
  };

  const title = `${crystalDisplayNames[selectedCrystal] || 'Crystal'} ${selectedItemType.charAt(0).toUpperCase() + selectedItemType.slice(1)}`;
  const subtitle = `${materialDisplayNames[selectedMaterial] || 'Metal'} | ${selectedLength}"`;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Stone selector panel */}
        <div className="w-full md:w-1/4 bg-sand/30 p-4 rounded-xl">
          <StoneSelector setSelectedCrystal={setSelectedCrystal} />
          <div className="mt-6">
            <h4 className="font-medium mb-2">3D Preview Features:</h4>
            <ul className="text-sm space-y-2 list-disc pl-4">
              <li>View your jewelry from all angles</li>
              <li>Stones change based on your selection</li>
              <li>Rotate by dragging your mouse</li>
              <li>Zoom with scroll wheel</li>
            </ul>
          </div>
        </div>
        
        {/* 3D preview canvas */}
        <div className="w-full md:w-3/4 bg-white rounded-xl shadow-sm p-4 mb-6 aspect-square">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <JewelryModel itemType={selectedItemType} material={selectedMaterial} />
              <Stones 
                itemType={selectedItemType}
                selectedCrystal={selectedCrystal}
              />
              <Environment preset="sunset" />
              <OrbitControls 
                enablePan={false} 
                enableZoom={true} 
                minDistance={2} 
                maxDistance={7}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="font-serif text-2xl font-semibold mb-2">{title}</h3>
        <p className="opacity-70">{subtitle}</p>
        <p className="text-sm mt-2 text-lavender">Interactive 3D Preview</p>
      </div>
    </div>
  );
};