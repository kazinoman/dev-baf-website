"use client";
import { useFormContext } from "react-hook-form";
import { User, Users, Mail, Phone, Calendar, Building } from "lucide-react";

import { FormInputField, FormSelectField } from "./FormFields";
import { FormData } from "./FormSchema";

const genderOptions = [
  { id: "male", value: "Male" },
  { id: "female", value: "Female" },
  { id: "other", value: "Other" },
];

const institutes = [
  { id: "1", value: "National Sports Academy" },
  { id: "2", value: "Bangladesh Sports Institute" },
  { id: "3", value: "Olympic Training Center" },
];

export function PersonalInfoStep() {
  const { control } = useFormContext<FormData>();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <User className="text-emerald-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
          <p className="text-sm text-slate-500">Basic details about the athlete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormInputField
            control={control}
            name="athleteFullName"
            label="Full Name"
            icon={User}
            placeholder="Enter athlete's full name"
            required
          />
        </div>
        <FormInputField
          control={control}
          name="athleteFatherName"
          label="Father's Name"
          icon={Users}
          placeholder="Enter father's name"
          required
        />
        <FormInputField
          control={control}
          name="athleteMotherName"
          label="Mother's Name"
          icon={Users}
          placeholder="Enter mother's name"
          required
        />
        <FormInputField
          control={control}
          name="athleteEmail"
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="athlete@example.com"
          required
        />
        <FormInputField
          control={control}
          name="athleteContactNo"
          label="Contact Number"
          icon={Phone}
          type="tel"
          placeholder="+880 1XXX-XXXXXX"
          required
        />
        <FormInputField
          control={control}
          name="athleteAlternateContactNo"
          label="Alternate Contact"
          icon={Phone}
          type="tel"
          placeholder="+880 1XXX-XXXXXX"
        />
        <FormInputField
          control={control}
          name="athleteDob"
          label="Date of Birth"
          icon={Calendar}
          type="date"
          required
        />
        <FormSelectField
          control={control}
          name="athleteGender"
          label="Gender"
          options={genderOptions}
          placeholder="Select gender"
          required
        />
        <FormSelectField
          control={control}
          name="instituteId"
          label="Institute"
          icon={Building}
          options={institutes}
          placeholder="Select institute"
        />
      </div>
    </div>
  );
}
