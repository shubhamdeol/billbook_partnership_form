"use client";

import { LucideIcon } from "lucide-react";

interface SelectionCardProps {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export function SelectionCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full min-h-[72px] p-4 rounded-xl border-2 text-left transition-all duration-200
        ${
          selected
            ? "bg-primary-light border-primary"
            : "bg-white border-border md:hover:border-primary/50 md:hover:shadow-md md:hover:scale-[1.02]"
        }
        active:scale-[0.97] active:transition-transform active:duration-100
      `}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div
            className={`
              w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
              ${selected ? "bg-primary/10" : "bg-background"}
            `}
          >
            <Icon
              className={`w-6 h-6 ${
                selected ? "text-primary" : "text-text-secondary"
              }`}
            />
          </div>
        )}
        <div className="flex-grow min-w-0">
          <p
            className={`font-medium ${
              selected ? "text-primary" : "text-text"
            }`}
          >
            {label}
          </p>
          {description && (
            <p className="text-sm text-text-secondary mt-0.5">{description}</p>
          )}
        </div>
        <div
          className={`
            w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center
            ${selected ? "border-primary bg-primary" : "border-border"}
          `}
        >
          {selected && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
