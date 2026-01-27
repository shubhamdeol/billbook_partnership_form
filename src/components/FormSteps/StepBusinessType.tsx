"use client";

import { User, Users, Building2, Store } from "lucide-react";
import { SelectionCard } from "../SelectionCard";

const businessTypes = [
  {
    value: "sole_proprietorship",
    label: "Sole Proprietorship",
    icon: User,
  },
  {
    value: "llp_partnership",
    label: "LLP / Partnership",
    icon: Users,
  },
  {
    value: "private_limited",
    label: "Private Limited",
    icon: Building2,
  },
  {
    value: "unregistered",
    label: "Unregistered Business",
    icon: Store,
  },
] as const;

interface StepBusinessTypeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepBusinessType({
  value,
  onChange,
  error,
}: StepBusinessTypeProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-2">
          What type of business do you run?
        </h2>
        <p className="text-text-secondary">Select one option</p>
      </div>

      <div className="space-y-3">
        {businessTypes.map((type) => (
          <SelectionCard
            key={type.value}
            label={type.label}
            icon={type.icon}
            selected={value === type.value}
            onClick={() => onChange(type.value)}
          />
        ))}
      </div>

      {error && <p className="text-error text-sm text-center">{error}</p>}
    </div>
  );
}
