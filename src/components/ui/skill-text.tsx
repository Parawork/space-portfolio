"use client";

import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../../lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <motion.h2
        variants={slideInFromLeft(0.5)}
        className="text-2xl md:text-3xl font-semibold text-white mt-2 mb-4"
      >
        Building Applications with Modern Technologies
      </motion.h2>

      <motion.p
        variants={slideInFromRight(0.5)}
        className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed"
      >
        Streamline your workflow — never miss a task, deadline, or idea.
      </motion.p>
    </div>
  );
};
