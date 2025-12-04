'use client'
import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, Control } from "react-hook-form";

export type ImageUploadFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  accept?: string;
  maxSizeInMB?: number;
  maxFiles?: number;
  className?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export default function MultipleImageUpload ({
  name,
  control,
  label = "Upload images",
  accept = "image/*",
  maxSizeInMB = 5,
  maxFiles = 5,
  className = "",
  inputRef
}: ImageUploadFieldProps) {

  const [previews, setPreviews] = useState<string[]>([]);

  // Cleanup
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);




  
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (fileList: FileList | null | undefined) => {
          if (!fileList || fileList.length === 0) return true;

          if (fileList.length > maxFiles) {
            return `Maximum ${maxFiles} images allowed`;
          }

          const maxBytes = maxSizeInMB * 1024 * 1024;

          for (const file of Array.from(fileList)) {
            if (!file.type.startsWith("image/")) {
              return "Only image files are allowed";
            }
            if (file.size > maxBytes) {
              return `Each image must be <= ${maxSizeInMB} MB`;
            }
          }

          return true;
        },
      }}
      render={({ field, fieldState }) => {

        // Preview create
        useEffect(() => {
          const files = field.value as FileList | null | undefined;

          if (files && files.length > 0) {
            const urls = Array.from(files).map(file =>
              URL.createObjectURL(file)
            );

            setPreviews((prev) => {
              prev.forEach(url => URL.revokeObjectURL(url));
              return urls;
            });
          } else {
            setPreviews((prev) => {
              prev.forEach(url => URL.revokeObjectURL(url));
              return [];
            });
          }
        }, [field.value]);

        const onChooseClick = () => {
          inputRef.current?.click();
        };

        const handleRemove = (index: number) => {
          const currentFiles = field.value
            ? Array.from(field.value as FileList)
            : [];

          const updatedFiles = currentFiles.filter((_, i) => i !== index);

          const dataTransfer = new DataTransfer();

          updatedFiles.forEach((file: File) => {
            dataTransfer.items.add(file);
          });

          field.onChange(
            dataTransfer.files.length ? dataTransfer.files : null
          );
        };

        // ✅ FIXED VERSION
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newFiles = e.target.files;

          if (!newFiles || newFiles.length === 0) return;

          const existingFiles = field.value
            ? Array.from(field.value as FileList)
            : [];

          const totalFiles = [...existingFiles, ...Array.from(newFiles)];

          if (totalFiles.length > maxFiles) {
            alert(`You can upload maximum ${maxFiles} images`);
            return;
          }

          const dataTransfer = new DataTransfer();

          totalFiles.forEach((file: File) => {
            dataTransfer.items.add(file);
          });

          field.onChange(dataTransfer.files);

          // Clear input so same image can be selected again
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        };

        return (
          <div className={`flex flex-col space-y-2 ${className}`}>

            <label className="text-sm font-medium">{label}</label>

            {/* Upload Button */}
            <div
              onPointerDown={onChooseClick}
              className="border border-dashed border-gray-400 rounded-md p-6 cursor-pointer text-center hover:border-blue-500"
            >
              <div className="flex justify-center">
                <Plus className="text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click to select file (Max {maxFiles})
              </p>
            </div>

            {/* Preview */}
            {previews.length > 0 && (
              <div className="flex flex-row gap-3 mt-3">

                <div className=" flex gap-3 "> 
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-28 h-28 border rounded-md overflow-hidden group"
                  >
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="absolute top-1 right-1 hidden group-hover:block bg-white rounded-full p-1 border"
                    >
                      <X size={16} className="text-red-600" />
                    </button>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Error */}
            {fieldState.error && (
              <p className="text-red-500 text-xs">
                {fieldState.error.message}
              </p>
            )}

            {/* Hidden file input */}
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple
              onChange={handleChange}
              className="hidden"
            />

          </div>
        );
      }}
    />
  );
}
