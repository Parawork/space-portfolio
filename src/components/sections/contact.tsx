"use client";

import React, { useState, useRef } from "react";
import { sendEmail, type ContactFormData } from "@/lib/email";
import {
  InteractiveTerminal,
  type TerminalRef,
} from "@/components/ui/InteractiveTerminal";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isTerminalInteractive, setIsTerminalInteractive] = useState(false);
  
  const terminalRef = useRef<TerminalRef | null>(null);

  // Handle custom commands in interactive mode
  const handleTerminalCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'contact':
        terminalRef.current?.writeln("📧 Contact Information:");
        terminalRef.current?.writeln("Email: parakrama.22@cse.mrt.ac.lk");
        terminalRef.current?.writeln("Phone: +94 77 352 8200");
        terminalRef.current?.writeln("Location: Colombo, Sri Lanka");
        break;
      case 'skills':
        terminalRef.current?.writeln("💻 Technical Skills:");
        terminalRef.current?.writeln("Frontend: React, Next.js, TypeScript");
        terminalRef.current?.writeln("Backend: Node.js, Express, Python");
        terminalRef.current?.writeln("Database: MongoDB, PostgreSQL, Firebase");
        terminalRef.current?.writeln("DevOps: Docker, Git, CI/CD");
        break;
      case 'projects':
        terminalRef.current?.writeln("🚀 Recent Projects:");
        terminalRef.current?.writeln("1. Enhanced portfolio with security features");
        terminalRef.current?.writeln("2. Interactive terminal component");
        terminalRef.current?.writeln("3. Responsive design improvements");
        break;
      case 'status':
        terminalRef.current?.writeln("📊 Current Status:");
        terminalRef.current?.writeln("✓ Available for opportunities");
        terminalRef.current?.writeln("✓ Contact form active");
        terminalRef.current?.writeln("✓ Response time: < 24h");
        break;
      case 'switch':
        setIsTerminalInteractive(false);
        terminalRef.current?.writeln("Switching to display mode...");
        setTimeout(() => {
          window.location.reload(); // Simple way to reset terminal
        }, 1000);
        break;
      default:
        // Let the built-in handler take care of it
        return false;
    }
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Basic client-side validation
    if (formData.name.length < 2) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      if (terminalRef.current) {
        terminalRef.current.write(
          "\r\n\x1b[31m[ERROR] Name must be at least 2 characters long\x1b[37m"
        );
        terminalRef.current.write("\r\n\x1b[32m$ \x1b[37m");
      }
      return;
    }

    if (formData.message.length < 10) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      if (terminalRef.current) {
        terminalRef.current.write(
          "\r\n\x1b[31m[ERROR] Message must be at least 10 characters long\x1b[37m"
        );
        terminalRef.current.write("\r\n\x1b[32m$ \x1b[37m");
      }
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      if (terminalRef.current) {
        terminalRef.current.write(
          "\r\n\x1b[31m[ERROR] Please provide a valid email address\x1b[37m"
        );
        terminalRef.current.write("\r\n\x1b[32m$ \x1b[37m");
      }
      return;
    }

    try {
      // Send email using the email utility
      const result = await sendEmail(formData as ContactFormData);

      // Add terminal feedback
      if (terminalRef.current) {
        terminalRef.current.write(
          "\r\n\x1b[36m[INFO] Processing contact form submission...\x1b[37m"
        );
        terminalRef.current.write(
          `\r\n\x1b[33mFrom: ${formData.name} <${formData.email}>\x1b[37m`
        );
        terminalRef.current.write(
          `\r\n\x1b[33mSubject: ${formData.subject}\x1b[37m`
        );
        terminalRef.current.write(
          "\r\n\x1b[36m[INFO] Running security checks...\x1b[37m"
        );
        terminalRef.current.write(
          "\r\n\x1b[32m✓ Email format validated\x1b[37m"
        );
        terminalRef.current.write("\r\n\x1b[32m✓ Input sanitized\x1b[37m");
        terminalRef.current.write(
          "\r\n\x1b[32m✓ Rate limit check passed\x1b[37m"
        );

        if (result.mode === "demo") {
          terminalRef.current.write(
            "\r\n\x1b[33m⚠ Running in DEMO mode (email config needed)\x1b[37m"
          );
          terminalRef.current.write(
            "\r\n\x1b[32m✓ Message logged to console\x1b[37m"
          );
        } else {
          terminalRef.current.write(
            "\r\n\x1b[32m✓ Message sent successfully!\x1b[37m"
          );
          terminalRef.current.write(
            "\r\n\x1b[36mℹ No auto-reply sent (security feature)\x1b[37m"
          );
          terminalRef.current.write(
            "\r\n\x1b[36mℹ You will receive a personal response\x1b[37m"
          );
        }
        terminalRef.current.write("\r\n\x1b[32m$ \x1b[37m");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
      if (terminalRef.current) {
        terminalRef.current.write(
          "\r\n\x1b[31m[ERROR] Failed to send message\x1b[37m"
        );
        terminalRef.current.write(
          `\r\n\x1b[31mError: ${
            error instanceof Error ? error.message : "Unknown error"
          }\x1b[37m`
        );
        if (
          error instanceof Error &&
          error.message.includes("Too many requests")
        ) {
          terminalRef.current.write(
            "\r\n\x1b[33m⚠ Rate limit exceeded. Please wait before sending another message.\x1b[37m"
          );
        }
        terminalRef.current.write("\r\n\x1b[32m$ \x1b[37m");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              GET IN TOUCH
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's connect and discuss how we
            can collaborate.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Form */}
          <div className="relative">
            {/* Form Container */}
            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-blue-500/30 backdrop-blur-sm p-8">
              {/* Holographic Header */}
              <div className="flex items-center mb-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
                <h3 className="text-2xl font-bold text-white">Send Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      minLength={2}
                      maxLength={100}
                      pattern="[a-zA-Z\s]+"
                      title="Name should only contain letters and spaces"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    minLength={3}
                    maxLength={200}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Project discussion, collaboration, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    minLength={10}
                    maxLength={1000}
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project, ideas, or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-300 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="font-semibold">
                        Message sent successfully!
                      </span>
                    </div>
                    <p className="text-sm text-green-200">
                      I'll get back to you personally within 24 hours. No
                      auto-reply is sent for security reasons.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span className="font-semibold">
                        Failed to send message
                      </span>
                    </div>
                    <p className="text-sm text-red-200">
                      Please check your input and try again, or contact me
                      directly at parakrama.22@cse.mrt.ac.lk
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className="relative">
            {/* Terminal Mode Toggle */}
            <div className="absolute -top-2 right-2 z-10">
              <button
                onClick={() => setIsTerminalInteractive(!isTerminalInteractive)}
                className="px-3 py-1 text-xs bg-gray-800 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                title={isTerminalInteractive ? "Switch to Display Mode" : "Switch to Interactive Mode"}
              >
                {isTerminalInteractive ? "📺 Display" : "⌨️ Interactive"}
              </button>
            </div>

            <InteractiveTerminal
              ref={terminalRef}
              height="h-96"
              interactive={isTerminalInteractive}
              onReady={(terminal) => {
                terminalRef.current = terminal;
              }}
              onCommand={(command) => {
                const handled = handleTerminalCommand(command);
                if (!handled) {
                  // Let the terminal handle built-in commands
                  return false;
                }
              }}
            />

            {/* Side Info Cards */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Quick Response
                </h4>
                <p className="text-gray-400 text-sm">
                  I typically respond within 24 hours. For urgent matters, feel
                  free to call.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg border border-green-500/30 backdrop-blur-sm">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  {isTerminalInteractive ? "Interactive Terminal" : "Terminal Demo"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {isTerminalInteractive 
                    ? "Try commands: help, contact, skills, projects, status, switch"
                    : "Click the Interactive button to try typing commands in the terminal!"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
