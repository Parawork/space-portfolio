"use client";

import React, {
  memo,
  useMemo,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAREER_DATA } from "../../constants";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Header } from "../ui/Header";
import { TExperience } from "../../types";
import { config } from "../../config";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "../ui/VerticalTimeline";

// Lazy loading for experience cards if there are many
const LazyExperienceCard = memo((props: TExperience & { index: number }) => {
  return <ExperienceCard {...props} />;
});

LazyExperienceCard.displayName = "LazyExperienceCard";

const ExperienceCard: React.FC<TExperience & { index: number }> = memo(
  (experience) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Preload image
    useEffect(() => {
      if (experience.icon) {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = experience.icon;
      }
    }, [experience.icon]);

    // Memoize styles to prevent recalculation
    const contentStyle = useMemo(
      () => ({
        background:
          "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
        color: "#fff",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        borderRadius: "24px",
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(16px)",
        position: "relative" as const,
        overflow: "hidden" as const,
      }),
      []
    );

    const iconStyle = useMemo(
      () => ({
        background: `linear-gradient(135deg, ${experience.iconBg} 0%, rgba(30, 41, 59, 0.8) 100%)`,
        border: "3px solid rgba(147, 51, 234, 0.3)",
        boxShadow:
          "0 0 30px rgba(147, 51, 234, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)",
      }),
      [experience.iconBg]
    );

    return (
      <VerticalTimelineElement
        contentStyle={contentStyle}
        contentArrowStyle={{
          borderRight: "10px solid rgba(30, 41, 59, 0.9)",
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
        }}
        date={experience.date}
        iconStyle={iconStyle}
        icon={
          <div className="flex h-full w-full items-center justify-center relative">
            <AnimatePresence mode="wait">
              {imageLoaded ? (
                <motion.img
                  key="loaded-image"
                  src={experience.icon}
                  alt={experience.companyName}
                  className="h-[70%] w-[70%] object-contain relative z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  loading="eager"
                />
              ) : (
                <motion.div
                  key="loading-placeholder"
                  className="h-[70%] w-[70%] bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-lg animate-pulse relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full"></div>
          </div>
        }
        index={experience.index}
      >
        <div className="relative z-10">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-full blur-2xl"></div>

          {/* Company and position header */}
          <div className="mb-6">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {experience.title}
            </motion.h3>
            <motion.div
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
              <p className="text-purple-300 text-lg font-semibold tracking-wide">
                {experience.companyName}
              </p>
            </motion.div>

            {/* Date badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <svg
                className="w-4 h-4 mr-2 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-cyan-300">
                {experience.date}
              </span>
            </motion.div>
          </div>

          {/* Experience points */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <ul className="space-y-3">
              {experience.points.map((point, index) => (
                <motion.li
                  key={`experience-point-${index}`}
                  className="flex items-start gap-3 text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.25 + index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-2 shadow-lg"></div>
                  <span className="text-[15px] tracking-wide leading-6 hover:text-white transition-colors duration-300">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Subtle bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>
      </VerticalTimelineElement>
    );
  }
);

ExperienceCard.displayName = "ExperienceCard";

const Experience = () => {
  // Memoize star positions to prevent recalculation
  const stars = useMemo(
    () =>
      [...Array(50)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2,
      })),
    []
  );

  return (
    <div
      className="relative min-h-screen min-w-full pa-10 pb-20
 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-900/30 via-slate-950 to-purple-950/40 will-change-transform"
    >
      {/* Professional Cosmic Background */}
      <div className="absolute inset-0 -z-10 will-change-auto">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[url('/assets/grid.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950" />
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <Header useMotion={true} {...config.sections.experience} />

        <motion.div
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <VerticalTimeline>
            {CAREER_DATA.map((experience, index) => (
              <Suspense
                key={experience.id}
                fallback={
                  <div className="w-full h-64 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl animate-pulse border border-slate-700/30" />
                }
              >
                <LazyExperienceCard {...experience} index={index} />
              </Suspense>
            ))}
          </VerticalTimeline>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="mt-16 flex justify-center items-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Resume Button */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-52 text-lg font-semibold text-white bg-slate-800/70 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-slate-800 hover:border-cyan-400/50 hover:shadow-cyan-500/20 hover:shadow-2xl will-change-transform"
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg
              className="w-6 h-6 text-cyan-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            <span>Resume</span>
          </motion.a>

          {/* Contact Button */}
          <motion.a
            href="mailto:parakrama.22@cse.mrt.ac.lk"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-52 text-lg font-semibold text-white bg-slate-800/70 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-slate-800 hover:border-purple-400/50 hover:shadow-purple-500/20 hover:shadow-2xl will-change-transform"
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg
              className="w-6 h-6 text-purple-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <span>EMail </span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
