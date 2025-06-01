import React, { useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, useSphere } from "@react-three/cannon";
import Hook from "./Hook";
import StoneMesh from "./StoneMesh";
import { generateRopeSegments, findNearestSegment } from "../../utils/generateRopeSegments";
import { useDrop } from "react-dnd";

// Rope segment bileşeni
function RopeSegment({ position, isFixed = false }: { position: [number, number, number]; isFixed?: boolean }) {
    const [ref] = useSphere(() => ({
        mass: isFixed ? 0 : 0.1,
        position,
        material: {
            friction: 0.1,
            restitution: 0.1,
        },
        linearDamping: 0.4,
        angularDamping: 0.4,
    }));

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial color="#8B4513" />
        </mesh>
    );
}

export default function DynamicRope({ 
    segmentCount = ROPE_CONFIG.segCount, 
    length = 2.5, 
    mass = 0.1, 
    maxForce = ROPE_CONFIG.stiffness 
}) {
    const segmentRefs = useRef([]);
    const segments = useMemo(() => {
        const segs = [];
        for (let i = 0; i < segmentCount; i++) {
            const y = (length / segmentCount) * i - length / 2;
            segs.push({
                position: [0, y, 0],
                isFixed: i === 0, // First segment is fixed
            });
        }
        return segs;
    }, [segmentCount, length]);

    // Create constraints between segments
    const constraints = useMemo(() => {
        const constraintList = [];
        for (let i = 0; i < segmentCount - 1; i++) {
            constraintList.push({
                bodyA: i,
                bodyB: i + 1,
                distance: length / segmentCount,
            });
        }
        return constraintList;
    }, [segmentCount, length]);

    // Visual rope line
    const lineRef = useRef();
    const positions = useRef(new Float32Array(segmentCount * 3));

    useFrame(() => {
        // Update visual rope based on physics segments
        if (lineRef.current && segmentRefs.current.length === segmentCount) {
            segmentRefs.current.forEach((ref, index) => {
                if (ref && ref.current) {
                    const pos = ref.current.position;
                    positions.current[index * 3] = pos.x;
                    positions.current[index * 3 + 1] = pos.y;
                    positions.current[index * 3 + 2] = pos.z;
                }
            });
            
            // Güvenli needsUpdate kontrolü
            if (lineRef.current && 
                lineRef.current.geometry && 
                lineRef.current.geometry.attributes && 
                lineRef.current.geometry.attributes.position) {
                lineRef.current.geometry.attributes.position.needsUpdate = true;
            }
        }
    });

    return (
        <group>
            {/* Physics segments */}
            {segments.map((segment, index) => (
                <RopeSegment
                    key={index}
                    ref={(ref) => (segmentRefs.current[index] = ref)}
                    position={segment.position}
                    mass={mass}
                    isFixed={segment.isFixed}
                />
            ))}
            
            {/* Constraints */}
            {constraints.map((constraint, index) => (
                <RopeConstraint
                    key={index}
                    bodyA={segmentRefs.current[constraint.bodyA]}
                    bodyB={segmentRefs.current[constraint.bodyB]}
                    distance={constraint.distance}
                    maxForce={maxForce}
                />
            ))}
            
            {/* Visual rope line */}
            <line ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attachObject={["attributes", "position"]}
                        count={segmentCount}
                        array={positions.current}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#8B4513" linewidth={4} />
            </line>
        </group>
    );
}

function RopeConstraint({ bodyA, bodyB, distance, maxForce }) {
    usePointToPointConstraint(bodyA, bodyB, {
        pivotA: [0, 0, 0],
        pivotB: [0, 0, 0],
        distance,
        maxForce,
    });
    
    return null;
}
