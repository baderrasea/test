"use client"
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Calendar, Image, ChevronDown, CheckSquare } from 'lucide-react';

interface DraggableElementProps {
  id: string;
  type: 'text' | 'date' | 'image' | 'dropdown' | 'checkbox';
  label: string;
}

const elementIcons = {
  text: Type,
  date: Calendar,
  image: Image,
  dropdown: ChevronDown,
  checkbox: CheckSquare,
};

const DraggableElement: React.FC<DraggableElementProps> = ({ id, type, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { type },
  });

  const Icon = elementIcons[type];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
    flex gap-[10px] items-center w-full h-[64px] bg-white px-4 py-2 
    rounded-lg cursor-all-scroll
    hover:border-primary-300 hover:shadow-sm transition-all duration-200
    ${isDragging ? 'opacity-50 ' : ''}
  `}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-[10px] p-[10px] bg-[#D3DBE4] gap-[10px] text-sm font-semibold">
        <Icon className="w-5 h-5 text-secondary-600" />
      </div>
      <div className="flex flex-col text-right">
        <span className="text-[14px] font-medium text-[#374151]">{label}</span>
        <span className="text-[12px] text-[#9CA3AF]">حقل {type === 'text' ? 'رقم' : type === 'date' ? 'تاريخ' : type === 'image' ? 'صورة' : type === 'dropdown' ? 'قائمة' : 'خانة'}</span>
      </div>

    </div>

  );
};

export default DraggableElement;
