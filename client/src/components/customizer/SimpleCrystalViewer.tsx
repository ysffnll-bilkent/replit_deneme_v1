import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface SimpleCrystalViewerProps {
  selectedCrystal: string;
  crystalColor: string;
  selectedMaterial: string;
}

// Crystal data with colors and properties
const crystalData: Record<string, {
  color: string;
  name: string;
  properties: string[];
}> = {
  'amethyst': {
    color: '#9b5de5',
    name: 'Amethyst',
    properties: ['Peace', 'Clarity', 'Protection']
  },
  'rose-quartz': {
    color: '#f8a6c1',
    name: 'Rose Quartz',
    properties: ['Love', 'Compassion', 'Healing']
  },
  'clear-quartz': {
    color: '#f1f1f1',
    name: 'Clear Quartz',
    properties: ['Energy', 'Amplification', 'Clarity']
  },
  'turquoise': {
    color: '#40e0d0',
    name: 'Turquoise',
    properties: ['Protection', 'Wisdom', 'Balance']
  },
  'citrine': {
    color: '#f9c74f',
    name: 'Citrine',
    properties: ['Abundance', 'Joy', 'Energy']
  },
  'lapis-lazuli': {
    color: '#2a6fc9',
    name: 'Lapis Lazuli',
    properties: ['Wisdom', 'Truth', 'Insight']
  },
  'obsidian': {
    color: '#2d2d2d',
    name: 'Obsidian',
    properties: ['Protection', 'Grounding', 'Truth']
  },
  'tigers-eye': {
    color: '#b5651d',
    name: 'Tiger\'s Eye',
    properties: ['Courage', 'Confidence', 'Willpower']
  },
  'moonstone': {
    color: '#e6e6fa',
    name: 'Moonstone',
    properties: ['Intuition', 'Growth', 'Feminine energy']
  },
  'onyx': {
    color: '#353839',
    name: 'Onyx',
    properties: ['Strength', 'Protection', 'Willpower']
  }
};

// Material colors
const materialColors: Record<string, string> = {
  'silver': '#C0C0C0',
  'gold': '#FFD700',
  'rose-gold': '#B76E79'
};

export const SimpleCrystalViewer: React.FC<SimpleCrystalViewerProps> = ({
  selectedCrystal,
  crystalColor,
  selectedMaterial
}) => {
  // State for energy particles animation
  const [energyParticles, setEnergyParticles] = useState<{x: number; y: number; size: number; opacity: number; color: string}[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  
  // Get crystal data
  const crystal = crystalData[selectedCrystal] || crystalData.amethyst;
  const color = crystalColor || crystal.color;
  const materialColor = materialColors[selectedMaterial] || materialColors.silver;

  // Generate energy particles
  useEffect(() => {
    // Create 15 energy particles around the crystal
    const particles = Array.from({ length: 15 }, (_, i) => {
      const angle = (i / 15) * Math.PI * 2;
      const distance = 80 + Math.random() * 20;
      
      // Calculate colors with hue variations based on the crystal
      let particleColor = color;
      if (selectedCrystal === 'clear-quartz') {
        // For clear quartz, create rainbow-like particles
        const hue = (i * 30) % 360;
        particleColor = `hsl(${hue}, 80%, 80%)`;
      }
      
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 5 + Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
        color: particleColor
      };
    });
    
    setEnergyParticles(particles);
  }, [selectedCrystal, color]);

  // Handle rotation toggle
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className="w-full h-80 bg-gray-900 rounded-xl shadow-xl overflow-hidden relative">
      {/* Crystal container */}
      <div className="w-full h-full flex items-center justify-center">
        <motion.div 
          className="relative"
          animate={isRotating ? { rotateY: 360 } : { rotateY: 0 }}
          transition={isRotating ? { 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          } : { duration: 0.5 }}
        >
          {/* Main crystal */}
          <motion.div 
            className="w-32 h-40 rounded-b-lg transform rotate-180"
            style={{ 
              background: `linear-gradient(to bottom, ${color}99, ${color})`,
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              boxShadow: `0 0 30px ${color}66`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          />
          
          {/* Crystal material base */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-5 rounded-full"
            style={{ backgroundColor: materialColor }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          />

          {/* Energy particles */}
          <AnimatePresence>
            {energyParticles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full z-10"
                style={{
                  backgroundColor: particle.color,
                  width: particle.size,
                  height: particle.size,
                  left: '50%',
                  top: '50%',
                  opacity: particle.opacity,
                  boxShadow: `0 0 10px ${particle.color}`
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0 
                }}
                animate={{ 
                  x: particle.x,
                  y: particle.y,
                  scale: [1, 1.2, 1],
                  opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Crystal properties */}
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <h3 className="text-white font-semibold mb-1">{crystal.name}</h3>
        <div className="flex justify-center gap-2">
          {crystal.properties.map((prop, i) => (
            <span 
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-20 text-white"
            >
              {prop}
            </span>
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <button 
        className="absolute top-3 right-3 bg-white bg-opacity-10 text-white p-2 rounded-full hover:bg-opacity-20"
        onClick={toggleRotation}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};