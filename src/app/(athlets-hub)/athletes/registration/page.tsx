"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  ShieldCheck,
  Globe,
  MapPin,
  FileText,
  ClipboardCheck,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
// import { formSchema, type FormData } from "@/lib/form-schema";
import { FormData, formSchema, stepFieldGroups } from "./_components/FormSchema";

import { PersonalInfoStep } from "./_components/PersonalInfoStep";
import { IdentityVerificationStep } from "./_components/IdentityVerificationStep";
import { BengaliDetailsStep } from "./_components/BengaliDetailsStep";
import { AddressesStep } from "./_components/AddressStep";
import { DocumentsStep } from "./_components/DocumentsStep";
import { ReviewStep } from "./_components/ReviewStep";

import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const steps = [
  { id: 0, title: "Personal Info", icon: User },
  { id: 1, title: "Identity", icon: ShieldCheck },
  { id: 2, title: "Bengali Details", icon: Globe },
  { id: 3, title: "Addresses", icon: MapPin },
  { id: 4, title: "Documents", icon: FileText },
  { id: 5, title: "Review", icon: ClipboardCheck },
];

const AthleteRegistrationForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [declaration, setDeclaration] = useState({
    infoAccurate: false,
    termsAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      athleteFullName: "",
      athleteFatherName: "",
      athleteMotherName: "",
      athleteEmail: "",
      athleteContactNo: "",
      athleteDob: "",
      athleteGender: "",
      athleteAlternateContactNo: "",
      instituteId: "",
      identifierType: "",
      identifierNumber: "",
      identifierImages: [],
      athleteFullNameInBengali: "",
      athleteFatherNameInBengali: "",
      athleteMotherNameInBengali: "",
      addresses: [
        {
          id: 1,
          athleteAddressDistrictId: "",
          athleteAddressSubDistrictId: "",
          athleteAddressPostalCode: "",
          athleteAddressArea: "",
          athleteAddressType: "present",
        },
      ],
      documents: [
        {
          id: 1,
          athleteDocName: "",
          athleteDocRelatedId: "",
          athleteDocPhysicalPathUrl: "",
          docCategoryId: "",
        },
      ],
    },
  });

  const {
    formState: { errors, isValid },
  } = methods;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <IdentityVerificationStep />;
      case 2:
        return <BengaliDetailsStep />;
      case 3:
        return <AddressesStep />;
      case 4:
        return <DocumentsStep />;
      case 5:
        return <ReviewStep onEdit={setCurrentStep} />;
      default:
        return null;
    }
  };

  const onSubmit = async (data: FormData) => {
    if (currentStep === 5 && declaration.infoAccurate && declaration.termsAccepted) {
      console.log("Form submitted:", data);
      setSubmitted(true);
      // Handle form submission here
    }
  };

  const canProceed = Object.keys(errors).length === 0 && isValid;

  const handleNext = async () => {
    // If this is NOT the last step
    if (currentStep < steps.length - 1) {
      // Validate ONLY the current step fields
      const isValid = await methods.trigger(stepFieldGroups[currentStep]);

      if (!isValid) {
        toast.error("Please fill all required fields for this step.");
        return; // ⛔ Stop navigation
      }

      // Move to next step
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // // If this IS the last step -> submit
    // await methods.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  //   if (Object.keys(errors).length > 0) {
  //     toast.error("Something is wrong...");
  //   }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <Check className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Application Submitted!</h2>
            <p className="text-slate-600">
              Thank you for submitting your athlete registration. We will review your application and contact you soon.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(0);
                methods.reset();
              }}
              variant="black"
              className="w-full"
            >
              Start New Application
            </Button>
            <Button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(0);
                methods.reset();

                router.push("/");
              }}
              variant="black"
              className="w-full"
            >
              Goto Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Athlete Registration</h1>
          <p className="text-lg text-slate-600">Complete your registration in 6 simple steps</p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`flex flex-col items-center focus:outline-none transition-all`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isActive
                          ? "bg-blue-500 text-white ring-4 ring-blue-200"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check size={20} /> : <StepIcon size={20} />}
                    </div>
                    <span
                      className={`text-xs font-medium text-center ${
                        isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        isCompleted ? "bg-green-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
              {renderStep()}

              {/* Declaration Checkboxes - only show on review step */}
              {currentStep === 5 && (
                <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
                  <h4 className="font-semibold text-slate-800">Declaration</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="accurate"
                        checked={declaration.infoAccurate}
                        onCheckedChange={(checked) =>
                          setDeclaration((prev) => ({ ...prev, infoAccurate: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <label htmlFor="accurate" className="text-sm text-slate-700 cursor-pointer">
                        I declare that all the information provided is accurate and truthful.
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={declaration.termsAccepted}
                        onCheckedChange={(checked) =>
                          setDeclaration((prev) => ({ ...prev, termsAccepted: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-slate-700 cursor-pointer">
                        I agree to the terms and conditions of athlete registration.
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="black"
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft size={18} />
                Previous
              </Button>

              <div className="text-sm text-slate-600">
                Step {currentStep + 1} of {steps.length}
              </div>

              <Button
                type={currentStep === 5 ? "submit" : "button"}
                onClick={currentStep === 5 ? undefined : handleNext}
                // disabled={currentStep === 5 ? !declaration.infoAccurate || !declaration.termsAccepted : !canProceed}
                className="flex items-center gap-2"
                variant="black"
              >
                {currentStep === 5 ? (
                  <>
                    <Check size={18} />
                    Submit
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight size={18} />
                  </>
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AthleteRegistrationForm;
