import { useEffect, useState } from "react";
import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

const words: string[] = [
  "Secure",
  "Modern",
  "Scalable",
  "DevOps",
  "Innovative",
];
const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const HeroText = () => {
  // Prevent hydration mismatch for animated content
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <section
      aria-label="Hero section"
      className="relative flex items-start md:items-center justify-start md:justify-center z-20 animate-fade-in bg-transparent min-h-screen md:min-h-[80vh] h-full mt-[10vh] md:mt-0"
    >
      <div
        className="relative w-full max-w-[500px] text-center md:text-left rounded-2xl bg-clip-padding bg-gradient-to-br from-[#181c2f]/90 via-[#232946]/80 to-[#0f172a]/90 shadow-[0_8px_40px_0_rgba(0,0,0,0.45)] border border-[#232946]/40 p-6 md:p-10 overflow-visible"
        tabIndex={0}
      >
        {/* Animated gradient border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#6f00ff] via-[#00fff7] to-[#6f00ff] opacity-30 blur-[3px] animate-gradient-x z-10"
        />
        <div className="relative z-20">
          {/* Desktop layout */}
          <div className="flex-col hidden md:flex c-space">
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#6f00ff] via-[#00fff7] to-[#6f00ff] bg-clip-text text-transparent mb-2"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 80, delay: 1 }}
              tabIndex={0}
            >
              Hi, I&apos;m <span className="text-[#00fff7]">Parakrama</span>
            </motion.h1>
            <div className="flex flex-col items-start">
              <motion.p
                className="text-xl md:text-2xl font-semibold text-neutral-200 mb-1 drop-shadow-[0_0_4px_#00fff799]"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ type: "spring", stiffness: 80, delay: 1.2 }}
              >
                Software DevOps Enthusiast{" "}
                <span className="text-[#6f00ff]">|</span>{" "}
                <span className="text-[#00fff7]">Innovator</span>
              </motion.p>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ type: "spring", stiffness: 80, delay: 1.5 }}
              >
                <FlipWords
                  words={words}
                  className="font-black text-white text-3xl md:text-5xl neon-text"
                />
              </motion.div>
              <motion.p
                className="text-lg md:text-2xl font-medium text-[#00fff7] mt-1 drop-shadow-[0_0_4px_#00fff799]"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ type: "spring", stiffness: 80, delay: 1.8 }}
              >
                Web & DevOps Solutions
              </motion.p>
            </div>
          </div>
          {/* Mobile layout */}
          <div className="flex flex-col space-y-4 md:hidden">
            <motion.p
              className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#6f00ff] via-[#00fff7] to-[#6f00ff] bg-clip-text text-transparent drop-shadow-[0_0_8px_#6f00ff99]"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 80, delay: 1 }}
              tabIndex={0}
            >
              Hi, I&apos;m{" "}
              <span className="text-[#00fff7]">Parakrama Rathnayaka</span>
            </motion.p>
            <div>
              <motion.p
                className="text-lg font-black text-neutral-200 mb-1 drop-shadow-[0_0_4px_#00fff799]"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ type: "spring", stiffness: 80, delay: 1.2 }}
              >
                Building
              </motion.p>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ type: "spring", stiffness: 80, delay: 1.5 }}
              >
                <FlipWords
                  words={words}
                  className="font-bold text-white text-2xl md:text-4xl neon-text"
                />
              </motion.div>
              <motion.p
                className="text-lg font-black text-[#00fff7] mt-1 drop-shadow-[0_0_4px_#00fff799]"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ type: "spring", stiffness: 80, delay: 1.8 }}
              >
                Web & DevOps Applications
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroText;
