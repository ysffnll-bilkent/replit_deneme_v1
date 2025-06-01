import React, { useState } from "react";
import BasePanel from "./BasePanel";
import StonePanel from "./StonePanel";
import UclukPanel from "./UclukPanel";
import { ROPE_CONFIG } from "../../utils/ropeConfig";

// Tooltip bileşeni
function Tooltip({ text }) {
    const [show, setShow] = useState(false);
    return (
        <span style={{ position: "relative", marginLeft: 6 }}>
            <span
                style={{
                    display: "inline-block",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#d1ba7c",
                    color: "#23242a",
                    fontWeight: 700,
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: 14,
                    lineHeight: "18px"
                }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                ?
            </span>
            {show && (
                <span style={{
                    position: "absolute",
                    left: 24,
                    top: -8,
                    background: "#23242a",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    maxWidth: 260,
                    zIndex: 10,
                    boxShadow: "0 2px 12px #0002"
                }}>{text}</span>
            )}
        </span>
    );
}

// Canlı ayar paneli (sadece Dynamic İp seçiliyse)
function RopeConfigPanel({ visible, onChange, values }) {
    if (!visible) return null;
    return (
        <div style={{
            background: "#2b2b2b",
            borderRadius: 12,
            padding: 18,
            margin: "18px 0 0 0",
            boxShadow: "0 2px 12px #0001",
            color: "#fff"
        }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10, color: "#d1ba7c" }}>
                Dynamic İp Ayarları
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Stiffness */}
                <label>
                    Sertlik (maxForce): {values.stiffness}
                    <Tooltip text="İpin segmentleri arasındaki yay sertliği. Yüksek değer = daha az esneme, daha stabil ip." />
                    <input type="range" min={100} max={5000} step={10} value={values.stiffness}
                        onChange={e => onChange({ ...values, stiffness: Number(e.target.value) })} />
                </label>
                {/* Segment Count */}
                <label>
                    Segment Sayısı: {values.segCount}
                    <Tooltip text="İpin kaç parçadan oluştuğu. Fazla segment = daha pürüzsüz ve doğal ip, ama daha fazla hesaplama." />
                    <input type="range" min={8} max={60} step={1} value={values.segCount}
                        onChange={e => onChange({ ...values, segCount: Number(e.target.value) })} />
                </label>
                {/* Linear Damping */}
                <label>
                    Lineer Damping: {values.linDamp}
                    <Tooltip text="Her segmentin hareketini yavaşlatan sürtünme. 0.8-0.99 arası önerilir. Yüksek değer = daha az titreşim." />
                    <input type="range" min={0.5} max={0.99} step={0.01} value={values.linDamp}
                        onChange={e => onChange({ ...values, linDamp: Number(e.target.value) })} />
                </label>
                {/* Angular Damping */}
                <label>
                    Açısal Damping: {values.angDamp}
                    <Tooltip text="Her segmentin dönme hareketini yavaşlatan sürtünme. 0.8-0.99 arası önerilir." />
                    <input type="range" min={0.5} max={0.99} step={0.01} value={values.angDamp}
                        onChange={e => onChange({ ...values, angDamp: Number(e.target.value) })} />
                </label>
            </div>
        </div>
    );
}

export default function Sidebar({
    baseModels,
    stoneModels,
    uclukModels,
    onBaseSelect,
    onStoneAdd,
    onUclukAdd,
    selectedBaseType
}) {
    return (
        <aside style={{
            width: 310,
            minWidth: 210,
            maxWidth: 360,
            height: "100vh",
            background: "#23242a",
            color: "#fff",
            borderRight: "2px solid #2b2b2b",
            display: "flex",
            flexDirection: "column",
            padding: "0 0 40px 0",
            gap: 0,
            boxShadow: "4px 0 24px 0 #0d12171a",
            overflowY: "auto"
        }}>
            {/* Başlık ve base panel */}
            <div style={{ padding: "24px 22px 12px 22px" }}>
                <div style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#d1ba7c"
                }}>Taban Modelleri</div>
                <BasePanel
                    models={baseModels}
                    onSelect={onBaseSelect}
                    selectedType={selectedBaseType}
                />
            </div>
            <div style={{ padding: "18px 22px 6px 22px" }}>
                <div style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#7cc6f5"
                }}>Taş Modelleri</div>
                <StonePanel
                    models={stoneModels}
                    onAdd={onStoneAdd}
                />
            </div>
            <div style={{ padding: "18px 22px 6px 22px" }}>
                <div style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#c38aff"
                }}>Uç Modelleri</div>
                <UclukPanel
                    models={uclukModels}
                    onAdd={onUclukAdd}
                />
            </div>
        </aside>
    );
}
