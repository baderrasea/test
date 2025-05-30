"use client";

import React from "react";
import { useEditorStore } from "@/store/editorStore";
import ElementProperties from "./ElementProperties";
import TemplateMetaProperties from "./TemplateMetaProperties";

const TemplateProperties: React.FC = () => {
  const { selectedElementId } = useEditorStore();

  return (
    <div className="w-80 bg-white gap-[20px] min-w-[400px] p-[20px] rounded-[20px] overflow-y-auto font-arabic">
      <h3 className="text-xl text-[#535862] font-expo-arabic font-semibold mb-6 text-right leading-[30px]">
        {selectedElementId ? "خصائص العنصر" : "خصائص القالب"}
      </h3>
      {selectedElementId ? <ElementProperties /> : <TemplateMetaProperties />}
    </div>
  );
};

export default TemplateProperties;
