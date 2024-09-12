import React, { useState } from "react";

import dummyArr from "./dummyHeatmap.jsx";
import "./App.css";

import { Canvas } from "@react-three/fiber";
import Coat3D from "./Coat3D.jsx";
import MyElement3D from "./MyElement3D.jsx";
import AnimationElement from "./AnimationElement.jsx";
import AnimationCoat from "./AnimationCoat.jsx";

const App = () => {
  const [select, setSelect] = useState(null);

  const [rally, setRally] = useState([]);
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <div
        style={{
          width: "1200px",
          height: "600px",
          margin: "auto",
          border: "1px solid black",
        }}>
        <Canvas
          shadows
          frameloop="demand"
          camera={{
            fov: 60,
            far: 100,
            position: [-15, 15, 5],
          }}>
          <Coat3D position={[10, 0, -20]} />
          <MyElement3D rally={rally} />
        </Canvas>
      </div>
      <div
        style={{
          width: "1400px",
          height: "600px",
          margin: "auto",
          border: "1px solid black",
          display: "flex",
          flexDirection: "row",
          gap: "50px",
        }}>
        <div
          style={{
            width: "1200px",
            height: "100%",
          }}>
          <Canvas camera={{ fov: 40, far: 80, position: [-20, 25, 10] }}>
            <AnimationCoat />
            <AnimationElement
              playing={playing}
              setPlaying={setPlaying}
              rally={rally}
            />
          </Canvas>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "150px",
            flexDirection: "column",
            overflowY: "scroll",
            overflowX: "hidden",
          }}>
          {dummyArr.map((item, index) => (
            <div
              style={{
                width: "100px",
                minHeight: "50px",
                border: "1px solid black",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                background: select === index ? "pink" : null,
                margin: "0 auto",
              }}
              key={index}
              onClick={() => {
                if (!playing) {
                  setSelect(index);
                  setRally(item);
                }
              }}>
              <div>{index + 1}번 랠리</div>
              <div>{item.length} 액션</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
