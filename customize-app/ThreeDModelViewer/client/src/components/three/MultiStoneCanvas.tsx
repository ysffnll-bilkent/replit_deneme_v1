import React from "react";
import BraceletCanvas from "./BraceletCanvas";
import RopeCanvas from "./RopeCanvas";

interface MultiStoneCanvasProps {
    baseType: string;
    stones: Array<{
        id: string;
        url: string;
        position: [number, number, number];
    }>;
    ucluks: Array<{
        id: string;
        url: string;
        position: [number, number, number];
    }>;
    onStoneAdd: (data: { url: string; position: [number, number, number] }) => void;
    onStoneRemove: (id: string) => void;
    onUclukAdd: (data: { url: string; position: [number, number, number] }) => void;
    onUclukRemove: (id: string) => void;
}

export default function MultiStoneCanvas({ 
    baseType, 
    stones, 
    ucluks, 
    onStoneAdd, 
    onStoneRemove, 
    onUclukAdd, 
    onUclukRemove 
}: MultiStoneCanvasProps) {
    // Taban tipine göre uygun Canvas'ı render et
    if (baseType === "circle") {
        return (
            <BraceletCanvas
                stones={stones}
                onStoneAdd={onStoneAdd}
                onStoneRemove={onStoneRemove}
            />
        );
    }
    
    if (baseType === "line") {
        return (
            <RopeCanvas
                stones={stones}
                onStoneAdd={onStoneAdd}
                onStoneRemove={onStoneRemove}
            />
        );
    }
    
    // Fallback için basit div
    return (
        <div style={{ 
            width: "100%", 
            height: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            background: "#f0f0f0",
            color: "#666"
        }}>
            Bilinmeyen taban tipi: {baseType}
        </div>
    );
}
