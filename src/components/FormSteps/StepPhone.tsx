"use client";

interface StepPhoneProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepPhone({ name, value, onChange, error }: StepPhoneProps) {
  const firstName = name.split(" ")[0] || "there";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(digits);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-2">
          Great, {firstName}!
        </h2>
        <p className="text-text-secondary">What&apos;s your phone number?</p>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text font-medium text-lg">
            +91
          </span>
          <input
            type="tel"
            value={value}
            onChange={handleChange}
            placeholder="Enter 10-digit number"
            className={`form-input text-lg pl-14 ${error ? "border-error" : ""}`}
            autoFocus
            autoComplete="tel"
            inputMode="numeric"
          />
        </div>
        {error && <p className="text-error text-sm">{error}</p>}
        <p className="text-text-secondary text-xs">
          We&apos;ll send you updates about CashBook launch
        </p>
      </div>
    </div>
  );
}
