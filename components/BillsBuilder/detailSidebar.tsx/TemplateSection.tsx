"use client";
import * as React from "react";
import { InputField } from "./InputField";
import { DropdownField } from "./DropdownField";
import { CheckboxField } from "./CheckboxField";

export const TemplateSection: React.FC = () => {
  return (
    <section className="w-full">
      <header className="gap-2.5 self-stretch w-full text-base font-medium text-right whitespace-nowrap text-slate-500">
        عامة
      </header>
      <div className="mt-2.5 w-full">
        <InputField
          label="العنوان"
          value="القالب رقم 123"
        />
        <DropdownField
          className="mt-4"
          label="نوع القالب"
          value="سند صرف"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/736c0c0d10f140b89dedb00707aaec25/1d4f8c14c016e7455389c524a68e769bb45f565d?placeholderIfAbsent=true"
        />
        <InputField
          className="mt-4"
          label="المستخدمين"
          value=""
        />
        <CheckboxField
          className="mt-4"
          label="تعيين كافتراضي"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/736c0c0d10f140b89dedb00707aaec25/3b53b7d9e97a42350b659f560ed2855ce7f35732?placeholderIfAbsent=true"
        />
      </div>
    </section>
  );
};
