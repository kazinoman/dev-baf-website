"use client";

import type React from "react";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ShieldCheck, Upload, Trash2, AlertCircle } from "lucide-react";
import type { FormData } from "./FormSchema";
import { FormInputField, FormSelectField } from "./FormFields";

const identifierTypes = [
  { id: "nid", value: "National ID (NID)", placeholder: "Enter 10 or 17 digit NID number" },
  { id: "passport", value: "Passport", placeholder: "Enter passport number" },
  { id: "driving_license", value: "Driving License", placeholder: "Enter driving license number" },
  { id: "birth_certificate", value: "Birth Certificate", placeholder: "Enter 17 digit birth certificate number" },
];

const identifierDescriptions = {
  nid: "Upload front and back images of your National ID card.",
  passport: "Upload the bio-data page of your passport.",
  driving_license: "Upload front and back images of your driving license.",
  birth_certificate: "Upload a clear image of your birth certificate.",
};

export function IdentityVerificationStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();
  const identifierType = watch("identifierType");
  const identifierImages = watch("identifierImages");
  const [imageError, setImageError] = useState("");

  const selectedType = identifierTypes.find((t) => t.id === identifierType);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));

    const currentImages = field.value || [];
    field.onChange([...currentImages, ...newImages]);
    setImageError("");
  };

  const removeImage = (imageId: number, field: any) => {
    const updated = (field.value || []).filter((img: any) => img.id !== imageId);
    field.onChange(updated);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 bg-cyan-100 rounded-lg">
          <ShieldCheck className="text-cyan-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Identity Verification</h3>
          <p className="text-sm text-slate-500">Select your primary identification document</p>
        </div>
      </div>

      <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
        <p className="text-sm text-cyan-700">
          Please select one primary identification document and upload clear images of both front and back sides (if
          applicable).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelectField
          control={control}
          name="identifierType"
          label="Identifier Type"
          icon={ShieldCheck}
          options={identifierTypes}
          placeholder="Select identifier type"
          required
        />
        <FormInputField
          control={control}
          name="identifierNumber"
          label="ID Number"
          placeholder={selectedType?.placeholder || "First select an identifier type"}
          required
          disabled={!identifierType}
        />
      </div>

      {identifierType && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <ShieldCheck className="text-cyan-500" size={18} />
            </div>
            <div>
              <h4 className="font-medium text-slate-800">{selectedType?.value}</h4>
              <p className="text-sm text-slate-500 mt-1">
                {identifierDescriptions[identifierType as keyof typeof identifierDescriptions]}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Controller
          control={control}
          name="identifierImages"
          render={({ field }) => (
            <>
              <label className="block text-sm font-medium text-slate-700">
                Upload Document Images <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => handleImageUpload(e, field)}
                />
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-cyan-400 hover:bg-cyan-50/30 transition-all duration-200">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-100 rounded-xl mb-4">
                    <Upload className="text-cyan-600" size={24} />
                  </div>
                  <p className="text-slate-700 font-medium">Drop images here or click to upload</p>
                  <p className="text-sm text-slate-400 mt-1">Supports: JPG, PNG, WEBP (Max 5MB each)</p>
                </div>
              </div>

              {errors.identifierImages && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                  <AlertCircle className="text-rose-600" size={18} />
                  <span className="text-sm text-rose-700">{errors.identifierImages.message}</span>
                </div>
              )}

              {identifierImages && identifierImages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Uploaded Images ({identifierImages.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => field.onChange([])}
                      className="text-sm text-rose-500 hover:text-rose-600 font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {identifierImages.map((image: any, index) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={image.preview || "/placeholder.svg"}
                            alt={`Document ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id, field)}
                          className="absolute top-1 right-1 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="absolute bottom-1 left-1 px-2 py-1 bg-black/70 text-white rounded text-xs">
                          {formatFileSize(image.size)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}
