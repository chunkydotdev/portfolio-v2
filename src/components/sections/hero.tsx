"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Characters used for the scramble effect
const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

function useTextScramble(text: string, trigger: boolean, speed = 30) {
  const [display, setDisplay] = useState(text);
  const iteration = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    iteration.current = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration.current) return text[i];
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("")
      );

      iteration.current += 1 / 3;
      if (iteration.current >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, trigger, speed]);

  return display;
}

// Animated character component
function AnimChar({
  char,
  delay,
  isItalic,
}: {
  char: string;
  delay: number;
  isItalic?: boolean;
}) {
  if (char === " ") {
    return <span className="inline-block w-[0.25em]">&nbsp;</span>;
  }

  return (
    <motion.span
      className={`inline-block ${isItalic ? "italic" : ""}`}
      initial={{ y: "120%", rotateX: 90, opacity: 0 }}
      animate={{ y: "0%", rotateX: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {char}
    </motion.span>
  );
}

// Animated line — wraps each character
function AnimLine({
  children,
  baseDelay,
  italic,
}: {
  children: string;
  baseDelay: number;
  italic?: boolean;
}) {
  const chars = children.split("");

  return (
    <div className="overflow-hidden pb-6 md:pb-8">
      <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tight">
        {chars.map((char, i) => (
          <AnimChar
            key={i}
            char={char}
            delay={baseDelay + i * 0.03}
            isItalic={italic}
          />
        ))}
      </h1>
    </div>
  );
}

// Scramble word that decodes on mount
function ScrambleWord({
  text,
  className,
  delay,
}: {
  text: string;
  className?: string;
  delay: number;
}) {
  const [started, setStarted] = useState(false);
  const display = useTextScramble(text, started, 40);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.span
      className={`inline-block font-mono text-[0.6em] align-baseline tracking-tighter ${
        className ?? ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.01, delay }}
    >
      {display}
    </motion.span>
  );
}

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const LINE_1 = "Building";

  // Swap to real profile after the slide-up animation completes
  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden bg-white grain">
      {/* Profile image — loading version crossfades to real */}
      <motion.div
        className="absolute right-0 bottom-0 w-[70vw] h-[90vh] pointer-events-none select-none hidden md:block"
        initial={{ y: "100%", x: 0, opacity: 0 }}
        animate={{ y: 0, x: [0, -30, 25, -30, 20, -25, 15, -20, 10, -15, 8, -10, 5, -5, 0], opacity: 1 }}
        transition={{
          y: { duration: 0.8, ease: "easeIn" },
          x: { duration: 0.8, ease: "linear" },
          opacity: { duration: 0.4 },
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/loading-profile.png"
            alt=""
            fill
            className={`object-contain object-bottom grayscale ${imageLoaded ? "invisible" : "visible"}`}
            priority
          />
          <Image
            src="/assets/profile.png"
            alt="profile"
            fill
            className={`object-contain object-bottom grayscale ${imageLoaded ? "visible" : "invisible"}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Mobile profile image */}
      <motion.div
        className="absolute right-0 bottom-0 w-full h-[50vh] pointer-events-none select-none md:hidden"
        initial={{ y: "100%", x: 0, opacity: 0 }}
        animate={{ y: 0, x: [0, -30, 25, -30, 20, -25, 15, -20, 10, -15, 8, -10, 5, -5, 0], opacity: 0.6 }}
        transition={{
          y: { duration: 0.8, ease: "easeIn" },
          x: { duration: 0.8, ease: "linear" },
          opacity: { duration: 0.4 },
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/loading-profile-sm.png"
            alt=""
            fill
            className={`object-contain object-bottom grayscale ${imageLoaded ? "invisible" : "visible"}`}
            priority
          />
          <Image
            src="/assets/profile.png"
            alt=""
            fill
            className={`object-contain object-bottom grayscale ${imageLoaded ? "visible" : "invisible"}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Intro line */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.div
              className="h-[2px] bg-black"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            />
            <p className="font-medium tracking-[0.3em] uppercase text-xs md:text-sm">
              Freelance Developer
            </p>
          </motion.div>

          {/* Main headline — per-character stagger, one word per row */}
          <AnimLine baseDelay={1.3}>{LINE_1}</AnimLine>

          {/* "digital" — scramble effect */}
          <div className="overflow-hidden pb-6 md:pb-8">
            <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tight">
              <ScrambleWord text="digital" className="italic" delay={1.6} />
            </h1>
          </div>

          {/* "experiences" — per-character stagger */}
          <AnimLine baseDelay={1.9}>experiences</AnimLine>

          {/* Description and CTA */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <div>
              <motion.div
                className="h-[2px] bg-black mb-6"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
              />
              <p className="text-lg md:text-xl text-black/60 max-w-md leading-relaxed">
                I craft web and mobile applications that turn ideas into
                polished, user-focused products.
              </p>
            </div>

            <div className="flex gap-4">
              <Button asChild variant="outline" size="lg" className="text-base px-8 bg-white border-black">
                <Link href="#contact">Let&apos;s talk</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-white border-black">
                <Link href="/web">View work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2.8, duration: 0.5 },
          y: { delay: 2.8, duration: 1.5, repeat: Infinity },
        }}
      >
        <ArrowDown className="h-5 w-5 text-black/30" />
      </motion.div>

      {/* Side accent */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <motion.div
          className="w-[1px] bg-black/20"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        />
        <span className="text-[10px] text-black/40 [writing-mode:vertical-lr] tracking-[0.4em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-[1px] bg-black/20"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        />
      </motion.div>
    </div>
  );
}
