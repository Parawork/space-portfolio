"use client";

import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SkillDataProvider } from "../ui/skill-data-provider";
import { SkillText } from "../ui/skill-text";
import {
  BACKEND_SKILL,
  DEVOPS_SKILL,
  FRONTEND_SKILL,
  OTHER_SKILL,
} from "../../constants";

interface Skill {
  skill_name: string;
  image: string;
  width?: number;
  height?: number;
}

interface SkillCategoryProps {
  title: string;
  skills: readonly Skill[];
}

const skillCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      type: "spring",
      stiffness: 220,
      damping: 20,
    },
  }),
};

const SkillCategory = memo(({ title, skills }: SkillCategoryProps) => (
  <section
    aria-labelledby={`skills-${title.toLowerCase()}`}
    className="space-y-3"
  >
    <h3
      id={`skills-${title.toLowerCase()}`}
      className="text-base sm:text-lg font-semibold text-white text-center drop-shadow-lg"
    >
      {title}
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full md:flex md:flex-wrap md:justify-center md:gap-4 md:items-center">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.skill_name}
          className="p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-purple-500/40 transition-transform duration-300"
          variants={skillCardVariants}
          custom={i}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.96 }}
        >
          <SkillDataProvider
            src={skill.image}
            name={skill.skill_name}
            width={skill.width ?? 36}
            height={skill.height ?? 36}
            index={i}
          />
        </motion.div>
      ))}
    </div>
  </section>
));
SkillCategory.displayName = "SkillCategory";

export const Skills: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center py-12 sm:py-20 overflow-hidden"
      aria-label="Skills Section"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {showVideo && (
          <motion.video
            className="w-full h-full object-cover opacity-20"
            playsInline
            preload="none"
            loop
            muted
            autoPlay
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </motion.video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 backdrop-blur-sm" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 text-center max-w-xl px-4">
        <motion.h2
          className="text-5xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 tracking-tight mb-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className="text-gray-300 text-sm sm:text-base font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A compact showcase of my technical expertise
        </motion.p>
      </header>

      {/* Animated Intro */}
      <div className="relative z-10 mt-6 sm:mt-8 px-3">
        <SkillText />
      </div>

      {/* Skills Grid */}
      <motion.div
        className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-5xl mt-8 sm:mt-10 px-3 sm:px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SkillCategory title="Frontend" skills={FRONTEND_SKILL} />
        <SkillCategory title="Backend" skills={BACKEND_SKILL} />
        <SkillCategory title="DevOps" skills={DEVOPS_SKILL} />
        <SkillCategory title="Other" skills={OTHER_SKILL} />
      </motion.div>
    </section>
  );
};
