"use client";
import * as React from "react";

interface DropdownFieldProps {
  label: string;
  value: string;
  iconSrc?: string;
  className?: string;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  iconSrc,
  className = "",
}) => {
  return (
    <article className={`flex gap-2.5 w-full text-base text-right text-slate-500 ${className}`}>
         <label className="gap-2.5 self-stretch my-auto text-slate-500 w-[120px]">
        {label}
      </label>
      <div className="flex-1 shrink basis-0 min-w-60">
        <div className="flex flex-col justify-center px-4 py-2.5 w-full rounded-xl border border-solid bg-stone-50">
          <div className="flex gap-10 justify-between items-center w-full">
            
            <select className="gap-2.5 self-stretch my-auto text-slate-500 bg-transparent outline-none border-none w-full">
              <option value="B5 (20 * 15)">B5 (20 * 15)</option>
              <option value="A4 (21 * 29.7)">A4 (21 * 29.7)</option>
              <option value="A5 (14.8 * 21)">A5 (14.8 * 21)</option>
            </select>
          </div>
        </div>
      </div>
     
    </article>
  );
};
