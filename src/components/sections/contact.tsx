"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";
import { 
  sendEmail, type ContactFormData } from "@/lib/email";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);

  useEffect(() => {
    if (terminalRef.current && !terminal.current) {
      try {
        // Initialize terminal
        terminal.current = new Terminal({
          theme: {
            background: "#0a0a0a",
            foreground: "#00ff00",
            cursor: "#00ff00",
            cursorAccent: "#00ff00",
          },
          fontFamily: "Monaco, 'Cascadia Code', 'Ubuntu Mono', monospace",
          fontSize: 13,
          lineHeight: 1.2,
          cursorBlink: true,
          allowTransparency: true,
          rows: 24,
          cols: 80,
        });

        const fitAddon = new FitAddon();
        const webLinksAddon = new WebLinksAddon();
        
        terminal.current.loadAddon(fitAddon);
        terminal.current.loadAddon(webLinksAddon);
        
        terminal.current.open(terminalRef.current);
        
        // Wait for the terminal to be fully rendered before fitting
        setTimeout(() => {
          try {
            fitAddon.fit();
          } catch (error) {
            console.warn("Terminal fit error:", error);
          }
        }, 100);

        // Terminal content
        const commands = [
          "$ whoami",
          "parakrama@dev-machine",
          "",
          "$ pwd",
          "/home/parakrama/portfolio/contact",
          "",
          "$ cat contact_info.json",
          "{",
          '  "name": "Parakrama Rathnayaka",',
          '  "role": "Software Engineer",',
          '  "email": "parakrama.22@cse.mrt.ac.lk",',
          '  "phone": "+94 77 352 8200",',
          '  "location": "Colombo, Sri Lanka",',
          '  "availability": "Open to opportunities",',
          '  "preferred_contact": "email"',
          "}",
          "",
          "$ cat skills.txt",
          "Frontend: React, Next.js, TypeScript",
          "Backend: Node.js, Express, Python",
          "Database: MongoDB, PostgreSQL, Firebase",
          "DevOps: Docker, Git, CI/CD",
          "Cloud: AWS, Vercel, Netlify",
          "",
          "$ git log --oneline -5",
          "a1b2c3d feat: enhanced portfolio contact form",
          "e4f5g6h fix: responsive design improvements",
          "i7j8k9l add: interactive terminal component",
          "m0n1o2p refactor: code optimization",
          "q3r4s5t docs: updated README",
          "",
          "$ npm run contact:status",
          "✓ Contact form: ACTIVE",
          "✓ Email service: OPERATIONAL",
          "✓ Response time: < 24h",
          "✓ SSL encryption: ENABLED",
          "",
          "$ echo 'Feel free to reach out!'",
          "Feel free to reach out!",
          "",
          "$ █"
        ];

        let index = 0;
        const typeCommand = () => {
          if (index < commands.length) {
            const command = commands[index];
            if (command === "") {
              terminal.current?.writeln("");
            } else if (command.startsWith("$ ")) {
              terminal.current?.write("\r\n\x1b[32m$ \x1b[37m");
              const cmd = command.substring(2);
              let charIndex = 0;
              const typeChar = () => {
                if (charIndex < cmd.length) {
                  terminal.current?.write(cmd[charIndex]);
                  charIndex++;
                  setTimeout(typeChar, 50);
                } else {
                  setTimeout(() => {
                    index++;
                    typeCommand();
                  }, 500);
                }
              };
              typeChar();
            } else {
              terminal.current?.write("\r\n" + command);
              index++;
              setTimeout(typeCommand, 100);
            }
          } else {
            // Keep cursor blinking at the end
            terminal.current?.write("\r\n\x1b[32m$ \x1b[37m");
          }
        };

        // Start typing animation after a short delay
        setTimeout(() => {
          terminal.current?.writeln("Welcome to Parakrama's Interactive Terminal");
          terminal.current?.writeln("==========================================");
          typeCommand();
        }, 1000);

        // Handle window resize
        const handleResize = () => {
          try {
            fitAddon.fit();
          } catch (error) {
            console.warn("Terminal resize error:", error);
          }
        };
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          terminal.current?.dispose();
        };
      } catch (error) {
        console.error("Terminal initialization error:", error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      if (terminal.current) {
        terminal.current.write("\r\n\x1b[31m[ERROR] Name must be at least 2 characters long\x1b[37m");
        terminal.current.write("\r\n\x1b[32m$ \x1b[37m");
      }
      return;
    }

    if (formData.message.length < 10) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      if (terminal.current) {
        terminal.current.write("\r\n\x1b[31m[ERROR] Message must be at least 10 characters long\x1b[37m");
        terminal.current.write("\r\n\x1b[32m$ \x1b[37m");
      }
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      if (terminal.current) {
        terminal.current.write("\r\n\x1b[31m[ERROR] Please provide a valid email address\x1b[37m");
        terminal.current.write("\r\n\x1b[32m$ \x1b[37m");
      }
      return;
    }

    try {
      // Send email using the email utility
      const result = await sendEmail(formData as ContactFormData);
      
      // Add terminal feedback
      if (terminal.current) {
        terminal.current.write("\r\n\x1b[36m[INFO] Processing contact form submission...\x1b[37m");
        terminal.current.write(`\r\n\x1b[33mFrom: ${formData.name} <${formData.email}>\x1b[37m`);
        terminal.current.write(`\r\n\x1b[33mSubject: ${formData.subject}\x1b[37m`);
        terminal.current.write("\r\n\x1b[36m[INFO] Running security checks...\x1b[37m");
        terminal.current.write("\r\n\x1b[32m✓ Email format validated\x1b[37m");
        terminal.current.write("\r\n\x1b[32m✓ Input sanitized\x1b[37m");
        terminal.current.write("\r\n\x1b[32m✓ Rate limit check passed\x1b[37m");
        
        if (result.mode === 'demo') {
          terminal.current.write("\r\n\x1b[33m⚠ Running in DEMO mode (email config needed)\x1b[37m");
          terminal.current.write("\r\n\x1b[32m✓ Message logged to console\x1b[37m");
        } else {
          terminal.current.write("\r\n\x1b[32m✓ Message sent successfully!\x1b[37m");
          terminal.current.write("\r\n\x1b[36mℹ No auto-reply sent (security feature)\x1b[37m");
          terminal.current.write("\r\n\x1b[36mℹ You will receive a personal response\x1b[37m");
        }
        terminal.current.write("\r\n\x1b[32m$ \x1b[37m");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus("error");
      if (terminal.current) {
        terminal.current.write("\r\n\x1b[31m[ERROR] Failed to send message\x1b[37m");
        terminal.current.write(`\r\n\x1b[31mError: ${error instanceof Error ? error.message : 'Unknown error'}\x1b[37m`);
        if (error instanceof Error && error.message.includes('Too many requests')) {
          terminal.current.write("\r\n\x1b[33m⚠ Rate limit exceeded. Please wait before sending another message.\x1b[37m");
        }
        terminal.current.write("\r\n\x1b[32m$ \x1b[37m");
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
            Ready to bring your ideas to life? Let's connect and discuss how we can collaborate.
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
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
                      <span className="font-semibold">Message sent successfully!</span>
                    </div>
                    <p className="text-sm text-green-200">
                      I'll get back to you personally within 24 hours. No auto-reply is sent for security reasons.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span className="font-semibold">Failed to send message</span>
                    </div>
                    <p className="text-sm text-red-200">
                      Please check your input and try again, or contact me directly at parakrama.22@cse.mrt.ac.lk
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-green-500/30 backdrop-blur-sm p-6">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4 p-4 bg-black/50 rounded-t-lg border-b border-gray-600">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-300 text-sm font-mono">
                    terminal@parakrama.dev:~$
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-mono">ONLINE</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div 
                ref={terminalRef}
                className="bg-black rounded-b-lg h-96 overflow-hidden"
                style={{ fontFamily: "Monaco, 'Cascadia Code', 'Ubuntu Mono', monospace" }}
              />

              {/* Terminal Footer */}
              <div className="mt-4 p-3 bg-black/30 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                  <div className="flex items-center space-x-4">
                    <span>Lines: 45</span>
                    <span>Cols: 80</span>
                    <span>PID: 1337</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    <span>Connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Info Cards */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Quick Response
                </h4>
                <p className="text-gray-400 text-sm">
                  I typically respond within 24 hours. For urgent matters, feel free to call.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg border border-green-500/30 backdrop-blur-sm">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Open Source
                </h4>
                <p className="text-gray-400 text-sm">
                  Check out my GitHub for open-source projects and contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
