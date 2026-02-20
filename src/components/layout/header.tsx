"use client";

import { Github, Linkedin, Menu, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { socialMedia } from "@/lib/constants";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Web Apps", href: "/web" },
  { name: "Mobile Apps", href: "/mobile" },
  { name: "Blog", href: "/blog" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-black/10 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={32}
              height={24}
              src="/logo.svg"
              alt="Logo"
              className="h-8 w-8 grayscale"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black/70 hover:text-black transition-colors text-sm tracking-wide uppercase"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={socialMedia.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/50 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={socialMedia.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/50 hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href={socialMedia.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/50 hover:text-black transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </Link>
            <Link
              href={socialMedia.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/50 hover:text-black transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white border-l border-black/10"
            >
              <div className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-black text-xl font-heading hover:text-black/60 transition-colors tracking-wide uppercase"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-black/10">
                  <Link
                    href={socialMedia.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/50 hover:text-black transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href={socialMedia.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/50 hover:text-black transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href={socialMedia.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/50 hover:text-black transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                  <Link
                    href={socialMedia.twitter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/50 hover:text-black transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
