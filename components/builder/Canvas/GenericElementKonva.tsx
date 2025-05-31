import React from 'react';
import { Group, Rect, Text } from 'react-konva';

const GenericElementKonva = ({ el, isSelected, rotation, selectElement, updateElement }) => {
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
  } else if (el.type === 'date') {
    fill = isSelected ? '#fef9c3' : '#fefce8';
    stroke = isSelected ? '#f59e42' : '#fde68a';
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
        fontSize={el.properties.fontSize || 18}
        fill={textColor}
      />
    </Group>
  );
};

export default GenericElementKonva;
