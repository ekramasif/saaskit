import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, User } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!blog || !blog.published) {
    notFound();
  }

  // Increment view count
  await prisma.blog.update({
    where: { id: blog.id },
    data: { views: { increment: 1 } },
  });

  return (
    <div className="light min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Featured Image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 pt-32 pb-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <Link href="/blog">
              <Button
                variant="outline"
                className="mb-8 border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Categories */}
            {blog.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {blog.categories.map((cat: any) => (
                  <Badge
                    key={cat.categoryId}
                    className="rounded-full bg-white/20 backdrop-blur-md text-white border-white/30 font-semibold"
                  >
                    {cat.category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-purple-100">
              <div className="flex items-center gap-2">
                {blog.author.image ? (
                  <img
                    src={blog.author.image}
                    alt={blog.author.name || "Author"}
                    className="h-10 w-10 rounded-full border-2 border-white/30"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <span className="font-semibold">{blog.author.name || "Anonymous"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{blog.publishedAt && formatDate(blog.publishedAt)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage && (
        <section className="relative -mt-12 pb-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                <div
                  className="h-96 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${blog.featuredImage})` }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-12 rounded-2xl border-2 border-purple-100 bg-purple-50 p-8">
                <p className="text-xl leading-relaxed text-gray-700 font-medium">
                  {blog.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {blog.content}
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-16 rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-purple-50 to-blue-50 p-8">
              <p className="mb-4 text-sm font-bold uppercase tracking-wide text-purple-600">
                Written by
              </p>
              <div className="flex items-center gap-4">
                {blog.author.image ? (
                  <img
                    src={blog.author.image}
                    alt={blog.author.name || "Author"}
                    className="h-16 w-16 rounded-full border-2 border-purple-300"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <User className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {blog.author.name || "Anonymous"}
                  </p>
                  <p className="text-gray-600">{blog.author.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex justify-center">
              <Link href="/blog">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                >
                  View All Posts
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
