"use client";
import * as React from "react";

interface ImageUploadFieldProps {
  label: string;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  className = "",
}) => {
  return (
    <article className={`w-full text-right ${className}`}>
      <div className="w-full">
        <div className="flex flex-col w-full">
          <label className="self-end text-sm font-medium leading-none text-slate-500">
            {label}
          </label>
          <div className="flex overflow-hidden flex-col justify-center items-center px-4 py-6 mt-1.5 w-full rounded-lg border border-solid shadow-sm bg-stone-50 border-[color:var(--Gray-300,#D5D7DA)]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/736c0c0d10f140b89dedb00707aaec25/68853088c9640eb27aa4e02221fe7583bbe99f80?placeholderIfAbsent=true"
              className="object-contain w-6 aspect-square"
              alt="Upload icon"
            />
            <div className="flex flex-col items-center mt-4">
              <p className="text-base font-medium leading-6 text-gray-500">
                <span className="text-[#0071CB]">اضغط هنا لرفع الصورة</span>{" "}
                أو قم بالسحب والإفلات
              </p>
              <p className="mt-1 text-sm leading-none text-slate-400">
                SVG, PNG, أو JPG. لا تتجاوز 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
