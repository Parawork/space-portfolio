"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  useMotion?: boolean;
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ useMotion = true, title, subtitle }) => {
  const content = (
    <div className="text-center mb-20 relative">
      {/* Decorative line above title */}
      <motion.div 
        className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-6 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent font-extrabold tracking-tight">
          {title}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent opacity-20 blur-sm"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 100%" }}
        >
          {title}
        </motion.div>
      </motion.h1>
      
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            {subtitle}
          </p>
          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-16 h-px bg-gradient-to-r from-purple-500/50 to-cyan-500/50"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </motion.div>
      )}
    </div>
  );

  if (useMotion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
