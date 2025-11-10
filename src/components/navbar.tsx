"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "API", href: "/api-docs" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Enhanced with Animation */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient bg-[length:200%_auto]" />

              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" fill="white" />
              </div>
            </div>

            {/* Logo text */}
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                AI SaaS Kit
              </span>
              <span className="text-[10px] font-semibold text-gray-500 -mt-1">
                Next.js 15 Starter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Modern Style */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group px-4 py-2"
                >
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-purple-600"
                        : "text-gray-700 group-hover:text-purple-600"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-lg bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons - Enhanced */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/auth/signin">
              <Button
                variant="ghost"
                className="font-semibold hover:bg-purple-50 hover:text-purple-600 transition-all"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all border-0 bg-[length:200%_auto] animate-gradient"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <button
            className="lg:hidden relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-900 transition-transform rotate-90" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu - Redesigned */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl animate-fade-in-up">
            <div className="py-6 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                    )}
                  </Link>
                );
              })}

              {/* Mobile CTA Buttons */}
              <div className="px-4 pt-6 space-y-3 border-t border-gray-200 mt-4">
                <Link href="/auth/signin" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-semibold border-2 hover:bg-gray-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signin" className="block">
                  <Button
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white border-0 shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
