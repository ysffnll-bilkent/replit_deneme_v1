import React from "react";
import ModelThumbnail from "../three/ModelThumbnail";
import { useDrag } from "react-dnd";

function DraggableUcluk({ model }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "UCLUK",
        item: { url: model.url, name: model.name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <ModelThumbnail url={model.url} name={model.name} />
        </div>
    );
}

export default function UclukPanel({ models }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "16px",
            justifyItems: "center"
        }}>
            {models.map((model) => (
                <DraggableUcluk key={model.url} model={model} />
            ))}
        </div>
    );
}
