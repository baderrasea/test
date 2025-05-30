"use client";
import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useEditorStore } from '@/store/editorStore';
import { TemplateElement } from '@/store/editorStore';
import { Type, Calendar, Image as LucideImage, ChevronDown, CheckSquare, RotateCw, RotateCcw } from 'lucide-react';

interface CanvasElementProps {
  element: TemplateElement;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ element }) => {
  const { selectElement, updateElement, selectedElementId, templateProperties } = useEditorStore();
  const [isResizing, setIsResizing] = useState(false);
  const [isDraggingElement, setIsDraggingElement] = useState(false);
  
  const { setNodeRef } = useDraggable({
    id: `canvas-${element.id}`,
    data: { element },
    disabled: element.isLocked,
  });

  const isSelected = selectedElementId === element.id;

  const handleElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!element.isLocked) {
      selectElement(element.id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (element.isLocked || isResizing) return;
    
    e.stopPropagation();
    setIsDraggingElement(true);
    selectElement(element.id);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startElementX = element.x;
    const startElementY = element.y;
    // Get dynamic canvas size from Zustand
    const canvasWidth = templateProperties.canvasWidth || 750;
    const canvasHeight = templateProperties.canvasHeight || 550;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const newX = Math.max(0, Math.min(canvasWidth - element.width, startElementX + deltaX));
      const newY = Math.max(0, Math.min(canvasHeight - element.height, startElementY + deltaY));
      updateElement(element.id, {
        x: newX,
        y: newY,
      });
    };

    const handleMouseUp = () => {
      setIsDraggingElement(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    if (element.isLocked) return;
    
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.width;
    const startHeight = element.height;
    // Get dynamic canvas size from Zustand
    const canvasWidth = templateProperties.canvasWidth || 750;
    const canvasHeight = templateProperties.canvasHeight || 550;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      let newWidth = startWidth;
      let newHeight = startHeight;
      if (direction.includes('right')) {
        newWidth = Math.max(50, Math.min(canvasWidth - element.x, startWidth + deltaX));
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(30, Math.min(canvasHeight - element.y, startHeight + deltaY));
      }
      updateElement(element.id, {
        width: newWidth,
        height: newHeight,
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleRotateClockwise = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.isLocked) return;
    
    const currentRotation = element.properties.rotation || 0;
    const newRotation = (currentRotation + 15) % 360;
    
    updateElement(element.id, {
      properties: {
        ...element.properties,
        rotation: newRotation,
      },
    });
  };

  const handleRotateCounterClockwise = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.isLocked) return;
    
    const currentRotation = element.properties.rotation || 0;
    const newRotation = (currentRotation - 15 + 360) % 360;
    
    updateElement(element.id, {
      properties: {
        ...element.properties,
        rotation: newRotation,
      },
    });
  };

  const renderElementContent = () => {
    const baseClasses = `w-full h-full border-2 rounded-md flex items-center justify-center text-sm-medium font-arabic ${
      element.isLocked ? 'cursor-not-allowed opacity-75' : 'cursor-move'
    }`;

    switch (element.type) {
      case 'text':
        return (
          <div className={`${baseClasses} bg-white border-secondary-300`}>
            <Type className="w-4 h-4 ml-2 text-secondary-600" />
            <span className="text-secondary-700">{element.properties.label}</span>
          </div>
        );

      case 'date':
        return (
          <div className={`${baseClasses} bg-primary-50 border-primary-300`}>
            <Calendar className="w-4 h-4 ml-2 text-primary-600" />
            <span className="text-primary-700">{element.properties.label}</span>
          </div>
        );

      case 'image':
        return (
          <div className={`${baseClasses} bg-success-50 border-success-300`}>
            <LucideImage className="w-4 h-4 ml-2 text-success-600" />
            <span className="text-success-700">{element.properties.label}</span>
          </div>
        );

      case 'dropdown':
        return (
          <div className={`${baseClasses} bg-warning-50 border-warning-300`}>
            <ChevronDown className="w-4 h-4 ml-2 text-warning-600" />
            <span className="text-warning-700">{element.properties.label}</span>
          </div>
        );

      case 'checkbox':
        return (
          <div className={`${baseClasses} bg-secondary-50 border-secondary-300`}>
            <CheckSquare className="w-4 h-4 ml-2 text-secondary-600" />
            <span className="text-secondary-700">{element.properties.label}</span>
          </div>
        );

      default:
        return null;
    }
  };

  // Don't render if element is not visible
  if (!element.isVisible) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        zIndex: element.zIndex,
        opacity: isDraggingElement ? 0.7 : 1,
        transform: element.properties.rotation ? `rotate(${element.properties.rotation}deg)` : undefined,
        transformOrigin: 'center',
        transition: 'transform 0.2s ease-out',
      }}
      onClick={handleElementClick}
      onMouseDown={handleMouseDown}
      className={`
        ${isSelected && !element.isLocked ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}
        ${element.isLocked ? 'ring-2 ring-warning-400 ring-opacity-50' : ''}
        transition-opacity duration-200
      `}
    >
      {renderElementContent()}
      
      {/* Control handles - only show if selected and not locked */}
      {isSelected && !element.isLocked && (
        <>
          {/* Resize handles */}
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-500 rounded-full cursor-se-resize hover:bg-primary-600"
            onMouseDown={(e) => handleResize(e, 'bottom-right')}
          />
          <div
            className="absolute -bottom-1 right-1/2 w-3 h-2 bg-primary-500 rounded cursor-s-resize transform translate-x-1/2 hover:bg-primary-600"
            onMouseDown={(e) => handleResize(e, 'bottom')}
          />
          <div
            className="absolute bottom-1/2 -right-1 w-2 h-3 bg-primary-500 rounded cursor-e-resize transform translate-y-1/2 hover:bg-primary-600"
            onMouseDown={(e) => handleResize(e, 'right')}
          />
          
          {/* Rotation handles */}
          <div
            className="absolute -top-8 right-1/4 w-6 h-6 bg-success-500 rounded-full cursor-pointer flex items-center justify-center transform translate-x-1/2 hover:bg-success-600 transition-colors"
            onClick={handleRotateCounterClockwise}
            title="تدوير عكس اتجاه عقارب الساعة"
          >
            <RotateCcw className="w-3 h-3 text-white" />
          </div>
          <div
            className="absolute -top-8 right-3/4 w-6 h-6 bg-success-500 rounded-full cursor-pointer flex items-center justify-center transform translate-x-1/2 hover:bg-success-600 transition-colors"
            onClick={handleRotateClockwise}
            title="تدوير مع اتجاه عقارب الساعة"
          >
            <RotateCw className="w-3 h-3 text-white" />
          </div>
        </>
      )}
    </div>
  );
};

export default CanvasElement;
