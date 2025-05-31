import React from 'react';
import { Group, Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const ImageElementKonva = ({ el, isSelected, rotation, selectElement, updateElement }) => {
  const [img] = useImage((el.properties.value as string) || '', 'anonymous');
  const fill = isSelected ? '#d1fae5' : '#f0fdf4';
  const stroke = isSelected ? '#10b981' : '#6ee7b7';
  const borderWidth = isSelected ? 3 : 1;
  const shadowBlur = isSelected ? 10 : 4;
  const shadowColor = isSelected ? '#2563eb' : '#cbd5e1';
  const shadowOpacity = isSelected ? 0.4 : 0.15;
  const textColor = '#222';

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
      {img ? (
        <KonvaImage image={img} width={el.width} height={el.height} />
      ) : (
        <Text
          text={el.properties.label || 'صورة'}
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
};

export default ImageElementKonva;
