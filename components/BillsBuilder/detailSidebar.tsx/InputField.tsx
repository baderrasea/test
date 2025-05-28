"use client";
import * as React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  readOnly = false,
  className = "",
  placeholder,
  onChange,
}) => {
  return (
    <article className={`flex gap-2.5 w-full text-base text-right text-slate-500 ${className}`}>
      <label className="gap-2.5 self-stretch my-auto whitespace-nowrap text-slate-500  w-[120px]">
        {label}
      </label>
      <div className="flex-1 shrink basis-0 min-w-60">
        <input
          type="text"
          className="flex-1 px-4 py-2.5 w-full rounded-xl border border-solid bg-stone-50 outline-none"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
        />
      </div>
    </article>
  );
};

