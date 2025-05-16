import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, useTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

// Define types for our stone data
interface Stone {
  id: string;
  name: string;
  modelUrl: string;
  color: string;
}

// Placeholder URLs - these would be replaced with actual model paths
const MODEL_BASE_PATH = "/models";
const STONE_BASE_PATH = "/models/stones";

// Available stones
const availableStones: Stone[] = [
  { id: "amethyst", name: "Amethyst", modelUrl: `${STONE_BASE_PATH}/amethyst.glb`, color: "#9b5de5" },
  { id: "citrine", name: "Citrine", modelUrl: `${STONE_BASE_PATH}/citrine.glb`, color: "#f9c74f" },
  { id: "rose-quartz", name: "Rose Quartz", modelUrl: `${STONE_BASE_PATH}/rose-quartz.glb`, color: "#f8a6c1" },
  { id: "lapis-lazuli", name: "Lapis Lazuli", modelUrl: `${STONE_BASE_PATH}/lapis-lazuli.glb`, color: "#2a6fc9" },
  { id: "obsidian", name: "Obsidian", modelUrl: `${STONE_BASE_PATH}/obsidian.glb`, color: "#2d2d2d" },
  { id: "clear-quartz", name: "Clear Quartz", modelUrl: `${STONE_BASE_PATH}/clear-quartz.glb`, color: "#f1f1f1" },
  { id: "tigers-eye", name: "Tiger's Eye", modelUrl: `${STONE_BASE_PATH}/tigers-eye.glb`, color: "#b5651d" },
  { id: "moonstone", name: "Moonstone", modelUrl: `${STONE_BASE_PATH}/moonstone.glb`, color: "#e6e6fa" },
  { id: "turquoise", name: "Turquoise", modelUrl: `${STONE_BASE_PATH}/turquoise.glb`, color: "#40e0d0" },
  { id: "onyx", name: "Onyx", modelUrl: `${STONE_BASE_PATH}/onyx.glb`, color: "#353839" }
];

// Get model path based on selection
const getModelPath = (itemType: string) => {
  switch(itemType) {
    case 'bracelet':
      return `${MODEL_BASE_PATH}/bracelet.glb`;
    case 'necklace':
      return `${MODEL_BASE_PATH}/necklace.glb`;
    case 'anklet':
      return `${MODEL_BASE_PATH}/anklet.glb`;
    default:
      return `${MODEL_BASE_PATH}/bracelet.glb`;
  }
};

// Since we don't have actual 3D models yet, we'll create simple placeholder shapes
const JewelryModel = ({ itemType, material }: { itemType: string; material: string }) => {
  const braceletRef = useRef<THREE.Group>(null);
  
  // Determine color based on material selection
  const materialColor = material === 'gold' ? '#FFD700' : 
                         material === 'silver' ? '#C0C0C0' : 
                         material === 'rose-gold' ? '#B76E79' : '#C0C0C0';
  
  useFrame((state) => {
    if (braceletRef.current) {
      // Add subtle animation to make the preview more lively
      braceletRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  // We're using basic Three.js shapes as placeholders until GLB models are available
  const shape = itemType === 'bracelet' ? (
    <group ref={braceletRef}>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color={materialColor} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  ) : itemType === 'necklace' ? (
    <group ref={braceletRef}>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial color={materialColor} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  ) : (
    <group ref={braceletRef}>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 100]} />
        <meshStandardMaterial color={materialColor} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
  
  return shape;
};

// Stone model (placeholder)
const StoneModel = ({ stone, position }: { stone: Stone; position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={stone.color} roughness={0.4} metalness={0.3} />
    </mesh>
  );
};

// Create a curve for placing stones along the jewelry
const createJewelryCurve = (itemType: string) => {
  const points = [];
  const segments = 50;
  
  if (itemType === 'bracelet') {
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * 1,
        Math.sin(angle) * 1,
        0
      ));
    }
  } else if (itemType === 'necklace') {
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * 1.5,
        Math.sin(angle) * 1.5,
        0
      ));
    }
  } else {
    // Anklet
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * 1.2,
        Math.sin(angle) * 1.2,
        0
      ));
    }
  }
  
  return new THREE.CatmullRomCurve3(points, true);
};

