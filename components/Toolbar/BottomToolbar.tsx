// src/components/BottomToolbar.tsx
"use client";

import React, { MouseEvent } from "react";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";
import Image from "next/image";

type Action = {
  key: string;
  iconPath: string;
  onClick: () => void;
  disabled?: boolean;
  hoverBg?: string;
  hoverText?: string;
};

const ICON_SIZE = 24;
const BUTTON_SIZE = 44;
const BASE_BUTTON_CLASSES = `
  flex items-center justify-center
  w-[${BUTTON_SIZE}px] h-[${BUTTON_SIZE}px]
  bg-[#EBEEF3] border border-[#E5E7EB]
  rounded-[10px] transition
`;

const BottomToolbar: React.FC = () => {
  const { undo, redo, reset, history, historyIndex, elements } =
    useEditorStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleSave = () => {
    toast.success("تم حفظ القالب بنجاح!");
    console.log("Saving template with elements:", elements);
  };

  const handleReset = () => {
    if (elements.length === 0) return;
    const confirmed = window.confirm(
      "هل أنت متأكد من الرغبة في إعادة التعيين؟ سيؤدي هذا إلى حذف جميع العناصر."
    );
    if (confirmed) {
      reset();
      toast.info("تم إعادة تعيين القالب");
    }
  };

  const actions: Action[] = [
    {
      key: "redo",
      iconPath: "/assets/icons/builder/redo.svg",
      onClick: redo,
      disabled: !canRedo,
      hoverBg: "hover:bg-[#0071CB]",
      hoverText: "hover:text-white",
    },
    {
      key: "undo",
      iconPath: "/assets/icons/builder/undo.svg",
      onClick: undo,
      disabled: !canUndo,
      hoverBg: "hover:bg-[#0071CB]",
      hoverText: "hover:text-white",
    },
    {
      key: "edit",
      iconPath: "/assets/icons/builder/Vector (Stroke)-1.svg",
      onClick: () => { },
      hoverBg: "hover:bg-[#0071CB]",
      hoverText: "hover:text-black",
    },
    {
      key: "view",
      iconPath: "/assets/icons/builder/eye.svg",
      onClick: () => { },
      hoverBg: "hover:bg-[#0071CB]",
      hoverText: "hover:text-white",
    },
    {
      key: "save",
      iconPath: "/assets/icons/builder/diskette.svg",
      onClick: handleSave,
      hoverBg: "hover:bg-[#0071CB]",
      hoverText: "hover:text-black",
    },
    {
      key: "reset",
      iconPath: "/assets/icons/builder/cross.svg",
      onClick: handleReset,
      disabled: elements.length === 0,
      hoverBg: "hover:bg-red-300",
      hoverText: "hover:text-white",
    },
  ];

  const stopDrag = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      className="
        fixed bottom-5 left-1/2 transform -translate-x-1/2
        bg-white/90 backdrop-blur-sm shadow-lg rounded-[10px]
        flex items-center gap-[10px] px-[20px] py-[5px]
        z-50
      "
    >
      {actions.map(
        ({ key, iconPath, onClick, disabled, hoverBg, hoverText }) => (
          <React.Fragment key={key}>
            <button
              onClick={onClick}
              disabled={disabled}
              onPointerDown={stopDrag}
              className={`
                ${BASE_BUTTON_CLASSES}
                ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                ${hoverBg ?? ""} ${hoverText ?? ""}
              `}
            >
              <Image
                src={iconPath}
                alt={`${key} icon`}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            </button>
            {key === "view" && (
              <div
                className="w-[36px] h-[2px] px-[4px] gap-[10px] transform rotate-[-90deg] border-2 border-[#E5E7EB]"
                key="divider-after-view"
              ></div>
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default BottomToolbar;
