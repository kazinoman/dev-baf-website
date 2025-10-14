/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type InputFormProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: any;
  name: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
};

const InputForm = ({
  label,
  type,
  placeholder,
  error,
  register,
  name,
  icon,
  iconPosition,
  className = "",
}: InputFormProps) => {
  return (
    <div className="mb-4 relative">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            {...register(name)}
            placeholder={placeholder}
            className={`w-full rounded p-2 outline-none transition-colors  ${
              icon
                ? iconPosition === "end"
                  ? "pr-10"
                  : "pl-10"
                : ""
            } ${error ? "border-red-500" : "border-gray-300"} ${className}`}
          />
        ) : (
          <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            className={`w-full rounded p-2 outline-none transition-colors  ${
              icon
                ? iconPosition === "end"
                  ? "pr-10"
                  : "pl-10"
                : ""
            } ${error ? "border-red-500" : "border-gray-300"} ${className}`}
          />
        )}

        {icon && (
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              iconPosition === "end" ? "right-2" : "left-2"
            } text-gray-400`}
          >
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputForm;
