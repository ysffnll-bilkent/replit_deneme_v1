import React from "react";
import { Helmet } from "react-helmet";

export default function CrystalEnergyVisualization() {
  return (
    <>
      <Helmet>
        <title>Crystal Energy Visualization | Mine Jewellery Art</title>
        <meta 
          name="description" 
          content="Experience advanced 3D crystal energy visualization and customization tools for spiritual jewelry design."
        />
        <meta property="og:title" content="Crystal Energy Visualization | Mine Jewellery Art" />
        <meta property="og:description" content="Advanced 3D crystal visualization and energy customization tools." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
        <iframe
          src="/crystal-app"
          title="Crystal Energy Visualization App"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            margin: 0,
            padding: 0,
          }}
        />
      </div>
    </>
  );
}