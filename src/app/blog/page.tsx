import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { BookOpen, Calendar, User, ArrowRight, Zap, Twitter, Github, Linkedin } from "lucide-react";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    include: {
      author: true,
      categories: {
        include: { category: true },
      },
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="light min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <BookOpen className="h-4 w-4" />
              <span>Blog & News</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Latest Updates & Insights
            </h1>
            <p className="text-xl text-purple-100 md:text-2xl">
              Stay up to date with the latest news, tutorials, and announcements from our team.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 50C1200 46.7 1320 33.3 1380 26.7L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogs.map((blog: any) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <article className="group h-full rounded-3xl border-2 border-gray-200 bg-white overflow-hidden transition-all hover:border-purple-500 hover:shadow-2xl hover:-translate-y-2">
                    {blog.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform group-hover:scale-110"
                          style={{ backgroundImage: `url(${blog.featuredImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {blog.categories.map((cat: any) => (
                          <Badge
                            key={cat.categoryId}
                            className="rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold"
                          >
                            {cat.category.name}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="mb-3 text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="mb-4 text-gray-600 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{blog.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{blog.publishedAt && formatDate(blog.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-purple-600 font-bold group-hover:gap-3 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-3xl border-2 border-gray-200 bg-white p-12 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <h3 className="mb-2 text-2xl font-bold text-gray-900">No blog posts yet</h3>
                <p className="text-gray-600">Check back soon for new content!</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Modern Design */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container px-4 py-16 md:px-6 md:py-20">
          {/* Top Section */}
          <div className="grid gap-12 lg:grid-cols-5 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-2.5 rounded-xl">
                    <Zap className="h-6 w-6 text-white" fill="white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    AI SaaS Kit
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    Next.js 15 Starter
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                The complete Next.js 15 starter kit for building AI-powered SaaS applications. Ship faster with built-in auth, payments, and AI integration.
              </p>
              <div className="flex gap-3">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500 transition-all overflow-hidden"
                  aria-label="Twitter"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Twitter className="relative h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500 transition-all overflow-hidden"
                  aria-label="GitHub"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Github className="relative h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500 transition-all overflow-hidden"
                  aria-label="LinkedIn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Linkedin className="relative h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="mb-5 text-sm font-black text-white uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Documentation</span>
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">API Reference</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Blog</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Changelog</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-5 text-sm font-black text-white uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Careers</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Partners</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-5 text-sm font-black text-white uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Cookie Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">License</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-sm text-gray-400">
                © 2025 AI SaaS Starter Kit. All rights reserved.
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-gray-400">All systems operational</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link href="/docs" className="text-gray-400 hover:text-white transition-colors font-medium">
                Documentation
              </Link>
              <Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors font-medium">
                API
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors font-medium">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
