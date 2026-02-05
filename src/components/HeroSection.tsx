"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function HeroSection() {
  return (
    <section className="flex-1 flex flex-col px-4 py-4 bg-background">
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full mx-auto min-h-0">
        {/* Lottie animation - takes available space */}
        <div className="flex-1 w-full flex items-center justify-center min-h-0">
          <div className="w-full h-full max-w-[320px] max-h-[320px] aspect-square">
            <DotLottieReact
              src="/lottie/IssueWallet.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-shrink-0 text-center py-2">
          <h1 className="font-display text-xl md:text-3xl font-bold text-text mb-1">
            Simplify Your Business Expenses
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-sm mx-auto">
            UPI wallet designed for businesses like yours
          </p>
        </div>
      </div>
    </section>
  );
}
