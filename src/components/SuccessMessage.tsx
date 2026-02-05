"use client";

import { CheckCircle } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6 animate-scale-in">
        <CheckCircle className="w-12 h-12 text-success" />
      </div>

      <h2 className="font-display text-3xl font-bold text-text text-center mb-3">
        Request Submitted!
      </h2>

      <p className="text-text-secondary text-center max-w-sm">
        Thank you for your interest. Our team will reach out to you shortly to
        set up your UPI wallet.
      </p>

      <div className="mt-8 p-4 bg-primary-light rounded-lg">
        <p className="text-sm text-primary text-center">
          Know a business owner who could benefit from CashBook? Spread the word!
        </p>
      </div>

      <a
        href="https://cashbook.in"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full max-w-xs bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-4 rounded-lg transition-colors duration-200 text-center block"
      >
        Visit CashBook
      </a>
    </div>
  );
}
