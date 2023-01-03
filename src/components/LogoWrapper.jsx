import { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Html, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LogoModel from "./LogoModel";
import Spinner from "../atoms/Spinner";

export default function LogoWrapper() {
  const boxRef = useRef();

  const style = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  // object called style with full width and height of the screen and center alignment


    const Model = () => {
      const mesh = useRef();
  
      useFrame(() => {
        mesh.current.rotation.y += 0.01;
        mesh.current.rotation.x += 0.01;
      });
      return (
        <group scale={1} position={[0,0,0]}>
          <mesh rotateX={Math.PI /2} position={[0,0,0]} scale={2.5}>
            <circleGeometry attach="geometry" args={[1, 32]} />
            <meshBasicMaterial attach="material" color="black" />
          </mesh>
          <mesh ref={mesh} scale={1.6}>
          <dodecahedronGeometry attach="geometry" />
          <meshPhysicalMaterial
            color="black"
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[100, 1000]}
            clearcoat={0.3}
            roughness={0.5}
          />
        </mesh>
        </group>
        
      );
    };

  return (
    <div style={{ height: "100%" }}>
      <Canvas>
        {/* <Stage position={[0, 0, 1]} preset="rembrandt" gl={{ alpha: false }}> */}
          <Model />
        {/* </Stage> */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
