"use client";

import { useEffect, useState, useMemo } from "react";
import { FlipWords } from "./FlipWords";
import { motion, Variants } from "framer-motion";

const FLIP_WORDS: string[] = [
  "Secure",
  "Modern",
  "Scalable",
  "DevOps",
  "Innovative",
];

const ANIMATION_CONFIG = {
  duration: {
    container: 0.6,
    item: 0.5,
  },
  ease: "easeOut" as const,
  staggerDelay: 0.2,
} as const;

const containerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.container,
      ease: ANIMATION_CONFIG.ease,
      staggerChildren: ANIMATION_CONFIG.staggerDelay
    }
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.item,
      ease: ANIMATION_CONFIG.ease
    }
  },
};

const HeroText = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const commonTextClasses = useMemo(() => ({
    name: "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent",
    subtitle: "text-slate-300 font-medium",
    highlight: "text-blue-400 font-semibold",
    building: "text-slate-300 font-medium",
    solution: "text-blue-400 font-medium",
  }), []);

  const containerClasses = "relative w-full max-w-lg text-center md:text-left rounded-2xl backdrop-blur-md bg-gradient-to-br from-slate-900/90 via-gray-800/90 to-slate-900/90 shadow-2xl border border-slate-700/50 p-6 md:p-10";
  
  if (!mounted) return null;

  return (
    <section
      aria-label="Hero section"
      className="relative flex items-start md:items-center justify-start md:justify-center z-20 bg-transparent min-h-screen md:min-h-[80vh] h-full mt-[10vh] md:mt-0"
    >
      <motion.div
        className={containerClasses}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        tabIndex={0}
      >
        {/* Subtle animated border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 opacity-75 blur-sm"
        />
        
        <div className="relative z-10">
          {/* Desktop layout */}
          <div className="hidden md:flex flex-col space-y-3">
            <motion.h1
              className="text-4xl lg:text-5xl font-bold tracking-tight text-white"
              variants={itemVariants}
              tabIndex={0}
            >
              Hi, I&apos;m{" "}
              <span className={commonTextClasses.name}>
                Parakrama
              </span>
            </motion.h1>
            
            <div className="flex flex-col items-start space-y-2">
              <motion.p
                className={`text-lg lg:text-xl ${commonTextClasses.subtitle}`}
                variants={itemVariants}
              >
                Software & DevOps Enthusiast{" "}
                <span className="text-slate-400 mx-2">•</span>{" "}
                <span className={commonTextClasses.highlight}>Innovator</span>
              </motion.p>
              
              <motion.div
                className="flex items-baseline"
                variants={itemVariants}
              >
                <span className={`text-lg lg:text-xl ${commonTextClasses.building} mr-3`}>
                  Building
                </span>
                <FlipWords
                  words={FLIP_WORDS}
                  className="font-bold text-white text-4xl lg:text-5xl"
                />
              </motion.div>
              
              <motion.p
                className={`text-lg lg:text-xl ${commonTextClasses.solution}`}
                variants={itemVariants}
              >
                Web & DevOps Solutions
              </motion.p>
            </div>
          </div>
          
          {/* Mobile layout */}
          <div className="flex flex-col space-y-3 md:hidden">
            <motion.h1
              className="text-2xl font-bold tracking-tight text-white"
              variants={itemVariants}
              tabIndex={0}
            >
              Hi, I&apos;m{" "}
              <span className={commonTextClasses.name}>
                Parakrama Rathnayaka
              </span>
            </motion.h1>
            
            <div className="space-y-2">
              <motion.div
                className="flex items-baseline flex-wrap"
                variants={itemVariants}
              >
                <span className={`text-base ${commonTextClasses.building} mr-2`}>
                  Building
                </span>
                <FlipWords
                  words={FLIP_WORDS}
                  className="font-bold text-white text-3xl"
                />
              </motion.div>
              
              <motion.p
                className={`text-base ${commonTextClasses.solution}`}
                variants={itemVariants}
              >
                Web & DevOps Applications
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroText;