import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { MobileApp, WebApp } from "@/types/project";

interface ProjectCardProps {
  project: WebApp | MobileApp;
  type: "web" | "mobile";
}

export function ProjectCard({ project, type }: ProjectCardProps) {
  const href = `/${type}/${project.slug}`;

  return (
    <Link href={href} className="block group bg-white">
      <div className="h-full transition-all duration-300">
        <div className="relative overflow-hidden">
          <Image
            src={project.image.thumbnail}
            alt={project.title}
            className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading text-xl group-hover:text-black/70 transition-colors">
              {project.title}
            </h3>
            <ArrowRight className="w-4 h-4 text-black/0 group-hover:text-black/40 transition-all -translate-x-2 group-hover:translate-x-0" />
          </div>
          <p className="text-black/50 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-[10px] tracking-wider uppercase">
                {tech}
              </Badge>
            ))}
            {project.stack.length > 3 && (
              <Badge variant="outline" className="text-[10px] tracking-wider uppercase">
                +{project.stack.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
