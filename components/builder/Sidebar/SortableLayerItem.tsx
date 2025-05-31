"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Type,
  Calendar,
  Image,
  ChevronDown,
  CheckSquare,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableLayerItemProps {
  element: {
    id: string;
    type: "text" | "date" | "image" | "dropdown" | "checkbox";
    properties: { label?: string };
    isVisible: boolean;
    isLocked: boolean;
  };
  index: number;
  selectedElementId: string | null;
  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDelete: (id: string) => void;
}

const elementIcons = {
  text: Type,
  date: Calendar,
  image: Image,
  dropdown: ChevronDown,
  checkbox: CheckSquare,
};

const SortableLayerItem: React.FC<SortableLayerItemProps> = ({
  element,
  index,
  selectedElementId,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || !element.isVisible ? 0.5 : 1,
  };

  const Icon = elementIcons[element.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={() => onSelect(element.id)}
      className={`
        flex items-center justify-between w-full h-[64px] bg-white px-4 gap-4
        rounded-lg  transition-all duration-200
        ${selectedElementId === element.id
          ? "border border-primary-500 bg-primary-50"
          : ""}
      `}
    >
      {/* left icon */}
      
      <div     {...listeners}
       className="cursor-grab w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#D3DBE4]">
        <Icon className="w-5 h-5 text-secondary-600" />
      </div>

      {/* labels */}
      <div 
      {...listeners}
      
      className="flex-1 cursor-grab flex flex-col text-right overflow-hidden">
        <span className="text-[14px] font-medium text-[#374151] truncate">
          {element.properties.label ||
            `${element.type === "text"
              ? "نص"
              : element.type === "date"
              ? "تاريخ"
              : element.type === "image"
              ? "صورة"
              : element.type === "dropdown"
              ? "قائمة"
              : "اختيار"} ${index + 1}`}
        </span>
        <span className="text-[12px] text-[#9CA3AF]">
          حقل{" "}
          {element.type === "text"
            ? "نص"
            : element.type === "date"
            ? "تاريخ"
            : element.type === "image"
            ? "صورة"
            : element.type === "dropdown"
            ? "قائمة"
            : "خانة"}
        </span>
      </div>

     <Button
        variant="ghost"
        size="sm"
        className="p-1 h-6 w-6"
        onPointerDown={(e) => e.stopPropagation()}   // ← prevent drag
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility(element.id);
        }}
      >
        {element.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </Button>

      {/* lock */}
      <Button
        variant="ghost"
        size="sm"
        className="p-1 h-6 w-6 hover:text-emerald-900 cursor-pointer "
        onPointerDown={(e) => e.stopPropagation()}   // ← prevent drag
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock(element.id);
        }}
      >
        {element.isLocked ? (
          <Lock className="w-4 h-4 hover:text-emerald-900 cursor-pointer " />
        ) : (
          <Unlock className="w-4 h-4" />
        )}
      </Button>

      {/* delete */}
      <Button
        variant="ghost"
        size="sm"
        className="p-1 h-6 w-6 text-danger-500 hover:text-emerald-900 cursor-pointer "
        disabled={element.isLocked}
        onPointerDown={(e) => e.stopPropagation()}   // ← prevent drag
        onClick={(e) => {
          e.stopPropagation();
          onDelete(element.id);
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SortableLayerItem;
