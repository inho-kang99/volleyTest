import { OrbitControls, Tube, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useState } from "react";

const initialPosition = {
  xPosition: 2,
  yPosition: 2,
  zPosition: 20,
};

const dummyHeatmap = [];
for (let i = 0; i < 150; i++) {
  const xValue = 6 - Math.random() * 12;
  const yValue = Math.random() * 3 + 6;
  const zValue = Math.random() * 4 + 2;
  const resultX = 6 - Math.random() * 12;
  const resultY = 1;
  const resultZ = 0 - Math.random() * 20;
  dummyHeatmap.push({
    position: [
      [xValue, yValue, zValue],
      [resultX, resultY, resultZ],
    ],
    color: Math.random() < 0.8 ? "yellow" : "red",
  });
}

const YReturn = action => {
  if (action === "ready") {
    return 1;
  }
  if (action.includes("x")) {
    return 6;
  }
  if (action.includes("q")) {
    return 5;
  }
  if (action.includes("s")) {
    return 3;
  }
  if (action.includes("a")) {
    return 7;
  }

  return 2;
};

const dummyData = [
  {
    teamId: "KRPMEQ01",
    teamName: "삼성화재",
    mainAction: "a",
    locationX: 86.57,
    locationY: 19.33,
  },
  {
    teamId: "KRPMAM01",
    teamName: "우리카드",
    mainAction: "f",
    locationX: 26.67,
    locationY: 66.22,
  },
  {
    teamId: "KRPMAM01",
    teamName: "우리카드",
    mainAction: "s",
    locationX: 47.62,
    locationY: 54.44,
  },
  {
    teamId: "KRPMAM01",
    teamName: "우리카드",
    mainAction: "q+",
    locationX: 42.57,
    locationY: 51.33,
  },
  {
    teamId: "KRPMEQ01",
    teamName: "삼성화재",
    mainAction: "d-",
    locationX: 56.76,
    locationY: 52.0,
  },
];

const MyElement3D = ({ rally }) => {
  const [select, setSelect] = useState(null);
  console.log(rally);
  const dummyRally = useMemo(() => {
    return rally.map(item => {
      const xValue = Number(((item.locationY / 100) * 20).toFixed(2));
      const zValue = Number(-((item.locationX / 100) * 40).toFixed(2));
      const yValue = YReturn(item.mainAction);
      return {
        position: [xValue, yValue, zValue],
      };
    });
  }, [rally]);

  const tubePath =
    useMemo(() => {
      const paths = [...dummyRally.map(i => new THREE.Vector3(...i.position))];
      return new THREE.CatmullRomCurve3(paths);
    }, [dummyRally]) ||
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);

  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <OrbitControls />

      {tubePath.points.length && (
        <Tube args={[tubePath, 47, 0.5, 256, false]}>
          <meshBasicMaterial
            color={"white"}
            opacity={0.4}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </Tube>
      )}

      {dummyRally?.map((item, index) => (
        <mesh position={item.position} key={index}>
          <capsuleGeometry args={[0.5, 0, 16, 32]} />

          <meshBasicMaterial transparent color={"red"} />
        </mesh>
      ))}
      {/* 
      {dummyHeatmap.map((item, index) => (
        <mesh
          position={item.position[0]}
          key={index}
          onClick={() => setSelect(index === select ? null : index)}>
          <capsuleGeometry args={[0.5, 0, 16, 32]} />

          <meshBasicMaterial
            transparent
            opacity={item.color === "red" ? 0.6 : 0.3}
            color={item.color}
          />
       
      ))}
      {dummyHeatmap.map((item, index) => (
        <mesh
          position={item.position[1]}
          key={index}
          onClick={() => setSelect(index === select ? null : index)}>
          <capsuleGeometry args={[0.5, 0, 16, 32]} />

          <meshBasicMaterial
            transparent
            opacity={item.color === "red" ? 0.6 : 0.3}
            color={item.color}
          />
        </mesh>
      ))} */}
      <axesHelper scale={10} />
    </>
  );
};

export default MyElement3D;
