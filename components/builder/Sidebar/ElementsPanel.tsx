"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DndContext, closestCenter, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEditorStore } from "@/store/editorStore";

import DraggableElement from "./DraggableElement";
import SortableLayerItem from "./SortableLayerItem";

interface TemplateElement {
  id: string;
  type: "text" | "date" | "image" | "dropdown" | "checkbox";
  label: string;
}

const ElementsPanel: React.FC = () => {
  const {
    elements,
    selectElement,
    deleteElement,
    updateElement,
    reorderElements,
    selectedElementId,
  } = useEditorStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const templateElements: TemplateElement[] = [
    { id: "text-element", type: "text", label: "حقل النص" },
    { id: "date-element", type: "date", label: "حقل التاريخ" },
    { id: "image-element", type: "image", label: "حقل الصورة" },
    { id: "dropdown-element", type: "dropdown", label: "القائمة المنسدلة" },
    { id: "checkbox-element", type: "checkbox", label: "خانة الاختيار" },
  ];

  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

  const handleToggleVisibility = (elementId: string) => {
    const el = elements.find((e) => e.id === elementId);
    if (el) updateElement(elementId, { isVisible: !el.isVisible });
  };

  const handleToggleLock = (elementId: string) => {
    const el = elements.find((e) => e.id === elementId);
    if (el) updateElement(elementId, { isLocked: !el.isLocked });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sortedElements.findIndex((el) => el.id === active.id);
      const newIndex = sortedElements.findIndex((el) => el.id === over?.id);
      reorderElements(oldIndex, newIndex);
    }
    setActiveId(null);
  };

  return (
    <div className="w-80 bg-white h-full p-5 gap-5 rounded-[20px] min-w-[400px] ">
      <Tabs defaultValue="elements" className="h-full">
        <TabsList
          className="grid grid-cols-2 h-fit w-full gap-2 bg-[#F8F8F8] border border-[#E5E7EB] p-[10px] rounded-lg"
          dir="rtl"
        >
          <TabsTrigger
            value="elements"
            className="text-sm font-medium rounded-lg py-2 transition-colors data-[state=active]:bg-[#00579F] data-[state=active]:text-white"
          >
            العناصر
          </TabsTrigger>
          <TabsTrigger
            value="layers"
            className="text-sm font-medium rounded-lg py-2 transition-colors data-[state=active]:bg-[#00579F] data-[state=active]:text-white"
          >
            الطبقات
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="elements"
          className="space-y-1 overflow-auto pt-4 text-right"
          dir="rtl"
        >
          {templateElements.map((el) => (
            <DraggableElement
              key={el.id}
              id={el.id}
              type={el.type}
              label={el.label}
            />
          ))}
        </TabsContent>

        <TabsContent
          value="layers"
          className="overflow-auto pt-4 space-y-2 text-right"
          dir="rtl"
        >
          {elements.length === 0 ? (
            <p className="text-center text-secondary-500 py-8">
              لم يتم إضافة عناصر بعد
            </p>
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortedElements.map((e) => e.id)}
                strategy={verticalListSortingStrategy}
              >
                {sortedElements.map((el, i) => (
                  <SortableLayerItem
                    key={el.id}
                    element={el}
                    index={i}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElementsPanel;
