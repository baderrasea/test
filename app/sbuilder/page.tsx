"use client";

import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import TemplateProperties from '@/components/Sidebar/TemplateProperties';
import TemplateCanvas from '@/components/Canvas/TemplateCanvas';
import ElementsPanel from '@/components/Sidebar/ElementsPanel';
import BottomToolbar from '@/components/Toolbar/BottomToolbar';
import DraggableElement from '@/components/TemplateElements/DraggableElement';
import { useEditorStore } from '@/store/editorStore';

const Builder = () => {
  const { addElement } = useEditorStore();
  const [activeDrag, setActiveDrag] = React.useState<any>(null);

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
        
        // Ensure element stays within canvas bounds
        const finalX = Math.min(dropX, 750 - dimensions.width);
        const finalY = Math.min(dropY, 550 - dimensions.height);
        
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
        id={activeDrag.id}
        type={activeDrag.data.current.type}
        label={elementLabels[activeDrag.data.current.type as keyof typeof elementLabels]}
      />
    );
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-secondary-50 font-arabic" dir="rtl">
        {/* Header */}
        <div className="h-14 bg-white border-b border-secondary-200 flex items-center px-6">
          <h1 className="text-display-xs-bold text-secondary-900">منشئ القوالب</h1>
          <div className="mr-auto flex items-center gap-4">
            <span className="text-sm-medium text-secondary-500">استوديو بناء التصاميم</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Right Sidebar - Elements & Layers */}
          <ElementsPanel />
          
          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <TemplateCanvas />
            </div>
          </div>
          
          {/* Left Sidebar - Template Properties */}
          <TemplateProperties />
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
