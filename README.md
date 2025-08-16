## ✨ Features

- 🚀 **Modern Architecture**: Clean, maintainable code structure
- 🎨 **3D Animations**: Interactive astronaut model and parallax backgrounds
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- ⚡ **Performance Optimized**: Fast loading with Next.js 14 App Router
- 🎯 **TypeScript**: Full type safety and better development experience
- 🎪 **Framer Motion**: Smooth animations and transitions

## 📁 Project Structure

```
space-portfolio/
├── src/                         # All source code
│   ├── app/                     # Next.js 14 App Router
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/              # React components
│   │   ├── layout/              # Layout components
│   │   │   ├── footer.tsx       # Site footer
│   │   │   ├── navbar.tsx       # Navigation bar
│   │   │   └── index.ts         # Exports
│   │   ├── sections/            # Page sections
│   │   │   ├── hero.tsx         # Hero section
│   │   │   ├── projects.tsx     # Projects showcase
│   │   │   ├── skills.tsx       # Skills display
│   │   │   ├── work.tsx         # Work experience
│   │   │   └── index.ts         # Exports
│   │   └── ui/                  # Reusable UI components
│   │       ├── Astronaut.tsx    # 3D astronaut model
│   │       ├── FlipWords.tsx    # Text animation
│   │       ├── Header.tsx       # Section headers
│   │       ├── VerticalTimeline.tsx  # Timeline component
│   │       └── ...              # Other UI components
│   ├── config/                  # Configuration
│   ├── constants/               # App constants
│   ├── lib/                     # Utilities
│   └── types/                   # TypeScript definitions
├── public/                      # Static assets
│   ├── assets/                  # Images and graphics
│   ├── models/                  # 3D models
│   ├── projects/                # Project screenshots
│   ├── skills/                  # Skill icons
│   └── videos/                  # Background videos
└── [config files]              # Configuration files
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons**: [Heroicons](https://heroicons.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **Development**: ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Parawork/space-portfolio.git
   cd space-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Customization

### Personal Information
Update your details in `src/constants/index.ts`:
- Contact information
- Social media links
- Skills and experience
- Project portfolio

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles in individual files

### 3D Models
- Replace models in `public/models/`
- Update references in component files
- Ensure GLB format for optimal performance

## 📱 Responsive Design

Optimized for all devices:
- **Desktop**: Full 3D experience with all animations
- **Tablet**: Optimized layout with reduced complexity
- **Mobile**: Touch-friendly interface with essential features

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with automatic code splitting
- **Images**: Next.js Image optimization
- **3D Models**: Lazy loading and efficient rendering

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the 'out' folder to Netlify
```

### Other Platforms
Any static hosting platform that supports Next.js:
```bash
npm run build
npm start
```

## 🎯 Architecture Improvements

This version includes significant improvements:

- ✅ **Clean Code Structure**: Organized by feature and responsibility
- ✅ **Performance Optimized**: Removed unused components and assets
- ✅ **Type Safety**: Comprehensive TypeScript implementation
- ✅ **Maintainable**: Clear component hierarchy and exports
- ✅ **Scalable**: Easy to add new features and components

## 📧 Contact

**Parakrama Rathnayaka**
- 📧 Email: parakrama.22@cse.mrt.ac.lk
- 📱 Phone: 0773528200
- 💼 GitHub: [@Parawork](https://github.com/Parawork)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 3D Astronaut model by [umaira](https://sketchfab.com/umaira5) (CC-BY-4.0)
- Space assets from various open-source contributors
- Inspiration from modern portfolio designs in the community

---

⭐ **Star this repository if you found it helpful!**

<p align="right">(<a href="#readme-top">back to top</a>)</p>
