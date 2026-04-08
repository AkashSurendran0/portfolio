import HeroScene from "@/components/3D/HeroScene";
import ThemeToggle from "@/components/Layout/ThemeToggle";
import Journey from "@/components/Sections/Journey";
import Skills from "@/components/Sections/Skills";
import Projects from "@/components/Sections/Projects";
import Contact from "@/components/Sections/Contact";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between w-full overflow-x-clip">
      {/* <ThemeToggle /> */}

      {/* 100vh Hero area */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center z-10">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0 pointer-events-auto w-full h-[100dvh]">
          <HeroScene />
        </div>

        {/* Foreground Text */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference mt-20">
          <p className="font-mono text-[#FFFFFF] text-xl md:text-3xl mb-4 pointer-events-auto tracking-widest uppercase drop-shadow-md">
            My name is Akash
          </p>
          <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-bold text-white text-center leading-[1.05] tracking-tighter transition-all duration-700 cursor-default pointer-events-auto drop-shadow-2xl select-none hover:text-[#CCFF00]">
            A MERN STACK <br /> DEVELOPER
          </h1>
        </div>
      </div>

      <div className="relative z-10 w-full bg-black/80 backdrop-blur-md">
        <Journey />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
