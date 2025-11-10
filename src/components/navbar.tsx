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
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className={`transition-all duration-700 ease-out ${
          isScrolled ? "py-4" : "py-0"
        }`}
      >
        <nav
          className={`mx-auto transition-all duration-700 ease-out pointer-events-auto ${
            isScrolled
              ? "max-w-6xl rounded-full bg-white/90 backdrop-blur-2xl border border-gray-200/80 shadow-2xl shadow-gray-900/10"
              : "w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50"
          }`}
        >
          <div
            className={`transition-all duration-700 ${
              isScrolled ? "px-6" : "container mx-auto px-4 md:px-6"
            }`}
          >
            <div
              className={`flex items-center justify-between transition-all duration-700 ${
                isScrolled ? "h-16" : "h-20"
              }`}
            >
              {/* Logo - Enhanced with Animation */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient bg-[length:200%_auto]" />

                  {/* Icon container */}
                  <div
                    className={`relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-all duration-700 ${
                      isScrolled ? "p-2" : "p-2.5"
                    }`}
                  >
                    <Zap
                      className={`text-white transition-all duration-700 ${
                        isScrolled ? "h-5 w-5" : "h-6 w-6"
                      }`}
                      fill="white"
                    />
                  </div>
                </div>

                {/* Logo text */}
                <div className="flex flex-col">
                  <span
                    className={`font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent transition-all duration-700 ${
                      isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    AI SaaS Kit
                  </span>
                  <span
                    className={`text-[10px] font-bold text-gray-500 -mt-1 transition-all duration-700 ${
                      isScrolled ? "opacity-0 h-0" : "opacity-100"
                    }`}
                  >
                    Next.js 15 Starter
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation - Modern Chip Style */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative group transition-all duration-500 ${
                        isScrolled ? "px-4 py-2.5" : "px-4 py-2"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold transition-all duration-300 ${
                          isActive
                            ? "text-purple-600"
                            : "text-gray-800 group-hover:text-purple-600"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Active indicator - Chip style */}
                      {isActive && isScrolled && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 -z-10 animate-fade-in" />
                      )}

                      {/* Active indicator - Normal style */}
                      {isActive && !isScrolled && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                      )}

                      {/* Hover effect */}
                      <div
                        className={`absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10 ${
                          isScrolled ? "rounded-full" : "rounded-lg"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Desktop CTA Buttons - Enhanced */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    className={`font-bold hover:bg-purple-50 hover:text-purple-600 transition-all duration-500 ${
                      isScrolled ? "h-10 text-sm" : "h-10"
                    }`}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button
                    className={`group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 border-0 bg-[length:200%_auto] animate-gradient rounded-full ${
                      isScrolled ? "h-10 px-5 text-sm" : "h-10 px-6"
                    }`}
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
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Redesigned */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl animate-fade-in-up pointer-events-auto ${
            isScrolled ? "mx-4 rounded-2xl mt-2 border shadow-xl" : ""
          }`}
        >
          <div className="py-6 space-y-1 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-3 text-base font-bold rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600"
                      : "text-gray-800 hover:bg-gray-50 hover:text-purple-600"
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
            <div className="pt-6 space-y-3 border-t border-gray-200 mt-4">
              <Link href="/auth/signin" className="block">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-bold border-2 hover:bg-gray-50 rounded-xl"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signin" className="block">
                <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white border-0 shadow-lg rounded-xl">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
