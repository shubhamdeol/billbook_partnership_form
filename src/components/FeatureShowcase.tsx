"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
          className="h-14 md:h-16 mb-6"
        />

        <div className="w-full max-w-sm md:max-w-md aspect-square mb-6">
          <DotLottieReact
            src="/lottie/IssueWallet.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold text-text text-center mb-4">
          Simplify Your Business Expenses
        </h1>

        <p className="text-base md:text-lg text-text-secondary text-center mb-8 max-w-md">
          UPI wallet designed for businesses like yours
        </p>

        <button
          onClick={onGetStarted}
          className="w-full max-w-xs bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-10 py-4 rounded-lg transition-colors duration-200 shadow-card active:scale-[0.98]"
        >
          Request UPI Wallet
        </button>
      </div>
    </section>
  );
}
