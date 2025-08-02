"use client";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { fileSystem, FileSystem } from "./file_structure";
export type TerminalRef = {
  write(data: string): void;
  writeln(data: string): void;
  clear(): void;
};

export interface InteractiveTerminalProps {
  height?: string; // tailwind height class, e.g. 'h-96'
  interactive?: boolean;
  onReady?: (terminal: TerminalRef) => void;
  onCommand?: (command: string) => boolean;
  title?: string;
}

export const InteractiveTerminal = forwardRef<
  TerminalRef,
  InteractiveTerminalProps
>(
  (
    {
      height = "h-64",
      interactive = true,
      onReady,
      onCommand,
      title = "Terminal",
    },
    ref
  ) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const termRef = useRef<Terminal>();
    const inputRef = useRef<string>("");
    const [lines, setLines] = useState(0);
    const [chars, setChars] = useState(0);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const commandHistoryRef = useRef<string[]>([]);

    useImperativeHandle(ref, () => ({
      write: (data: string) => {
        try {
          termRef.current?.write(data);
        } catch (error) {
          console.warn("Terminal write failed:", error);
        }
      },
      writeln: (data: string) => {
        try {
          termRef.current?.writeln(data);
        } catch (error) {
          console.warn("Terminal writeln failed:", error);
        }
      },
      clear: () => {
        try {
          termRef.current?.clear();
        } catch (error) {
          console.warn("Terminal clear failed:", error);
        }
      },
    }));

    useEffect(() => {
      if (!terminalRef.current) return;
      
      const term = new Terminal({
        cursorBlink: true,
        disableStdin: !interactive,
        cols: 80,
        rows: 24,
      });
      
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      termRef.current = term;
      
      try {
        term.open(terminalRef.current);
        
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          try {
            fitAddon.fit();
          } catch (error) {
            console.warn("FitAddon fit failed:", error);
          }
        }, 100);
        
        term.write("Welcome to Interactive Terminal\r\n");
        inputRef.current = "";
      } catch (error) {
        console.error("Terminal initialization failed:", error);
        return;
      }

      const prompt = () => {
        term.write("\r\n$ ");
      };
      prompt();

      if (interactive) {
        term.onKey(({ key, domEvent }) => {
          const printable =
            !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
          if (domEvent.key === "Enter") {
            term.write("\r\n");
            const cmd = inputRef.current;
            let handled = false;
            if (onCommand) {
              handled = onCommand(cmd);
            }
            if (!handled) {
              handleCommand(cmd);
            }
            inputRef.current = "";
            prompt();
          } else if (domEvent.key === "Backspace") {
            if (inputRef.current.length > 0) {
              inputRef.current = inputRef.current.slice(0, -1);
              term.write("\b \b");
            }
          } else if (printable) {
            inputRef.current += key;
            term.write(key);
          }
        });
      }

      const handleCommand = (command: string) => {
        const parts = command.trim().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        // Add command to history (only if not empty)
        if (command.trim()) {
          commandHistoryRef.current = [...commandHistoryRef.current, command.trim()];
          setCommandHistory([...commandHistoryRef.current]);
        }

        // Update character count for command input
        setChars((prev) => prev + command.length);

        let outputLength = 0;

        switch (cmd) {
          case "help":
            const helpText = [
              "Available commands:",
              " help       - Show this help",
              " clear      - Clear the terminal",
              " echo [txt] - Echo text",
              " date       - Show current date and time",
              " whoami     - Show current user",
              " ls         - List files",
              " ls -l      - List files with details",
              " pwd        - Show current directory",
              " cd [dir]   - Change directory",
              " uname      - Show system info",
              " history    - Show command history",
              " history -c - Clear command history",
              " cat [file] - Show file content",
              " mkdir [dir]- Create directory",
              " touch [file] - Create file",
              " rm [file]  - Remove file",
              " rm -r [dir] - Remove directory recursively",
              " cp [src] [dst] - Copy file",
              " cp -r [src] [dst] - Copy directory recursively",
              " mv [src] [dst] - Move/rename file",
            ];
            helpText.forEach((line) => term.writeln(line));
            outputLength = helpText.join("").length;
            setLines((prev) => prev + 15);
            break;
          case "clear":
            term.clear();
            setLines(0);
            setChars(0);
            // Optionally clear history too - uncomment next line if desired
            // setCommandHistory([]);
            break;
          case "echo":
            const text = args.join(" ");
            term.writeln(text);
            outputLength = text.length;
            setLines((prev) => prev + 2);
            break;
          case "date":
            const dateOutput = new Date().toString();
            term.writeln(dateOutput);
            outputLength = dateOutput.length;
            setLines((prev) => prev + 2);
            break;
          case "whoami":
            const whoOutput = "guest";
            term.writeln(whoOutput);
            outputLength = whoOutput.length;
            setLines((prev) => prev + 2);
            break;
        
          case "ls":
            // Check for -l flag for detailed listing
            const isDetailed = args.includes('-l');
            
            if (isDetailed) {
              const detailedFiles = fileSystem.getDetailedListing();
              if (detailedFiles.length === 0) {
                const emptyMsg = "total 0";
                term.writeln(emptyMsg);
                outputLength = emptyMsg.length;
                setLines((prev) => prev + 1);
              } else {
                const totalMsg = `total ${detailedFiles.length}`;
                term.writeln(totalMsg);
                detailedFiles.forEach(line => term.writeln(line));
                outputLength = totalMsg.length + detailedFiles.join("").length;
                setLines((prev) => prev + detailedFiles.length + 1);
              }
            } else {
              const files = fileSystem.listFiles();
              const lsOutput = files.map(file => 
                file.type === 'directory' ? `${file.name}/` : file.name
              ).join('  ');
              term.writeln(lsOutput);
              outputLength = lsOutput.length;
              setLines((prev) => prev + 1);
            }
            break;
          case "pwd":
            const pwdOutput = fileSystem.getCurrentPath();
            term.writeln(pwdOutput);
            outputLength = pwdOutput.length;
            setLines((prev) => prev + 2);
            break;
          case "cd":
            if (args.length === 0) {
              // No arguments - go to home directory
              const success = fileSystem.changeDirectory('~');
              if (success) {
                const message = `Changed to directory: ${fileSystem.getCurrentPath()}`;
                term.writeln(message);
                outputLength = message.length;
              } else {
                const errorMsg = "cd: home directory not found";
                term.writeln(errorMsg);
                outputLength = errorMsg.length;
              }
            } else {
              const success = fileSystem.changeDirectory(args[0]);
              if (success) {
                const message = `Changed to directory: ${fileSystem.getCurrentPath()}`;
                term.writeln(message);
                outputLength = message.length;
              } else {
                const errorMsg = args[0] === '..' 
                  ? "cd: already at root directory"
                  : `cd: no such file or directory: ${args[0]}`;
                term.writeln(errorMsg);
                outputLength = errorMsg.length;
              }
            }
            setLines((prev) => prev + 2);
            break;
          case "uname":
            const unameOutput = "Linux terminal-web 5.15.0 x86_64";
            term.writeln(unameOutput);
            outputLength = unameOutput.length;
            setLines((prev) => prev + 2);
            break;
          case "history":
            if (args.length > 0 && args[0] === "-c") {
              // Clear history
              commandHistoryRef.current = [];
              setCommandHistory([]);
              const clearMsg = "Command history cleared";
              term.writeln(clearMsg);
              outputLength = clearMsg.length;
              setLines((prev) => prev + 1);
            } else if (commandHistoryRef.current.length === 0) {
              const noHistoryMsg = "No commands in history";
              term.writeln(noHistoryMsg);
              outputLength = noHistoryMsg.length;
              setLines((prev) => prev + 1);
            } else {
              const historyLines = commandHistoryRef.current.map((cmd, index) => 
                `${(index + 1).toString().padStart(3)} ${cmd}`
              );
              historyLines.forEach((line) => term.writeln(line));
              outputLength = historyLines.join("").length;
              setLines((prev) => prev + historyLines.length);
            }
            break;
          case "cat":
            if (args.length === 0) {
              const errorMsg = "cat: missing file operand";
              term.writeln(errorMsg);
              outputLength = errorMsg.length;
              setLines((prev) => prev + 1);
            } else {
              let totalOutputLength = 0;
              let linesAdded = 0;
              
              args.forEach((fileName) => {
                const content = fileSystem.getFileContent(fileName);
                if (content) {
                  const lines = content.split('\n');
                  lines.forEach(line => {
                    term.writeln(line);
                    totalOutputLength += line.length;
                    linesAdded += 1;
                  });
                } else {
                  const errorMsg = `cat: ${fileName}: No such file or directory`;
                  term.writeln(errorMsg);
                  totalOutputLength += errorMsg.length;
                  linesAdded += 1;
                }
              });
              
              outputLength = totalOutputLength;
              setLines((prev) => prev + linesAdded);
            }
            break;
          case "mkdir":
            if (args.length === 0) {
              const errorMsg = "mkdir: missing operand";
              term.writeln(errorMsg);
              outputLength = errorMsg.length;
              setLines((prev) => prev + 1);
            } else {
              let totalOutputLength = 0;
              let linesAdded = 0;
              
              // Process each argument
              args.forEach((arg) => {
                const result = fileSystem.createDirectory(arg);
                term.writeln(result.message);
                totalOutputLength += result.message.length;
                linesAdded += 1;
              });
              
              outputLength = totalOutputLength;
              setLines((prev) => prev + linesAdded);
            }
            break;
          case "touch":
            if (args.length === 0) {
              const errorMsg = "touch: missing file operand";
              term.writeln(errorMsg);
              outputLength = errorMsg.length;
              setLines((prev) => prev + 1);
            } else {
              let totalOutputLength = 0;
              let linesAdded = 0;
              
              // Process each argument
              args.forEach((arg) => {
                const result = fileSystem.createFile(arg);
                term.writeln(result.message);
                totalOutputLength += result.message.length;
                linesAdded += 1;
              });
              
              outputLength = totalOutputLength;
              setLines((prev) => prev + linesAdded);
            }
            break;
          case "rm":
            if (args.length === 0) {
              const errorMsg = "rm: missing operand";
              term.writeln(errorMsg);
              outputLength = errorMsg.length;
              setLines((prev) => prev + 1);
            } else {
              let totalOutputLength = 0;
              let linesAdded = 0;
              
              // Check if -r flag is present
              const isRecursive = args.includes('-r');
              const filesToRemove = args.filter(arg => arg !== '-r');
              
              if (filesToRemove.length === 0) {
                const errorMsg = "rm: missing file operand";
                term.writeln(errorMsg);
                totalOutputLength += errorMsg.length;
                linesAdded += 1;
              } else {
                // Process each file argument
                filesToRemove.forEach((arg) => {
                  const result = isRecursive 
                    ? fileSystem.removeRecursive(arg)
                    : fileSystem.remove(arg);
                  term.writeln(result.message);
                  totalOutputLength += result.message.length;
                  linesAdded += 1;
                });
              }
              
              outputLength = totalOutputLength;
              setLines((prev) => prev + linesAdded);
            }
            break;
          case "cp":
            if (args.length < 2) {
              const errorMsg = "cp: missing file operand";
              term.writeln(errorMsg);
              outputLength = errorMsg.length;
              setLines((prev) => prev + 1);
            } else {
              // Check if -r flag is present
              const isRecursive = args.includes('-r');
              const filteredArgs = args.filter(arg => arg !== '-r');
              
              if (filteredArgs.length < 2) {
                const errorMsg = "cp: missing source or destination operand";
                term.writeln(errorMsg);
                outputLength = errorMsg.length;
                setLines((prev) => prev + 1);
              } else {
                const source = filteredArgs[0];
                const destination = filteredArgs[1];
                
                const result = isRecursive 
                  ? fileSystem.copyRecursive(source, destination)
                  : fileSystem.copy(source, destination);
                
                term.writeln(result.message);
                outputLength = result.message.length;
                setLines((prev) => prev + 1);
              }
            }
            break;
          case "mv":
            if (args.length < 2) {
              const errorMsg = "mv: missing file operand";
              term.writeln(errorMsg);
              outputLength = errorMsg.length;
              setLines((prev) => prev + 1);
            } else {
              const result = fileSystem.move(args[0], args[1]);
              term.writeln(result.message);
              outputLength = result.message.length;
              setLines((prev) => prev + 1);
            }
            break;
          case "":
            // ignore empty
            break;
          default:
            const errorMsg = `Command not found: ${cmd}`;
            term.writeln(errorMsg);
            outputLength = errorMsg.length;
            setLines((prev) => prev + 2);
        }

        // Update character count with output length
        setChars((prev) => prev + outputLength);
      };

      // notify parent it's ready
      onReady?.({
        write: (d) => term.write(d),
        writeln: (d) => term.writeln(d),
        clear: () => term.clear(),
      });

      // handle cleanup and listeners
      const handleResize = () => {
        try {
          if (termRef.current && fitAddon) {
            fitAddon.fit();
          }
        } catch (error) {
          console.warn("Resize fit failed:", error);
        }
      };
      
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        if (termRef.current) {
          try {
            termRef.current.dispose();
          } catch (error) {
            console.warn("Terminal disposal failed:", error);
          }
        }
      };
    }, [interactive, onCommand, onReady]);

    return (
      <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300 text-sm font-medium ml-3">
              {title}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>Lines: {lines}</span>
            <span>Chars: {chars}</span>
            <span
              className={`px-2 py-1 rounded ${
                interactive ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              {interactive ? "Interactive" : "Display"}
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div ref={terminalRef} className={`w-full ${height} bg-black`} />
      </div>
    );
  }
);
