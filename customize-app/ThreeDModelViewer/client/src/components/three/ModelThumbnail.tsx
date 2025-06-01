import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useDrag } from "react-dnd";
import { fitToCubeMeshOnly } from "../../utils/fitToCubeMeshOnly";

// Base type thumbnails
function BaseTypeThumbnail({ baseType }) {
    if (baseType === "circle") {
        return (
            <mesh>
                <torusGeometry args={[0.8, 0.1, 8, 16]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        );
    }
    
    if (baseType === "line") {
        return (
            <mesh>
                <boxGeometry args={[2, 0.1, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        );
    }
    
    if (baseType === "dynamicRope") {
        return (
            <mesh>
                <torusGeometry args={[0.8, 0.15, 6, 12]} />
                <meshStandardMaterial color="#CD853F" />
            </mesh>
        );
    }
    
    return null;
}

// 3D model thumbnail
function Model3DThumbnail({ url }) {
    const { scene } = useGLTF(url);
    const clonedScene = scene.clone();
    
    // Fit to thumbnail size
    fitToCubeMeshOnly(clonedScene, 1);
    
    return <primitive object={clonedScene} />;
}

export default function ModelThumbnail({ 
    url, 
    baseType, 
    name, 
    selected, 
    onClick, 
    isDynamicRope, 
    draggable 
}) {
    // Drag functionality for dynamic rope
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: isDynamicRope ? "BASE_DYNAMIC_ROPE" : "MODEL",
            item: { url, baseType, name },
            canDrag: draggable,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [url, baseType, name, draggable]
    );

    const thumbnailStyle = {
        width: 100,
        height: 100,
        border: selected ? "3px solid #4CAF50" : "2px solid #333",
        borderRadius: 8,
        cursor: "pointer",
        background: "#1a1a1a",
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center" as const,
        padding: 4,
    };

    const content = (
        <div style={thumbnailStyle} onClick={onClick}>
            <div style={{ width: "100%", height: 70, position: "relative" }}>
                <Canvas
                    camera={{ position: [0, 0, 3], fov: 50 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} intensity={1} />
                    
                    <Suspense fallback={null}>
                        {url ? (
                            <Model3DThumbnail url={url} />
                        ) : (
                            <BaseTypeThumbnail baseType={baseType} />
                        )}
                    </Suspense>
                    
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={2}
                    />
                </Canvas>
            </div>
            <div style={{
                color: "#fff",
                fontSize: 11,
                textAlign: "center" as const,
                marginTop: 4,
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap" as const
            }}>
                {name}
            </div>
        </div>
    );

    return draggable ? <div ref={drag}>{content}</div> : content;
}
