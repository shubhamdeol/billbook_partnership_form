import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MultiStepForm } from "@/components/MultiStepForm";

export const metadata = {
  title: "Request UPI Wallet - CashBook",
  description:
    "Request your CashBook UPI wallet for business expenses.",
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between max-w-lg mx-auto">
        <Link
          href="/billbook"
          className="flex items-center gap-2 text-text-secondary hover:text-text transition-colors min-h-[44px] px-2 -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <img
          src="/assets/Cashbook_Under_Logo.svg"
          alt="CashBook"
          className="h-8"
        />
        <div className="w-16" /> {/* Spacer for centering logo */}
      </header>

      {/* Form Section */}
      <div className="px-4 pb-8">
        <div className="w-full max-w-lg mx-auto">
          <MultiStepForm />
        </div>
      </div>
    </main>
  );
}
