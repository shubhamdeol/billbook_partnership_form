"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { submitWaitlist, WaitlistResponse } from "@/app/actions/waitlist";
import { SuccessMessage } from "./SuccessMessage";

const businessTypes = [
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "llp_partnership", label: "LLP / Partnership" },
  { value: "private_limited", label: "Private Limited" },
  { value: "unregistered", label: "Unregistered Business" },
] as const;

const turnoverRanges = [
  { value: "below_50l", label: "Less than ₹50 Lakhs" },
  { value: "50l_to_2cr", label: "₹50 Lakhs - ₹2 Crores" },
  { value: "2cr_to_5cr", label: "₹2 Crores - ₹5 Crores" },
  { value: "above_5cr", label: "Above ₹5 Crores" },
] as const;

export function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessType: "",
    turnoverRange: "",
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: [] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    const submitFormData = new FormData();
    submitFormData.append("name", formData.name);
    submitFormData.append("phone", `+91${formData.phone}`);
    submitFormData.append("businessType", formData.businessType);
    submitFormData.append("turnoverRange", formData.turnoverRange);

    startTransition(async () => {
      const result: WaitlistResponse = await submitWaitlist(submitFormData);

      if (result.success) {
        setIsSuccess(true);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        if (result.message && !result.errors) {
          setGeneralError(result.message);
        }
      }
    });
  };

  if (isSuccess) {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Full Name"
        error={errors.name?.[0]}
        required
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
            if (errors.name) setErrors((prev) => ({ ...prev, name: [] }));
          }}
          placeholder="Enter your full name"
          className="form-input"
          required
          minLength={2}
        />
      </FormField>

      <FormField
        label="Phone Number"
        error={errors.phone?.[0]}
        required
      >
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
            +91
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Enter 10-digit number"
            className="form-input pl-14"
            required
            pattern="[0-9]{10}"
          />
        </div>
      </FormField>

      <FormField
        label="Business Type"
        error={errors.businessType?.[0]}
        required
      >
        <RadioGroup
          name="businessType"
          options={businessTypes}
          value={formData.businessType}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, businessType: value }));
            if (errors.businessType)
              setErrors((prev) => ({ ...prev, businessType: [] }));
          }}
        />
      </FormField>

      <FormField
        label="Annual Turnover"
        error={errors.turnoverRange?.[0]}
        required
      >
        <RadioGroup
          name="turnoverRange"
          options={turnoverRanges}
          value={formData.turnoverRange}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, turnoverRange: value }));
            if (errors.turnoverRange)
              setErrors((prev) => ({ ...prev, turnoverRange: [] }));
          }}
        />
      </FormField>

      {generalError && (
        <p className="text-error text-sm text-center">{generalError}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold text-lg py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
            ${
              value === option.value
                ? "border-primary bg-primary-light"
                : "border-border hover:border-primary/50"
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="w-4 h-4 text-primary focus:ring-primary"
            required
          />
          <span className="text-sm text-text">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
