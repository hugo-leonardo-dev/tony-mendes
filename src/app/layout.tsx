import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tony Mendes — Motion Designer & 3D Artist",
    template: "%s — Tony Mendes",
  },
  description:
    "Portfolio of Tony Mendes, a motion designer and 3D artist specializing in animation, VFX, and visual storytelling.",
  keywords: [
    "motion design",
    "3D artist",
    "animation",
    "VFX",
    "visual effects",
    "Blender",
    "Cinema 4D",
    "After Effects",
  ],
  openGraph: {
    title: "Tony Mendes — Motion Designer & 3D Artist",
    description:
      "Portfolio of Tony Mendes, showcasing 3D animation and motion design work.",
    type: "website",
    locale: "en_US",
    siteName: "Tony Mendes Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tony Mendes — Motion Designer & 3D Artist",
    description:
      "Portfolio of Tony Mendes, showcasing 3D animation and motion design work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
