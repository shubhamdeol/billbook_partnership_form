"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function HeroSection() {
  return (
    <section className="pt-8 pb-4 px-6 bg-background">
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
        {/* Reduced height Lottie animation */}
        <div className="w-full max-w-[280px] md:max-w-[320px] aspect-square mb-4">
          <DotLottieReact
            src="/lottie/IssueWallet.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        <h1 className="font-display text-2xl md:text-4xl font-bold text-text text-center mb-2">
          Simplify Your Business Expenses
        </h1>

        <p className="text-base md:text-lg text-text-secondary text-center max-w-md">
          UPI wallet designed for businesses like yours
        </p>
      </div>
    </section>
  );
}
