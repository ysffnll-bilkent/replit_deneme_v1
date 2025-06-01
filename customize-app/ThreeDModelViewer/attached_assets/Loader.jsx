import { Html } from "@react-three/drei";

export default function Loader({ text = "Model yükleniyor..." }) {
    return (
        <Html center>
            <div style={{ color: "#444", background: "#fff8", padding: 8, borderRadius: 6 }}>
                {text}
            </div>
        </Html>
    );
}
