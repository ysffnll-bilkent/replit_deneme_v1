import React from "react";
import ModelThumbnail from "../three/ModelThumbnail";

export default function ModelPanel({
    models,
    selectedModel,
    onModelSelect,
    baseModels = [],
    selectedBase,
    onBaseSelect
}) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "18px",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px 8px"
        }}>
            {baseModels.map((base) => (
                <ModelThumbnail
                    key={base.type}
                    baseType={base.type}
                    name={base.name}
                    selected={selectedBase === base.type}
                    onClick={() => onBaseSelect(base.type)}
                />
            ))}
            {models.map((model) => (
                <ModelThumbnail
                    key={model.url}
                    url={model.url}
                    name={model.name}
                    selected={selectedModel === model.url}
                    onClick={() => onModelSelect(model.url)}
                />
            ))}
        </div>
    );
}
