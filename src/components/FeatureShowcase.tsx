"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronDown } from "lucide-react";

interface FeatureShowcaseProps {
  onGetStarted: () => void;
}

export function FeatureShowcase({ onGetStarted }: FeatureShowcaseProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <img
          src="/assets/Cashbook_Under_Logo.svg"
          alt="CashBook Logo"
          className="h-16 mb-8"
        />

        <div className="w-full max-w-md aspect-square mb-8">
          <DotLottieReact
            src="/lottie/IssueWallet.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-text text-center mb-4">
          Simplify Your Business Expenses
        </h1>

        <p className="text-lg text-text-secondary text-center mb-10 max-w-md">
          UPI wallet designed for businesses like yours
        </p>

        <button
          onClick={onGetStarted}
          className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-10 py-4 rounded-lg transition-colors duration-200 shadow-card"
        >
          Join the Waitlist
        </button>

        <div className="mt-12 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
}
