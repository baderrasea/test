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
        flex items-center gap-3 p-3 bg-white border border-secondary-200 rounded-lg cursor-grab
        hover:border-primary-300 hover:shadow-sm transition-all duration-200 font-arabic
        ${isDragging ? 'opacity-50 rotate-2' : ''}
      `}
    >
      <Icon className="w-5 h-5 text-secondary-600" />
      <span className="text-sm-medium text-secondary-700">{label}</span>
    </div>
  );
};

export default DraggableElement;
