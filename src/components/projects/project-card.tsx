import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MobileApp, WebApp } from "@/types/project";

interface ProjectCardProps {
  project: WebApp | MobileApp;
  type: "web" | "mobile";
}

export function ProjectCard({ project, type }: ProjectCardProps) {
  const href = `/${type}/${project.slug}`;

  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={project.image.thumbnail}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              width={1920}
              height={1080}
            />
            <div className="absolute top-2 right-2">
              <ExternalLink className="w-5 h-5 text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-heading text-xl mb-2 group-hover:text-primary-foreground/80 transition-colors">
            {project.title}
          </CardTitle>
          <p className="text-card-foreground/80 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.stack.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.stack.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
