"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { partners } from "@/lib/constants";

export function AboutMe() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-black/20" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">
              Trusted by
            </p>
            <div className="h-[1px] w-12 bg-black/20" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.4, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="grayscale transition-all cursor-default"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 md:h-14 w-auto object-contain"
                  height={60}
                  width={200}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
