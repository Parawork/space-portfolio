"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

import { FOOTER_DATA } from "../../constants";

// Simple FlipWords fallback
const SimpleFlipWords = ({ words, duration = 2500 }: { words: string[], duration?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 200);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span 
      className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {words[currentIndex]}
    </span>
  );
};

export const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/95 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Glowing Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Holographic Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              <SimpleFlipWords 
                words={["SOFTWARE ENGINEER", "FULL-STACK DEVELOPER", "CODE ARCHITECT", "TECH INNOVATOR"]}
                duration={2500}
              />
            </h2>
          </div>
          <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto font-mono">
            {"// Building digital solutions with modern technologies"}
          </p>
        </div>
        ////
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Personal Branding Section */}
          <div className="col-span-1 lg:col-span-1 relative">
            {/* Holographic Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm"></div>
            <div className="relative p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3 shadow-lg shadow-green-400/50"></div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  PARAKRAMA@DEVOPS
                </h3>
              </div>
              
              {/* DevOps Terminal */}
              <div className="bg-black/50 rounded-lg p-4 mb-4 border border-green-400/30">
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1 mr-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-xs font-mono">
                    terminal@parakrama:~$
                  </span>
                </div>
                <p className="text-green-400 text-xs leading-relaxed font-mono">
                  {"$ npm run build"}
                  <br />
                  {"$ git push origin main"}
                  <br />
                  {"$ docker-compose up -d"}
                  <br />
                  <span className="text-cyan-400">
                    {"✓ Deployment successful"}
                  </span>
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm group">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300"></div>
                  <span className="text-gray-400 font-mono">EMAIL:</span>
                  <span className="text-cyan-300 ml-2 hover:text-cyan-100 transition-colors">
                    parakrama.22@cse.mrt.ac.lk
                  </span>
                </div>
                <div className="flex items-center text-sm group">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300"></div>
                  <span className="text-gray-400 font-mono">PHONE:</span>
                  <span className="text-purple-300 ml-2 hover:text-purple-100 transition-colors">
                    +94 77 352 8200
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {FOOTER_DATA.map((column, index) => (
            <div key={column.title} className="col-span-1 relative group">
              {/* Simple Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500/5 rounded-lg border border-blue-500/20 group-hover:border-green-400/40 transition-all duration-500 backdrop-blur-sm"></div>

              <div className="relative p-6">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3 animate-pulse"></div>
                  <h4 className="font-bold text-white text-lg tracking-wider uppercase">
                    {column.title}
                  </h4>
                </div>

                <ul className="space-y-4">
                  {column.data.map(({ icon: Icon, name, link }) => (
                    <li key={`${column.title}-${name}`} className="group/item">
                      <Link
                        href={link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="relative flex items-center text-gray-400 hover:text-white transition-all duration-300 group/link"
                      >
                        {/* Hover Effect Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-blue-500/0 group-hover/link:from-green-500/10 group-hover/link:to-blue-500/10 rounded transition-all duration-300 -z-10"></div>

                        {Icon ? (
                          <Icon className="w-4 h-4 mr-3 text-green-400 group-hover/link:text-cyan-300 group-hover/link:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300" />
                        ) : (
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover/link:bg-cyan-300 group-hover/link:shadow-lg group-hover/link:shadow-cyan-300/60 transition-all duration-300"></div>
                        )}

                        <span className="text-sm font-mono group-hover/link:translate-x-2 group-hover/link:text-white transition-all duration-300">
                          {name}
                        </span>

                        {/* Status Indicator */}
                        <div className="ml-auto flex items-center opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">
                          <svg
                            className="w-3 h-3 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        //
        {/* Simple Divider */}
        <div className="relative mb-8">
          <div className="border-t border-blue-500/30"></div>
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gray-900 px-4 text-blue-400 text-xs font-mono border border-blue-500/30 rounded">
              {"</>"}
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="relative">
          {/* Holographic Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-lg"></div>

          <div className="relative flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 p-6">
            {/* Copyright with Matrix Effect */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-2">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping animation-delay-75"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-ping animation-delay-150"></div>
                </div>
                <span className="text-green-400 text-xs font-mono">
                  PRODUCTION READY
                </span>
              </div>
              <p className="text-sm text-gray-400 font-mono">
                <span className="text-blue-400">{"/*"}</span>{" "}
                {new Date().getFullYear()}
                <span className="text-white ml-1">
                  PARAKRAMA_RATHNAYAKA.DEV
                </span>
                <br className="lg:hidden" />
                <span className="lg:ml-2 text-gray-500">
                  Licensed under MIT */
                </span>
              </p>
              <div className="mt-2 text-xs text-gray-500 font-mono">
                {"git commit: a1b2c3d • build: #42 • env: production"}
              </div>
            </div>

            {/* System Links */}
            <div className="flex items-center space-x-8">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-cyan-300 font-mono transition-colors duration-300 relative group"
              >
                README.md
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-cyan-300 font-mono transition-colors duration-300 relative group"
              >
                LICENSE
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/api"
                className="text-sm text-gray-400 hover:text-cyan-300 font-mono transition-colors duration-300 relative group"
              >
                DOCS/
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
        {/* Futuristic Decorative Elements */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse animation-delay-75"></div>
          </div>
        </div>
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-blue-500 to-transparent"></div>
        </div>
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-purple-500 to-transparent"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-purple-500 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-cyan-500 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-pink-500 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-pink-500 to-transparent"></div>
        </div>
      </div>
    </footer>
  );
};
