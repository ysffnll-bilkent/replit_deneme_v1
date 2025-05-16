import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { StoneModel } from "./StoneModel";
import { generators } from "../../utils/shapeGenerators";

interface ModelViewer3DProps {
  stoneTypes: Array<{
    id: string;
    name: string;
    color: string;
    modelPath: string;
  }>;
  selectedStoneType: string;
  itemType: string;
  shapeType?: "circle" | "rope";
}

const ITEM_BASE_MODELS = {
  necklace: {
    radius: 1.5,
    thickness: 0.05,
  },
  bracelet: {
    radius: 1.0,
    thickness: 0.1,
  },
  anklet: {
    radius: 1.2,
    thickness: 0.08,
  },
};

const JewelryModel = ({ itemType, material }: { itemType: string; material: string }) => {
  // Determine color based on material selection
  const materialColor = 
    material === "gold" ? "#FFD700" : 
    material === "silver" ? "#C0C0C0" : 
    material === "rose-gold" ? "#B76E79" : "#C0C0C0";
  
  // Get item dimensions based on type
  const { radius, thickness } = ITEM_BASE_MODELS[itemType as keyof typeof ITEM_BASE_MODELS] || 
    ITEM_BASE_MODELS.bracelet;
  
  return (
    <mesh>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial color={materialColor} metalness={0.9} roughness={0.2} />
    </mesh>
  );
};

export const ModelViewer3D = ({
  stoneTypes,
  selectedStoneType,
  itemType,
  shapeType = "circle",
}: ModelViewer3DProps) => {
  const [selectedStones, setSelectedStones] = useState<number[]>([]);
  
  // Get the current selected stone type
  const currentStoneType = stoneTypes.find((s) => s.id === selectedStoneType) || stoneTypes[0];
  
  // Prepare stone scales and models arrays for the generator
  const stoneScales = useMemo(() => {
    // For this demo, we'll use 8 stones of the same size
    return Array(8).fill(0.3);
  }, []);
  
  // Generate stone positions based on the selected shape
  const positions = useMemo(() => {
    const generator = generators[shapeType] || generators.circle;
    const { radius } = ITEM_BASE_MODELS[itemType as keyof typeof ITEM_BASE_MODELS] || 
      ITEM_BASE_MODELS.bracelet;
    
    // For rope shape, we need to adjust the control points based on the item type
    const shapeParams = shapeType === "rope" 
      ? {
          controlPoints: [
            [-radius * 0.8, 0],
            [radius * 0.8, 0],
          ],
        }
      : {};
    
    return generator({ radii: stoneScales, ...shapeParams });
  }, [stoneScales, shapeType, itemType]);
  
  // Toggle stone selection
  const toggleStone = (index: number) => {
    setSelectedStones((prev) => 
      prev.includes(index) 
        ? prev.filter((i) => i !== index) 
        : [...prev, index]
    );
  };
  
  return (
    <div className="w-full h-96 bg-white rounded-xl shadow-sm overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <spotLight position={[0, 5, 5]} intensity={0.5} angle={0.3} penumbra={1} castShadow />
        
        {/* Base jewelry item */}
        <JewelryModel itemType={itemType} material="gold" />
        
        {/* Stones */}
        {positions.map((position, index) => (
          <StoneModel
            key={index}
            index={index}
            position={position as [number, number, number]}
            scale={stoneScales[index]}
            modelPath={currentStoneType.modelPath}
            isSelected={selectedStones.includes(index)}
            onClick={() => toggleStone(index)}
          />
        ))}
        
        {/* Environment and controls */}
        <Environment preset="sunset" />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};