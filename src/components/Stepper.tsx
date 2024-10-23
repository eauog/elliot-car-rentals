import { cn } from "@/lib/utils"; 

interface StepperProps {
    currentStep: number; // Active step number
  }
  
  const steps = ["Select Date", "Review Booking", "Payment"];
  
  export function BookingStepper({ currentStep }: StepperProps) {
    return (
      <div className="flex items-center justify-between w-full mt-8">
        {steps.map((step, index) => (
          <div key={index} className="relative flex-1">
            {/* Step Circle */}
            <div className="flex items-center justify-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                  currentStep > index
                    ? "bg-primary text-white" // Completed step
                    : currentStep === index
                    ? "bg-primary text-white" // Active step
                    : "bg-gray-200 text-gray-500" // Incomplete steps
                )}
              >
                {currentStep > index ? (
                  <span className="text-white">✓</span> // Completed steps
                ) : (
                  <span>{index + 1}</span> // Active or pending step number
                )}
              </div>
            </div>
  
            {/* Step Label */}
            <div className="text-center mt-2">
              <span
                className={cn(
                  "text-sm transition-colors duration-300",
                  currentStep >= index ? "text-primary font-semibold" : "text-gray-500"
                )}
              >
                {step}
              </span>
            </div>
  
            {/* Line Between Steps */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 transform -translate-x-1/2 w-full h-0.5 transition-colors duration-300 -z-50",
                  currentStep > index ? "bg-primary" : "bg-gray-300"
                )}
                style={{ width: "calc(100% - 32px)" }} // Ensures space between circles
              />
            )}
          </div>
        ))}
      </div>
    );
  }
  