import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  ContactShadows,
  useTexture,
  Float,
  Text
} from '@react-three/drei';
import * as THREE from 'three';

// Crystal component - a simplified 3D representation that works reliably
const Crystal = ({ color, intensity = 1.0, scale = 1.0, id }: { 
  color: string; 
  intensity?: number;
  scale?: number;
  id: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create energy particles around the crystal
  const particleCount = 15;
  const particlePositions = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 0.7 + Math.random() * 0.3;
    return {
      position: [
        Math.cos(angle) * radius, 
        Math.sin(angle) * radius * 0.6, 
        Math.sin(Math.cos(angle)) * 0.5
      ] as [number, number, number],
      size: 0.05 + Math.random() * 0.1,
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2
    };
  });

  // Animation for the crystal and energy particles
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Subtle crystal rotation
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    
    // Animate each child (energy particles)
    groupRef.current.children.forEach((child, i) => {
      if (i > 0) { // Skip the main crystal which is the first child
        const particle = particlePositions[i - 1];
        if (particle && child instanceof THREE.Mesh) {
          // Pulsating movement
          const offset = particle.offset;
          const time = state.clock.getElapsedTime() * particle.speed;
          
          child.position.x = particle.position[0] * (1 + Math.sin(time + offset) * 0.1);
          child.position.y = particle.position[1] * (1 + Math.cos(time + offset) * 0.1);
          child.position.z = particle.position[2] * (1 + Math.sin(time * 0.7 + offset) * 0.1);
          
          // Pulsating opacity/scale
          child.scale.setScalar(
            particle.size * (1 + Math.sin(time * 1.5 + offset) * 0.2)
          );
        }
      }
    });
  });

  // Calculate the crystal hue based on the color name to create a gradient
  const getHueFromColor = () => {
    switch (id) {
      case 'amethyst': return 270; // purple
      case 'rose-quartz': return 340; // pink
      case 'clear-quartz': return 0; // white
      case 'turquoise': return 175; // turquoise
      case 'citrine': return 45; // yellow
      case 'lapis-lazuli': return 220; // blue
      case 'obsidian': return 0; // black
      case 'tigers-eye': return 35; // brown/orange
      case 'moonstone': return 210; // light blue/white
      case 'onyx': return 0; // black
      default: return 270; // default purple
    }
  };
  
  const hue = getHueFromColor();
  
  // Calculate colors for the energy particles
  const getEnergyColor = (index: number) => {
    const variance = 30; // hue variance
    const particleHue = (hue + (index * 10) % variance - variance/2) % 360;
    return `hsl(${particleHue}, 100%, ${id === 'clear-quartz' ? '90%' : '70%'})`;
  };

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Main crystal geometry */}
      <mesh castShadow>
        {/* Using an octahedron for the crystal shape with some randomization */}
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.2}
          transmission={id === 'clear-quartz' ? 0.95 : 0.2} // Clear quartz is more transparent
          ior={1.5} // Higher index of refraction for crystal
          thickness={id === 'clear-quartz' ? 1.5 : 0.8} // Glass thickness
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Energy particles around the crystal */}
      {particlePositions.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshBasicMaterial 
            color={getEnergyColor(i)} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      ))}
    </group>
  );
};

// Crystal name label
const CrystalLabel = ({ name, color }: { name: string; color: string }) => {
  return (
    <Text
      position={[0, -1.7, 0]}
      fontSize={0.2}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/assets/fonts/Inter-Medium.woff"
      fillOpacity={0.8}
    >
      {name}
    </Text>
  );
};

interface Crystal3DViewerProps {
  selectedCrystal: string;
  crystalColor: string;
  crystalName: string;
}

// Create a mapping of crystal IDs to proper display colors
const CRYSTAL_COLORS: Record<string, string> = {
  'amethyst': '#9b5de5',
  'rose-quartz': '#f8a6c1',
  'clear-quartz': '#f1f1f1',
  'turquoise': '#40e0d0',
  'citrine': '#f9c74f',
  'lapis-lazuli': '#2a6fc9',
  'obsidian': '#2d2d2d',
  'tigers-eye': '#b5651d',
  'moonstone': '#e6e6fa',
  'onyx': '#353839'
};

// Main 3D viewer component
export const Crystal3DViewer: React.FC<Crystal3DViewerProps> = ({ 
  selectedCrystal,
  crystalColor,
  crystalName 
}) => {
  // Default colors if not provided
  const color = crystalColor || CRYSTAL_COLORS[selectedCrystal] || '#9b5de5';
  const name = crystalName || selectedCrystal || 'Crystal';
  
  return (
    <div className="w-full h-80 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#07070c']} />
        
        {/* Basic lighting setup */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.5} castShadow />
        
        {/* The crystal with animated energy field */}
        <Float
          speed={2} // Animation speed
          rotationIntensity={0.2} // Rotation intensity
          floatIntensity={0.5} // Float intensity
        >
          <Crystal color={color} id={selectedCrystal} scale={1.2} />
        </Float>
        
        {/* Crystal name */}
        <CrystalLabel name={name} color={color} />
        
        {/* Environment and shadows */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={5} 
          blur={2.5} 
        />
        <Environment preset="city" />
        
        {/* Controls for rotation and zoom */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          minDistance={3} 
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};