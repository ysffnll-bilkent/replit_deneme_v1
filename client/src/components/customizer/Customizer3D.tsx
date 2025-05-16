import { useState } from "react";
import { motion } from "framer-motion";
import { ModelViewer3D } from "./ModelViewer3D";

// Define crystal types with colors
const CRYSTAL_TYPES = [
  { id: "amethyst", name: "Amethyst", color: "#9b5de5", modelPath: "/assets/models/amethyst.glb" },
  { id: "citrine", name: "Citrine", color: "#f9c74f", modelPath: "/assets/models/citrine.glb" },
  { id: "rose-quartz", name: "Rose Quartz", color: "#f8a6c1", modelPath: "/assets/models/rose-quartz.glb" },
  { id: "lapis-lazuli", name: "Lapis Lazuli", color: "#2a6fc9", modelPath: "/assets/models/lapis-lazuli.glb" },
  { id: "obsidian", name: "Obsidian", color: "#2d2d2d", modelPath: "/assets/models/obsidian.glb" },
  { id: "clear-quartz", name: "Clear Quartz", color: "#f1f1f1", modelPath: "/assets/models/clear-quartz.glb" },
  { id: "tigers-eye", name: "Tiger's Eye", color: "#b5651d", modelPath: "/assets/models/tigers-eye.glb" },
  { id: "moonstone", name: "Moonstone", color: "#e6e6fa", modelPath: "/assets/models/moonstone.glb" },
  { id: "turquoise", name: "Turquoise", color: "#40e0d0", modelPath: "/assets/models/turquoise.glb" },
  { id: "onyx", name: "Onyx", color: "#353839", modelPath: "/assets/models/onyx.glb" }
];

interface Customizer3DProps {
  selectedItemType: string;
  selectedCrystal: string;
  selectedMaterial: string;
  selectedLength: string;
  setSelectedCrystal: (crystal: string) => void;
}

export const Customizer3D = ({
  selectedItemType,
  selectedCrystal,
  selectedMaterial,
  selectedLength,
  setSelectedCrystal
}: Customizer3DProps) => {
  const [shapeType, setShapeType] = useState<"circle" | "rope">("circle");
  
  // Display names for UI
  const crystalDisplayNames: Record<string, string> = {
    "amethyst": "Amethyst",
    "rose-quartz": "Rose Quartz",
    "clear-quartz": "Clear Quartz",
    "turquoise": "Turquoise",
    "citrine": "Citrine",
    "lapis-lazuli": "Lapis Lazuli",
    "obsidian": "Obsidian",
    "tigers-eye": "Tiger's Eye", 
    "moonstone": "Moonstone",
    "onyx": "Onyx"
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
          <div className="stone-selector">
            <h3 className="text-lg font-semibold mb-3">Choose Your Crystal</h3>
            <div className="grid grid-cols-2 gap-2">
              {CRYSTAL_TYPES.map((stone) => (
                <motion.div 
                  key={stone.id}
                  className={`stone-item p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow ${stone.id === selectedCrystal ? 'ring-2 ring-lavender' : ''}`}
                  onClick={() => setSelectedCrystal(stone.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="stone-preview w-10 h-10 rounded-full mx-auto mb-2" 
                    style={{ backgroundColor: stone.color }}
                  ></div>
                  <p className="text-center text-sm">{stone.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Layout Style</h3>
            <div className="flex gap-3">
              <motion.button
                className={`flex-1 py-2 px-3 rounded-lg ${shapeType === 'circle' ? 'bg-lavender text-white' : 'bg-white'}`}
                onClick={() => setShapeType("circle")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Circle
              </motion.button>
              <motion.button
                className={`flex-1 py-2 px-3 rounded-lg ${shapeType === 'rope' ? 'bg-lavender text-white' : 'bg-white'}`}
                onClick={() => setShapeType("rope")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Linear
              </motion.button>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Interaction Tips:</h4>
            <ul className="text-sm space-y-2 list-disc pl-4">
              <li>Click on stones to select/deselect them</li>
              <li>Drag with mouse to rotate the view</li>
              <li>Scroll to zoom in and out</li>
              <li>Try different crystal types and layouts</li>
            </ul>
          </div>
        </div>
        
        {/* 3D model viewer */}
        <div className="w-full md:w-3/4">
          <ModelViewer3D
            stoneTypes={CRYSTAL_TYPES}
            selectedStoneType={selectedCrystal}
            itemType={selectedItemType}
            shapeType={shapeType}
          />
          
          <div className="text-center mt-4">
            <h3 className="font-serif text-2xl font-semibold mb-2">{title}</h3>
            <p className="opacity-70">{subtitle}</p>
            <p className="text-sm mt-2 text-lavender flex items-center justify-center">
              <span className="w-2 h-2 rounded-full mr-1" 
                style={{ 
                  backgroundColor: CRYSTAL_TYPES.find(c => c.id === selectedCrystal)?.color || '#9b5de5' 
                }}
              ></span>
              <span>{crystalDisplayNames[selectedCrystal] || 'Crystal'} with {shapeType} layout</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};