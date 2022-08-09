import { Suspense, useRef } from "react"
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, Html } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import LogoModel from './LogoModel'
import Spinner from '../atoms/Spinner'

export default function LogoWrapper() {

  const Model = () => {
    // location of the 3D model
    const gltf = useLoader(GLTFLoader, "/3dLogo.glb");

    const boxRef = useRef();

    useFrame(() => {
      boxRef.current.rotation.y += 0.01;
    });
    return (
      <>
        {/* Use scale to control the size of the 3D model */}
        <primitive ref={boxRef} object={gltf.scene} scale={10} position={[0, -0.5, 0]} />
      </>
    );
  };

  const style = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  // object called style with full width and height of the screen and center alignment

  return (
    <div style={{ height: "10rem" }}>
              <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 2], fov: 50 }}>

      <Suspense fallback={<Html style={style}>LOADING</Html>}>
   
          <Model />
          {/* To add environment effect to the model */}
          <Environment preset="city" />
      </Suspense>
        </Canvas>
    </div>
  )
}
