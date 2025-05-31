"use client";

import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import TemplateProperties from '@/components/Sidebar/TemplateProperties';
import dynamic from "next/dynamic";
import ElementsPanel from '@/components/Sidebar/ElementsPanel';
import BottomToolbar from '@/components/Toolbar/BottomToolbar';
import DraggableElement from '@/components/Sidebar/DraggableElement';
import { useEditorStore } from '@/store/editorStore';
import { ImagesGroup } from '@/components/ImagesGroup';
import Image from "next/image";
const TemplateCanvas = dynamic(() => import('@/components/Canvas/TemplateCanvas'), { ssr: false });

const Builder = () => {
  const { addElement, templateProperties } = useEditorStore();
  const [activeDrag, setActiveDrag] = React.useState<DragStartEvent['active'] | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDrag(event.active);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id === 'template-canvas' && active?.data?.current?.type) {
      const elementType = active.data.current.type;
      const canvasElement = document.querySelector('[data-canvas="true"]');

      if (canvasElement) {
        const canvasRect = canvasElement.getBoundingClientRect();
        // Get dynamic canvas size from Zustand
        const canvasWidth = templateProperties.canvasWidth || 750;
        const canvasHeight = templateProperties.canvasHeight || 550;

        // Get the drop position from the drag end event
        const dropEvent = event.activatorEvent as PointerEvent;
        let dropX = 50; // default position
        let dropY = 50; // default position

        if (dropEvent) {
          dropX = Math.max(0, dropEvent.clientX - canvasRect.left - 100);
          dropY = Math.max(0, dropEvent.clientY - canvasRect.top - 20);
        }

        // Default dimensions based on element type
        const defaultDimensions = {
          text: { width: 200, height: 40 },
          date: { width: 180, height: 40 },
          image: { width: 150, height: 120 },
          dropdown: { width: 200, height: 40 },
          checkbox: { width: 150, height: 30 },
        };

        const dimensions = defaultDimensions[elementType as keyof typeof defaultDimensions];

        // Ensure element stays within dynamic canvas bounds
        const finalX = Math.min(dropX, canvasWidth - dimensions.width);
        const finalY = Math.min(dropY, canvasHeight - dimensions.height);

        addElement({
          type: elementType,
          x: Math.max(0, finalX),
          y: Math.max(0, finalY),
          width: dimensions.width,
          height: dimensions.height,
          properties: {
            label: `حقل ${elementType === 'text' ? 'النص' : elementType === 'date' ? 'التاريخ' : elementType === 'image' ? 'الصورة' : elementType === 'dropdown' ? 'القائمة' : 'خانة الاختيار'}`,
            placeholder: `أدخل ${elementType === 'text' ? 'النص' : elementType === 'date' ? 'التاريخ' : elementType === 'image' ? 'الصورة' : elementType === 'dropdown' ? 'اختيار' : 'قيمة'}`,
            required: false,
            rotation: 0,
          },
        });
      }
    }

    setActiveDrag(null);
  };

  const renderDragOverlay = () => {
    if (!activeDrag?.data?.current?.type) return null;

    const elementLabels = {
      text: 'حقل النص',
      date: 'حقل التاريخ',
      image: 'حقل الصورة',
      dropdown: 'القائمة المنسدلة',
      checkbox: 'خانة الاختيار'
    };

    return (
      <DraggableElement
        id={String(activeDrag.id)}
        type={activeDrag.data.current.type}
        label={elementLabels[activeDrag.data.current.type as keyof typeof elementLabels]}
      />
    );
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen text-start flex flex-col bg-[#F4F3F4] p-[10px] " dir="rtl">
        {/* Header */}
        <div dir='ltr' className=" bg-white 
         flex items-center gap-[10px] py-[10px] px-[24px] h-[84px]  rounded-[10px]">
          <div className="mr-auto flex items-center gap-4">
            <ImagesGroup />
          </div>
          <div className="h-[61px] flex items-center gap-[12px] py-[16px] px-[16px] 
          border border-[#E5E7EB] rounded-[10px]">
            <Image
              alt="logo"
              src={"/assets/images/logo/logoS.svg"}
              width={
                23}
              height={32}
            />     
               </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden gap-[24px] px-[20px] py-[24px]">
          {/* Right Sidebar - Elements & Layers */}
          <div className="flex-shrink-0 w-80 min-w-[400px]">
            <ElementsPanel />
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <div className="flex-1 min-h-0 min-w-0 overflow-auto flex items-center justify-center  px-[20px] py-[24px]">
              <TemplateCanvas />
            </div>
          </div>

          {/* Left Sidebar - Template Properties */}
          <div className="flex-shrink-0 w-80 min-w-[400px]">
            <TemplateProperties />
          </div>
        </div>

        {/* Bottom Toolbar */}
        <BottomToolbar />


        {/* Drag Overlay */}
        <DragOverlay>
          {renderDragOverlay()}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Builder;
