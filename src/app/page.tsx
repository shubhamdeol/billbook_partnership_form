"use client";

import { useRef, useState } from "react";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  const formSectionRef = useRef<HTMLElement>(null);
  const [showForm, setShowForm] = useState(false);

  const handleGetStarted = () => {
    setShowForm(true);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main>
      <FeatureShowcase onGetStarted={handleGetStarted} />

      {showForm && (
        <section
          ref={formSectionRef}
          className="min-h-screen flex items-center justify-center px-4 py-16 bg-background"
        >
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-xl shadow-card p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-2">
                  Join the Waitlist
                </h2>
                <p className="text-text-secondary">
                  Be among the first to experience CashBook
                </p>
              </div>

              <WaitlistForm />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
