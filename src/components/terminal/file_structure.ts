// N-ary Tree Node structure for file system
export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children: FileNode[];
  parent: FileNode | null;
  size?: number;
  lastModified?: Date;
}

// File system implementation using rooted n-ary tree
export class FileSystem {
  private root: FileNode;
  private current: FileNode;

  constructor() {
    // Initialize root node
    this.root = {
      name: 'root',
      type: 'directory',
      children: [],
      parent: null,
      lastModified: new Date()
    };

    // Create parakrama directory under root
    const parakrama: FileNode = {
      name: 'parakrama',
      type: 'directory',
      children: [],
      parent: this.root,
      lastModified: new Date()
    };

    // Add parakrama as child of root
    this.root.children.push(parakrama);

    // Create children of parakrama
    const app: FileNode = {
      name: 'app',
      type: 'directory',
      children: [],
      parent: parakrama,
      lastModified: new Date()
    };

    const cv: FileNode = {
      name: 'cv.pdf',
      type: 'file',
      children: [],
      parent: parakrama,
      size: 2048,
      lastModified: new Date('2024-01-15')
    };

    const srv: FileNode = {
      name: 'srv',
      type: 'directory',
      children: [],
      parent: parakrama,
      lastModified: new Date()
    };

    const homeMovie: FileNode = {
      name: 'home.mov',
      type: 'file',
      children: [],
      parent: parakrama,
      size: 10485760, // 10MB
      lastModified: new Date('2024-02-20')
    };

    // Add children to parakrama
    parakrama.children.push(app, cv, srv, homeMovie);

    // Add some files to app directory
    const appJs: FileNode = {
      name: 'app.js',
      type: 'file',
      children: [],
      parent: app,
      size: 1024,
      lastModified: new Date()
    };

    const packageJson: FileNode = {
      name: 'package.json',
      type: 'file',
      children: [],
      parent: app,
      size: 512,
      lastModified: new Date()
    };

    const srcDir: FileNode = {
      name: 'src',
      type: 'directory',
      children: [],
      parent: app,
      lastModified: new Date()
    };

    app.children.push(appJs, packageJson, srcDir);

    // Add some files to srv directory
    const serverJs: FileNode = {
      name: 'server.js',
      type: 'file',
      children: [],
      parent: srv,
      size: 2048,
      lastModified: new Date()
    };

    const configJson: FileNode = {
      name: 'config.json',
      type: 'file',
      children: [],
      parent: srv,
      size: 256,
      lastModified: new Date()
    };

    const logsDir: FileNode = {
      name: 'logs',
      type: 'directory',
      children: [],
      parent: srv,
      lastModified: new Date()
    };

    srv.children.push(serverJs, configJson, logsDir);

    // Add files to src directory
    const indexJs: FileNode = {
      name: 'index.js',
      type: 'file',
      children: [],
      parent: srcDir,
      size: 1536,
      lastModified: new Date()
    };

    const utilsJs: FileNode = {
      name: 'utils.js',
      type: 'file',
      children: [],
      parent: srcDir,
      size: 768,
      lastModified: new Date()
    };

    const componentsDir: FileNode = {
      name: 'components',
      type: 'directory',
      children: [],
      parent: srcDir,
      lastModified: new Date()
    };

    srcDir.children.push(indexJs, utilsJs, componentsDir);

    // Add files to logs directory
    const errorLog: FileNode = {
      name: 'error.log',
      type: 'file',
      children: [],
      parent: logsDir,
      size: 4096,
      lastModified: new Date('2024-03-01')
    };

    const accessLog: FileNode = {
      name: 'access.log',
      type: 'file',
      children: [],
      parent: logsDir,
      size: 8192,
      lastModified: new Date('2024-03-01')
    };

    logsDir.children.push(errorLog, accessLog);

    // Add files to components directory
    const headerJs: FileNode = {
      name: 'Header.js',
      type: 'file',
      children: [],
      parent: componentsDir,
      size: 2048,
      lastModified: new Date()
    };

    const footerJs: FileNode = {
      name: 'Footer.js',
      type: 'file',
      children: [],
      parent: componentsDir,
      size: 1024,
      lastModified: new Date()
    };

    const readme: FileNode = {
      name: 'README.md',
      type: 'file',
      children: [],
      parent: componentsDir,
      size: 512,
      lastModified: new Date()
    };

    componentsDir.children.push(headerJs, footerJs, readme);

    // Add more files to parakrama directory
    const projectsDir: FileNode = {
      name: 'projects',
      type: 'directory',
      children: [],
      parent: parakrama,
      lastModified: new Date()
    };

    const documentsDir: FileNode = {
      name: 'documents',
      type: 'directory',
      children: [],
      parent: parakrama,
      lastModified: new Date()
    };

    const bashrc: FileNode = {
      name: '.bashrc',
      type: 'file',
      children: [],
      parent: parakrama,
      size: 1024,
      lastModified: new Date()
    };

    parakrama.children.push(projectsDir, documentsDir, bashrc);

    // Add files to projects directory
    const portfolio: FileNode = {
      name: 'portfolio',
      type: 'directory',
      children: [],
      parent: projectsDir,
      lastModified: new Date()
    };

    const ecommerce: FileNode = {
      name: 'ecommerce-app',
      type: 'directory',
      children: [],
      parent: projectsDir,
      lastModified: new Date()
    };

    projectsDir.children.push(portfolio, ecommerce);

    // Add files to documents directory
    const resume: FileNode = {
      name: 'resume.pdf',
      type: 'file',
      children: [],
      parent: documentsDir,
      size: 3072,
      lastModified: new Date('2024-01-20')
    };

    const coverLetter: FileNode = {
      name: 'cover-letter.docx',
      type: 'file',
      children: [],
      parent: documentsDir,
      size: 2048,
      lastModified: new Date('2024-01-20')
    };

    const notesDir: FileNode = {
      name: 'notes',
      type: 'directory',
      children: [],
      parent: documentsDir,
      lastModified: new Date()
    };

    documentsDir.children.push(resume, coverLetter, notesDir);

    // Set current directory to root/parakrama
    this.current = parakrama;
  }

