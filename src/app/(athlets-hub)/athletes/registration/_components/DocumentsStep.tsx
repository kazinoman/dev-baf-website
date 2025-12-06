"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FileText, Plus, Trash2, AlertCircle } from "lucide-react";
import type { FormData } from "./FormSchema";
import { FormInputField, FormSelectField } from "./FormFields";
import { FileUploadField } from "./FileUploadField";
import Button from "@/components/ui/Button";

const docCategories = [
  { id: "1", value: "National ID" },
  { id: "2", value: "Birth Certificate" },
  { id: "3", value: "Passport" },
  { id: "4", value: "Educational Certificate" },
  { id: "5", value: "Sports Certificate" },
];

export function DocumentsStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const addNewDocument = () => {
    append({
      id: Date.now(),
      athleteDocName: "",
      athleteDocRelatedId: "",
      athleteDocPhysicalPathUrl: "",
      docCategoryId: "",
    } as any);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 bg-purple-100 rounded-lg">
          <FileText className="text-purple-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Documents</h3>
          <p className="text-sm text-slate-500">Upload supporting documents</p>
        </div>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-800">Document {index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelectField
                control={control}
                name={`documents.${index}.docCategoryId` as const}
                label="Document Category"
                options={docCategories}
                placeholder="Select category"
                required
              />
              <FormInputField
                control={control}
                name={`documents.${index}.athleteDocName` as const}
                label="Document Name"
                placeholder="e.g., Birth Certificate"
                required
              />
              <FormInputField
                control={control}
                name={`documents.${index}.athleteDocRelatedId` as const}
                label="Document ID/Reference"
                placeholder="Enter document ID"
                required
              />

              <FileUploadField
                control={control}
                name={`documents.${index}.athleteDocPhysicalPathUrl` as const}
                label="Upload Document"
                required
                acceptedFormats={["pdf", "doc", "docx", "jpg", "jpeg", "png"]}
                maxSizeMB={5}
              />
            </div>
          </div>
        ))}
      </div>

      {errors.documents && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg">
          <AlertCircle className="text-rose-600" size={18} />
          <span className="text-sm text-rose-700">{errors.documents.message}</span>
        </div>
      )}

      <Button type="button" onClick={addNewDocument} variant="black" className="w-full bg-transparent">
        <Plus size={18} />
        Add Another Document
      </Button>
    </div>
  );
}
