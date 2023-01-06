import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Stage, Html } from "@react-three/drei";

export default function SceneSection() {
  const Model = () => {
    const mesh = useRef();

    useFrame(() => {
      mesh.current.position.y += 0.01;
      // mesh.current.position.x = Math.cos(mesh.current.rotation.y) * 0.6;
      // mesh.current.position.z = Math.sin(mesh.current.rotation.y) * 0.6;
    });
    return (
      <mesh ref={mesh}>
        <sphereGeometry attach="geometry"  />
        <meshPhysicalMaterial
          color="black"
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[100, 1000]}
          clearcoat={0.3}
          roughness={0.5}
        />{" "}
      </mesh>
    );
  };

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 0], fov: 50 }}>
      <Suspense fallback={<Html>LOADING</Html>}>
        <Stage
            position={[0,0, 0]}
          contactShadow
          intensity={1}
          contactShadowOpacity={0.5}
          shadowBias={-0.0001}
          preset="rembrandt"
          contactShadowBlur={1.5}
          shadowMapSize={[1024, 1024]}
          gl={{ alpha: false }}
        >
          <Model />
        </Stage>
      </Suspense>
    </Canvas>
  );
}