  // Get current directory
  getCurrentDirectory(): FileNode {
    return this.current;
  }

  // Get current path
  getCurrentPath(): string {
    const path: string[] = [];
    let node: FileNode | null = this.current;
    
    while (node !== null) {
      path.unshift(node.name);
      node = node.parent;
    }
    
    return path.join('/');
  }

  // List files in current directory
  listFiles(): FileNode[] {
    return this.current.children;
  }

  // Change directory
  changeDirectory(path: string): boolean {
    if (path === '..') {
      if (this.current.parent) {
        this.current = this.current.parent;
        return true;
      }
      return false;
    }

    if (path === '/') {
      this.current = this.root;
      return true;
    }

    if (path === '~') {
      // Go to parakrama (home)
      const parakrama = this.root.children.find(child => child.name === 'parakrama');
      if (parakrama) {
        this.current = parakrama;
        return true;
      }
      return false;
    }

    // Find child directory
    const child = this.current.children.find(
      child => child.name === path && child.type === 'directory'
    );

    if (child) {
      this.current = child;
      return true;
    }

    return false;
  }

  // Find file or directory by name
  findNode(name: string): FileNode | null {
    return this.current.children.find(child => child.name === name) || null;
  }

  // Create directory with enhanced error handling
  createDirectory(name: string): { success: boolean; message: string } {
    // Validate name
    if (!name || name.trim() === '') {
      return { success: false, message: 'mkdir: missing operand' };
    }

    // Check for invalid characters
    if (name.includes('/') || name.includes('\\') || name.includes('..')) {
      return { success: false, message: 'mkdir: invalid directory name' };
    }

    // Check if already exists
    if (this.findNode(name)) {
      return { success: false, message: `mkdir: cannot create directory '${name}': File exists` };
    }

    const newDir: FileNode = {
      name,
      type: 'directory',
      children: [],
      parent: this.current,
      lastModified: new Date()
    };

    this.current.children.push(newDir);
    return { success: true, message: `Directory '${name}' created successfully` };
  }

