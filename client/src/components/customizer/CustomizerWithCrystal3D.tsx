import { useState } from "react";
import { motion } from "framer-motion";
import { Crystal3DViewer } from "./Crystal3DViewer";

// Define crystal types with colors and names
const CRYSTAL_TYPES = [
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

// Jewelry types
const JEWELRY_TYPES = [
  { id: "necklace", name: "Necklace" },
  { id: "bracelet", name: "Bracelet" },
  { id: "anklet", name: "Anklet" },
  { id: "earrings", name: "Earrings" },
  { id: "ring", name: "Ring" }
];

// Material types with colors
const MATERIAL_TYPES = [
  { id: "silver", name: "Silver", color: "#C0C0C0" },
  { id: "gold", name: "Gold", color: "#FFD700" },
  { id: "rose-gold", name: "Rose Gold", color: "#B76E79" }
];

interface CustomizerWithCrystal3DProps {
  selectedItemType: string;
  selectedCrystal: string;
  selectedMaterial: string;
  selectedLength: string;
  setSelectedItemType: (type: string) => void;
  setSelectedCrystal: (crystal: string) => void;
  setSelectedMaterial: (material: string) => void;
  setSelectedLength: (length: string) => void;
}

export const CustomizerWithCrystal3D = ({
  selectedItemType,
  selectedCrystal,
  selectedMaterial,
  selectedLength,
  setSelectedItemType,
  setSelectedCrystal,
  setSelectedMaterial,
  setSelectedLength
}: CustomizerWithCrystal3DProps) => {
  // Find the selected crystal info
  const selectedCrystalInfo = CRYSTAL_TYPES.find(c => c.id === selectedCrystal) || CRYSTAL_TYPES[0];

  // Find the selected material info
  const selectedMaterialInfo = MATERIAL_TYPES.find(m => m.id === selectedMaterial) || MATERIAL_TYPES[0];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - 3D Crystal Viewer */}
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Crystal 3D Preview</h3>
            <p className="text-sm text-gray-600 mb-4">
              Visualize your crystal with animated energy visualization. Rotate and zoom to explore the crystal.
            </p>
          </div>
          
          <Crystal3DViewer 
            selectedCrystal={selectedCrystal}
            crystalColor={selectedCrystalInfo.color}
            crystalName={selectedCrystalInfo.name}
          />
          
          <div className="mt-4 text-center">
            <h3 className="font-serif text-xl font-semibold mb-1">
              {selectedCrystalInfo.name} {JEWELRY_TYPES.find(j => j.id === selectedItemType)?.name || "Jewelry"}
            </h3>
            <p className="text-sm opacity-70">
              {selectedMaterialInfo.name} | {selectedLength}"
            </p>
          </div>
        </div>

        {/* Right column - Selection Options */}
        <div className="w-full md:w-1/2">
          {/* Crystal Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Choose Your Crystal</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {CRYSTAL_TYPES.map((crystal) => (
                <motion.div 
                  key={crystal.id}
                  className={`relative p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow text-center ${
                    crystal.id === selectedCrystal ? 'ring-2 ring-lavender' : ''
                  }`}
                  onClick={() => setSelectedCrystal(crystal.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="stone-preview w-10 h-10 rounded-full mx-auto mb-2" 
                    style={{ backgroundColor: crystal.color }}
                  ></div>
                  <p className="text-center text-xs font-medium truncate">{crystal.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Jewelry Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Jewelry Type</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {JEWELRY_TYPES.map((jewelryType) => (
                <motion.div 
                  key={jewelryType.id}
                  className={`p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow text-center ${
                    jewelryType.id === selectedItemType ? 'ring-2 ring-lavender' : ''
                  }`}
                  onClick={() => setSelectedItemType(jewelryType.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center h-10 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {jewelryType.id === 'necklace' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />}
                      {jewelryType.id === 'bracelet' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14" />}
                      {jewelryType.id === 'anklet' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />}
                      {jewelryType.id === 'earrings' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 104 0V7a2 2 0 00-2-2zm0 4a1 1 0 011-1h3m-3 0a1 1 0 00-1 1v3m0-3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />}
                      {jewelryType.id === 'ring' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />}
                    </svg>
                  </div>
                  <p className="text-center text-xs font-medium">{jewelryType.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Material Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Material</h3>
            <div className="grid grid-cols-3 gap-2">
              {MATERIAL_TYPES.map((material) => (
                <motion.div 
                  key={material.id}
                  className={`p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow text-center ${
                    material.id === selectedMaterial ? 'ring-2 ring-lavender' : ''
                  }`}
                  onClick={() => setSelectedMaterial(material.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-200" 
                    style={{ backgroundColor: material.color }}
                  ></div>
                  <p className="text-center text-xs font-medium">{material.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Length Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Length (inches)</h3>
            <div className="flex flex-wrap gap-2">
              {["16", "18", "20", "22", "24"].map((length) => (
                <motion.button
                  key={length}
                  className={`px-4 py-2 rounded-lg ${
                    length === selectedLength
                      ? 'bg-lavender text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedLength(length)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {length}"
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-sand/30 rounded-lg mt-6">
            <h4 className="font-medium mb-2">Crystal Energy Properties</h4>
            <ul className="text-sm space-y-2 list-disc pl-4">
              {selectedCrystal === 'amethyst' && (
                <>
                  <li>Promotes calmness and clarity of mind</li>
                  <li>Helps with meditation and spiritual growth</li>
                  <li>Associated with the crown chakra</li>
                </>
              )}
              {selectedCrystal === 'rose-quartz' && (
                <>
                  <li>Stone of unconditional love and compassion</li>
                  <li>Helps heal emotional wounds and trauma</li>
                  <li>Associated with the heart chakra</li>
                </>
              )}
              {selectedCrystal === 'clear-quartz' && (
                <>
                  <li>Amplifies energy and thought</li>
                  <li>Enhances psychic abilities</li>
                  <li>Known as the "master healer"</li>
                </>
              )}
              {selectedCrystal === 'turquoise' && (
                <>
                  <li>Stone of protection and healing</li>
                  <li>Balances and aligns all chakras</li>
                  <li>Promotes self-realization and communication</li>
                </>
              )}
              {selectedCrystal === 'citrine' && (
                <>
                  <li>Attracts abundance and prosperity</li>
                  <li>Enhances creativity and personal power</li>
                  <li>Associated with the solar plexus chakra</li>
                </>
              )}
              {selectedCrystal === 'lapis-lazuli' && (
                <>
                  <li>Stimulates wisdom and good judgment</li>
                  <li>Enhances intellectual ability and memory</li>
                  <li>Associated with the third eye chakra</li>
                </>
              )}
              {selectedCrystal === 'obsidian' && (
                <>
                  <li>Provides protection and grounding</li>
                  <li>Helps release negative emotions</li>
                  <li>Brings clarity to the mind</li>
                </>
              )}
              {selectedCrystal === 'tigers-eye' && (
                <>
                  <li>Promotes courage, confidence and willpower</li>
                  <li>Helps balance emotions</li>
                  <li>Associated with the root and sacral chakras</li>
                </>
              )}
              {selectedCrystal === 'moonstone' && (
                <>
                  <li>Encourages inner growth and strength</li>
                  <li>Enhances intuition and promotes inspiration</li>
                  <li>Connected to moon energy and feminine aspects</li>
                </>
              )}
              {selectedCrystal === 'onyx' && (
                <>
                  <li>Stone of strength and self-control</li>
                  <li>Alleviates fear and anxiety</li>
                  <li>Provides support during difficult times</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};