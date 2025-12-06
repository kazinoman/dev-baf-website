"use client";
import { useFormContext } from "react-hook-form";
import { Globe } from "lucide-react";
import type { FormData } from "./FormSchema";
import { FormInputField } from "./FormFields";

export function BengaliDetailsStep() {
  const { control } = useFormContext<FormData>();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Globe className="text-orange-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Bengali Details</h3>
          <p className="text-sm text-slate-500">Enter names in Bengali script</p>
        </div>
      </div>

      <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
        <p className="text-sm text-orange-700">Please enter the athlete's name and parent names in Bengali script.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormInputField
            control={control}
            name="athleteFullNameInBengali"
            label="Full Name (Bengali)"
            placeholder="নামটি বাংলায় লিখুন"
            required
          />
        </div>
        <FormInputField
          control={control}
          name="athleteFatherNameInBengali"
          label="Father's Name (Bengali)"
          placeholder="পিতার নাম বাংলায় লিখুন"
          required
        />
        <FormInputField
          control={control}
          name="athleteMotherNameInBengali"
          label="Mother's Name (Bengali)"
          placeholder="মাতার নাম বাংলায় লিখুন"
          required
        />
      </div>
    </div>
  );
}