  // Create file with enhanced functionality
  createFile(name: string, content: string = '', size?: number): { success: boolean; message: string } {
    // Validate name
    if (!name || name.trim() === '') {
      return { success: false, message: 'touch: missing operand' };
    }

    // Check for invalid characters
    if (name.includes('/') || name.includes('\\')) {
      return { success: false, message: 'touch: invalid file name' };
    }

    // Check if already exists
    if (this.findNode(name)) {
      // Update last modified time if file exists
      const existingFile = this.findNode(name);
      if (existingFile) {
        existingFile.lastModified = new Date();
        return { success: true, message: `File '${name}' timestamp updated` };
      }
    }

    // Calculate size from content if not provided
    const fileSize = size !== undefined ? size : content.length;

    const newFile: FileNode = {
      name,
      type: 'file',
      children: [],
      parent: this.current,
      size: fileSize,
      lastModified: new Date()
    };

    this.current.children.push(newFile);
    
    // Store content if provided
    if (content) {
      this.setFileContent(name, content);
    }

    return { success: true, message: `File '${name}' created successfully` };
  }

  // Remove file or directory with enhanced functionality
  remove(name: string, force: boolean = false): { success: boolean; message: string } {
    // Validate name
    if (!name || name.trim() === '') {
      return { success: false, message: 'rm: missing operand' };
    }

    const node = this.findNode(name);
    if (!node) {
      return { success: false, message: `rm: cannot remove '${name}': No such file or directory` };
    }

    // Check if it's a directory and not empty
    if (node.type === 'directory' && node.children.length > 0 && !force) {
      return { success: false, message: `rm: cannot remove '${name}': Directory not empty (use -r flag)` };
    }

    // Remove from parent's children array
    const index = this.current.children.findIndex(child => child.name === name);
    if (index !== -1) {
      this.current.children.splice(index, 1);
      return { success: true, message: `'${name}' removed successfully` };
    }

    return { success: false, message: `rm: failed to remove '${name}'` };
  }

  // Remove directory recursively
  removeRecursive(name: string): { success: boolean; message: string } {
    const node = this.findNode(name);
    if (!node) {
      return { success: false, message: `rm: cannot remove '${name}': No such file or directory` };
    }

    if (node.type === 'directory') {
      // Recursively remove all children
      while (node.children.length > 0) {
        const child = node.children[0];
        if (child.type === 'directory') {
          this.removeRecursive(child.name);
        } else {
          this.remove(child.name, true);
        }
      }
    }

    return this.remove(name, true);
  }

  // Copy file or directory with improved functionality
  copy(source: string, destination: string): { success: boolean; message: string } {
    const sourceNode = this.findNode(source);
    if (!sourceNode) {
      return { success: false, message: `cp: cannot stat '${source}': No such file or directory` };
    }

    // Check if destination already exists
    if (this.findNode(destination)) {
      return { success: false, message: `cp: cannot create '${destination}': File exists` };
    }

    if (sourceNode.type === 'file') {
      const newFile: FileNode = {
        name: destination,
        type: 'file',
        children: [],
        parent: this.current,
        size: sourceNode.size,
        lastModified: new Date()
      };

      this.current.children.push(newFile);
      
      // Copy content if available
      const content = this.getStoredFileContent(source);
      if (content) {
        this.setFileContent(destination, content);
      }

      return { success: true, message: `'${source}' copied to '${destination}'` };
    } else {
      // For directories, create the directory (shallow copy by default)
      const newDir: FileNode = {
        name: destination,
        type: 'directory',
        children: [],
        parent: this.current,
        lastModified: new Date()
      };

      this.current.children.push(newDir);
      return { success: true, message: `Directory '${source}' copied to '${destination}'` };
    }
  }