// Stone placer component
const StonePlacer = ({ 
  itemType, 
  selectedCrystal, 
  placedStones, 
  setPlacedStones 
}: { 
  itemType: string; 
  selectedCrystal: string;
  placedStones: { id: string; position: [number, number, number]; stone: Stone }[];
  setPlacedStones: React.Dispatch<React.SetStateAction<{ id: string; position: [number, number, number]; stone: Stone }[]>>;
}) => {
  const curve = createJewelryCurve(itemType);
  const stoneRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<[number, number, number]>([0, 0, 0]);
  const { camera, raycaster, mouse, scene } = useThree();
  
  // Handle dragging of stones
  const handleStoneDrag = (event: any) => {
    if (isDragging) {
      // Update the raycaster with the mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Create a plane perpendicular to the camera's direction
      const planeNormal = camera.getWorldDirection(new THREE.Vector3());
      const plane = new THREE.Plane(planeNormal, -5);
      
      // Find the point of intersection
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);
      
      // Find the closest point on the curve
      const points = curve.getPoints(50);
      let minDistance = Infinity;
      let closestPoint = new THREE.Vector3();
      
      points.forEach(point => {
        const dist = intersection.distanceTo(point);
        if (dist < minDistance) {
          minDistance = dist;
          closestPoint.copy(point);
        }
      });
      
      // Only snap to the curve if we're close enough
      if (minDistance < 0.5) {
        setDragPosition([closestPoint.x, closestPoint.y, closestPoint.z]);
      } else {
        setDragPosition([intersection.x, intersection.y, intersection.z]);
      }
    }
  };
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    if (isDragging) {
      // Add the stone to the placed stones array
      const stone = availableStones.find(s => s.id === selectedCrystal);
      if (stone) {
        setPlacedStones([...placedStones, { 
          id: `${stone.id}-${Date.now()}`, 
          position: dragPosition,
          stone
        }]);
      }
      setIsDragging(false);
    }
  };
  
  useEffect(() => {
    // Add event listeners
    window.addEventListener('mousemove', handleStoneDrag);
    window.addEventListener('mouseup', handleDragEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleStoneDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging]);
  
  // Find the selected stone
  const selectedStone = availableStones.find(s => s.id === selectedCrystal) || availableStones[0];
  
  return (
    <>
      {/* Visible curve guide */}
      <line>
        <bufferGeometry attach="geometry" {...curveToGeometry(curve, 50)} />
        <lineBasicMaterial attach="material" color="#cccccc" opacity={0.5} transparent />
      </line>
      
      {/* Draggable stone */}
      <mesh
        ref={stoneRef}
        position={isDragging ? dragPosition : [2, 0, 0]}
        onPointerDown={handleDragStart}
        visible={!isDragging}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={selectedStone.color} />
      </mesh>
      
      {/* Currently dragging stone */}
      {isDragging && (
        <mesh position={dragPosition}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color={selectedStone.color} transparent opacity={0.8} />
        </mesh>
      )}
      
      {/* Previously placed stones */}
      {placedStones.map(placedStone => (
        <StoneModel 
          key={placedStone.id} 
          stone={placedStone.stone} 
          position={placedStone.position} 
        />
      ))}
    </>
  );
};

// Convert a THREE.Curve to buffer geometry
const curveToGeometry = (curve: THREE.Curve<THREE.Vector3>, segments: number) => {
  const points = curve.getPoints(segments);
  const positions = new Float32Array(points.length * 3);
  
  for (let i = 0; i < points.length; i++) {
    positions[i * 3] = points[i].x;
    positions[i * 3 + 1] = points[i].y;
    positions[i * 3 + 2] = points[i].z;
  }
  
  return {
    setAttribute: {
      position: new THREE.BufferAttribute(positions, 3)
    },
    setIndex: {
      array: Array.from({ length: points.length - 1 }, (_, i) => [i, i + 1]).flat(),
      itemSize: 1
    }
  };
};

// StoneSelector component for the left panel
const StoneSelector = ({ 
  setSelectedCrystal 
}: { 
  setSelectedCrystal: (id: string) => void;
}) => {
  return (
    <div className="stone-selector">
      <h3 className="text-lg font-semibold mb-3">Available Stones</h3>
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
  const [placedStones, setPlacedStones] = useState<{ id: string; position: [number, number, number]; stone: Stone }[]>([]);
  
  // Reset placed stones when item type changes
  useEffect(() => {
    setPlacedStones([]);
  }, [selectedItemType]);
  
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
            <h4 className="font-medium mb-2">Instructions:</h4>
            <ol className="text-sm space-y-2 list-decimal pl-4">
              <li>Select a stone from above</li>
              <li>Drag the stone onto the jewelry piece</li>
              <li>Release to place the stone</li>
              <li>Repeat to add more stones</li>
            </ol>
          </div>
        </div>
        
        {/* 3D preview canvas */}
        <div className="w-full md:w-3/4 bg-white rounded-xl shadow-sm p-4 mb-6 aspect-square">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <JewelryModel itemType={selectedItemType} material={selectedMaterial} />
              <StonePlacer 
                itemType={selectedItemType}
                selectedCrystal={selectedCrystal}
                placedStones={placedStones}
                setPlacedStones={setPlacedStones}
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
        <p className="text-sm mt-2 text-lavender">{placedStones.length} stones placed</p>
      </div>
    </div>
  );
};