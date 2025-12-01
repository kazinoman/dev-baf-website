'use client'
import { Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, Control } from "react-hook-form";

export type ImageUploadFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  accept?: string;
  maxSizeInMB?: number; // file size validation
  className?: string;
};

export default function ImageUploadField({
  name,
  control,
  label = "Upload image",
  accept = "image/*",
  maxSizeInMB = 5,
  className = "",
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (fileList: FileList | null | undefined) => {
          if (!fileList || fileList.length === 0) return true; // not required by default
          const file = fileList[0];
          const maxBytes = maxSizeInMB * 1024 * 1024;
          if (file.size > maxBytes) return `File must be <= ${maxSizeInMB} MB`;
          if (!file.type.startsWith("image/")) return "File must be an image";
          return true;
        },
      }}
      render={({ field, fieldState }) => {
        // `field.value` will be either FileList or null/undefined depending on how you set it
        useEffect(() => {
          // update preview when field.value changes
          const fileList = field.value as FileList | null | undefined;
          if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const url = URL.createObjectURL(file);
            setPreview((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return url;
            });
          } else {
            setPreview((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return null;
            });
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [field.value]);

        const onChooseClick = () => inputRef.current?.click();

        const handleRemove = () => {
          // clear input DOM element
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          // update RHF value to null
          field.onChange(null);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          // pass FileList to react-hook-form
          field.onChange(files && files.length > 0 ? files : null);
        };

        return (
          <div className={`flex flex-col space-y-2  ${className}`}>

            <label className="text-sm font-medium">{label}</label>

            <div className="flex flex-col items-center space-x-4 border border-gray-300 p-5 rounded-md">

              
              <div className="w-28 h-28 rounded-sm border flex items-center justify-center bg-gray-50 hover:border-blue-500 hover:border-2 group relative p-1">
             
             
                <div className="overflow-hidden w-full">
                    {preview ? (
                  <img src={preview} alt="preview" className="object-cover w-full h-full order-2" />
                ) : (
                  <div onClick={onChooseClick} className="text-xs text-gray-400 p-2 text-center flex justify-center group-hover:text-blue-700"> <Plus /> </div>
                )}
                </div>


               {preview && (
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="px-1 py-1 rounded-full border hidden group-hover:block bg-gray-50  cursor-pointer order-10 absolute top-[-10px] right-[-10px] "
                    >
                      <X className="text-red-700"/>
                    </button>
                  )}

              </div>

               {/* <div className="flex flex-col justify-center items-center space-y-2 mt-5  ">
                <div className="flex space-x-2 ">
                  <button
                    type="button"
                    onClick={onChooseClick}
                    className="px-3 py-2 rounded-md border hover:bg-gray-100"
                  >
                    Choose
                  </button>

                </div>

                <div className="text-xs text-gray-500">
                  Accept: {accept} • Max: {maxSizeInMB} MB
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-600">{fieldState.error.message}</p>
                )}
              </div> */}

            </div>

            {/* hidden file input */}
            <input
              ref={(e) => {
                inputRef.current = e;
              }}
              type="file"
              accept={accept}
              onChange={handleChange}
              className="hidden"
            />
          </div>
        );
      }}
    />
  );
}

/*
Usage example (in a form component):

import React from "react";
import { useForm } from "react-hook-form";
import ImageUploadField from "./ImageUploadField";

function MyForm() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // `data.avatar` will be a FileList (or null). To send to server use FormData:
    // const form = new FormData();
    // if (data.avatar && data.avatar.length > 0) form.append('avatar', data.avatar[0]);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ImageUploadField name="avatar" control={control} label="Profile Image" />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
    </form>
  );
}

export default MyForm;
*/
