"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { partners } from "@/lib/constants";

export function AboutMe() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Previous partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-wider text-foreground/50 mb-6">
            Trusted by companies like
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="grayscale hover:grayscale-0 transition-all cursor-default"
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
