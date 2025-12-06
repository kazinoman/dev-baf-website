"use client";

import type React from "react";
import { useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Upload, X, FileCheck, AlertCircle } from "lucide-react";

interface FileUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

const DEFAULT_ACCEPTED_FORMATS = ["pdf", "doc", "docx", "jpg", "jpeg", "png", "gif"];
const DEFAULT_MAX_SIZE_MB = 5;

export function FileUploadField<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
}: FileUploadFieldProps<T>) {
  const [dragActive, setDragActive] = useState(false);
  const [filePreview, setFilePreview] = useState<{ name: string; type: string } | null>(null);
  const [localError, setLocalError] = useState<string>("");

  const validateFile = (file: File): string => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    const fileSizeMB = file.size / (1024 * 1024);

    if (!acceptedFormats.includes(fileExtension)) {
      return `Invalid file format. Accepted formats: ${acceptedFormats.join(", ")}`;
    }

    if (fileSizeMB > maxSizeMB) {
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    return "";
  };

  const handleFile = (file: File, field: any) => {
    const error = validateFile(file);

    if (error) {
      setLocalError(error);
      setFilePreview(null);
      field.onChange("");
      return;
    }

    setLocalError("");

    // Create a file reference or base64 string
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      field.onChange(base64String);
      setFilePreview({
        name: file.name,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, field: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], field);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], field);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>

          {/* File Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, field)}
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : error || localError
                ? "border-rose-300 bg-rose-50"
                : "border-slate-200 bg-slate-50 hover:border-slate-300"
            }`}
          >
            <input
              type="file"
              accept={acceptedFormats.map((fmt) => `.${fmt}`).join(",")}
              onChange={(e) => handleChange(e, field)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {!filePreview ? (
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto">
                  <Upload className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Drag and drop your file here</p>
                  <p className="text-xs text-slate-500">or click to select</p>
                </div>
                <p className="text-xs text-slate-400">
                  Max size: {maxSizeMB}MB • Formats: {acceptedFormats.join(", ")}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileCheck className="text-green-600" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-slate-700">{filePreview.name}</p>
                    <p className="text-xs text-slate-500">File uploaded successfully</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    field.onChange("");
                    setFilePreview(null);
                    setLocalError("");
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Error Messages */}
          {(error || localError) && (
            <div className="flex items-center gap-2 text-sm text-rose-600">
              <AlertCircle size={14} />
              {error?.message || localError}
            </div>
          )}
        </div>
      )}
    />
  );
}

//  Fill upload in cloud and then store Cloud link.

// "use client";

// import type React from "react";
// import { useState } from "react";
// import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
// import { Upload, X, FileCheck, AlertCircle, Loader2 } from "lucide-react";

// interface FileUploadFieldProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   required?: boolean;
//   acceptedFormats?: string[];
//   maxSizeMB?: number;
// }

// const DEFAULT_ACCEPTED_FORMATS = ["pdf", "doc", "docx", "jpg", "jpeg", "png", "gif"];
// const DEFAULT_MAX_SIZE_MB = 5;

// export function FileUploadField<T extends FieldValues>({
//   control,
//   name,
//   label,
//   required = false,
//   acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
//   maxSizeMB = DEFAULT_MAX_SIZE_MB,
// }: FileUploadFieldProps<T>) {
//   const [dragActive, setDragActive] = useState(false);
//   const [filePreview, setFilePreview] = useState<{ name: string; type: string } | null>(null);
//   const [localError, setLocalError] = useState<string>("");
//   const [isUploading, setIsUploading] = useState(false);

//   const validateFile = (file: File): string => {
//     const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
//     const fileSizeMB = file.size / (1024 * 1024);

//     if (!acceptedFormats.includes(fileExtension)) {
//       return `Invalid file format. Accepted formats: ${acceptedFormats.join(", ")}`;
//     }

//     if (fileSizeMB > maxSizeMB) {
//       return `File size exceeds ${maxSizeMB}MB limit`;
//     }

//     return "";
//   };

//   const uploadFileToAPI = async (file: File, field: any) => {
//     try {
//       setIsUploading(true);
//       setLocalError("");

//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.error || "Upload failed");
//       }

//       const data = await response.json();

//       // Store the URL in the form field
//       field.onChange(data.url);
//       setFilePreview({
//         name: file.name,
//         type: file.type,
//       });
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Upload failed";
//       setLocalError(errorMessage);
//       setFilePreview(null);
//       field.onChange("");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFile = (file: File, field: any) => {
//     const error = validateFile(file);

//     if (error) {
//       setLocalError(error);
//       setFilePreview(null);
//       field.onChange("");
//       return;
//     }

//     uploadFileToAPI(file, field);
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent, field: any) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0], field);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0], field);
//     }
//   };

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field, fieldState: { error } }) => (
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-slate-700">
//             {label} {required && <span className="text-rose-500">*</span>}
//           </label>

//           {/* File Upload Area */}
//           <div
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={(e) => handleDrop(e, field)}
//             className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
//               isUploading
//                 ? "border-slate-300 bg-slate-50 cursor-wait"
//                 : dragActive
//                 ? "border-blue-500 bg-blue-50 cursor-pointer"
//                 : error || localError
//                 ? "border-rose-300 bg-rose-50 cursor-pointer"
//                 : "border-slate-200 bg-slate-50 hover:border-slate-300 cursor-pointer"
//             }`}
//           >
//             <input
//               type="file"
//               accept={acceptedFormats.map((fmt) => `.${fmt}`).join(",")}
//               onChange={(e) => handleChange(e, field)}
//               disabled={isUploading}
//               className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-wait"
//             />

//             {!filePreview || isUploading ? (
//               <div className="flex flex-col items-center gap-2">
//                 <div className={`p-3 rounded-lg w-fit mx-auto ${isUploading ? "bg-blue-100" : "bg-blue-100"}`}>
//                   {isUploading ? (
//                     <Loader2 className="text-blue-600 animate-spin" size={24} />
//                   ) : (
//                     <Upload className="text-blue-600" size={24} />
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-slate-700">
//                     {isUploading ? "Uploading..." : "Drag and drop your file here"}
//                   </p>
//                   <p className="text-xs text-slate-500">{isUploading ? "Please wait..." : "or click to select"}</p>
//                 </div>
//                 {!isUploading && (
//                   <p className="text-xs text-slate-400">
//                     Max size: {maxSizeMB}MB • Formats: {acceptedFormats.join(", ")}
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-green-100 rounded-lg">
//                     <FileCheck className="text-green-600" size={20} />
//                   </div>
//                   <div className="text-left">
//                     <p className="text-sm font-medium text-slate-700">{filePreview.name}</p>
//                     <p className="text-xs text-slate-500">Uploaded successfully</p>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     field.onChange("");
//                     setFilePreview(null);
//                     setLocalError("");
//                   }}
//                   className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Error Messages */}
//           {(error || localError) && (
//             <div className="flex items-center gap-2 text-sm text-rose-600">
//               <AlertCircle size={14} />
//               {error?.message || localError}
//             </div>
//           )}
//         </div>
//       )}
//     />
//   );
// }
