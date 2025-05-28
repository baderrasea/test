
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useEditorStore } from '@/store/editorStore';
import CanvasElement from './CanvasElement';

const TemplateCanvas: React.FC = () => {
  const { elements, selectElement } = useEditorStore();
  const { setNodeRef } = useDroppable({ id: 'template-canvas' });

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking on the canvas itself, not on elements
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };

  return (
    <div className="flex-1 p-6 bg-secondary-50 font-arabic">
      <div
        ref={setNodeRef}
        className="relative w-full h-[600px] bg-white border-2 border-dashed border-secondary-200 rounded-lg overflow-hidden"
        onClick={handleCanvasClick}
        style={{ 
          backgroundImage: 'radial-gradient(circle, #d3dbe4 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
        data-canvas="true"
      >
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-secondary-400 pointer-events-none">
            <div className="text-center">
              <div className="text-2xl mb-2">📄</div>
              <p className="text-lg-medium">اسحب العناصر هنا لبدء البناء</p>
              <p className="text-sm-book">اسحب المكونات من اللوحة اليمنى</p>
            </div>
          </div>
        )}
        
        {elements.map((element) => (
          <CanvasElement key={element.id} element={element} />
        ))}
      </div>
    </div>
  );
};

export default TemplateCanvas;
