"use client";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface FloatingContactButtonProps {
  onContactClick: () => void;
}

const FloatingContactButton = ({
  onContactClick,
}: FloatingContactButtonProps) => {
  return (
    <motion.button
      onClick={onContactClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 2,
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Phone size={24} />
    </motion.button>
  );
};

export default FloatingContactButton;
