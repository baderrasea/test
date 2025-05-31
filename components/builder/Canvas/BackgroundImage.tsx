import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const BackgroundImage = ({ src, width, height }: { src: string; width: number; height: number }) => {
  const [image] = useImage(src);
  return image ? <KonvaImage image={image} width={width} height={height} listening={false} /> : null;
};

export default BackgroundImage;
