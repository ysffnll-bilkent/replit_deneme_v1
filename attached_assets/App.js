// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ModelViewer from './viewer/ModelViewer';

function App() {
  const [stoneModels, setStoneModels] = useState([]);
  const [stoneScales, setStoneScales] = useState([]);
  const [models, setModels] = useState([]);
  const [dragModelPath, setDragModelPath] = useState(null);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const historyRef = useRef([]);

  // Yeni shape kontrolü için state
  const [shapeType, setShapeType] = useState('circle');
  const [shapeParams, setShapeParams] = useState({});

  // .glb model listesini yükle
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/assets/models/models.json')
      .then(res => res.json())
      .then(data => {
        const paths = data.map(m => `/assets/models/${m}`);
        setModels(paths);
        const initialCount = 8;
        setStoneModels(Array(initialCount).fill(paths[0]));
        setStoneScales(Array(initialCount).fill(1));
      })
      .catch(console.error);
  }, []);

  // Taş sayısını güncelle
  const handleCountChange = (count) => {
    setStoneModels(prev => {
      const next = prev.slice(0, count);
      while (next.length < count) next.push(prev[0] || models[0] || '');
      return next;
    });
    setStoneScales(prev => {
      const next = prev.slice(0, count);
      while (next.length < count) next.push(1);
      return next;
    });
    setSelectedIndexes([]);
    historyRef.current = [];
  };

  // Taş seçimini toggle et, history kaydet
  const toggleIndex = (idx) => {
    const nextSel = selectedIndexes.includes(idx)
      ? selectedIndexes.filter(i => i !== idx)
      : [...selectedIndexes, idx];
    historyRef.current.push(selectedIndexes);
    if (historyRef.current.length > 20) historyRef.current.shift();
    setSelectedIndexes(nextSel);
  };

  // Tek bir taşın ölçeğini güncelle
  const handleScaleChange = (idx, scale) => {
    setStoneScales(prev => {
      const next = [...prev];
      next[idx] = scale;
      return next;
    });
  };

  // Drop olduğunda o taşın modelini değiştir
  const handleStoneDrop = (idx) => {
    if (!dragModelPath) return;
    setStoneModels(prev => {
      const next = [...prev];
      next[idx] = dragModelPath;
      return next;
    });
    setDragModelPath(null);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        models={models}
        stoneModels={stoneModels}
        stoneScales={stoneScales}
        shapeType={shapeType}
        setShapeType={setShapeType}
        shapeParams={shapeParams}
        setShapeParams={setShapeParams}
        onCountChange={handleCountChange}
        onScaleChange={handleScaleChange}
        selectedIndexes={selectedIndexes}
        dragModelPath={dragModelPath}
        setDragModelPath={setDragModelPath}
      />
      <ModelViewer
        stoneModels={stoneModels}
        stoneScales={stoneScales}
        selectedIndexes={selectedIndexes}
        toggleIndex={toggleIndex}
        dragModelPath={dragModelPath}
        onStoneDrop={handleStoneDrop}
        shapeType={shapeType}
        shapeParams={shapeParams}
      />
    </div>
  );
}

export default App;