  // Copy directory recursively
  copyRecursive(source: string, destination: string): { success: boolean; message: string } {
    const sourceNode = this.findNode(source);
    if (!sourceNode) {
      return { success: false, message: `cp: cannot stat '${source}': No such file or directory` };
    }

    // Check if destination already exists
    if (this.findNode(destination)) {
      return { success: false, message: `cp: cannot create '${destination}': File exists` };
    }

    if (sourceNode.type === 'file') {
      return this.copy(source, destination);
    } else {
      // Create the destination directory
      const newDir: FileNode = {
        name: destination,
        type: 'directory',
        children: [],
        parent: this.current,
        lastModified: new Date()
      };

      this.current.children.push(newDir);

      // Save current directory and change to destination
      const originalCurrent = this.current;
      this.current = newDir;

      // Copy all children recursively
      for (const child of sourceNode.children) {
        if (child.type === 'file') {
          const childContent = this.getStoredFileContent(child.name);
          this.createFile(child.name, childContent || '', child.size);
        } else {
          this.createDirectory(child.name);
          // For nested directories, we'd need to implement deeper recursion
          // This is a simplified version
        }
      }

      // Restore current directory
      this.current = originalCurrent;

      return { success: true, message: `Directory '${source}' copied recursively to '${destination}'` };
    }
  }

  // Move/rename file or directory
  move(source: string, destination: string): { success: boolean; message: string } {
    const sourceNode = this.findNode(source);
    if (!sourceNode) {
      return { success: false, message: `mv: cannot stat '${source}': No such file or directory` };
    }

    // Check if destination already exists
    if (this.findNode(destination)) {
      return { success: false, message: `mv: cannot create '${destination}': File exists` };
    }

    // Simply rename the node
    sourceNode.name = destination;
    sourceNode.lastModified = new Date();

    return { success: true, message: `'${source}' moved to '${destination}'` };
  }

