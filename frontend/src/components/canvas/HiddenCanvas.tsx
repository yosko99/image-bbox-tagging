import React from 'react';

import { useAtom } from 'jotai';
import { Stage } from 'konva/lib/Stage';
import { Image, Layer, Rect, Stage as CanvasStage, Text } from 'react-konva';

import { canvasWidthAtom } from '../../atoms/canvasSizes';
import useGetImageAndScaling from '../../hooks/useGetImageAndScaling';
import ILabel from '../../interfaces/Ilabel';
interface Props {
  labels: ILabel[];
  imageURL: string;
  hiddenCanvasRef: React.RefObject<Stage>;
}

const HiddenCanvas = ({ labels, imageURL, hiddenCanvasRef }: Props) => {
  const { image, scaleX, scaleY } = useGetImageAndScaling(imageURL);
  const [canvasWidth] = useAtom(canvasWidthAtom);

  const baseFontSize = 30;
  const dynamicFontSize = Math.round(baseFontSize * (canvasWidth / 1000));

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
                text={value.label}
                fontSize={dynamicFontSize}
                stroke="red"
                strokeWidth={1}
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
