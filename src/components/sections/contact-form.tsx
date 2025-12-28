'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Github, Linkedin, Youtube, Twitter, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail } from '@/app/actions/contact'
import { socialMedia } from '@/lib/constants'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await sendContactEmail({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      })

      if (result.success) {
        setSubmitted(true)
        toast.success('Message sent! I will get back to you soon.')
      } else {
        toast.error(result.error || 'Failed to send message')
      }
    })
  }

  const socialLinks = [
    { icon: Github, url: socialMedia.github.url, label: 'GitHub' },
    { icon: Linkedin, url: socialMedia.linkedin.url, label: 'LinkedIn' },
    { icon: Youtube, url: socialMedia.youtube.url, label: 'YouTube' },
    { icon: Twitter, url: socialMedia.twitter.url, label: 'Twitter' },
  ]

  return (
    <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full">
        <motion.h2
          className="font-heading text-4xl md:text-5xl text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's jam! 🎸
        </motion.h2>
        <motion.p
          className="text-center text-foreground/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Contact me if you have any questions or just want to say hi!
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4 bg-secondary/30 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div>
                <Input
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={isPending}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                  disabled={isPending}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  required
                  disabled={isPending}
                  className="bg-background/50 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full"
                size="lg"
              >
                {isPending ? (
                  'Sending...'
                ) : (
                  <>
                    Send <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="text-center py-12 bg-secondary/30 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <p className="text-2xl font-heading mb-2">Thank you!</p>
              <p className="text-foreground/80">
                I will be in touch as soon as I can!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label={social.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.2 }}
            >
              <social.icon className="h-6 w-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 text-foreground/60 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Magnus Junghard Jägryd. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  )
}
