"use client";
import { DropdownField } from "./DropdownField";
import { CheckboxField } from "./CheckboxField";
import { InputField } from "./InputField";
import { ImageUploadField } from "./ImageUploadField";
import { useState } from "react";

export const PageSection: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState("A4 (21 * 29.7)");
  const [username, setUsername] = useState("BadrAlDeen");

  const pageSizes = [
    { label: "B5 (20 * 15)", value: "B5 (20 * 15)" },
    { label: "A4 (21 * 29.7)", value: "A4 (21 * 29.7)" },
    { label: "A5 (14.8 * 21)", value: "A5 (14.8 * 21)" },
  ];

  return (
    <section className="w-full">
      <header className="gap-2.5 self-stretch w-full text-base font-medium whitespace-nowrap text-slate-500">
        الصفحة
      </header>
      <div className="mt-2.5 w-full">
        <DropdownField
          label="Page Size"
          value={selectedSize}
          onChange={setSelectedSize}
          options={pageSizes}
        />
        <CheckboxField
          className="mt-4"
          label="اظهار المسطرة"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/736c0c0d10f140b89dedb00707aaec25/3b53b7d9e97a42350b659f560ed2855ce7f35732?placeholderIfAbsent=true"
        />
        <InputField
          className="mt-4"
          label="المستخدمين"
          value={username}
          readOnly={false}
          onChange={(e) => setUsername(e.target.value)}
        />

        <ImageUploadField
          className="mt-4"
          label="صورة الخلفية"
        />
      </div>
    </section>
  );
};
