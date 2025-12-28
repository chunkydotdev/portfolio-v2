import { AboutMe } from "@/components/sections/about-me";
import { BlogPreview } from "@/components/sections/blog-preview";
import { ContactForm } from "@/components/sections/contact-form";
import { Hero } from "@/components/sections/hero";
import { MobileAppsBento } from "@/components/sections/mobile-apps-bento";
import { WebAppsBento } from "@/components/sections/web-apps-bento";
import { getRecentBlogPosts } from "@/lib/blog";
import { getFeaturedMobileApps, getFeaturedWebApps } from "@/lib/projects";

export default function Home() {
  const featuredWebApps = getFeaturedWebApps().slice(0, 4);
  const featuredMobileApps = getFeaturedMobileApps().slice(0, 4);
  const recentPosts = getRecentBlogPosts(4);

  return (
    <main>
      <Hero />

      <section className="py-20 bg-secondary/30">
        <AboutMe />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl md:text-5xl mb-12">Web Apps</h2>
          <WebAppsBento apps={featuredWebApps} />
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl md:text-5xl mb-12">
            Mobile Apps
          </h2>
          <MobileAppsBento apps={featuredMobileApps} />
        </div>
      </section>

      <section className="py-20">
        <BlogPreview posts={recentPosts} />
      </section>

      <section className="py-20 bg-secondary/30">
        <ContactForm />
      </section>
    </main>
  );
}
