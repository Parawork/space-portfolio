"use client";

import React, { memo } from "react";
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

const SkillCategory: React.FC<SkillCategoryProps> = memo(
  ({ title, skills }) => (
    <section
      aria-labelledby={`skills-${title.toLowerCase()}`}
      className="space-y-3"
    >
      <h3
        id={`skills-${title.toLowerCase()}`}
        className="text-base sm:text-lg font-semibold text-white text-center"
      >
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-4 items-center">
        {skills.map((skill, i) => (
          <div
            key={skill.skill_name}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-md shadow-sm hover:scale-105 hover:shadow-purple-500/30 transition-transform duration-300"
          >
            <SkillDataProvider
              src={skill.image}
              name={skill.skill_name}
              width={skill.width ?? 36}
              height={skill.height ?? 36}
              index={i}
            />
          </div>
        ))}
      </div>
    </section>
  )
);

SkillCategory.displayName = "SkillCategory";

export const Skills: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(false);
  React.useEffect(() => {
    setShowVideo(true);
  }, []);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center py-16 sm:py-20 overflow-hidden"
      aria-label="Skills Section"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {showVideo && (
          <video
            className="w-full h-full object-cover opacity-25"
            playsInline
            preload="none"
            loop
            muted
            autoPlay
            aria-hidden="true"
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center max-w-xl px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 tracking-tight mb-2">
          My Skills
        </h2>
        <p className="text-gray-300 text-sm sm:text-base font-light">
          A compact showcase of my technical expertise
        </p>
      </header>

      {/* Animated Intro */}
      <div className="relative z-10 mt-6 sm:mt-8">
        <SkillText />
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mt-8 sm:mt-10 px-4">
        <SkillCategory title="Frontend" skills={FRONTEND_SKILL} />
        <SkillCategory title="Backend" skills={BACKEND_SKILL} />
        <SkillCategory title="Devops" skills={DEVOPS_SKILL} />
        <SkillCategory title="Other" skills={OTHER_SKILL} />
      </div>
    </section>
  );
};
