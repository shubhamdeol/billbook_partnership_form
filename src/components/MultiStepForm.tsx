"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { submitWaitlist, WaitlistResponse } from "@/app/actions/waitlist";
import { ProgressBar } from "./ProgressBar";
import { StepName } from "./FormSteps/StepName";
import { StepPhone } from "./FormSteps/StepPhone";
import { StepBusinessType } from "./FormSteps/StepBusinessType";
import { StepTurnover } from "./FormSteps/StepTurnover";
import { SuccessMessage } from "./SuccessMessage";

interface FormData {
  name: string;
  phone: string;
  businessType: string;
  turnoverRange: string;
}

const TOTAL_STEPS = 4;

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    businessType: "",
    turnoverRange: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateStep = (): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Please enter your name";
        } else if (formData.name.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        }
        break;
      case 2:
        if (!formData.phone) {
          newErrors.phone = "Please enter your phone number";
        } else if (formData.phone.length !== 10) {
          newErrors.phone = "Please enter a valid 10-digit number";
        }
        break;
      case 3:
        if (!formData.businessType) {
          newErrors.businessType = "Please select your business type";
        }
        break;
      case 4:
        if (!formData.turnoverRange) {
          newErrors.turnoverRange = "Please select your turnover range";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    setSubmitError(null);

    const submitData = new FormData();
    submitData.append("name", formData.name.trim());
    submitData.append("phone", `+91${formData.phone}`);
    submitData.append("businessType", formData.businessType);
    submitData.append("turnoverRange", formData.turnoverRange);

    startTransition(async () => {
      const result: WaitlistResponse = await submitWaitlist(submitData);

      if (result.success) {
        setIsSuccess(true);
      } else {
        if (result.errors?.phone) {
          setCurrentStep(2);
          setErrors({ phone: result.errors.phone[0] });
        } else {
          setSubmitError(result.message);
        }
      }
    });
  };

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-8 md:p-10">
        <SuccessMessage />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 md:p-10">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className="min-h-[320px] flex flex-col">
        <div className="flex-grow">
          {currentStep === 1 && (
            <StepName
              value={formData.name}
              onChange={(value) => updateField("name", value)}
              error={errors.name}
            />
          )}
          {currentStep === 2 && (
            <StepPhone
              name={formData.name}
              value={formData.phone}
              onChange={(value) => updateField("phone", value)}
              error={errors.phone}
            />
          )}
          {currentStep === 3 && (
            <StepBusinessType
              value={formData.businessType}
              onChange={(value) => updateField("businessType", value)}
              error={errors.businessType}
            />
          )}
          {currentStep === 4 && (
            <StepTurnover
              value={formData.turnoverRange}
              onChange={(value) => updateField("turnoverRange", value)}
              error={errors.turnoverRange}
            />
          )}
        </div>

        {submitError && (
          <p className="text-error text-sm text-center mt-4">{submitError}</p>
        )}

        <div className="flex gap-4 mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={isPending}
              className="flex items-center justify-center gap-2 px-6 min-h-[52px] rounded-lg border border-border text-text font-medium hover:bg-background transition-colors disabled:opacity-50 active:scale-[0.98]"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={isPending}
            className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold text-lg min-h-[52px] rounded-lg transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : currentStep === TOTAL_STEPS ? (
              "Join Waitlist"
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
