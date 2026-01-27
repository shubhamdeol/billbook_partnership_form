"use client";

import { useRef } from "react";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { Testimonials } from "@/components/Testimonials";
import { MultiStepForm } from "@/components/MultiStepForm";

export default function Home() {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Section 1: Feature Showcase */}
      <FeatureShowcase onGetStarted={handleGetStarted} />

      {/* Section 2: Testimonials */}
      <div ref={testimonialsRef}>
        <Testimonials />
      </div>

      {/* Section 3: Multi-Step Form */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
        <div className="w-full max-w-lg">
          <MultiStepForm />
        </div>
      </section>
    </main>
  );
}
