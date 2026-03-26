"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer">("default");

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[10000] mix-blend-difference hidden md:block"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: cursorType === "pointer" ? 2.5 : 1,
        backgroundColor: cursorType === "pointer" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    />
  );
}
