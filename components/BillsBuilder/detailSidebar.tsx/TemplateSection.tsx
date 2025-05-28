"use client";
import { InputField } from "./InputField";
import { DropdownField } from "./DropdownField";
import { CheckboxField } from "./CheckboxField";
import { useState } from "react";

export const TemplateSection: React.FC = () => {
   const [selectedSize, setSelectedSize] = useState("A4 (21 * 29.7)");
   const [address, setAddress] = useState("");

  const pageSizes = [
    { label: "B5 (20 * 15)", value: "B5 (20 * 15)" },
    { label: "A4 (21 * 29.7)", value: "A4 (21 * 29.7)" },
    { label: "A5 (14.8 * 21)", value: "A5 (14.8 * 21)" },
  ];

  return (
    <section className="w-full">
      <header className="gap-2.5 self-stretch w-full text-base font-medium text-right whitespace-nowrap text-slate-500">
        عامة
      </header>
      <div className="mt-2.5 w-full space-y-[10px] ">
        <InputField
        placeholder="مثال: فاتورة"
          label="العنوان"
          value={address}
                    readOnly={false}

          onChange={(e) => setAddress(e.target.value)}
        />
       <DropdownField
      label="نوع القالب"
      value={selectedSize}
      onChange={setSelectedSize}
      options={pageSizes}
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
