"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CAREER_DATA } from "@/constants";

export const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end 0.5"]
  });

  // More precise timeline calculations
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "85%"]);
  const indicatorPosition = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "85%"]);

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center py-20 overflow-hidden" 
      id="work"
    >
      {/* Cosmic Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [-20, 20, -20],
            opacity: [0.05, 0.3, 0.05]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-3/4 left-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Section Title */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 mb-4"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: "200% 100%" }}
        >
          Work Experience
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Journey through my professional milestones and career achievements
        </motion.p>
      </motion.div>
      
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="relative" style={{ minHeight: '60vh' }}>
          {/* Main Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-gray-600/40 to-transparent transform md:-translate-x-0.5"></div>
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-16 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 origin-top transform md:-translate-x-0.5"
            style={{ height: lineHeight }}
          />
          
          {/* Floating Progress Indicator */}
          <motion.div
            className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-lg z-20 transform md:-translate-x-1/2"
            style={{ 
              top: `calc(4rem + ${indicatorPosition})`,
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {CAREER_DATA.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative flex flex-col md:flex-row items-start mb-20 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Node */}
              <motion.div 
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.3 + 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                className="absolute left-5 md:left-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full border-4 border-[#030014] z-10 transform md:-translate-x-1/2 shadow-lg"
                style={{ 
                  top: '4rem',
                  boxShadow: `0 0 20px ${experience.color}40, inset 0 0 20px rgba(255,255,255,0.1)`
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-ping opacity-20"></div>
              </motion.div>
              
              {/* Experience Card */}
              <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12"
              }`}>
                <motion.div
                  initial={{ rotateY: index % 2 === 0 ? -15 : 15, opacity: 0 }}
                  whileInView={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 + 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    rotateY: index % 2 === 0 ? 2 : -2,
                    boxShadow: "0 30px 60px rgba(147, 51, 234, 0.2)"
                  }}
                  className="relative bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] rounded-3xl p-8 border border-[#7042f88b] shadow-2xl backdrop-blur-sm group cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${experience.color}10, transparent 50%, ${experience.color}05)`
                  }}
                >
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"></div>
                  
                  {/* Company Header */}
                  <div className="flex items-center mb-6">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-0.5 mr-6 shadow-xl"
                    >
                      <div className="w-full h-full rounded-full bg-[#030014] flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {experience.company.charAt(0)}
                        </span>
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3 + 0.8 }}
                        className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300"
                      >
                        {experience.position}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3 + 0.9 }}
                        className="text-lg text-purple-300 group-hover:text-cyan-300 transition-colors duration-300 mt-1"
                      >
                        {experience.company}
                      </motion.p>
                    </div>
                  </div>
                  
                  {/* Experience Details */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 1.0 }}
                    className="flex flex-wrap gap-4 mb-6"
                  >
                    <motion.span 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-cyan-300 border border-purple-500/30 backdrop-blur-sm text-sm font-medium shadow-lg"
                    >
                      📅 {experience.duration}
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-purple-300 border border-cyan-500/30 backdrop-blur-sm text-sm font-medium shadow-lg"
                    >
                      📍 {experience.location}
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full text-green-300 border border-green-500/30 capitalize backdrop-blur-sm text-sm font-medium shadow-lg"
                    >
                      💼 {experience.type}
                    </motion.span>
                  </motion.div>
                  
                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.3 + 1.1 }}
                    className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-base"
                  >
                    {experience.description}
                  </motion.p>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-3xl pointer-events-none"></div>
                  
                  {/* Floating Particles */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-30"
                  />
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.7
                    }}
                    className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40"
                  />
                </motion.div>
              </div>
              
              {/* Empty Space with Animated Background */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ delay: index * 0.3 + 0.5 }}
                className="hidden md:block w-5/12 relative"
              >
                <motion.div 
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.05, 0.15, 0.05]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 2
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-2xl blur-xl"
                />
              </motion.div>
            </motion.div>
          ))}
          
          {/* Timeline End Cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-xl animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
