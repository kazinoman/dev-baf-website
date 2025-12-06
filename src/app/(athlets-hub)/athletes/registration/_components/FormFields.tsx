"use client";

import type React from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { ChevronRight, AlertCircle } from "lucide-react";

interface FormInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  icon?: React.ElementType;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormInputField<T extends FieldValues>({
  control,
  name,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  required,
  disabled,
}: FormInputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          <div className="relative">
            {Icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon size={18} />
              </div>
            )}
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full ${
                Icon ? "pl-10" : "pl-4"
              } pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
                error ? "border-rose-500 focus:ring-rose-500" : "border-slate-200"
              }`}
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm text-rose-600">
              <AlertCircle size={14} />
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
}

interface FormSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  icon?: React.ElementType;
  options: { id: string | number; value: string }[];
  placeholder?: string;
  required?: boolean;
}

export function FormSelectField<T extends FieldValues>({
  control,
  name,
  label,
  icon: Icon,
  options,
  placeholder,
  required,
}: FormSelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          <div className="relative">
            {Icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Icon size={18} />
              </div>
            )}
            <select
              {...field}
              className={`w-full ${
                Icon ? "pl-10" : "pl-4"
              } pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer ${
                error ? "border-rose-500 focus:ring-rose-500" : "border-slate-200"
              }`}
            >
              <option value="">{placeholder}</option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.value}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronRight size={18} className="rotate-90" />
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm text-rose-600">
              <AlertCircle size={14} />
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
}
