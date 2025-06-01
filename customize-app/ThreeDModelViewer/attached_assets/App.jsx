import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import MultiStoneCanvas from "./components/three/MultiStoneCanvas";
import PhysicsCanvas from "./components/three/PhysicsCanvas";
import { useDrop } from "react-dnd";
import { ROPE_CONFIG } from "./utils/ropeConfig";

const BASE_MODELS = [
  { type: "circle", name: "Halka", draggable: false },
  { type: "line", name: "Düz İp", draggable: false },
  { type: "dynamicRope", name: "Dynamic İp", draggable: true },
];

function App() {
  const [models, setModels] = useState([]);
  const [uclukModels, setUclukModels] = useState([]);
  const [baseType, setBaseType] = useState("circle");
  const [selectedStones, setSelectedStones] = useState([]);
  const [selectedUcluks, setSelectedUcluks] = useState([]);
  const [stones, setStones] = useState([]);

  useEffect(() => {
    fetch("/models/models.json")
      .then(res => res.json())
      .then(data => {
        setModels(data);
        setUclukModels(data); // şimdilik taşlarla aynı veriyi gösteriyor
      });
  }, []);

  // Base model seçimi
  const handleBaseSelect = (type) => setBaseType(type);

  // Drag&Drop ile eklenen taş
  const handleStoneAdd = ({ url, position }) => {
    setSelectedStones(stones => [
      ...stones,
      { url, id: `${url}_${Date.now()}_${Math.random()}`, position }
    ]);
  };

  // Drag&Drop veya tık ile uç ekleme
  const handleUclukAdd = ({ url, position, scale }) => {
    setSelectedUcluks([
      { url, id: `${url}_${Date.now()}_${Math.random()}`, position, scale }
    ]);
  };

  // Taş ve uç silme
  const handleStoneRemove = (id) =>
    setSelectedStones(stones => stones.filter(s => s.id !== id));
  const handleUclukRemove = (id) =>
    setSelectedUcluks(ucluks => ucluks.filter(s => s.id !== id));

  // Sidebar'dan drag-drop ile taş ekleme örneği
  const handleDropStone = (url, position = [0, 0, 0]) => {
    setStones(sts => [
      ...sts,
      { url, position, mass: 0.2, scale: 0.15 }
    ]);
  };

  // Ana sahne alanı için drop target (sadece Dynamic İp için)
  const [, drop] = useDrop({
    accept: "BASE_DYNAMIC_ROPE",
    drop: () => {
      setBaseType("dynamicRope");
    },
  });

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "linear-gradient(120deg, #fcfafb 70%, #d9e7ff 100%)"
    }}>
      <Sidebar
        baseModels={BASE_MODELS}
        stoneModels={models}
        uclukModels={uclukModels}
        onBaseSelect={handleBaseSelect}
        onStoneAdd={baseType === "dynamicRope" ? handleDropStone : handleStoneAdd}
        onUclukAdd={handleUclukAdd}
        selectedBaseType={baseType}
      />
      <main
        ref={drop}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {baseType === "dynamicRope" ? (
          <PhysicsCanvas
            stones={stones}
            ropeProps={{
              segmentCount: ROPE_CONFIG.segCount,
              length: 2.5,
              mass: 0.7,
              maxForce: ROPE_CONFIG.stiffness,
            }}
            onStoneDrop={(url) => handleDropStone(url, [0, 0, 0])}
            onUclukDrop={(url) => handleUclukAdd({ url, position: [0, 0, 0], scale: [0.2, 0.2, 0.2] })}
          />
        ) : (
          <div style={{
            width: "660px",
            height: "540px",
            background: "#fff",
            borderRadius: "32px",
            boxShadow: "0 10px 32px 0 #353d4e17, 0 0 0 1px #e2e6f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <MultiStoneCanvas
              baseType={baseType}
              stones={selectedStones}
              ucluks={selectedUcluks}
              onStoneAdd={handleStoneAdd}
              onStoneRemove={handleStoneRemove}
              onUclukAdd={handleUclukAdd}
              onUclukRemove={handleUclukRemove}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
