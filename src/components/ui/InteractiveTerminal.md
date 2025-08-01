# InteractiveTerminal Component

A reusable, animated terminal component for React applications with xterm.js integration. Supports both display mode (animated demo) and interactive mode (real input/output).

## Features

- 🖥️ **Realistic Terminal Interface** - Looks and feels like a real terminal
- ⌨️ **Interactive Mode** - Users can type commands and get responses
- 📺 **Display Mode** - Animated typing demo for showcasing
- 🎨 **Customizable** - Easy to modify commands, styling, and behavior
- 📱 **Responsive** - Automatically resizes and fits content
- 🔄 **Ref Support** - Programmatically control terminal output
- 🎪 **Production Ready** - Optimized performance and error handling
- 🛠️ **Built-in Commands** - help, clear, whoami, date, echo

## Usage

### Basic Usage

```tsx
import { InteractiveTerminal } from '@/components/ui/InteractiveTerminal';

function MyComponent() {
  return (
    <InteractiveTerminal 
      height="h-96"
      className="my-custom-class"
    />
  );
}
```

### Interactive Mode

```tsx
import { useState } from 'react';
import { InteractiveTerminal, TerminalRef } from '@/components/ui/InteractiveTerminal';

function InteractiveExample() {
  const [isInteractive, setIsInteractive] = useState(true);
  const terminalRef = useRef<TerminalRef>(null);

  const handleCommand = (command: string) => {
    // Handle custom commands
    if (command === 'projects') {
      terminalRef.current?.writeln('🚀 My awesome projects...');
      return true; // Command handled
    }
    return false; // Let built-in handler take over
  };

  return (
    <div>
      <button onClick={() => setIsInteractive(!isInteractive)}>
        {isInteractive ? 'Display Mode' : 'Interactive Mode'}
      </button>
      
      <InteractiveTerminal 
        ref={terminalRef}
        interactive={isInteractive}
        onCommand={handleCommand}
      />
    </div>
  );
}
```

### Custom Commands

```tsx
const customCommands = [
  "$ whoami",
  "developer@mysite",
  "",
  "$ ls -la",
  "total 42",
  "drwxr-xr-x  5 dev  staff   160 Aug  2 12:00 .",
  "drwxr-xr-x  3 dev  staff    96 Aug  2 11:00 ..",
  "-rw-r--r--  1 dev  staff  1234 Aug  2 12:00 README.md",
  "",
  "$ echo 'Hello World!'",
  "Hello World!",
  "",
  "$ █"
];

<InteractiveTerminal 
  commands={customCommands}
  height="h-80"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes for the terminal container |
| `height` | `string` | `"h-96"` | Tailwind height class for the terminal body |
| `commands` | `string[]` | Default portfolio commands | Array of commands to animate (display mode only) |
| `onReady` | `(terminal: TerminalRef) => void` | `undefined` | Callback when terminal is ready |
| `interactive` | `boolean` | `false` | Enable interactive mode for user input |
| `onCommand` | `(command: string) => boolean` | `undefined` | Custom command handler (return true if handled) |

## TerminalRef Methods

The component exposes these methods through the ref:

- `write(data: string)` - Write text to terminal
- `writeln(data: string)` - Write text with newline
- `clear()` - Clear terminal content
- `focus()` - Focus the terminal (useful in interactive mode)

## Built-in Commands (Interactive Mode)

When `interactive={true}`, these commands are available by default:

- `help` - Show available commands
- `clear` - Clear the terminal screen
- `whoami` - Display user information
- `date` - Show current date and time
- `echo <text>` - Echo the provided text

## Custom Command Handling

```tsx
const handleCommand = (command: string) => {
  const cmd = command.toLowerCase().trim();
  
  switch (cmd) {
    case 'hello':
      terminalRef.current?.writeln('Hello, World!');
      return true; // Command was handled
    case 'time':
      terminalRef.current?.writeln(new Date().toLocaleTimeString());
      return true;
    default:
      return false; // Let built-in handler process it
  }
};

<InteractiveTerminal 
  interactive={true}
  onCommand={handleCommand}
/>
```

## Terminal Colors

The component supports xterm.js color codes:

- `\x1b[31m` - Red text
- `\x1b[32m` - Green text  
- `\x1b[33m` - Yellow text
- `\x1b[36m` - Cyan text
- `\x1b[37m` - White text (reset)

## Example: Contact Form Integration

```tsx
// Add feedback to terminal when form is submitted
const handleSubmit = async (formData) => {
  if (terminalRef.current) {
    terminalRef.current.write("\r\n\x1b[36m[INFO] Processing form...\x1b[37m");
    
    try {
      await submitForm(formData);
      terminalRef.current.write("\r\n\x1b[32m✓ Success!\x1b[37m");
    } catch (error) {
      terminalRef.current.write("\r\n\x1b[31m✗ Error occurred\x1b[37m");
    }
    
    terminalRef.current.write("\r\n\x1b[32m$ \x1b[37m");
  }
};
```

## Customization

### Styling

The component uses Tailwind classes and can be customized:

```tsx
<InteractiveTerminal 
  className="border-2 border-blue-500 shadow-2xl"
  height="h-64"
/>
```

### Terminal Theme

Modify the terminal theme in the component:

```tsx
// In InteractiveTerminal.tsx
terminal.current = new Terminal({
  theme: {
    background: "#1a1a1a",    // Custom background
    foreground: "#00ff41",    // Custom text color
    cursor: "#ff0000",        // Custom cursor color
  },
  // ... other options
});
```

## Performance

- Terminal automatically disposes on unmount
- Resize handlers are cleaned up properly
- Optimized for smooth animations
- Lazy loading of xterm.js addons

## Dependencies

- `@xterm/xterm` - Core terminal functionality
- `@xterm/addon-fit` - Auto-fitting terminal
- `@xterm/addon-web-links` - Clickable links support

## Browser Support

Works in all modern browsers that support:
- ES6+ features
- Canvas API (for xterm.js)
- CSS Grid and Flexbox
