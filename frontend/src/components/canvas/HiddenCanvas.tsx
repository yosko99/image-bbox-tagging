import React, { useEffect, useRef } from 'react';

import { useAtom } from 'jotai';
import { Stage } from 'konva/lib/Stage';
import { Image, Layer, Rect, Stage as CanvasStage, Text } from 'react-konva';

import { canvasWidthAtom } from '../../atoms/canvasSizes.atom';
import { hiddenCanvasRefAtom } from '../../atoms/hiddenCanvasRef.atom';
import { labelsAtom } from '../../atoms/labels.atom';
import useGetImageAndScaling from '../../hooks/useGetImageAndScaling';

interface Props {
  imageURL: string;
}

const HiddenCanvas = ({ imageURL }: Props) => {
  const [hiddenCanvasRef, setHiddenCanvasRef] = useAtom(hiddenCanvasRefAtom);
  const [canvasWidth] = useAtom(canvasWidthAtom);
  const [labels] = useAtom(labelsAtom);

  const { image, scaleX, scaleY } = useGetImageAndScaling(imageURL);
  const canvasRef = useRef<Stage>(null);

  const baseFontSize = 30;
  const dynamicFontSize = Math.round(baseFontSize * (canvasWidth / 1000));

  useEffect(() => {
    setHiddenCanvasRef(canvasRef.current);
  }, []);

  return (
    <CanvasStage
      className="d-none"
      ref={canvasRef}
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
