"use client";

import { ArrowRight, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MobileApp } from "@/types/project";

interface MobileAppsBentoProps {
  apps: MobileApp[];
}

export function MobileAppsBento({ apps }: MobileAppsBentoProps) {
  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <Smartphone className="h-16 w-16 mx-auto text-primary/50" />
        </div>
        <p className="text-xl text-foreground/70 mb-2">Coming Soon!</p>
        <p className="text-foreground/50">
          Stay tuned for exciting mobile projects
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
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
          <Link href="/mobile">
            View all mobile apps <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface BentoCardProps {
  app: MobileApp;
  className?: string;
}

function BentoCard({ app, className }: BentoCardProps) {
  return (
    <Link
      href={`/mobile/${app.slug}`}
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-card border border-border",
        "transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1",
        className
      )}
    >
      {/* Background image */}
      <Image
        src={app.image.hero}
        alt={app.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        height={2688}
        width={1242}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* App icon */}
      <div className="absolute top-4 right-4">
        <Image
          src={app.image.appIcon}
          alt={`${app.title} icon`}
          width={48}
          height={48}
          className="rounded-xl shadow-lg border border-border/50"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-3">
          {app.stack.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs bg-background/80 backdrop-blur-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <h3 className="font-heading text-2xl md:text-3xl mb-2 group-hover:text-primary transition-colors">
          {app.title}
        </h3>

        <p className="text-sm text-foreground/80 line-clamp-2 mb-4">
          {app.description}
        </p>

        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium text-primary flex items-center gap-1">
            View app <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
