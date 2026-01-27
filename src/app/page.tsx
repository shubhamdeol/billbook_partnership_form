import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Hero Section with Lottie */}
      <HeroSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-8 px-6 bg-background sticky bottom-0 border-t border-border/50 backdrop-blur-sm bg-background/95">
        <div className="max-w-lg mx-auto">
          <Link
            href="/waitlist"
            className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-4 rounded-lg transition-colors duration-200 shadow-card active:scale-[0.98] text-center"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>
    </main>
  );
}
