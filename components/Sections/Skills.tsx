"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiCloudflare,
  SiDigitalocean,
  SiFirebase,
  SiVercel,
  SiRender,
  SiBootstrap,
  SiElectron,
  SiElasticsearch,
  SiEjs,
  SiJsonwebtokens,
  SiRabbitmq,
  SiSocket,
  SiSass,
  SiRedux,
  SiVite,
  SiNginx,
  SiPostgresql,
  SiRedis,
  SiFigma,
  SiDocker,
  SiKubernetes,
  SiPostman,
} from "react-icons/si";

const skills = [
  { name: "React", color: "#61DAFB", icon: SiReact },
  { name: "Next.js", color: "#ffffff", icon: SiNextdotjs },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  { name: "Node.js", color: "#339933", icon: SiNodedotjs },
  { name: "Express", color: "#ffffff", icon: SiExpress },
  { name: "MongoDB", color: "#47A248", icon: SiMongodb },
  { name: "Css", color: "#1572B6", icon: SiCss },
  { name: "Html", color: "#E34F26", icon: SiHtml5 },
  { name: "Javascript", color: "#F7DF1E", icon: SiJavascript },
  { name: "Cloudflare", color: "#F38020", icon: SiCloudflare },
  { name: "Digitalocean", color: "#0080FF", icon: SiDigitalocean },
  { name: "Firebase", color: "#FFCA28", icon: SiFirebase },
  { name: "Vercel", color: "#ffffff", icon: SiVercel },
  { name: "Render", color: "#46E3B7", icon: SiRender },
  { name: "Bootstrap", color: "#7952B3", icon: SiBootstrap },
  { name: "Electron", color: "#47848F", icon: SiElectron },
  { name: "Elasticsearch", color: "#005571", icon: SiElasticsearch },
  { name: "Ejs", color: "#B4CA65", icon: SiEjs },
  { name: "Jsonwebtokens", color: "#FB015B", icon: SiJsonwebtokens },
  { name: "Rabbitmq", color: "#FF6600", icon: SiRabbitmq },
  { name: "Socket", color: "#ffffff", icon: SiSocket },
  { name: "Sass", color: "#CC6699", icon: SiSass },
  { name: "Redux", color: "#764ABC", icon: SiRedux },
  { name: "Vite", color: "#646CFF", icon: SiVite },
  { name: "Nginx", color: "#009639", icon: SiNginx },
  { name: "Postgresql", color: "#4169E1", icon: SiPostgresql },
  { name: "Redis", color: "#DC382D", icon: SiRedis },
  { name: "Figma", color: "#F24E1E", icon: SiFigma },
  { name: "Docker", color: "#2496ED", icon: SiDocker },
  { name: "Kubernetes", color: "#326CE5", icon: SiKubernetes },
  { name: "Postman", color: "#FF6C37", icon: SiPostman },
];

function chunkArray(arr: any[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function SkillCard({ name, color, icon: Icon }: any) {
  // Using flex-1 guarantees they will evenly distribute across the screen and never wrap lines
  return (
    <div className="flex flex-col items-center justify-center flex-1 max-w-[240px] h-[160px] md:h-[260px] p-2 md:p-6 rounded-[1rem] md:rounded-[2rem] border border-white/10 bg-black/50 backdrop-blur-2xl group hover:-translate-y-4 transition-transform duration-300 shadow-2xl relative overflow-hidden">
      <div className="p-3 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 mb-2 md:mb-6 group-hover:bg-white/10 transition-colors">
        <Icon className="w-8 h-8 md:w-14 md:h-14" style={{ color: color, filter: `drop-shadow(0 0 20px ${color})` }} />
      </div>
      <p className="font-sans text-xs md:text-xl font-bold tracking-wider text-[#ededed] drop-shadow-md text-center truncate w-full px-1 md:px-2 relative z-10">
        {name}
      </p>
    </div>
  );
}

function SkillRow({ groupSkills, index, totalSets, scrollYProgress }: any) {
  // Distribute the entrance animation smoothly across 90% of the total container
  const usableProgress = 0.9;
  const interval = usableProgress / totalSets;
  
  const startProgress = index * interval;
  const endProgress = startProgress + interval;
  
  // Calculate dynamic resting Y offsets based on the number of groups!
  // Ensures ALL rows fit on the screen without spilling off the bottom.
  const maxRestingY = 65; 
  const minRestingY = 25; 
  // Gap distributed evenly between first and last row
  const computedGap = totalSets > 1 ? (maxRestingY - minRestingY) / (totalSets - 1) : 0;
  // Cap the gap to max 18vh per step, so rows don't fly apart if there are only 2 sets
  const restingY = minRestingY + index * Math.min(computedGap, 18); 
  
  // Use numeric transform + MotionTemplate to avoid string interpolation bugs in Framer Motion
  const targetY = useTransform(scrollYProgress, [startProgress, endProgress], [100, restingY]);
  const y = useMotionTemplate`${targetY}vh`;

  return (
    <motion.div 
      style={{ y, zIndex: 10 + index }}
      // flex-row strictly forces 4 cards to side-by-side arrangement horizontally
      className="absolute w-full px-2 md:px-6 flex flex-row items-center justify-center gap-2 md:gap-8 pointer-events-auto"
    >
      {groupSkills.map((skill: any) => (
        <SkillCard key={skill.name} {...skill} />
      ))}
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamically chunk exactly 4 skills into rows as requested
  const skillSets = chunkArray(skills, 4);
  const totalSets = skillSets.length;

  // Dynamically expand container height depending on how many total rows we have to animate 
  const sectionHeight = `calc(100vh + ${totalSets * 30}vh)`;

  return (
    <section ref={containerRef} className="relative w-full z-10" style={{ height: sectionHeight }}>
      {/* Pinned container locks in place while scroll physics happen inside */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center pointer-events-none">
        
        {/* Title is frozen explicitly at top */}
        <div className="absolute top-16 md:top-24 z-0 text-center w-full pointer-events-auto">
          <h2 className="text-[clamp(3.5rem,7vw,7rem)] font-bold drop-shadow-2xl font-sans tracking-tighter px-4">
            My <span className="text-[#CCFF00]">Skills</span>
          </h2>
        </div>

        {/* Dynamic Skill Rows - 4 items mapped horizontally floating from bottom */}
        {skillSets.map((group, i) => (
          <SkillRow 
            key={i} 
            groupSkills={group} 
            index={i} 
            totalSets={totalSets} 
            scrollYProgress={scrollYProgress} 
          />
        ))}

      </div>
    </section>
  );
}
