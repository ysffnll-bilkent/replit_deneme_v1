import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useDrop } from "react-dnd";
import DynamicRope from "./DynamicRope";
import PhysicsStone from "./PhysicsStone";
import Loader from "./Loader";

export default function PhysicsCanvas({ stones, ropeProps, onStoneDrop, onUclukDrop }) {
    // Drop target for stones
    const [, dropStone] = useDrop({
        accept: "STONE",
        drop: (item) => {
            onStoneDrop(item.url);
        },
    });

    // Drop target for ucluks
    const [, dropUcluk] = useDrop({
        accept: "UCLUK",
        drop: (item) => {
            onUclukDrop(item.url);
        },
    });

    return (
        <div 
            ref={(node) => {
                dropStone(node);
                dropUcluk(node);
            }}
            style={{ width: "100vw", height: "100vh" }}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                style={{ width: "100%", height: "100%" }}
            >
                <color attach="background" args={["#f0f0f0"]} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                
                <Physics
                    gravity={[0, -9.8, 0]}
                    iterations={20}
                    tolerance={0.0005}
                    step={1/120}
                    maxSubSteps={3}
                    broadphase="SAP"
                    allowSleep={true}
                >
                    <Suspense fallback={<Loader />}>
                        <DynamicRope {...ropeProps} />
                        
                        {stones.map((stone, index) => (
                            <PhysicsStone
                                key={`${stone.url}_${index}`}
                                url={stone.url}
                                position={stone.position}
                                mass={stone.mass}
                                scale={stone.scale}
                            />
                        ))}
                    </Suspense>
                </Physics>
                
                <OrbitControls enableDamping dampingFactor={0.05} />
            </Canvas>
        </div>
    );
}
