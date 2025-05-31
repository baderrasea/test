// src/components/TemplateCanvas.tsx
"use client";

import React from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Group,
  Image as KonvaImage,
} from "react-konva";
import useImage from "use-image";
import { useEditorStore } from "@/store/editorStore";
import type { TemplateElement } from "@/store/editorStore";
import type Konva from "konva";

// Renders a loaded image at (0,0) sized to (width, height), not listening for any events
const BackgroundImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  const [image] = useImage(src);
  return image ? (
    <KonvaImage image={image} width={width} height={height} listening={false} />
  ) : null;
};

type ImageElementKonvaProps = {
  el: TemplateElement;
  isSelected: boolean;
  rotation: number;
  selectElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<TemplateElement>) => void;
};

// Update ImageElementKonva to accept ref
const ImageElementKonva = React.forwardRef<Konva.Group, ImageElementKonvaProps>(
  ({ el, isSelected, rotation, selectElement, updateElement }, ref) => {
    const [img] = useImage((el.properties.value as string) || "", "anonymous");
    const fill = isSelected ? "#d1fae5" : "#f0fdf4";
    const stroke = isSelected ? "#10b981" : "#6ee7b7";
    const borderWidth = isSelected ? 3 : 1;
    const shadowBlur = isSelected ? 10 : 4;
    const shadowColor = isSelected ? "#2563eb" : "#cbd5e1";
    const shadowOpacity = isSelected ? 0.4 : 0.15;
    const textColor = "#222";
    return (
      <Group
        ref={ref}
        key={el.id}
        x={el.x}
        y={el.y}
        rotation={rotation}
        draggable={!el.isLocked}
        onClick={() => selectElement(el.id)}
        onTap={() => selectElement(el.id)}
        onDragEnd={(e) => updateElement(el.id, { x: e.target.x(), y: e.target.y() })}
        onTransformEnd={(e) => {
          const node = e.target as Konva.Group;
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
        {img ? (
          <KonvaImage image={img} width={el.width} height={el.height} />
        ) : (
          <Text
            text={el.properties.label || "صورة"}
            width={el.width}
            height={el.height}
            align="center"
            verticalAlign="middle"
            fontSize={el.properties.fontSize || 20}
            fill={textColor}
          />
        )}
      </Group>
    );
  }
);

const TemplateCanvas: React.FC = () => {
  const {
    elements,
    selectElement,
    selectedElementId,
    updateElement,
    templateProperties,
    addElement,
  } = useEditorStore();

  const trRef = React.useRef<Konva.Transformer>(null);
  const nodeRef = React.useRef<Konva.Group>(null);

  React.useEffect(() => {
    if (trRef.current && nodeRef.current) {
      trRef.current.nodes([nodeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedElementId, elements]);

  // Handle native drop → add a new element in Zustand store
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData(
      "application/element-type"
    ) as "text" | "date" | "image" | "dropdown" | "checkbox";
    if (!type) return;

    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const defaultDimensions: Record<string, { width: number; height: number }> =
    {
      text: { width: 200, height: 40 },
      date: { width: 180, height: 40 },
      image: { width: 150, height: 120 },
      dropdown: { width: 200, height: 40 },
      checkbox: { width: 150, height: 30 },
    };
    const dims = defaultDimensions[type] || { width: 200, height: 40 };

    addElement({
      type,
      x: Math.max(
        0,
        Math.min(x, (templateProperties.canvasWidth || 750) - dims.width)
      ),
      y: Math.max(
        0,
        Math.min(y, (templateProperties.canvasHeight || 550) - dims.height)
      ),
      width: dims.width,
      height: dims.height,
      properties: {
        label: `حقل ${type === "text"
          ? "النص"
          : type === "date"
            ? "التاريخ"
            : type === "image"
              ? "الصورة"
              : type === "dropdown"
                ? "القائمة"
                : "خانة الاختيار"
          }`,
        placeholder: `أدخل ${type === "text"
          ? "النص"
          : type === "date"
            ? "التاريخ"
            : type === "image"
              ? "الصورة"
              : type === "dropdown"
                ? "اختيار"
                : "قيمة"
          }`,
        required: false,
        rotation: 0,
      },
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Deselect if clicking on the empty stage
  const handleStageMouseDown = (
    e: import("konva/lib/Node").KonvaEventObject<MouseEvent>
  ) => {
    if (e.target === e.target.getStage()) {
      selectElement(null);
    }
  };

  // Render canvas area
  return (
    <div className="flex-1 p-6 bg-secondary-50 font-arabic flex flex-col">
      <div className="w-full h-full flex items-center justify-center" style={{ flex: 1 }}>
        <div
          className="relative bg-[#ffffff] rounded-[20px] shadow-lg"
          style={{
            width: templateProperties.canvasWidth,
            height: templateProperties.canvasHeight,
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-canvas="true"
        >
          <Stage
            width={templateProperties.canvasWidth || 750}
            height={templateProperties.canvasHeight || 550}
            onMouseDown={handleStageMouseDown}
          >
            <Layer>
              {/* *** ADD A FULL-STAGE WHITE RECT AS VERY FIRST NODE *** */}
              <Rect
                x={0}
                y={0}
                width={templateProperties.canvasWidth || 750}
                height={templateProperties.canvasHeight || 550}
                fill="#ffffff"
                cornerRadius={20}
                listening={false}  // ignore clicks on this rect
              />

              {/* Ruler lines */}
              {templateProperties.showRuler && (
                <>
                  {/* Vertical lines */}
                  {Array.from({ length: Math.floor((templateProperties.canvasWidth || 750) / 50) + 1 }).map((_, i) => (
                    <Rect
                      key={`v-ruler-${i}`}
                      x={i * 50}
                      y={0}
                      width={1}
                      height={templateProperties.canvasHeight || 550}
                      fill="#e5e7eb"
                      opacity={0.7}
                      listening={false}
                    />
                  ))}
                  {/* Horizontal lines */}
                  {Array.from({ length: Math.floor((templateProperties.canvasHeight || 550) / 50) + 1 }).map((_, i) => (
                    <Rect
                      key={`h-ruler-${i}`}
                      x={0}
                      y={i * 50}
                      width={templateProperties.canvasWidth || 750}
                      height={1}
                      fill="#e5e7eb"
                      opacity={0.7}
                      listening={false}
                    />
                  ))}
                </>
              )}

              {/* Optional “background image” behind everything */}
              {templateProperties.backgroundImage && (
                <BackgroundImage
                  src={templateProperties.backgroundImage}
                  width={templateProperties.canvasWidth || 750}
                  height={templateProperties.canvasHeight || 550}
                />
              )}

              {/* Render all other elements on top */}
              {elements.map((el) => {
                const isSelected = selectedElementId === el.id;
                const rotation = el.properties.rotation || 0;

                if (el.type === "image") {
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

                // For text/date/dropdown/checkbox, draw a generic colored rect + label
                let fill = "#f3f4f6";
                let stroke = "=#bbb";
                const textColor = "#222";
                const borderWidth = isSelected ? 3 : 1;
                const shadowBlur = isSelected ? 10 : 4;
                const shadowColor = isSelected ? "#2563eb" : "#cbd5e1";
                const shadowOpacity = isSelected ? 0.4 : 0.15;

                if (el.type === "text") {
                  fill = isSelected ? "#e0e7ff" : "#fff";
                  stroke = isSelected ? "#2563eb" : "#cbd5e1";
                } else if (el.type === "date") {
                  fill = isSelected ? "#fef9c3" : "#fefce8";
                  stroke = isSelected ? "#f59e42" : "#fde68a";
                } else if (el.type === "dropdown") {
                  fill = isSelected ? "#fef3c7" : "#fff7ed";
                  stroke = isSelected ? "#fbbf24" : "#fde68a";
                } else if (el.type === "checkbox") {
                  fill = isSelected ? "#e0e7ff" : "#f3f4f6";
                  stroke = isSelected ? "#6366f1" : "#a5b4fc";
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
                    onDragEnd={(e) =>
                      updateElement(el.id, { x: e.target.x(), y: e.target.y() })
                    }
                    onTransformEnd={(e) => {
                      const node = e.target as Konva.Group;
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
                      text={el.properties.label || ""}
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
  );
};

export default TemplateCanvas;
