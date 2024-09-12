import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

const Coat3D = ({ position = [0, 0, 0] }) => {
  const refMesh = useRef();

  return (
    <>
      <directionalLight position={[2, 10, 2]} />
      <directionalLight position={[-2, -2, -2]} />

      <OrbitControls />
      <mesh ref={refMesh} scale={[20, 1, 40]} position={position}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

export default Coat3D;
