import { Hero, Projects, Skills, Work } from "@/components/sections";

// Add Hero component to the page

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <Hero />
        <Projects />
        <Skills />
        <Work />
        <Skills />
      </div>
    </main>
  );
}
