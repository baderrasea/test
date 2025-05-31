// src/components/BottomToolbar.tsx
"use client";

import React, { MouseEvent, useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";
import Image from "next/image";
import { useCanvasScreenshot } from "@/components/builder/Canvas/useCanvasScreenshot";

type Action = {
  key: string;
  iconPath: string;
  onClick: () => void;
  disabled?: boolean;
  hoverBg?: string;
  hoverText?: string;
};

const BUTTON_SIZE = 44;
const BASE_BUTTON_CLASSES = `
  flex items-center justify-center 
  w-[${BUTTON_SIZE}px] h-[${BUTTON_SIZE}px]
  bg-[#EBEEF3] border border-[#E5E7EB]
  rounded-[10px] transition
`;

const BottomToolbar: React.FC = () => {
  const { undo, redo, reset, history, historyIndex, elements, setThumbnail, thumbnail } = useEditorStore();
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  const takeScreenshot = useCanvasScreenshot();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);
  const [editMode, setEditMode] = useState(true); // true = edit, false = preview

  const handleSave = async () => {
    const dataUrl = await takeScreenshot();
    if (dataUrl) {
      setThumbnail(dataUrl);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'template-thumbnail.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    toast.success("تم حفظ القالب بنجاح!");
    console.log("Saving template with elements:", elements);
  };

  const handlePreview = async () => {
    setEditMode(false);
    setPreviewOpen(true);
    if (thumbnail) {
      setPreviewImg(thumbnail);
    } else {
      const dataUrl = await takeScreenshot();
      setPreviewImg(dataUrl);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setPreviewOpen(false);
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
      disabled: editMode,

      key: "edit",
      iconPath: "/assets/icons/builder/pen-tool-2.svg",
      onClick: handleEdit,
      hoverBg: editMode ? "bg-[#0071CB] text-white" : "hover:bg-[#0071CB] hover:text-white",
      hoverText: editMode ? "text-white" : "hover:text-white",
    },
    {
      key: "view",
      iconPath: "/assets/icons/builder/eye.svg",
      onClick: handlePreview,
      hoverBg: !editMode ? "bg-[#0071CB] text-white" : "hover:bg-[#0071CB] hover:text-white",
      hoverText: !editMode ? "text-white" : "hover:text-white",
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
      onClick: reset,
      disabled: elements.length === 0,
      hoverBg: "hover:bg-red-300",
      hoverText: "hover:text-white",
    },
  ];

  const stopDrag = (e: MouseEvent) => e.stopPropagation();

  return (
    <>
      {/* Preview Modal */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className=" rounded-xl p-4 max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-full h-[400px]">
              {previewImg ? (
                <Image
                  src={previewImg}
                  alt="معاينة القالب"
                  className="object-contain w-full h-full rounded-xl border"
                  style={{ background: '#fff' }}
                  width={600}
                  height={400}
                />
              ) : (
                <div className="text-gray-400 text-lg">جاري التحميل...</div>
              )}
            </div>

            {/* BottomToolbar inside modal for actions */}
            <div className="w-full flex justify-center mt-4">
              <div className="w-fit">
                {/* Render toolbar actions inside modal, except preview */}
                {actions.map(({ key, iconPath, onClick, disabled, hoverBg, hoverText }) => (
                  <button
                    key={key}
                    onClick={onClick}
                    disabled={disabled}
                    onPointerDown={stopDrag}
                    className={`inline-flex items-center justify-center w-[44px] h-[44px] mx-1 rounded-[10px] border
                       border-[#E5E7EB] bg-[#EBEEF3] transition ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${hoverBg ?? ""} ${hoverText ?? ""}`}
                  >
                    <Image src={iconPath} alt={`${key} icon`} width={24} height={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main Toolbar */}
      <div
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-lg rounded-[10px] flex items-center gap-[10px] px-[20px] py-[5px] z-50"
      >
        {actions.map(({ key, iconPath, onClick, disabled, hoverBg, hoverText }) => (
          <React.Fragment key={key}>
            <button
              onClick={onClick}
              disabled={disabled}
              onPointerDown={stopDrag}
              className={`
                ${BASE_BUTTON_CLASSES}
                ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                ${hoverBg ?? ""} ${hoverText ?? ""}
                ${key === 'view' && previewOpen ? 'bg-[#0071CB] text-white' : ''}
              `}
            >
              <Image src={iconPath} alt={`${key} icon`} width={24} height={24} />
            </button>
            {key === "view" && (
              <div
                className="w-[36px] h-[2px] px-[4px] gap-[10px] transform rotate-[-90deg] border-2 border-[#E5E7EB]"
                key="divider-after-view"
              ></div>
            )}
          </React.Fragment>
        ))}
        {/* <Image src="/assets/icons/builder/eye.svg" alt="view icon" width={24} height={24} /> */}


      </div>
    </>
  );
};

export default BottomToolbar;
