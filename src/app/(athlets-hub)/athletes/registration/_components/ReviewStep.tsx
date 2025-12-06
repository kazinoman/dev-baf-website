"use client";

import type React from "react";
import { useFormContext } from "react-hook-form";
import { ClipboardCheck, Edit3 } from "lucide-react";
import type { FormData } from "./FormSchema";

interface ReviewStepProps {
  onEdit: (stepIndex: number) => void;
}

export function ReviewStep({ onEdit }: ReviewStepProps) {
  const { watch } = useFormContext<FormData>();
  const formData = watch();

  const ReviewItem = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      <span className="text-sm text-slate-800 mt-1 sm:mt-0">{value || "—"}</span>
    </div>
  );

  const ReviewSection = ({
    title,
    icon: Icon,
    stepIndex,
    children,
  }: {
    title: string;
    icon: React.ElementType;
    stepIndex: number;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Icon className="text-slate-600" size={20} />
          <h4 className="font-semibold text-slate-800">{title}</h4>
        </div>
        <button
          type="button"
          onClick={() => onEdit(stepIndex)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit3 size={14} />
          Edit
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 bg-green-100 rounded-lg">
          <ClipboardCheck className="text-green-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Review Information</h3>
          <p className="text-sm text-slate-500">Review all details before submission</p>
        </div>
      </div>

      <ReviewSection title="Personal Information" icon={ClipboardCheck} stepIndex={0}>
        <ReviewItem label="Full Name" value={formData.athleteFullName} />
        <ReviewItem label="Father's Name" value={formData.athleteFatherName} />
        <ReviewItem label="Mother's Name" value={formData.athleteMotherName} />
        <ReviewItem label="Email" value={formData.athleteEmail} />
        <ReviewItem label="Contact Number" value={formData.athleteContactNo} />
        <ReviewItem label="Gender" value={formData.athleteGender} />
        <ReviewItem label="Date of Birth" value={formData.athleteDob} />
      </ReviewSection>

      <ReviewSection title="Identity Verification" icon={ClipboardCheck} stepIndex={1}>
        <ReviewItem label="Identifier Type" value={formData.identifierType} />
        <ReviewItem label="ID Number" value={formData.identifierNumber} />
        <ReviewItem label="Images Uploaded" value={`${formData.identifierImages?.length || 0} file(s)`} />
      </ReviewSection>

      <ReviewSection title="Bengali Details" icon={ClipboardCheck} stepIndex={2}>
        <ReviewItem label="Full Name (Bengali)" value={formData.athleteFullNameInBengali} />
        <ReviewItem label="Father's Name (Bengali)" value={formData.athleteFatherNameInBengali} />
        <ReviewItem label="Mother's Name (Bengali)" value={formData.athleteMotherNameInBengali} />
      </ReviewSection>

      <ReviewSection title="Addresses" icon={ClipboardCheck} stepIndex={3}>
        {formData.addresses?.map((addr, idx) => (
          <div key={idx} className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
            <ReviewItem label={`Address ${idx + 1} Type`} value={addr.athleteAddressType} />
            <ReviewItem label="District" value={addr.athleteAddressDistrictId} />
            <ReviewItem label="Sub-District" value={addr.athleteAddressSubDistrictId} />
            <ReviewItem label="Postal Code" value={addr.athleteAddressPostalCode} />
            <ReviewItem label="Area" value={addr.athleteAddressArea} />
          </div>
        ))}
      </ReviewSection>

      <ReviewSection title="Documents" icon={ClipboardCheck} stepIndex={4}>
        {formData.documents?.map((doc, idx) => (
          <div key={idx} className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
            <ReviewItem label={`Document ${idx + 1} Category`} value={doc.docCategoryId} />
            <ReviewItem label="Document Name" value={doc.athleteDocName} />
            <ReviewItem label="Document ID" value={doc.athleteDocRelatedId} />
            <ReviewItem label="File Path" value={doc.athleteDocPhysicalPathUrl} />
          </div>
        ))}
      </ReviewSection>
    </div>
  );
}
