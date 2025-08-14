// src/components/ui/ProjectsRowCarousel.tsx

"use client"; // This is a client component because it uses hooks

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import your project data
import { PROJECTS } from "../../constants";

// Define a type for a single project based on your data structure
type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies?: readonly string[];
};

// Reusable hook for carousel navigation logic
const useCarouselNavigation = (
  emblaApi: ReturnType<typeof useEmblaCarousel>[1]
) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return { scrollPrev, scrollNext, prevBtnDisabled, nextBtnDisabled };
};

const Projects = () => {
  // Initialize Embla Carousel with options
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start", // Align slides to the start
    containScroll: "trimSnaps", // Stop scrolling when no more slides can fit
  });

  const { scrollPrev, scrollNext, prevBtnDisabled, nextBtnDisabled } =
    useCarouselNavigation(emblaApi);

  return (
    <section
      id="projects-row"
      className="w-full flex flex-col items-center justify-center py-20 bg-[#181826]/80"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              My Projects
            </span>
          </h2>
          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="p-3 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous Project"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="p-3 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next Project"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex">
            {PROJECTS.map((project: Project, index: number) => (
              <div
                // ** THIS IS THE KEY CHANGE **
                // It defines the width for different screen sizes.
                // lg:w-1/3 = 3 cards on large screens
                // md:w-1/2  = 2 cards on medium screens
                // w-full    = 1 card on small screens
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 min-w-0 px-2"
                key={`${project.title}-${index}`}
              >
                <div className="bg-[#1c1c2e] rounded-xl overflow-hidden flex flex-col h-full shadow-lg hover:ring-2 hover:ring-cyan-500/50 transition-all duration-300">
                  <div className="relative w-full h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-100 mb-2 truncate">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                      {project.description}
                    </p>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map(
                          (
                            tech // Show first 4 techs
                          ) => (
                            <span
                              key={tech}
                              className="bg-purple-500/20 text-purple-300 text-xs font-medium px-2 py-0.5 rounded-full"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
                    >
                      View Project &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;