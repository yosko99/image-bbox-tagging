import React, { useEffect, useRef, useState } from 'react';

import { useAtom } from 'jotai';
import { Stage } from 'konva/lib/Stage';
import {
  Image,
  Layer,
  Rect,
  Stage as CanvasStage,
  Circle,
  Text
} from 'react-konva';

import HiddenCanvas from './HiddenCanvas';
import {
  canvasHeightAtom,
  canvasWidthAtom
} from '../../atoms/canvasSizes.atom';
import { labelsAtom } from '../../atoms/labels.atom';
import useGetImageAndScaling from '../../hooks/useGetImageAndScaling';
import useHandleCanvasDraw from '../../hooks/useHandleCanvasDraw';

interface Props {
  imageURL: string;
}

const MainCanvas = ({ imageURL }: Props) => {
  const [labels, setLabels] = useAtom(labelsAtom);
  const mainCanvasRef = useRef<Stage>(null);
  const [canvasWidth] = useAtom(canvasWidthAtom);
  const [canvasHeight] = useAtom(canvasHeightAtom);

  const { handleMouseDown, handleMouseMove, handleMouseUp, newLabel } =
    useHandleCanvasDraw();

  const { image } = useGetImageAndScaling(imageURL);

  const handleRemoveLabel = (key: string) => {
    setLabels((annotation) =>
      annotation.filter((annotation) => annotation.key !== key)
    );
  };

  const labelsToDraw = [...labels, ...newLabel];

  const [hoveredCloseButtonIndex, setHoveredCloseButtonIndex] = useState(-1);

  useEffect(() => {
    setLabels([]);
  }, [imageURL]);

  return (
    <>
      <CanvasStage
        ref={mainCanvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={canvasWidth}
        height={canvasHeight}
      >
        <Layer>
          <Image width={canvasWidth} height={canvasHeight} image={image} />
          {labelsToDraw.map((value, index) => {
            return (
              <React.Fragment key={index}>
                <Rect
                  key={index}
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.height}
                  fill="transparent"
                  stroke="red"
                />
                <Text
                  text={value.label}
                  stroke="red"
                  fontSize={15}
                  strokeWidth={1}
                  x={value.textX}
                  y={value.textY}
                />
                <Circle
                  width={15}
                  height={15}
                  onMouseLeave={() => setHoveredCloseButtonIndex(-1)}
                  onMouseOver={() => setHoveredCloseButtonIndex(index)}
                  onMouseDown={() => {
                    handleRemoveLabel(value.key);
                  }}
                  x={value.x + value.width}
                  y={value.y}
                  fill="fill"
                  stroke={hoveredCloseButtonIndex === index ? 'red' : 'black'}
                />
              </React.Fragment>
            );
          })}
        </Layer>
      </CanvasStage>
      <HiddenCanvas imageURL={imageURL} />
    </>
  );
};

export default MainCanvas;
