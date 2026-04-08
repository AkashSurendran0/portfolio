"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const milestones = [
  { year: "2023", title: "Junior Engineer" },
  { year: "2024", title: "Full stack development @ Brototype" },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      if (!lineRef.current) return;

      const pathLength = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      const items = gsap.utils.toArray(".milestone-text");
      items.forEach((item: any) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -50, filter: "blur(10px)" },
          { 
            opacity: 1, x: 0, filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 px-6 max-w-5xl mx-auto z-10">
      <h2 className="text-fluid-h2 mb-32 font-bold text-center">
        The <span className="text-[#CCFF00]">Journey</span>
      </h2>
      
      <div className="relative flex justify-center">
        <svg 
          className="absolute top-0 bottom-0 h-full w-4 left-1/2 -translate-x-1/2" 
          viewBox="0 0 16 1000" 
          preserveAspectRatio="none"
        >
          <path 
            ref={lineRef}
            d="M 8 0 L 8 1000" 
            stroke="#6D28D9" 
            strokeWidth="4" 
            fill="none" 
            style={{ filter: "drop-shadow(0 0 10px #6D28D9)" }}
          />
        </svg>

        <div className="flex flex-col gap-40 w-full mt-10">
          {milestones.map((m, i) => (
            <div key={i} className={`flex items-center w-full ${i % 2 === 0 ? "justify-start text-right" : "justify-end text-left"}`}>
              <div className={`milestone-text w-5/12 ${i % 2 === 0 ? "pr-12 md:pr-24" : "pl-12 md:pl-24"}`}>
                <h3 className="font-sans text-4xl md:text-6xl font-bold mb-4 text-white">
                  {m.year}
                </h3>
                <p className="font-mono text-lg md:text-2xl text-[#CCFF00]">{m.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
