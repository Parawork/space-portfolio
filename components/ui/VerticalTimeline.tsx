"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface VerticalTimelineProps {
  children: React.ReactNode;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end 0.5"]
  });

  // Animate the line height based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const indicatorPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-6">
      {/* Main Timeline Line (Static) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-600/40 to-transparent transform md:-translate-x-0.5"></div>
      
      {/* Animated Timeline Line */}
      <motion.div
        className="absolute left-8 md:left-1/2 top-0 w-px origin-top transform md:-translate-x-0.5"
        style={{ 
          height: lineHeight,
          background: "linear-gradient(to bottom, #9333ea, #06b6d4, #9333ea)",
          boxShadow: "0 0 10px rgba(147, 51, 234, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)",
        }}
      />

      {/* Floating Progress Indicator */}
      <motion.div
        className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-lg z-20 transform md:-translate-x-1/2"
        style={{
          top: indicatorPosition,
          boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, -8, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.1, 0.5, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-indigo-400 rounded-full"
      />
      
      {/* Timeline Content */}
      <div className="relative space-y-16">
        {children}
      </div>
    </div>
  );
};

interface VerticalTimelineElementProps {
  contentStyle?: React.CSSProperties;
  contentArrowStyle?: React.CSSProperties;
  date: string;
  iconStyle?: React.CSSProperties;
  icon: React.ReactNode;
  children: React.ReactNode;
  index?: number;
}

export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps> = ({
  contentStyle,
  contentArrowStyle,
  date,
  iconStyle,
  icon,
  children,
  index = 0,
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative flex flex-col md:flex-row items-start ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline Icon */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 360 }}
        whileHover={{ scale: 1.1, rotate: 390 }}
        transition={{
          duration: 0.6,
          delay: index * 0.2 + 0.4,
          type: "spring",
          stiffness: 200,
        }}
        viewport={{ once: true }}
        className="absolute left-5 md:left-1/2 w-20 h-20 rounded-full border-4 border-slate-900 z-10 transform md:-translate-x-1/2 shadow-2xl flex items-center justify-center group cursor-pointer"
        style={{
          background: iconStyle?.background || "linear-gradient(135deg, #1e293b, #334155)",
          top: "2rem",
          boxShadow: "0 0 30px rgba(147, 51, 234, 0.6), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        {icon}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-ping opacity-20"></div>
      </motion.div>

      {/* Enhanced Date Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ delay: index * 0.2 + 0.6 }}
        className={`hidden md:block absolute top-0 ${
          isEven ? "right-8" : "left-8"
        } bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-md border border-purple-500/40 rounded-2xl px-6 py-3 shadow-xl z-20`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
          <span className="text-white font-semibold text-sm tracking-wide">{date}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl"></div>
      </motion.div>

      {/* Content Card */}
      <div
        className={`w-full md:w-5/12 ml-24 md:ml-0 ${
          isEven ? "md:pr-16" : "md:pl-16"
        }`}
      >
        <motion.div
          initial={{ rotateY: isEven ? -15 : 15, opacity: 0 }}
          whileInView={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            y: -10,
            rotateY: isEven ? 2 : -2,
            boxShadow: "0 30px 60px rgba(147, 51, 234, 0.2)",
          }}
          className="relative rounded-3xl p-8 border border-[#7042f88b] shadow-2xl backdrop-blur-sm group cursor-pointer"
          style={{
            ...contentStyle,
            background: contentStyle?.background || "linear-gradient(135deg, #1a1a2e, #16213e)",
          }}
        >
          {/* Arrow */}
          <div
            className={`absolute top-8 ${
              isEven ? "md:right-0 md:translate-x-full" : "md:left-0 md:-translate-x-full"
            } hidden md:block`}
          >
            <div
              className="w-0 h-0"
              style={{
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                ...(isEven
                  ? { borderLeft: `10px solid #232631` }
                  : { borderRight: `10px solid #232631` }),
              }}
            ></div>
          </div>

          {/* Mobile Date */}
          <div className="md:hidden mb-4">
            <span className="text-cyan-300 font-medium text-sm bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2">
              {date}
            </span>
          </div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"></div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.8 }}
          >
            {children}
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-3xl pointer-events-none"></div>

          {/* Floating Particles */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
            className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-30"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.7,
            }}
            className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40"
          />
        </motion.div>
      </div>

      {/* Empty Space for Balanced Layout */}
      <div className="hidden md:block w-5/12 relative" />
    </motion.div>
  );
};
