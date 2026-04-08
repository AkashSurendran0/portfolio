import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Layout/ThemeProvider";
import NoiseOverlay from "@/components/Layout/NoiseOverlay";
import CustomCursor from "@/components/Layout/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akash Portfolio",
  description: "High-performance 3D-immersive personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white selection:bg-[#CCFF00] selection:text-black overflow-x-clip">
        <ThemeProvider>
          <NoiseOverlay />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

