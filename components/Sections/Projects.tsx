"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

// Project data reimagined without heavy background images
const projects = [
  {
    title: "Careerlink - AI powered social media - job hunt platform",
    description: "Careerlink is an AI-powered social media platform designed to revolutionize the job-hunting experience. It leverages advanced artificial intelligence to ease the process of the job workflow for the users. Users can create profiles/register companies, upload resumes, and let the AI analyze their skills and create tailored resume / cover letter to increase the chances of getting shortlisted. The platform also features intelligent application tracking, start to end interview schduling, video/voice call features.",
    tags: ["Next.js", "Microservices", "Tailwind", "RabbitMQ", "WebRTC", "WebSockets", "Elasticsearch", "Docker", "Redis"],
    github: "https://github.com/AkashSurendran0/CareerLink",
    live: "#",
  },
  {
    title: "Dejavu - Mens fashion store",
    description: "An ecommerce platform for men's fashion built in MVC architecture.",
    tags: ["Node.js", "Express", "EJS", "Mongodb", "Bootstrap"],
    github: "https://github.com/AkashSurendran0/Dejavu",
    live: "https://dejavu-1-vkun.onrender.com/",
  },
  {
    title: "Inventory Management System",
    description: "An inventory management system for small businesses.",
    tags: ["Node.js", "Express", "React", "Mongodb", "Tailwind"],
    github: "https://github.com/AkashSurendran0/inventory_management_ts",
    live: "https://inventory-management-ts.vercel.app",
  },
  {
    title: "ClimaSnap",
    description: "A desktop application that provides real-time weather updates for any location around the world.",
    tags: ["React", "Tailwind", "OpenWeatherMap API", "Electron"],
    github: "https://github.com/AkashSurendran0/Weather_app",
    live: "https://github.com/AkashSurendran0/Weather_app",
  },
  {
    title: "Olx-Clone",
    description: "A clone of Olx website built with React and Tailwind.",
    tags: ["React", "Tailwind"],
    github: "https://github.com/AkashSurendran0/Olx_clone",
    live: "",
  },
  {
    title: "Netflix-Clone",
    description: "A clone of Netflix website built with React and Tailwind.",
    tags: ["React", "Tailwind"],
    github: "https://github.com/AkashSurendran0/Netflix_clone",
    live: "",
  }
  
];

export default function Projects() {
  return (
    <section className="relative w-full py-40 px-6 max-w-7xl mx-auto z-10">
      <h2 className="text-[clamp(3.5rem,7vw,7rem)] mb-20 font-bold font-sans text-center tracking-tighter drop-shadow-2xl">
        Selected <span className="text-[#CCFF00]">Works</span>
      </h2>
      
      {/* Sleek Grid Layout instead of massive full-width wrappers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full place-items-center">
        {projects.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="group relative flex flex-col justify-between w-full max-w-2xl h-auto min-h-[380px] p-8 md:p-12 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:-translate-y-4 hover:bg-white/5 hover:border-[#CCFF00]/50 transition-all duration-500 shadow-2xl"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-100"
                 style={{ background: 'radial-gradient(circle at 100% 0%, rgba(204, 255, 0, 0.15) 0%, transparent 60%)' }} />

            <div className="relative z-10 w-full mb-8">
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                {p.tags.map(t => (
                  <span key={t} className="font-mono text-xs md:text-sm border border-white/20 text-[#ededed] px-3 py-1 rounded-full group-hover:border-[#CCFF00] group-hover:text-[#CCFF00] transition-colors duration-300">
                    {t}
                  </span>
                ))}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-sans font-bold uppercase tracking-tighter mb-4 text-white drop-shadow-md group-hover:text-[#CCFF00] transition-colors duration-300">
                {p.title}
              </h3>
              
              <p className="text-sm md:text-lg font-mono text-white/70 leading-relaxed drop-shadow-md group-hover:text-white/90 transition-colors duration-300">
                {p.description}
              </p>
            </div>
            
            <div className="flex gap-4 relative z-10 w-full pointer-events-auto">
              <a href={p.live} className="flex-1 flex items-center justify-center gap-2 font-mono text-xs md:text-sm uppercase tracking-widest text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all duration-300 bg-black/50 py-3 md:py-4 rounded-xl border border-[#CCFF00]/30 hover:border-[#CCFF00] drop-shadow-md group/btn">
                <span>Deploy</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
              </a>
              <a href={p.github} className="flex-1 flex items-center justify-center gap-2 font-mono text-xs md:text-sm uppercase tracking-widest text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition-all duration-300 bg-black/50 py-3 md:py-4 rounded-xl border border-[#6D28D9]/30 hover:border-[#6D28D9] drop-shadow-md group/btn">
                <span>Code</span>
                <Code className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
              </a>
            </div>
            
          </motion.div>
        ))}
      </div>
    </section>
  );
}
