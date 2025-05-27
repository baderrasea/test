"use client";
import * as React from "react";

interface CheckboxFieldProps {
  label: string;
  iconSrc: string;
  className?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  iconSrc,
  className = "",
}) => {
  return (
    <article className={`flex gap-2.5 items-center w-full text-base text-right text-slate-500 ${className}`}>
      <img
        src={iconSrc}
        className="object-contain shrink-0 self-stretch my-auto w-5 rounded-md aspect-square"
        alt=""
      />
      <label className="gap-2.5 self-stretch my-auto text-slate-500 w-[120px]">
        {label}
      </label>
    </article>
  );
};
