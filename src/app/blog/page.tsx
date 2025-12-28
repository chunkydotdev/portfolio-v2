import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <h1 className="font-heading text-4xl md:text-5xl mb-4">Blog</h1>
        <p className="text-foreground/70 text-lg mb-12">
          Thoughts on development, design, and building products
        </p>

        {posts.length === 0 ? (
          <p className="text-foreground/60">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="hover:scale-[1.01] transition-transform">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-4 text-sm text-foreground/50">
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
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
