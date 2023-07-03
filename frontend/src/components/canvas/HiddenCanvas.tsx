import React, { useRef } from 'react';

import { Stage } from 'konva/lib/Stage';
import { Image, Layer, Rect, Stage as CanvasStage, Text } from 'react-konva';

import ILabel from '../../interfaces/Ilabel';
interface Props {
  labels: ILabel[];
  image: HTMLImageElement;
  selectedLabel: string;
  scaleX: number;
  scaleY: number;
}

const HiddenCanvas = ({
  labels,
  image,
  selectedLabel,
  scaleX,
  scaleY
}: Props) => {
  const hiddenCanvasRef = useRef<Stage>(null);

  const handleExport = () => {
    fetch(hiddenCanvasRef.current!.toDataURL())
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'File name.jpg', { type: 'image/jpeg' });
        // setImageFile(file);
      });
  };

  return (
    <CanvasStage
      className="d-none"
      ref={hiddenCanvasRef}
      width={image?.width}
      height={image?.height}
    >
      <Layer>
        <Image width={image?.width} height={image?.height} image={image} />
        {labels.map((value, index) => {
          return (
            <React.Fragment key={index}>
              <Text
                text={selectedLabel}
                strokeWidth={30}
                fontSize={30}
                x={value.textX * scaleX}
                y={value.textY * scaleY}
              />
              <Rect
                key={index}
                x={value.x * scaleX}
                y={value.y * scaleY}
                width={value.width * scaleX}
                height={value.height * scaleY}
                fill="transparent"
                stroke="red"
              />
            </React.Fragment>
          );
        })}
      </Layer>
    </CanvasStage>
  );
};

export default HiddenCanvas;
