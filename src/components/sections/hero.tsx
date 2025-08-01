"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { easing } from "maath";
import { Suspense, useState } from "react";
import { useMediaQuery } from "react-responsive";
import HeroText from "../ui/HeroText";
import ParallaxBackground from "../ui/ParallaxBackground";
import { Astronaut } from "../ui/Astronaut";
import Loader from "../ui/Loader";
import FloatingContactButton from "../ui/FloatingContactButton";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [showNotification, setShowNotification] = useState(false);

  const handleContactClick = () => {
    // Option 1: Direct phone call
    window.location.href = "tel:+94704064244";

    // Show feedback notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

    // Option 2: Copy to clipboard (uncomment if preferred)
    // navigator.clipboard.writeText("0704064244").then(() => {
    //     setShowNotification(true);
    //     setTimeout(() => setShowNotification(false), 3000);
    // });
  };

  return (
    <section
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
      id="home"
    >
      <HeroText />
      <ParallaxBackground />

      {/* Floating Contact Button */}
      <FloatingContactButton onContactClick={handleContactClick} />

      {/* Contact Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed top-20 right-4 md:right-8 bg-green-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg z-50 border border-green-500/50"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <div>
                <div className="font-medium text-sm">Calling...</div>
                <div className="text-xs text-green-200">0704064244</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : 0.3}
                position={isMobile ? [0, -1.5, 0] : [1.3, -1, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
            0.5,
            delta
        );
    });
}

export default Hero;
export { Hero as Hero2 };