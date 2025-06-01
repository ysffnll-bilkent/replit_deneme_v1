import React from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { fitToCubeMeshOnly } from "../../utils/fitToCubeMeshOnly";
import { STONE_SIZE } from "../../utils/sceneConfig";

export default function PhysicsStone({ url, position, mass = 0.2, scale = 0.15 }) {
    const { scene } = useGLTF(url);
    const clonedScene = scene.clone();
    
    // Fit to standard size
    fitToCubeMeshOnly(clonedScene, STONE_SIZE * scale);
    
    const [ref] = useSphere(() => ({
        mass,
        position,
        material: {
            friction: 0.4,
            restitution: 0.3,
        },
    }));

    return (
        <mesh ref={ref}>
            <primitive object={clonedScene} />
        </mesh>
    );
}
