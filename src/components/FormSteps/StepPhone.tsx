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
        <div
          className={`flex items-center border rounded-lg overflow-hidden bg-white ${
            error ? "border-error" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
          }`}
        >
          {/* Country code section */}
          <div className="flex items-center justify-center px-4 min-h-[52px] bg-background border-r border-border">
            <span className="text-text font-medium text-base whitespace-nowrap">
              +91
            </span>
          </div>

          {/* Phone number input */}
          <input
            type="tel"
            value={value}
            onChange={handleChange}
            placeholder="10-digit number"
            className="flex-1 min-h-[52px] px-4 text-base text-text bg-transparent border-none outline-none placeholder:text-text-secondary"
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
