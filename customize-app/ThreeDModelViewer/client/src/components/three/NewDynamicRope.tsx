import React, { useState, useMemo, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, useSphere, usePointToPointConstraint } from "@react-three/cannon";
import Hook from "./Hook";
import StoneMesh from "./StoneMesh";
import Ground from "./Ground";
import { generateRopeSegments, findNearestSegment } from "../../utils/generateRopeSegments";
import { useDrop } from "react-dnd";

// Rope segment bileşeni - gerçek fizik kısıtlamaları ile
function RopeSegment({ 
    position, 
    isFixed = false, 
    index,
    segmentRefs,
    hookPositions
}: { 
    position: [number, number, number]; 
    isFixed?: boolean;
    index: number;
    segmentRefs: React.MutableRefObject<any[]>;
    hookPositions: [[number, number, number], [number, number, number]];
}) {
    const [ref, api] = useSphere(() => ({
        mass: isFixed ? 0 : 0.05,
        position,
        args: [0.025],
        material: {
            friction: 0.3,
            restitution: 0.1,
        },
        linearDamping: 0.9,
        angularDamping: 0.9,
        type: isFixed ? 'Static' : 'Dynamic'
    }));

    // Segment referansını sakla
    useEffect(() => {
        segmentRefs.current[index] = api;
    }, [api, index, segmentRefs]);

    // Hook pozisyonları değiştiğinde uç segmentleri güncelle
    useEffect(() => {
        if (isFixed) {
            if (index === 0) {
                api.position.set(...hookPositions[0]);
            } else {
                api.position.set(...hookPositions[1]);
            }
        }
    }, [api, hookPositions, index, isFixed]);

    return (
        <mesh ref={ref} castShadow>
            <sphereGeometry args={[0.025]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
        </mesh>
    );
}

// Segment arası bağlantı
function RopeConstraint({ 
    bodyA, 
    bodyB, 
    distance = 0.15 
}: { 
    bodyA: any; 
    bodyB: any; 
    distance?: number;
}) {
    usePointToPointConstraint(bodyA, bodyB, {
        pivotA: [0, 0, 0],
        pivotB: [0, 0, 0],
    });
    return null;
}

interface NewDynamicRopeProps {
    stones: Array<{
        id: string;
        url: string;
        position: [number, number, number];
    }>;
    onStoneAdd: (data: { url: string; position: [number, number, number] }) => void;
    onStoneRemove: (id: string) => void;
}

export default function NewDynamicRope({ stones, onStoneAdd, onStoneRemove }: NewDynamicRopeProps) {
    // Hook pozisyonları
    const [hookA, setHookA] = useState<[number, number, number]>([-2, 2, 0]);
    const [hookB, setHookB] = useState<[number, number, number]>([2, 2, 0]);
    
    // Rope segment sayısı
    const segmentCount = 20;
    const segmentRefs = useRef<any[]>(Array(segmentCount).fill(null));

    // Rope segment pozisyonları
    const ropeSegments = useMemo(
        () => generateRopeSegments(hookA, hookB, segmentCount),
        [hookA, hookB, segmentCount]
    );

    // Screen koordinatını 3D world koordinatına çevir
    const screenToWorld = (clientX: number, clientY: number): [number, number, number] => {
        const x = (clientX / window.innerWidth - 0.5) * 6;
        const y = -(clientY / window.innerHeight - 0.5) * 4;
        const z = 0;
        return [x, y, z];
    };

    // Drop target for stones
    const [, dropStone] = useDrop({
        accept: "STONE",
        drop: (item: { url: string }, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset) return;

            const worldPos = screenToWorld(offset.x, offset.y);
            
            // En yakın segment pozisyonunu bul
            const nearestIndex = findNearestSegment(ropeSegments, worldPos);
            const nearestSegment = ropeSegments[nearestIndex];

            if (nearestSegment) {
                onStoneAdd({
                    url: item.url,
                    position: [
                        nearestSegment.position[0],
                        nearestSegment.position[1] + 0.1,
                        nearestSegment.position[2]
                    ]
                });
            }
        },
    });

    return (
        <div 
            ref={dropStone}
            style={{ width: "100vw", height: "100vh" }}
        >
            <Canvas
                camera={{ position: [0, 2, 8], fov: 50 }}
                style={{ width: "100%", height: "100%" }}
                shadows
            >
                <ambientLight intensity={0.4} />
                <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={0.8} 
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />

                <Physics 
                    gravity={[0, -9.81, 0]}
                    defaultContactMaterial={{ restitution: 0.3, friction: 0.5 }}
                >
                    <Suspense fallback={null}>
                        {/* Hook A */}
                        <Hook position={hookA} onDrag={(pos) => setHookA(pos)} />
                        
                        {/* Hook B */}
                        <Hook position={hookB} onDrag={(pos) => setHookB(pos)} />

                        {/* Rope Segments */}
                        {ropeSegments.map((segment, index) => (
                            <RopeSegment
                                key={index}
                                position={segment.position}
                                isFixed={index === 0 || index === ropeSegments.length - 1}
                                index={index}
                                segmentRefs={segmentRefs}
                                hookPositions={[hookA, hookB]}
                            />
                        ))}

                        {/* Rope Constraints */}
                        {ropeSegments.slice(1).map((_, index) => (
                            <RopeConstraint
                                key={`constraint-${index}`}
                                bodyA={segmentRefs.current[index]}
                                bodyB={segmentRefs.current[index + 1]}
                            />
                        ))}

                        {/* Zemin */}
                        <Ground />

                        {/* Taşlar */}
                        {stones.map((stone) => (
                            <StoneMesh
                                key={stone.id}
                                url={stone.url}
                                position={stone.position}
                                id={stone.id}
                                onRemove={onStoneRemove}
                                rotation={[0, 0, 0]}
                            />
                        ))}
                    </Suspense>
                </Physics>

                <OrbitControls enablePan={true} enableZoom={true} />
            </Canvas>
        </div>
    );
}