import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import girl from "../models/source/girl.glb";
import textureImage from "../models/textures/textureImage.png";
import styles from "../styles/HeroSectionStyles";
import { FaArrowRight } from "react-icons/fa";

const BlowDryer: React.FC = () => {
  const { scene } = useGLTF(girl);
  const texture = useTexture(textureImage);

  const modelRef = useRef<THREE.Object3D>();
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        map: texture,
      });
    }
  });
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} />;
};

const HeroSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="max-w-screen-xl w-full mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            We <span className="text-green-500">Focus</span> On <br /> Fixing
            Your Hair
          </h2>
          <p className={styles.description}>
            Improving your hair so you can get the best results for your hair.
            Also, you get the results quickly.
          </p>
          <button className={styles.getStartedButton}>
            Get Started <FaArrowRight className="ml-1" />
          </button>
        </div>
        <div className={styles.canvasContainer}>
          <div className={styles.gradientCircle}></div>
          <Canvas>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />
            <BlowDryer />
            <OrbitControls minDistance={3} maxDistance={7} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
