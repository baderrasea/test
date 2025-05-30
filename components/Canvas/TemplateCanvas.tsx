import React from 'react';
import { Stage, Layer } from 'react-konva';
import { useEditorStore } from '@/store/editorStore';
import BackgroundImage from './BackgroundImage';
import ImageElementKonva from './ImageElementKonva';
import GenericElementKonva from './GenericElementKonva';

const TemplateCanvas: React.FC = () => {
  const {
    elements,
    selectElement,
    selectedElementId,
    updateElement,
    templateProperties,
    addElement,
  } = useEditorStore();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/element-type');
    if (!type) return;

    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const defaultSizes = {
      text: { width: 200, height: 40 },
      date: { width: 180, height: 40 },
      image: { width: 150, height: 120 },
      dropdown: { width: 200, height: 40 },
      checkbox: { width: 150, height: 30 },
    };

    const dimensions = defaultSizes[type] || { width: 200, height: 40 };

    addElement({
      type,
      x: Math.max(0, Math.min(x, (templateProperties.canvasWidth || 750) - dimensions.width)),
      y: Math.max(0, Math.min(y, (templateProperties.canvasHeight || 550) - dimensions.height)),
      width: dimensions.width,
      height: dimensions.height,
      properties: {
        label: `حقل ${type}`,
        placeholder: `أدخل ${type}`,
        required: false,
        rotation: 0,
      },
    });
  };

  const handleStageMouseDown = (e: any) => {
    if (e.target === e.target.getStage()) {
      selectElement(null);
    }
  };

  return (
    <div className="flex-1 p-6 bg-secondary-50 font-arabic flex flex-col">
      <div className="w-full h-full flex items-center justify-center" style={{ flex: 1 }}>
        <div className="overflow-auto w-full h-full flex items-center justify-center" style={{ background: '#eee' }}>
          <div
            className="relative bg-white rounded-[20px] shadow-lg"
            style={{
              width: templateProperties.canvasWidth,
              height: templateProperties.canvasHeight,
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Stage
              width={templateProperties.canvasWidth || 750}
              height={templateProperties.canvasHeight || 550}
              style={{ background: '#fff', borderRadius: 20, boxShadow: '0 2px 8px #eee' }}
              onMouseDown={handleStageMouseDown}
            >
              <Layer>
                {templateProperties.backgroundImage && (
                  <BackgroundImage
                    src={templateProperties.backgroundImage}
                    width={templateProperties.canvasWidth || 750}
                    height={templateProperties.canvasHeight || 550}
                  />
                )}
                {elements.map((el) => {
                  const isSelected = selectedElementId === el.id;
                  const rotation = el.properties.rotation || 0;

                  if (el.type === 'image') {
                    return (
                      <ImageElementKonva
                        key={el.id}
                        el={el}
                        isSelected={isSelected}
                        rotation={rotation}
                        selectElement={selectElement}
                        updateElement={updateElement}
                      />
                    );
                  }

                  return (
                    <GenericElementKonva
                      key={el.id}
                      el={el}
                      isSelected={isSelected}
                      rotation={rotation}
                      selectElement={selectElement}
                      updateElement={updateElement}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCanvas;
