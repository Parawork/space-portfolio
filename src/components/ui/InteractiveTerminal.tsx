"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";

export interface TerminalRef {
  write: (data: string) => void;
  writeln: (data: string) => void;
  clear: () => void;
  focus: () => void;
}

interface InteractiveTerminalProps {
  className?: string;
  height?: string;
  commands?: string[];
  onReady?: (terminal: TerminalRef) => void;
  interactive?: boolean;
  onCommand?: (command: string) => void;
}

export const InteractiveTerminal = forwardRef<TerminalRef, InteractiveTerminalProps>(
  ({ className = "", height = "h-96", commands, onReady, interactive = false, onCommand }, ref) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const terminal = useRef<Terminal | null>(null);
    const fitAddon = useRef<FitAddon | null>(null);
    const currentInput = useRef<string>("");

    // Default commands for the portfolio terminal
    const defaultCommands = [
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

    const commandsToUse = commands || defaultCommands;

    // Built-in command handler
    const handleBuiltInCommand = (command: string) => {
      const cmd = command.toLowerCase().trim();
      
      switch (cmd) {
        case 'help':
          terminal.current?.writeln("Available commands:");
          terminal.current?.writeln("  help     - Show this help message");
          terminal.current?.writeln("  clear    - Clear the terminal");
          terminal.current?.writeln("  whoami   - Display user information");
          terminal.current?.writeln("  date     - Show current date");
          terminal.current?.writeln("  echo     - Echo text (usage: echo <text>)");
          break;
        case 'clear':
          terminal.current?.clear();
          terminal.current?.writeln("Welcome to Parakrama's Interactive Terminal");
          terminal.current?.writeln("==========================================");
          break;
        case 'whoami':
          terminal.current?.writeln("parakrama@dev-machine");
          break;
        case 'date':
          terminal.current?.writeln(new Date().toString());
          break;
        default:
          if (cmd.startsWith('echo ')) {
            const text = command.substring(5);
            terminal.current?.writeln(text);
          } else {
            terminal.current?.writeln(`Command not found: ${command}`);
            terminal.current?.writeln("Type 'help' for available commands");
          }
          break;
      }
    };

    // Expose terminal methods through ref
    useImperativeHandle(ref, () => ({
      write: (data: string) => {
        terminal.current?.write(data);
      },
      writeln: (data: string) => {
        terminal.current?.writeln(data);
      },
      clear: () => {
        terminal.current?.clear();
      },
      focus: () => {
        terminal.current?.focus();
      }
    }));

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

          fitAddon.current = new FitAddon();
          const webLinksAddon = new WebLinksAddon();
          
          terminal.current.loadAddon(fitAddon.current);
          terminal.current.loadAddon(webLinksAddon);
          
          terminal.current.open(terminalRef.current);
          
          // Add interactive input handling if enabled
          if (interactive) {
            terminal.current.onData((data) => {
              const code = data.charCodeAt(0);
              
              if (code === 13) { // Enter key
                const command = currentInput.current.trim();
                if (command) {
                  terminal.current?.writeln("");
                  if (onCommand) {
                    onCommand(command);
                  } else {
                    // Use built-in command handler if no custom handler provided
                    handleBuiltInCommand(command);
                  }
                  currentInput.current = "";
                  terminal.current?.write("\x1b[32m$ \x1b[37m");
                } else {
                  terminal.current?.writeln("");
                  terminal.current?.write("\x1b[32m$ \x1b[37m");
                }
              } else if (code === 127) { // Backspace
                if (currentInput.current.length > 0) {
                  currentInput.current = currentInput.current.slice(0, -1);
                  terminal.current?.write("\b \b");
                }
              } else if (code >= 32) { // Printable characters
                currentInput.current += data;
                terminal.current?.write(data);
              }
            });
          }
          
          // Wait for the terminal to be fully rendered before fitting
          setTimeout(() => {
            try {
              fitAddon.current?.fit();
            } catch (error) {
              console.warn("Terminal fit error:", error);
            }
          }, 100);

          // Type animation function
          let index = 0;
          const typeCommand = () => {
            if (index < commandsToUse.length) {
              const command = commandsToUse[index];
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
            
            if (interactive) {
              // For interactive mode, show a prompt immediately
              terminal.current?.writeln("");
              terminal.current?.writeln("Type 'help' for available commands");
              terminal.current?.write("\x1b[32m$ \x1b[37m");
            } else {
              // For display mode, run the animation
              typeCommand();
            }
          }, 1000);

          // Handle window resize
          const handleResize = () => {
            try {
              fitAddon.current?.fit();
            } catch (error) {
              console.warn("Terminal resize error:", error);
            }
          };
          window.addEventListener("resize", handleResize);

          // Notify parent component that terminal is ready
          if (onReady) {
            onReady({
              write: (data: string) => terminal.current?.write(data),
              writeln: (data: string) => terminal.current?.writeln(data),
              clear: () => terminal.current?.clear(),
              focus: () => terminal.current?.focus()
            });
          }

          return () => {
            window.removeEventListener("resize", handleResize);
            terminal.current?.dispose();
          };
        } catch (error) {
          console.error("Terminal initialization error:", error);
        }
      }
    }, [commandsToUse, onReady, interactive, onCommand]);

    return (
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
            <span className="text-green-400 text-xs font-mono">
              {interactive ? "INTERACTIVE" : "ONLINE"}
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className={`bg-black rounded-b-lg ${height} overflow-hidden ${className} ${
            interactive ? 'cursor-text' : 'cursor-pointer'
          }`}
          style={{ fontFamily: "Monaco, 'Cascadia Code', 'Ubuntu Mono', monospace" }}
          onClick={() => {
            if (interactive) {
              terminal.current?.focus();
            }
          }}
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
    );
  }
);

InteractiveTerminal.displayName = "InteractiveTerminal";
