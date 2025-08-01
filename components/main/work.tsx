"use client";

import React from "react";
import { motion } from "framer-motion";
import { CAREER_DATA } from "@/constants";
import { SectionWrapper } from "../hoc";
import { Header } from "../atoms";
import { TExperience } from "@/types";
import { config } from "@/config";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "../ui/VerticalTimeline";

const ExperienceCard: React.FC<TExperience & { index: number }> = (
  experience
) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
        color: "#fff",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(16px)",
        position: "relative",
        overflow: "hidden",
      }}
      contentArrowStyle={{ 
        borderRight: "10px solid rgba(30, 41, 59, 0.9)",
        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
      }}
      date={experience.date}
      iconStyle={{ 
        background: `linear-gradient(135deg, ${experience.iconBg} 0%, rgba(30, 41, 59, 0.8) 100%)`,
        border: "3px solid rgba(147, 51, 234, 0.3)",
        boxShadow: "0 0 30px rgba(147, 51, 234, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)"
      }}
      icon={
        <div className="flex h-full w-full items-center justify-center relative">
          <motion.img
            src={experience.icon}
            alt={experience.companyName}
            className="h-[70%] w-[70%] object-contain relative z-10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {experience.title}
          </motion.h3>
          <motion.div 
            className="flex items-center gap-2 mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
            <p className="text-purple-300 text-lg font-semibold tracking-wide">
              {experience.companyName}
            </p>
          </motion.div>
          
          {/* Date badge */}
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-cyan-300">{experience.date}</span>
          </motion.div>
        </div>

        {/* Experience points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ul className="space-y-3">
            {experience.points.map((point, index) => (
              <motion.li
                key={`experience-point-${index}`}
                className="flex items-start gap-3 text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
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
};

const Experience = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950"></div>
        
        {/* Animated cosmic elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            opacity: [0.05, 0.3, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [-40, 40, -40],
            opacity: [0.02, 0.25, 0.02],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-3/4 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-indigo-500/15 via-violet-600/10 to-transparent rounded-full blur-3xl"
        />
        
        {/* Starfield effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <Header useMotion={true} {...config.sections.experience} />

        <motion.div 
          className="mt-20 flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <VerticalTimeline>
            {CAREER_DATA.map((experience, index) => (
              <ExperienceCard key={experience.id} {...experience} index={index} />
            ))}
          </VerticalTimeline>
        </motion.div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
