import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomizerPreviewEnhancedProps {
  selectedItemType: string;
  selectedCrystal: string;
  selectedMaterial: string;
  selectedLength: string;
  setSelectedCrystal: (crystal: string) => void;
}

// Define stone data
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

export const CustomizerPreviewEnhanced = ({
  selectedItemType,
  selectedCrystal,
  selectedMaterial,
  selectedLength,
  setSelectedCrystal
}: CustomizerPreviewEnhancedProps) => {
  // Find the selected stone
  const selectedStoneObj = availableStones.find(s => s.id === selectedCrystal) || availableStones[0];
  
  // Map selections to display names for the title
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

  const imageMap: Record<string, string> = {
    "necklace-amethyst": "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "necklace-rose-quartz": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "necklace-clear-quartz": "https://images.unsplash.com/photo-1551406483-3a3a34580d3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "necklace-turquoise": "https://images.unsplash.com/photo-1583252307967-7a3591c1a9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-amethyst": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-rose-quartz": "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-clear-quartz": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-turquoise": "https://images.unsplash.com/photo-1611557245338-153b70f1ec7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-amethyst": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-rose-quartz": "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-clear-quartz": "https://images.unsplash.com/photo-1631150343075-d8dc28f031dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-turquoise": "https://images.unsplash.com/photo-1624526267942-d7eaa752605a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
  };

  const previewImage = imageMap[`${selectedItemType}-${selectedCrystal}`] || "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600";
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
              {availableStones.map(stone => (
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
        </div>
        
        {/* Enhanced preview */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 aspect-square relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={previewImage}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src={previewImage} 
                  alt={title} 
                  className="max-w-full max-h-full object-contain" 
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay stones visualization */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative w-full h-full">
                {/* This would render crystal indicators at fixed positions on the image */}
                {Array.from({ length: 5 }).map((_, i) => {
                  // Create a circular positioning pattern
                  const angle = (i / 5) * Math.PI * 2;
                  const radius = 33; // percentage from center
                  const xPos = 50 + Math.cos(angle) * radius;
                  const yPos = 50 + Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-5 h-5 rounded-full shadow-lg z-10"
                      style={{ 
                        backgroundColor: selectedStoneObj.color,
                        left: `${xPos}%`,
                        top: `${yPos}%`,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="font-serif text-2xl font-semibold mb-2">{title}</h3>
            <p className="opacity-70">{subtitle}</p>
            <p className="text-sm mt-2 text-lavender flex items-center justify-center">
              <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: selectedStoneObj.color }}></span>
              <span>{selectedStoneObj.name} Crystal</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};