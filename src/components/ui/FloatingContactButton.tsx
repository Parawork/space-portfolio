"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface FloatingSphereProps {
  position: [number, number, number];
  onClick: () => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const FloatingSphere = ({ position, onClick, isHovered, setIsHovered }: FloatingSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      glowRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      {/* Outer glow effect */}
      <Sphere
        ref={glowRef}
        args={[1.5, 32, 32]}
        position={position}
      >
        <meshBasicMaterial
          color="#6f00ff"
          transparent
          opacity={isHovered ? 0.3 : 0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Main sphere */}
      <Sphere
        ref={meshRef}
        args={[0.8, 32, 32]}
        position={position}
        onClick={onClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <meshPhongMaterial
          color={isHovered ? "#00fff7" : "#6f00ff"}
          emissive={isHovered ? "#003333" : "#1a0033"}
          shininess={100}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Inner light */}
      <Sphere
        args={[0.6, 16, 16]}
        position={position}
      >
        <meshBasicMaterial
          color={isHovered ? "#00fff7" : "#6f00ff"}
          transparent
          opacity={0.4}
        />
      </Sphere>
      
      {/* Contact text */}
      <Html
        position={[position[0], position[1], position[2] + 0.1]}
        center
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div className="text-white text-xs font-bold tracking-wider transform -translate-x-1/2 -translate-y-1/2">
          CONTACT
        </div>
      </Html>
    </group>
  );
};

interface FloatingContactButtonProps {
  onContactClick: () => void;
}

const FloatingContactButton = ({ onContactClick }: FloatingContactButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-1/2 right-8 w-20 h-20 z-50 cursor-pointer"
      initial={{ opacity: 0, scale: 0, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 2.5 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#6f00ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00fff7" />
        
        <FloatingSphere
          position={[0, 0, 0]}
          onClick={onContactClick}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />
      </Canvas>
      
      {/* Ripple effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default FloatingContactButton;
