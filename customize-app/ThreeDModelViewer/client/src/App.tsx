import React, { useState, useEffect, Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import Sidebar from "./components/sidebar/Sidebar";
import MultiStoneCanvas from "./components/three/MultiStoneCanvas";
import PhysicsCanvas from "./components/three/PhysicsCanvas";
import NewDynamicRope from "./components/three/NewDynamicRope";
import { ROPE_CONFIG } from "./utils/ropeConfig";

const BASE_MODELS = [
  { type: "circle", name: "Halka", draggable: false },
  { type: "line", name: "Düz İp", draggable: false },
  { type: "dynamicRope", name: "Dynamic İp", draggable: true },
];

function App() {
  const [models, setModels] = useState<any[]>([]);
  const [uclukModels, setUclukModels] = useState<any[]>([]);
  const [baseType, setBaseType] = useState("dynamicRope");
  const [selectedStones, setSelectedStones] = useState<any[]>([]);
  const [selectedUcluks, setSelectedUcluks] = useState<any[]>([]);
  const [stones, setStones] = useState<any[]>([]);

  useEffect(() => {
    fetch("./models/models.json")
      .then(res => res.json())
      .then((data: any) => {
        setModels(data);
        setUclukModels(data);
      })
      .catch(err => {
        console.error("Model verileri yüklenirken hata:", err);
        const fallbackModels = [
          { name: "Avocado", url: "./models/Avocado.glb" },
          { name: "BoomBox", url: "./models/BoomBox.glb" },
          { name: "Box", url: "./models/Box.glb" },
          { name: "Duck", url: "./models/duck.glb" }
        ];
        setModels(fallbackModels);
        setUclukModels(fallbackModels);
      });
  }, []);

  const handleBaseSelect = (type: string) => setBaseType(type);

  const handleStoneAdd = ({ url, position }: any) => {
    setSelectedStones((stones: any) => [
      ...stones,
      { url, id: `${url}_${Date.now()}_${Math.random()}`, position }
    ]);
  };

  const handleUclukAdd = ({ url, position, scale }: any) => {
    setSelectedUcluks([
      { url, id: `${url}_${Date.now()}_${Math.random()}`, position, scale }
    ]);
  };

  const handleStoneRemove = (id: string) =>
    setSelectedStones((stones: any) => stones.filter((s: any) => s.id !== id));

  const handleUclukRemove = (id: string) =>
    setSelectedUcluks((ucluks: any) => ucluks.filter((s: any) => s.id !== id));

  const handleDropStone = (url: string, position = [0, 0, 0]) => {
    setStones((sts: any) => [
      ...sts,
      { url, position, mass: 0.2, scale: 0.15 }
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContent
        models={models}
        uclukModels={uclukModels}
        baseType={baseType}
        selectedStones={selectedStones}
        selectedUcluks={selectedUcluks}
        stones={stones}
        handleBaseSelect={handleBaseSelect}
        handleStoneAdd={handleStoneAdd}
        handleUclukAdd={handleUclukAdd}
        handleStoneRemove={handleStoneRemove}
        handleUclukRemove={handleUclukRemove}
        handleDropStone={handleDropStone}
        setBaseType={setBaseType}
      />
    </DndProvider>
  );
}

function AppContent({
  models,
  uclukModels,
  baseType,
  selectedStones,
  selectedUcluks,
  stones,
  handleBaseSelect,
  handleStoneAdd,
  handleUclukAdd,
  handleStoneRemove,
  handleUclukRemove,
  handleDropStone,
  setBaseType
}: any) {
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
        <Suspense fallback={<div>Yükleniyor...</div>}>
          {baseType === "dynamicRope" ? (
            <NewDynamicRope
              stones={selectedStones}
              onStoneAdd={handleStoneAdd}
              onStoneRemove={handleStoneRemove}
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
        </Suspense>
      </main>
    </div>
  );
}

export default App;