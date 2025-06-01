import React from "react";
import { Html } from "@react-three/drei";

export default function Loader({ text = "Model yükleniyor..." }) {
    return (
        <Html center>
            <div style={{ 
                color: "#444", 
                background: "#fff8", 
                padding: 8, 
                borderRadius: 6,
                textAlign: "center",
                fontSize: 14
            }}>
                {text}
            </div>
        </Html>
    );
}
