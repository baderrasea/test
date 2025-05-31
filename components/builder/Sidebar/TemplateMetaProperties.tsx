"use client";

import React from "react";
import { useEditorStore } from "@/store/editorStore";
import LabeledInput from "./LabeledInput";
import LabeledSelect from "./LabeledSelect";
import LabeledCheckbox from "./LabeledCheckbox";
import TitleWithLines from "./TitleWithLines ";
import LabeledImageInput from "./LabeledImageInput";

const TemplateMetaProperties: React.FC = () => {
  const { templateProperties, updateTemplateProperties } = useEditorStore();

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
      <LabeledCheckbox
        id="orientation"
        label="تعيين كافتراضي"
        checked={templateProperties.orientation === "Landscape"}
        onChange={(checked) =>
          updateTemplateProperties({
            orientation: checked ? "Landscape" : "Portrait",
          })
        }
      />
      <TitleWithLines title="الصفحة" />
      {/* <LabeledSelect
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
      /> */}
      <LabeledCheckbox
        id="orientation"
        label="تعيين كافتراضي"
        checked={templateProperties.orientation === "Landscape"}
        onChange={(checked) =>
          updateTemplateProperties({
            orientation: checked ? "Landscape" : "Portrait",
          })
        }
      />
      <LabeledSelect
        id="canvasSize"
        label="حجم الصفحة"
        value={`${templateProperties.canvasWidth}x${templateProperties.canvasHeight}`}
        onChange={(value) => {
          const [w, h] = value.split('x').map(Number);
          updateTemplateProperties({ canvasWidth: w, canvasHeight: h });
        }}
        options={[
          { value: "750x550", label: "افتراضي (A4) 750x550" },
          { value: "600x400", label: "صغير 600x400" },
          { value: "900x600", label: "كبير 900x600" },
          { value: "1200x800", label: "عريض 1200x800" },
        ]}
      />
      <LabeledCheckbox
        id="showRuler"
        label="اظهار المسطرة"
        checked={!!templateProperties.showRuler}
        onChange={(checked) =>
          updateTemplateProperties({ showRuler: checked })
        }
      />
      <LabeledImageInput
        label="صورة الخلفية"
        value={templateProperties.backgroundImage}
        onChange={(img) => updateTemplateProperties({ backgroundImage: img })}
      />
    </div>
  );
};

export default TemplateMetaProperties;
