import { OrbitingCircles } from "./OrbitingCircles";
import Image from "next/image";

export function Frameworks() {
    const skills = [
        "cplusplus",
        "css3",
        "git",
        "github",
        "html5",
        "javascript",
        "react",
        "nextjs",
        "tailwindcss",
        "typescript",
        "mongodb",
        "prisma",
        "postgres",
        "vercel",
        "firebase",
        "vitejs",
    ];
    return (
        <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
            <OrbitingCircles iconSize={40}>
                {skills.map((skill, index) => (
                    <Icon key={index} src={`assets/logos/${skill}.svg`} />
                ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
                {skills.reverse().map((skill, index) => (
                    <Icon key={index} src={`assets/logos/${skill}.svg`} />
                ))}
            </OrbitingCircles>
        </div>
    );
}

const Icon = ({ src }) => (
    <Image src={src} alt="Technology icon" className="duration-200 rounded-sm hover:scale-110" width={40} height={40} />
);