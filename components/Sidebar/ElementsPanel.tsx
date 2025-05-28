"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/store/editorStore';
import DraggableElement from '../TemplateElements/DraggableElement';
import { Layers, Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableLayerItemProps {
  element: any;
  index: number;
  selectedElementId: string | null;
  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDelete: (id: string) => void;
}

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`
        flex items-center gap-2 p-2 border rounded-lg cursor-pointer
        transition-colors duration-200
        ${selectedElementId === element.id 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-secondary-200 hover:border-secondary-300'
        }
        ${!element.isVisible ? 'opacity-50' : ''}
      `}
      onClick={() => onSelect(element.id)}
    >
      <div {...listeners} className="cursor-grab hover:cursor-grabbing p-1">
        <Layers className="w-3 h-3 text-secondary-400" />
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility(element.id);
        }}
        className="p-1 h-6 w-6"
      >
        {element.isVisible ? (
          <Eye className="w-3 h-3" />
        ) : (
          <EyeOff className="w-3 h-3" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock(element.id);
        }}
        className="p-1 h-6 w-6"
      >
        {element.isLocked ? (
          <Lock className="w-3 h-3 text-warning-500" />
        ) : (
          <Unlock className="w-3 h-3" />
        )}
      </Button>
      
      <span className="flex-1 text-sm-medium">
        {element.properties.label || `${element.type === 'text' ? 'نص' : element.type === 'date' ? 'تاريخ' : element.type === 'image' ? 'صورة' : element.type === 'dropdown' ? 'قائمة' : 'اختيار'} ${index + 1}`}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(element.id);
        }}
        className="p-1 h-6 w-6 text-danger-500 hover:text-danger-700"
        disabled={element.isLocked}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};

const ElementsPanel: React.FC = () => {
  const { elements, selectElement, deleteElement, updateElement, reorderElements, selectedElementId } = useEditorStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const templateElements = [
    { id: 'text-element', type: 'text' as const, label: 'حقل النص' },
    { id: 'date-element', type: 'date' as const, label: 'حقل التاريخ' },
    { id: 'image-element', type: 'image' as const, label: 'حقل الصورة' },
    { id: 'dropdown-element', type: 'dropdown' as const, label: 'القائمة المنسدلة' },
    { id: 'checkbox-element', type: 'checkbox' as const, label: 'خانة الاختيار' },
  ];

  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

  const handleToggleVisibility = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (element) {
      updateElement(elementId, { isVisible: !element.isVisible });
    }
  };

  const handleToggleLock = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (element) {
      updateElement(elementId, { isLocked: !element.isLocked });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = sortedElements.findIndex(el => el.id === active.id);
      const newIndex = sortedElements.findIndex(el => el.id === over?.id);
      
      reorderElements(oldIndex, newIndex);
    }
    
    setActiveId(null);
  };

  return (
    <div className="w-80 bg-white border-l border-secondary-200 font-arabic">
      <Tabs defaultValue="elements" className="h-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary-100">
          <TabsTrigger value="elements" className="text-sm-medium">العناصر</TabsTrigger>
          <TabsTrigger value="layers" className="text-sm-medium">الطبقات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="elements" className="p-4 space-y-3">
          <h3 className="text-lg-semibold text-secondary-900 mb-4">عناصر القالب</h3>
          
          {templateElements.map((element) => (
            <DraggableElement
              key={element.id}
              id={element.id}
              type={element.type}
              label={element.label}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="layers" className="p-4">
          <h3 className="text-lg-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            الطبقات
          </h3>
          
          <div className="space-y-2">
            {elements.length === 0 ? (
              <p className="text-secondary-500 text-sm-book text-center py-8">
                لم يتم إضافة عناصر بعد
              </p>
            ) : (
              <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={sortedElements.map(el => el.id)} 
                  strategy={verticalListSortingStrategy}
                >
                  {sortedElements.map((element, index) => (
                    <SortableLayerItem
                      key={element.id}
                      element={element}
                      index={index}
                      selectedElementId={selectedElementId}
                      onSelect={selectElement}
                      onToggleVisibility={handleToggleVisibility}
                      onToggleLock={handleToggleLock}
                      onDelete={deleteElement}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElementsPanel;
