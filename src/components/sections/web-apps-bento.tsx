"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WebApp } from "@/types/project";

interface WebAppsBentoProps {
  apps: WebApp[];
}

export function WebAppsBento({ apps }: WebAppsBentoProps) {
  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-black/50">No web apps to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-black/10 auto-rows-[280px]">
        {apps.map((app, index) => (
          <BentoCard
            key={app.slug}
            app={app}
            className={cn(
              index === 0 && "md:col-span-2 md:row-span-2",
              index === 1 && "lg:row-span-2"
            )}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/web">
            View all web apps <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface BentoCardProps {
  app: WebApp;
  className?: string;
}

function BentoCard({ app, className }: BentoCardProps) {
  return (
    <Link
      href={`/web/${app.slug}`}
      className={cn(
        "group relative overflow-hidden bg-white",
        "transition-all duration-300 hover:z-10",
        className
      )}
    >
      {/* Background image */}
      <Image
        src={app.image.hero}
        alt={app.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
        width={1920}
        height={1080}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-3">
          {app.stack.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-[10px] tracking-wider uppercase bg-white/10 backdrop-blur-sm text-white border-white/20"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <h3 className="font-heading text-2xl md:text-3xl mb-2 text-white">
          {app.title}
        </h3>

        <p className="text-sm text-white/70 line-clamp-2 mb-4">
          {app.description}
        </p>

        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm text-white flex items-center gap-1 tracking-wide uppercase">
            View project <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
