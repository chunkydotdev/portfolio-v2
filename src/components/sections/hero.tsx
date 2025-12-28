"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/50">
      {/* Profile image background */}
      <motion.div
        className="absolute right-0 bottom-0 w-[70vw] h-[90vh] pointer-events-none select-none hidden md:block"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          y: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 0.4 },
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/profile.png"
            alt="profile"
            fill
            className="object-contain object-bottom"
            priority
          />
          {/* Gradient fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background" />
        </div>
      </motion.div>

      {/* Mobile profile image */}
      <motion.div
        className="absolute right-0 bottom-0 w-full h-[50vh] pointer-events-none select-none md:hidden"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 0.3 }}
        transition={{
          y: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 0.4 },
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/profile.png"
            alt=""
            fill
            className="object-contain object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/80" />
        </div>
      </motion.div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(144, 97, 92, 1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(144, 97, 92, 1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Intro line */}
          <motion.p
            className="text-primary font-medium tracking-wider uppercase text-sm md:text-base mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Freelance Developer
          </motion.p>

          {/* Main headline */}
          <div className="overflow-hidden pb-2">
            <motion.h1
              className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Building
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h1
              className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className="text-primary">digital</span> experiences
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h1
              className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              that matter.
            </motion.h1>
          </div>

          {/* Description and CTA */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-lg md:text-xl text-foreground/70 max-w-md">
              I craft web and mobile applications that turn ideas into polished,
              user-focused products.
            </p>

            <div className="flex gap-4">
              <Button asChild size="lg" className="text-base px-8">
                <Link href="#contact">Let&apos;s talk</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
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
          opacity: { delay: 1.2, duration: 0.5 },
          y: { delay: 1.2, duration: 1.5, repeat: Infinity },
        }}
      >
        <ArrowDown className="h-6 w-6 text-foreground/40" />
      </motion.div>

      {/* Side accent */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        <span className="text-xs text-foreground/50 [writing-mode:vertical-lr] tracking-widest uppercase">
          Scroll to explore
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </motion.div>
    </div>
  );
}
