import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { Hero2 } from "@/components/main/hero2";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero2 />
        <Skills />
        <Projects />
        <Encryption />
      </div>
    </main>
  );
}
