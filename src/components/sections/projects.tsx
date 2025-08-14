// src/components/ui/ProjectsRowCarousel.tsx

"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "../../constants";

// Ensure PROJECTS is typed as an array of Project
const PROJECTS_TYPED: Project[] = Array.from(PROJECTS) as Project[];

// Type definitions
interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies?: readonly string[];
}

interface CarouselNavigation {
  scrollPrev: () => void;
  scrollNext: () => void;
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
}

// Custom hook for carousel navigation with proper TypeScript
const useCarouselNavigation = (
  emblaApi: EmblaCarouselType | undefined
): CarouselNavigation => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return { scrollPrev, scrollNext, prevBtnDisabled, nextBtnDisabled };
};

// Navigation button component for reusability
interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: "prev" | "next";
  className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  disabled,
  direction,
  className = "",
}) => {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  const ariaLabel = `${direction === "prev" ? "Previous" : "Next"} project`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative p-3 rounded-full transition-all duration-200
        bg-gray-700/50 hover:bg-gray-600/70 active:bg-gray-600
        text-gray-200 hover:text-white
        disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-700/50
        focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-[#181826]
        ${className}
      `}
      aria-label={ariaLabel}
    >
      <Icon size={20} className="transition-transform group-hover:scale-110" />
    </button>
  );
};

// Project card component for better separation of concerns
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const maxVisibleTechnologies = 4;
  const visibleTechnologies =
    project.technologies?.slice(0, maxVisibleTechnologies) || [];
  const hasMoreTechnologies =
    (project.technologies?.length || 0) > maxVisibleTechnologies;

  return (
    <div className="flex-shrink-0 rounded-md w-full md:w-1/2 lg:w-1/3 min-w-0 px-3">
      <article
        className="group bg-gradient-to-br from-[#1c1c2e] via-[#23234a] to-[#181826] rounded-xl overflow-hidden flex flex-col h-full shadow-lg border border-gray-700/50 hover:border-cyan-500/60 hover:shadow-cyan-500/30 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-500/50"
        tabIndex={0}
        aria-label={project.title}
      >
        {/* Project Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title} project`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Project Content */}
        <div className="p-6 flex flex-col flex-grow">
          <header className="mb-4">
            <h3 className="text-xl font-bold text-gray-100 mb-2 line-clamp-2 group-hover:text-cyan-300 group-focus:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </header>

          {/* Technologies */}
          {visibleTechnologies.length > 0 && (
            <div className="mb-4">
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="Technologies used"
              >
                {visibleTechnologies.map((tech) => (
                  <span
                    key={tech}
                    role="listitem"
                    className="bg-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30 hover:bg-purple-500/30 focus:bg-purple-500/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {hasMoreTechnologies && (
                  <span
                    role="listitem"
                    className="bg-gray-500/20 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-500/30"
                  >
                    +
                    {(project.technologies?.length || 0) -
                      maxVisibleTechnologies}{" "}
                    more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Project Link */}
          <footer className="mt-auto">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 focus:text-cyan-300 font-semibold text-sm transition-all duration-200 group/link focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-[#1c1c2e] rounded-sm"
              aria-label={`View ${project.title} project (opens in new tab)`}
            >
              <span>View Project</span>
              <ExternalLink
                size={14}
                className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus/link:translate-x-1 group-focus/link:-translate-y-1"
              />
            </a>
          </footer>
        </div>
      </article>
    </div>
  );
};

// Main Projects component
const Projects: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    skipSnaps: false,
  });

  const { scrollPrev, scrollNext, prevBtnDisabled, nextBtnDisabled } =
    useCarouselNavigation(emblaApi);

  if (!Array.isArray(PROJECTS_TYPED) || PROJECTS_TYPED.length === 0) {
    return (
      <section className="w-full flex flex-col items-center justify-center py-20 bg-[#181826]/80">
        <div className="text-center">
          <p className="text-gray-400 text-lg">
            No projects available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects-row"
      className="w-full rounded-xl flex flex-col items-center justify-center py-20 bg-[#181826]/80"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
        {/* Section Header */}
        <header className="flex justify-between items-center mb-12">
          <h1></h1>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400">
              My Projects
            </span>
          </h2>

          {/* Navigation Controls */}
          <nav
            className="flex items-center gap-3"
            aria-label="Carousel navigation"
          >
            <NavigationButton
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              direction="prev"
            />
            <NavigationButton
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              direction="next"
            />
          </nav>
        </header>

        {/* Carousel Container */}
        <div
          className="overflow-hidden -mx-3"
          ref={emblaRef}
          role="region"
          aria-label="Projects carousel"
        >
          <div className="flex">
            {PROJECTS_TYPED.map((project: Project, index: number) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Accessibility helper text */}
        <div className="sr-only" aria-live="polite" id="carousel-status">
          Showing projects carousel. Use the previous and next buttons to
          navigate through projects.
        </div>
      </div>
    </section>
  );
};

export default Projects;