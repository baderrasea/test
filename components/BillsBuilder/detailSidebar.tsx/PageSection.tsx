"use client";
import * as React from "react";
import { DropdownField } from "./DropdownField";
import { CheckboxField } from "./CheckboxField";
import { InputField } from "./InputField";
import { ImageUploadField } from "./ImageUploadField";

export const PageSection: React.FC = () => {
  return (
    <section className="w-full">
      <header className="gap-2.5 self-stretch w-full text-base font-medium whitespace-nowrap text-slate-500">
        الصفحة
      </header>
      <div className="mt-2.5 w-full">
        <DropdownField
          label="حجم الصفحة"
          value="B5 (20 * 15)"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/736c0c0d10f140b89dedb00707aaec25/1d4f8c14c016e7455389c524a68e769bb45f565d?placeholderIfAbsent=true"
        />
        <CheckboxField
          className="mt-4"
          label="اظهار المسطرة"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/736c0c0d10f140b89dedb00707aaec25/3b53b7d9e97a42350b659f560ed2855ce7f35732?placeholderIfAbsent=true"
        />
        <InputField
          className="mt-4"
          label="المستخدمين"
          value=""
        />
        <ImageUploadField
          className="mt-4"
          label="صورة الخلفية"
        />
      </div>
    </section>
  );
};
