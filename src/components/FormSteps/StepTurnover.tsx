"use client";

import { SelectionCard } from "../SelectionCard";

const turnoverRanges = [
  {
    value: "below_50l",
    label: "Less than ₹50 Lakhs",
    description: "Small business",
  },
  {
    value: "50l_to_2cr",
    label: "₹50 Lakhs - ₹2 Crores",
    description: "Growing business",
  },
  {
    value: "2cr_to_5cr",
    label: "₹2 Crores - ₹5 Crores",
    description: "Established business",
  },
  {
    value: "above_5cr",
    label: "Above ₹5 Crores",
    description: "Large enterprise",
  },
] as const;

interface StepTurnoverProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepTurnover({ value, onChange, error }: StepTurnoverProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-2">
          What&apos;s your annual business turnover?
        </h2>
        <p className="text-text-secondary">This helps us tailor CashBook for you</p>
      </div>

      <div className="space-y-3">
        {turnoverRanges.map((range) => (
          <SelectionCard
            key={range.value}
            label={range.label}
            description={range.description}
            selected={value === range.value}
            onClick={() => onChange(range.value)}
          />
        ))}
      </div>

      {error && <p className="text-error text-sm text-center">{error}</p>}
    </div>
  );
}
