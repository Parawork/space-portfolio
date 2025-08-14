'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, SOCIALS } from "../../constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-[80px] fixed top-0 z-50 px-6 lg:px-12 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10"
          : "bg-gray-900/90 backdrop-blur-sm border-b border-gray-800/50"
      }`}
    >
      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo Section */}
        <Link href="#about-me" className="flex items-center group">
          <div className="flex items-center space-x-3">
            {/* Optional: Add logo image here */}
            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div> */}
            <div className="font-bold text-2xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-blue-300 group-hover:to-cyan-300 transition-all duration-300">
              Parakrama
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <div className="flex items-center bg-gray-800/60 border border-gray-700/60 rounded-full px-2 py-1 shadow-lg shadow-black/20">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.title}
                href={link.link}
                className="relative px-5 py-2.5 rounded-full text-gray-300 font-medium text-sm transition-all duration-200 hover:text-white hover:bg-gray-700/60 hover:shadow-sm group"
              >
                <span className="relative z-10">{link.title}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Social Icons & CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-400 hover:text-purple-400 transition-all duration-200 hover:scale-105 border border-gray-700/30 hover:border-purple-500/30"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-medium rounded-full hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1.5 focus:outline-none group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[80px] right-0 w-80 h-[calc(100vh-80px)] bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl shadow-black/50 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 px-6 py-8">
            <div className="space-y-2">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.title}
                  href={link.link}
                  className="block px-4 py-3 text-gray-300 font-medium hover:text-white hover:bg-gray-800/60 rounded-xl transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8">
              <Link
                href="#contact"
                className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-medium text-center rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="px-6 py-6 border-t border-gray-700/50">
            <div className="flex justify-center space-x-4">
              {SOCIALS.map(({ link, name, icon: Icon }) => (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={name}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-400 hover:text-purple-400 transition-all duration-200 hover:scale-105 border border-gray-700/30 hover:border-purple-500/30"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};