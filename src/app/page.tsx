"use client";

import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <main className="h-screen flex flex-col bg-background pb-[88px]">
        {/* Hero Section - takes all available space */}
        <div className="flex-1 flex flex-col min-h-0">
          <HeroSection />
        </div>

        {/* Testimonials - fixed at bottom of main content */}
        <div className="flex-shrink-0">
          <Testimonials />
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pt-4 bg-background border-t border-border/30"
        style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-lg mx-auto">
          <Link
            href="/register"
            className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold text-base py-4 rounded-xl transition-colors duration-200 shadow-lg active:scale-[0.98] text-center"
          >
            Request UPI Wallet
          </Link>
          <p className="text-center text-xs text-text-secondary mt-3">
            Know more at{" "}
            <a
              href="https://cashbook.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              CashBook.in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
