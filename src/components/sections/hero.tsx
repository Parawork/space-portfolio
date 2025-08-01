"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { easing } from "maath";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import HeroText from "../ui/HeroText";
import ParallaxBackground from "../ui/ParallaxBackground";
import { Astronaut } from "../ui/Astronaut";
import Loader from "../ui/Loader";

const Hero = () => {

    const isMobile = useMediaQuery({ maxWidth: 853 });
    return (
        <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space" id="home">
            <HeroText />
            <ParallaxBackground />
            <figure
                className="absolute inset-0"
                style={{ width: "100vw", height: "100vh" }}
            >
                <Canvas camera={{ position: [0, 1, 3] }}>
                    <Suspense fallback={<Loader />}>
                        <Float>
                            <Astronaut
                                scale={isMobile ? 0.23 : 0.3}
                                position={isMobile ? [0, -1.5, 0] : [1.3, -1, 0]}
                            />
                        </Float>
                        <Rig />
                    </Suspense>
                </Canvas>
            </figure>
        </section>
    );
};

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
            0.5,
            delta
        );
    });
}

export default Hero;
export { Hero as Hero2 };