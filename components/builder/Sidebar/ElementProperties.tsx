"use client";

import React from "react";
import { useEditorStore } from "@/store/editorStore";
import LabeledInput from "./LabeledInput";
import LabeledCheckbox from "./LabeledCheckbox";
import LabeledImageInput from "./LabeledImageInput";

const ElementProperties: React.FC = () => {
  const { selectedElementId, elements, updateElement } = useEditorStore();
  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (!selectedElement) return null;

  const isImageElement = selectedElement.type === "image";

  return (
    <div className="space-y-4">
      <LabeledInput
        id="elementLabel"
        label="التسمية"
        value={selectedElement.properties.label || ""}
        onChange={(e) =>
          updateElement(selectedElement.id, {
            properties: {
              ...selectedElement.properties,
              label: e.target.value,
            },
          })
        }
        placeholder="تسمية العنصر"
      />
      <LabeledInput
        id="elementPlaceholder"
        label="النص التوضيحي"
        value={selectedElement.properties.placeholder || ""}
        onChange={(e) =>
          updateElement(selectedElement.id, {
            properties: {
              ...selectedElement.properties,
              placeholder: e.target.value,
            },
          })
        }
        placeholder="النص التوضيحي"
      />
      {isImageElement && (
        <LabeledImageInput
          label="صورة العنصر"
          value={selectedElement.properties.value}
          onChange={(img) =>
            updateElement(selectedElement.id, {
              properties: {
                ...selectedElement.properties,
                value: img,
              },
            })
          }
        />
      )}
      <div className="grid grid-cols-1 gap-2">
        <LabeledInput
          id="width"
          label="العرض"
          type="number"
          value={selectedElement.width}
          onChange={(e) =>
            updateElement(selectedElement.id, {
              width: parseInt(e.target.value) || 0,
            })
          }
          placeholder="العرض"
        />
        <LabeledInput
          id="height"
          label="الارتفاع"
          type="number"
          value={selectedElement.height}
          onChange={(e) =>
            updateElement(selectedElement.id, {
              height: parseInt(e.target.value) || 0,
            })
          }
          placeholder="الارتفاع"
        />
        <LabeledCheckbox
          id="required"
          label="تعيين كافتراضي"
          checked={selectedElement.properties.required || false}
          onChange={(checked) =>
            updateElement(selectedElement.id, {
              properties: {
                ...selectedElement.properties,
                required: checked,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default ElementProperties;
