import { useState } from "react";
import { motion } from "framer-motion";

interface CustomizerOptionsProps {
  selectedItemType: string;
  setSelectedItemType: (itemType: string) => void;
  selectedCrystal: string;
  setSelectedCrystal: (crystal: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (material: string) => void;
  selectedLength: string;
  setSelectedLength: (length: string) => void;
}

export const CustomizerOptions = ({
  selectedItemType,
  setSelectedItemType,
  selectedCrystal,
  setSelectedCrystal,
  selectedMaterial,
  setSelectedMaterial,
  selectedLength,
  setSelectedLength
}: CustomizerOptionsProps) => {
  const itemTypes = [
    { id: "necklace", label: "Necklace" },
    { id: "bracelet", label: "Bracelet" },
    { id: "earrings", label: "Earrings" }
  ];

  const crystals = [
    { id: "amethyst", label: "Amethyst", image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
    { id: "rose-quartz", label: "Rose Quartz", image: "https://images.unsplash.com/photo-1603344204980-4edb0ea63148?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
    { id: "clear-quartz", label: "Clear Quartz", image: "https://images.unsplash.com/photo-1507832321772-e86cc0452e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
    { id: "turquoise", label: "Turquoise", image: "https://pixabay.com/get/gc3a1a794f84b78b2070e436819ead1063346deb7a9866f3c52b78b70c547fc657e77cdc4918448415f17b63fd0d2ca0c47527ce5486cc38bfc7b726d0e2002fb_1280.jpg" }
  ];

  const materials = [
    { id: "silver", label: "Silver" },
    { id: "gold", label: "Gold" },
    { id: "rose-gold", label: "Rose Gold" }
  ];

  const lengths = [
    { id: "16", label: '16"' },
    { id: "18", label: '18"' },
    { id: "20", label: '20"' },
    { id: "24", label: '24"' }
  ];

  return (
    <div className="w-full">
      {/* Item Type */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Item Type</h4>
        <div className="grid grid-cols-3 gap-4">
          {itemTypes.map((item) => (
            <button
              key={item.id}
              className={`p-3 border-2 ${
                selectedItemType === item.id
                  ? "border-blush bg-blush/10"
                  : "border-softgray hover:border-blush/30 hover:bg-blush/5"
              } rounded-lg text-center font-medium text-sm transition-colors`}
              onClick={() => setSelectedItemType(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Crystal Selection */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Crystal Type</h4>
        <div className="flex overflow-x-auto pb-2 space-x-3">
          {crystals.map((crystal) => (
            <div key={crystal.id} className="flex-shrink-0">
              <button
                className={`border-2 ${
                  selectedCrystal === crystal.id
                    ? "border-lavender"
                    : "border-softgray hover:border-lavender/50"
                } p-1 rounded-full transition-colors`}
                onClick={() => setSelectedCrystal(crystal.id)}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={crystal.image}
                    alt={crystal.label}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </button>
              <p className="text-xs text-center mt-1">{crystal.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chain Material */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Chain Material</h4>
        <div className="grid grid-cols-3 gap-4">
          {materials.map((material) => (
            <button
              key={material.id}
              className={`p-3 border-2 ${
                selectedMaterial === material.id
                  ? "border-blush bg-blush/10"
                  : "border-softgray hover:border-blush/30 hover:bg-blush/5"
              } rounded-lg text-center font-medium text-sm transition-colors`}
              onClick={() => setSelectedMaterial(material.id)}
            >
              {material.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chain Length */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Chain Length</h4>
        <div className="grid grid-cols-4 gap-4">
          {lengths.map((length) => (
            <button
              key={length.id}
              className={`p-3 border-2 ${
                selectedLength === length.id
                  ? "border-blush bg-blush/10"
                  : "border-softgray hover:border-blush/30 hover:bg-blush/5"
              } rounded-lg text-center font-medium text-sm transition-colors`}
              onClick={() => setSelectedLength(length.id)}
            >
              {length.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          className="px-6 py-3 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-md font-medium text-center grow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Design
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-blush hover:bg-blush/90 text-white rounded-full transition-colors shadow-md font-medium text-center grow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Order Custom Piece
        </motion.button>
      </div>
    </div>
  );
};
