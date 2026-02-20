import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on development, design, and building products',
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8 text-black/40 hover:text-black">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <h1 className="font-heading text-4xl md:text-5xl">Blog</h1>
          <div className="h-[1px] flex-1 bg-black/10" />
        </div>
        <p className="text-black/50 text-lg mb-12">
          Thoughts on development, design, and building products
        </p>

        {posts.length === 0 ? (
          <p className="text-black/40">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="divide-y divide-black/10">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="py-8 group-hover:pl-4 transition-all duration-300">
                  <h2 className="font-heading text-2xl mb-2 group-hover:text-black/70 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-black/50 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-black/30">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readingTime}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] tracking-wider uppercase">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
