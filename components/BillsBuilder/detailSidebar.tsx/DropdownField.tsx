"use client";
import * as React from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  className?: string;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  onChange,
  options,
  className = "",
}) => {
  return (
    <article className={`flex gap-2.5 w-full text-base text-right text-slate-500 ${className}`}>
      <label className="gap-2.5 self-stretch my-auto text-slate-500 w-[120px]">
        {label}
      </label>
      <div className="flex-1 shrink basis-0 min-w-60">
        <div className="flex flex-col justify-center px-4 py-2.5 w-full rounded-xl border border-solid bg-stone-50">
          <div className="flex gap-10 justify-between  items-center w-full">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="gap-2.5 self-stretch my-auto text-slate-500 bg-transparent outline-none border-none w-full"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </article>
  );
};