  // Get file content (mock)
  getFileContent(name: string): string | null {
    const file = this.findNode(name);
    if (!file || file.type !== 'file') {
      return null;
    }

    // Mock content based on file type
    switch (file.name) {
      case 'cv.pdf':
        return 'PDF Content: Parakrama Rathnayaka - Software Engineer Resume\nExperience: 5+ years in full-stack development\nSkills: React, Node.js, TypeScript, Python';
      case 'app.js':
        return 'const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.send("Hello World!");\n});\n\napp.listen(3000);';
      case 'package.json':
        return '{\n  "name": "portfolio-app",\n  "version": "1.0.0",\n  "dependencies": {\n    "express": "^4.18.0",\n    "react": "^18.0.0"\n  }\n}';
      case 'server.js':
        return 'const express = require("express");\nconst cors = require("cors");\nconst app = express();\n\napp.use(cors());\napp.use(express.json());\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT);';
      case 'config.json':
        return '{\n  "port": 3000,\n  "env": "development",\n  "database": {\n    "host": "localhost",\n    "port": 5432\n  }\n}';
      case 'index.js':
        return 'import React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./App";\n\nReactDOM.render(<App />, document.getElementById("root"));';
      case 'utils.js':
        return 'export const formatDate = (date) => {\n  return new Intl.DateTimeFormat("en-US").format(date);\n};\n\nexport const capitalize = (str) => {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n};';
      case 'Header.js':
        return 'import React from "react";\n\nconst Header = () => {\n  return (\n    <header>\n      <h1>My Portfolio</h1>\n      <nav>\n        <a href="#about">About</a>\n        <a href="#projects">Projects</a>\n      </nav>\n    </header>\n  );\n};\n\nexport default Header;';
      case 'Footer.js':
        return 'import React from "react";\n\nconst Footer = () => {\n  return (\n    <footer>\n      <p>&copy; 2024 Parakrama Rathnayaka. All rights reserved.</p>\n    </footer>\n  );\n};\n\nexport default Footer;';
      case 'README.md':
        return '# Components\n\nThis directory contains React components for the portfolio website.\n\n## Files\n- Header.js - Navigation header component\n- Footer.js - Site footer component\n\n## Usage\n```jsx\nimport Header from "./Header";\nimport Footer from "./Footer";\n```';
      case 'error.log':
        return '[2024-03-01 10:30:15] ERROR: Database connection failed\n[2024-03-01 10:31:20] ERROR: Invalid user credentials\n[2024-03-01 11:45:33] ERROR: File not found: /api/users';
      case 'access.log':
        return '127.0.0.1 - - [01/Mar/2024:10:30:15] "GET / HTTP/1.1" 200 1234\n127.0.0.1 - - [01/Mar/2024:10:31:20] "POST /api/login HTTP/1.1" 401 89\n127.0.0.1 - - [01/Mar/2024:11:45:33] "GET /api/users HTTP/1.1" 404 156';
      case 'resume.pdf':
        return 'PDF Content: Professional Resume\nParakrama Rathnayaka\nSoftware Engineer\n\nEXPERIENCE:\n- Senior Developer at TechCorp (2021-2024)\n- Full Stack Developer at StartupXYZ (2019-2021)\n\nSKILLS:\n- JavaScript, TypeScript, React, Node.js\n- Python, Django, FastAPI\n- PostgreSQL, MongoDB\n- AWS, Docker, Kubernetes';
      case 'cover-letter.docx':
        return 'Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineer position at your company.\n\nWith over 5 years of experience in full-stack development, I have worked extensively with modern web technologies including React, Node.js, and cloud platforms.\n\nI am excited about the opportunity to contribute to your team.\n\nBest regards,\nParakrama Rathnayaka';
      case '.bashrc':
        return '# .bashrc\n\n# User specific aliases and functions\nalias ll="ls -alF"\nalias la="ls -A"\nalias l="ls -CF"\n\n# Add local bin to PATH\nexport PATH="$HOME/.local/bin:$PATH"\n\n# Custom prompt\nexport PS1="\\u@\\h:\\w$ "';
      default:
        return `Content of ${file.name}\n\nThis is a sample file in the virtual file system.\nCreated on: ${file.lastModified?.toISOString() || 'Unknown'}\nSize: ${file.size || 0} bytes`;
    }
  }

  // Set file content (mock storage)
  private fileContents: Map<string, string> = new Map();

  setFileContent(name: string, content: string): boolean {
    const file = this.findNode(name);
    if (!file || file.type !== 'file') {
      return false;
    }

    // Store content in map using full path as key
    const fullPath = this.getCurrentPath() + '/' + name;
    this.fileContents.set(fullPath, content);
    
    // Update file size
    file.size = content.length;
    file.lastModified = new Date();
    
    return true;
  }

  // Get stored file content
  getStoredFileContent(name: string): string | null {
    const fullPath = this.getCurrentPath() + '/' + name;
    return this.fileContents.get(fullPath) || this.getFileContent(name);
  }

  // Format file size
  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get detailed listing (like ls -l)
  getDetailedListing(): string[] {
    const result: string[] = [];
    
    for (const node of this.current.children) {
      const type = node.type === 'directory' ? 'd' : '-';
      const permissions = node.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--';
      const size = node.size ? this.formatSize(node.size) : '-';
      const date = node.lastModified?.toLocaleDateString() || '';
      const name = node.type === 'directory' ? `${node.name}/` : node.name;
      
      result.push(`${type}${permissions} 1 parakrama parakrama ${size.padStart(8)} ${date} ${name}`);
    }
    
    return result;
  }
}

// Export singleton instance
export const fileSystem = new FileSystem();
