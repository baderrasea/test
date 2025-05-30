"use client";

import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import { useEditorStore } from "@/store/editorStore";
import LabeledInput from "./LabeledInput";
import LabeledSelect from "./LabeledSelect";
import LabeledCheckbox from "./LabeledCheckbox";
import { Upload } from "lucide-react";
import TitleWithLines from "./TitleWithLines ";

const TemplateMetaProperties: React.FC = () => {
  const { templateProperties, updateTemplateProperties } = useEditorStore();
  const [preview, setPreview] = useState<string>(templateProperties.backgroundImage || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      updateTemplateProperties({ backgroundImage: result }); // Store image in Zustand
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onClickUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
        <TitleWithLines title="عامه" />
      <LabeledInput
        id="title"
        label="العنوان"
        value={templateProperties.title}
        onChange={(e) => updateTemplateProperties({ title: e.target.value })}
        placeholder="عنوان القالب"
      />

      <LabeledSelect
        id="type"
        label="النوع"
        value={templateProperties.type}
        onChange={(value) => updateTemplateProperties({ type: value })}
        options={[
          { value: "Form", label: "نموذج" },
          { value: "Document", label: "مستند" },
          { value: "Report", label: "تقرير" },
          { value: "Certificate", label: "شهادة" },
        ]}
      />

      <LabeledInput
        id="users"
        label="المستخدمون"
        value={templateProperties.users}
        onChange={(e) => updateTemplateProperties({ users: e.target.value })}
        placeholder="المستخدمون المستهدفون"
      />
        <TitleWithLines title="الصفحة" />

      <LabeledSelect
        id="pageSize"
        label="حجم الصفحة"
        value={templateProperties.pageSize}
        onChange={(value) => updateTemplateProperties({ pageSize: value })}
        options={[
          { value: "A4", label: "A4" },
          { value: "A3", label: "A3" },
          { value: "Letter", label: "Letter" },
          { value: "Legal", label: "Legal" },
        ]}
      />

      <LabeledCheckbox
        id="orientation"
        label="الاتجاه الأفقي"
        checked={templateProperties.orientation === "Landscape"}
        onChange={(checked) =>
          updateTemplateProperties({
            orientation: checked ? "Landscape" : "Portrait",
          })
        }
      />

      <LabeledSelect
        id="canvasSize"
        label="حجم مساحة العمل"
        value={`${templateProperties.canvasWidth}x${templateProperties.canvasHeight}`}
        onChange={(value) => {
          const [w, h] = value.split('x').map(Number);
          updateTemplateProperties({ canvasWidth: w, canvasHeight: h });
        }}
        options={[
          { value: "750x550", label: "افتراضي (A4) 750x550" },
          { value: "900x600", label: "كبير 900x600" },
          { value: "600x400", label: "صغير 600x400" },
          { value: "1200x800", label: "عريض 1200x800" },
        ]}
      />

      <div>
        <p className="text-sm-medium text-[#535862] font-expo-arabic text-right block mb-2">
          صورة الخلفية
        </p>
        <div
          className="relative mt-1 flex items-center justify-center w-full h-40 border-2 border-dashed border-[#E0E0E0] rounded-lg bg-white cursor-pointer overflow-hidden"
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={onClickUpload}
        >
          {preview ? (
            <img
              src={preview}
              alt="Background Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                اسحب صورة هنا أو اضغط للاختيار
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateMetaProperties;
