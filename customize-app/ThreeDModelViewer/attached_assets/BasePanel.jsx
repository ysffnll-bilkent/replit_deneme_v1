import React from "react";
import ModelThumbnail from "../three/ModelThumbnail";

export default function BasePanel({ models, onSelect, selectedType }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "18px",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px 0"
        }}>
            {models.map((model) => (
                <ModelThumbnail
                    key={model.type}
                    baseType={model.type}
                    name={model.name}
                    selected={selectedType === model.type}
                    onClick={() => onSelect(model.type)}
                    isDynamicRope={model.type === "dynamicRope"}
                    draggable={model.draggable}
                />
            ))}
        </div>
    );
}
