"use client";

import { useState } from "react";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full pt-32 pb-20 px-6 flex flex-col items-center justify-center z-10">
      <div className="max-w-2xl w-full">
        <h2 className="text-fluid-h2 mb-12 font-bold font-sans text-center">
          Let's <span className="text-[#CCFF00]">Connect</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full mb-24">
          <div className="group relative">
            <input 
              name="name"
              type="text" 
              required
              className="peer w-full bg-transparent border-b border-white/20 px-0 py-4 font-mono text-lg text-white placeholder-transparent focus:border-[#CCFF00] focus:outline-none transition-colors"
              placeholder="Name"
            />
            <label className="pointer-events-none absolute left-0 top-4 font-mono text-white/50 transition-all peer-placeholder-shown:text-lg peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#CCFF00] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              Name //
            </label>
          </div>
          
          <div className="group relative">
            <input 
              name="email"
              type="email" 
              required
              className="peer w-full bg-transparent border-b border-white/20 px-0 py-4 font-mono text-lg text-white placeholder-transparent focus:border-[#CCFF00] focus:outline-none transition-colors"
              placeholder="Email"
            />
            <label className="pointer-events-none absolute left-0 top-4 font-mono text-white/50 transition-all peer-placeholder-shown:text-lg peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#CCFF00] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              Email //
            </label>
          </div>

          <div className="group relative">
            <textarea 
              name="message"
              required
              rows={4}
              className="peer w-full resize-none bg-transparent border-b border-white/20 px-0 py-4 font-mono text-lg text-white placeholder-transparent focus:border-[#CCFF00] focus:outline-none transition-colors"
              placeholder="Message"
            />
            <label className="pointer-events-none absolute left-0 top-4 font-mono text-white/50 transition-all peer-placeholder-shown:text-lg peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#CCFF00] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              Message //
            </label>
          </div>

          <button 
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="mt-8 relative overflow-hidden flex items-center justify-center w-full sm:w-fit px-12 py-4 border border-[#CCFF00] text-[#CCFF00] font-mono group hover:bg-[#CCFF00] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 uppercase tracking-widest font-bold">
              {status === "idle" && "Send_Message"}
              {status === "loading" && "Transmitting..."}
              {status === "success" && "Message_Sent"}
              {status === "error" && "Error_Retry"}
            </span>
          </button>
        </form>

        {/* Social Links Footer */}
        <div className="w-full flex flex-col items-center justify-center border-t border-white/10 pt-10">
          <p className="font-mono text-white/50 mb-6 uppercase tracking-widest text-sm">Find me on</p>
          <div className="flex gap-8 items-center justify-center">
            <a href="https://www.linkedin.com/in/akash-surendran-a1514322a" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#0077b5] transition-colors hover:scale-110 duration-300">
              <FaLinkedin size={28} />
            </a>
            <a href="https://www.instagram.com/a.kaashhh" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#E1306C] transition-colors hover:scale-110 duration-300">
              <FaInstagram size={28} />
            </a>
            <a href="https://wa.me/6282551479" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#25D366] transition-colors hover:scale-110 duration-300">
              <FaWhatsapp size={28} />
            </a>
            <a href="mailto:akashsurendran.personal@gmail.com" className="text-white/70 hover:text-[#CCFF00] transition-colors hover:scale-110 duration-300">
              <FaEnvelope size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
