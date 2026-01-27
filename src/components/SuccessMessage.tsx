"use client";

import { CheckCircle } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6 animate-scale-in">
        <CheckCircle className="w-12 h-12 text-success" />
      </div>

      <h2 className="font-display text-3xl font-bold text-text text-center mb-3">
        You&apos;re on the list!
      </h2>

      <p className="text-text-secondary text-center max-w-sm">
        We&apos;ll notify you when CashBook launches. Get ready to simplify your
        business expenses!
      </p>

      <div className="mt-8 p-4 bg-primary-light rounded-lg">
        <p className="text-sm text-primary text-center">
          Share CashBook with other business owners and help them simplify their
          expenses too!
        </p>
      </div>
    </div>
  );
}
