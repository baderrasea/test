import React from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { useEditorStore } from '@/store/editorStore';

const TemplateCanvas: React.FC = () => {
  const {
    elements,
    selectElement,
    selectedElementId,
    updateElement,
    templateProperties,
    addElement,
  } = useEditorStore();

  // Handle native drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/element-type') as 'text' | 'date' | 'image' | 'dropdown' | 'checkbox';
    if (!type) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const defaultDimensions: Record<string, { width: number; height: number }> = {
      text: { width: 200, height: 40 },
      date: { width: 180, height: 40 },
      image: { width: 150, height: 120 },
      dropdown: { width: 200, height: 40 },
      checkbox: { width: 150, height: 30 },
    };
    const dimensions = defaultDimensions[type] || { width: 200, height: 40 };
    addElement({
      type,
      x: Math.max(0, Math.min(x, (templateProperties.canvasWidth || 750) - dimensions.width)),
      y: Math.max(0, Math.min(y, (templateProperties.canvasHeight || 550) - dimensions.height)),
      width: dimensions.width,
      height: dimensions.height,
      properties: {
        label: `حقل ${type === 'text' ? 'النص' : type === 'date' ? 'التاريخ' : type === 'image' ? 'الصورة' : type === 'dropdown' ? 'القائمة' : 'خانة الاختيار'}`,
        placeholder: `أدخل ${type === 'text' ? 'النص' : type === 'date' ? 'التاريخ' : type === 'image' ? 'الصورة' : type === 'dropdown' ? 'اختيار' : 'قيمة'}`,
        required: false,
        rotation: 0,
      },
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Deselect on empty canvas click
  const handleStageMouseDown = (e: import('konva/lib/Node').KonvaEventObject<MouseEvent>) => {
    // Only deselect if click on empty area
    if (e.target === e.target.getStage()) {
      selectElement(null);
    }
  };

  // Render each element with Konva, supporting drag, resize, rotation, and selection
  return (
    <div className="flex-1 p-6 bg-secondary-50 font-arabic flex flex-col">
      <div className="w-full h-full flex items-center justify-center" style={{ flex: 1 }}>
        <div
          className="overflow-auto w-full h-full flex items-center justify-center"
          style={{ minHeight: 0, minWidth: 0, background: '#eee' }}
        >
          <div
            className="relative bg-[#ffffff] rounded-[20px] shadow-lg"
            style={{ width: templateProperties.canvasWidth, height: templateProperties.canvasHeight }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            data-canvas="true"
          >
            <Stage
              width={templateProperties.canvasWidth || 750}
              height={templateProperties.canvasHeight || 550}
              style={{ background: '#fff', borderRadius: 20, boxShadow: '0 2px 8px #eee' }}
              onMouseDown={handleStageMouseDown}
            >
              <Layer>
                {elements.map((el) => {
                  const isSelected = selectedElementId === el.id;
                  const rotation = el.properties.rotation || 0;
                  let fill = '#f3f4f6';
                  let stroke = '#bbb';
                  let textColor = '#222';
                  const borderWidth = isSelected ? 3 : 1;
                  const shadowBlur = isSelected ? 10 : 4;
                  const shadowColor = isSelected ? '#2563eb' : '#cbd5e1';
                  const shadowOpacity = isSelected ? 0.4 : 0.15;
                  if (el.type === 'text') {
                    fill = isSelected ? '#e0e7ff' : '#fff';
                    stroke = isSelected ? '#2563eb' : '#cbd5e1';
                    textColor = '#222';
                  } else if (el.type === 'date') {
                    fill = isSelected ? '#fef9c3' : '#fefce8';
                    stroke = isSelected ? '#f59e42' : '#fde68a';
                  } else if (el.type === 'image') {
                    fill = isSelected ? '#d1fae5' : '#f0fdf4';
                    stroke = isSelected ? '#10b981' : '#6ee7b7';
                  } else if (el.type === 'dropdown') {
                    fill = isSelected ? '#fef3c7' : '#fff7ed';
                    stroke = isSelected ? '#fbbf24' : '#fde68a';
                  } else if (el.type === 'checkbox') {
                    fill = isSelected ? '#e0e7ff' : '#f3f4f6';
                    stroke = isSelected ? '#6366f1' : '#a5b4fc';
                  }
                  return (
                    <Group
                      key={el.id}
                      x={el.x}
                      y={el.y}
                      rotation={rotation}
                      draggable={!el.isLocked}
                      onClick={() => selectElement(el.id)}
                      onTap={() => selectElement(el.id)}
                      onDragEnd={e => updateElement(el.id, { x: e.target.x(), y: e.target.y() })}
                      onTransformEnd={e => {
                        const node = e.target;
                        updateElement(el.id, {
                          x: node.x(),
                          y: node.y(),
                          width: node.width(),
                          height: node.height(),
                          properties: {
                            ...el.properties,
                            rotation: node.rotation(),
                          },
                        });
                      }}
                    >
                      <Rect
                        width={el.width}
                        height={el.height}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={borderWidth}
                        cornerRadius={10}
                        shadowBlur={shadowBlur}
                        shadowColor={shadowColor}
                        shadowOpacity={shadowOpacity}
                        opacity={el.isVisible === false ? 0.3 : 1}
                      />
                      <Text
                        text={el.properties.label || ''}
                        width={el.width}
                        height={el.height}
                        align="center"
                        verticalAlign="middle"
                        fontSize={el.properties.fontSize || 20}
                        fill={textColor}
                      />
                    </Group>
                  );
                })}
              </Layer>
            </Stage>
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-secondary-400 pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl mb-2">📄</div>
                  <p className="text-lg-medium">اسحب العناصر هنا لبدء البناء</p>
                  <p className="text-sm-book">اسحب المكونات من اللوحة اليمنى</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCanvas;
