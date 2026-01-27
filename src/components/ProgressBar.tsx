"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-text">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-text-secondary">
          {Math.round(progress)}% complete
        </span>
      </div>

      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
              ${
                step < currentStep
                  ? "bg-primary text-white"
                  : step === currentStep
                  ? "bg-primary text-white ring-4 ring-primary-light"
                  : "bg-border text-text-secondary"
              }
            `}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
