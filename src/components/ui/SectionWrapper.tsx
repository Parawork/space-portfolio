"use client";

import React from "react";
import { motion } from "framer-motion";

export const SectionWrapper = (Component: React.ComponentType, idName: string) => {
  const WrappedComponent = () => {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        id={idName}
        className="relative flex flex-col items-center justify-center py-20 overflow-hidden"
      >
        <Component />
      </motion.section>
    );
  };

  return WrappedComponent;
};
