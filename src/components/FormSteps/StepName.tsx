"use client";

interface StepNameProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepName({ value, onChange, error }: StepNameProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-2">
          Let&apos;s get started!
        </h2>
        <p className="text-text-secondary">What&apos;s your name?</p>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your full name"
          className={`form-input text-lg ${error ? "border-error" : ""}`}
          autoFocus
          autoComplete="name"
        />
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </div>
  );
}
