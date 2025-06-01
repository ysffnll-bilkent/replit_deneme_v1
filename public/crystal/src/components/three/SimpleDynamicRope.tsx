import React, { useMemo } from "react";
import * as THREE from "three";

interface SimpleDynamicRopeProps {
    segmentCount?: number;
    length?: number;
    mass?: number;
    maxForce?: number;
}

export default function SimpleDynamicRope({ 
    segmentCount = 10, 
    length = 2.5, 
    mass = 0.1, 
    maxForce = 1000 
}: SimpleDynamicRopeProps) {
    
    // Basit görsel ip render'ı
    const points = useMemo(() => {
        const pointArray = [];
        for (let i = 0; i < segmentCount; i++) {
            const x = (i / (segmentCount - 1) - 0.5) * length;
            const y = Math.sin(i * 0.2) * 0.1; // Hafif eğim
            const z = 0;
            pointArray.push(new THREE.Vector3(x, y, z));
        }
        return pointArray;
    }, [segmentCount, length]);

    const geometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    return (
        <group>
            {/* Basit ip görselleştirmesi */}
            <line geometry={geometry}>
                <lineBasicMaterial color="#8B4513" />
            </line>
            
            {/* İp üzerindeki segment noktaları */}
            {points.map((point, index) => (
                <mesh key={index} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.02]} />
                    <meshStandardMaterial color="#654321" />
                </mesh>
            ))}
        </group>
    );
}