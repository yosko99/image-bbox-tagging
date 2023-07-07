import React, { useEffect, useRef, useState } from 'react';

import { useAtom } from 'jotai';
import { KonvaEventObject } from 'konva/lib/Node';
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
import { canvasHeightAtom, canvasWidthAtom } from '../../atoms/canvasSizes';
import generateUniqueId from '../../functions/generateUniqueId';
import useGetImageAndScaling from '../../hooks/useGetImageAndScaling';
import ILabel from '../../interfaces/Ilabel';

interface Props {
  imageURL: string;
  selectedLabel: string;
  setLabels: React.Dispatch<React.SetStateAction<ILabel[]>>;
  labels: ILabel[];
  hiddenCanvasRef: React.RefObject<Stage>;
}

const MainCanvas = ({
  imageURL,
  selectedLabel,
  labels,
  setLabels,
  hiddenCanvasRef
}: Props) => {
  const [newLabel, setNewLabel] = useState<ILabel[]>([]);
  const mainCanvasRef = useRef<Stage>(null);
  const [canvasWidth] = useAtom(canvasWidthAtom);
  const [canvasHeight] = useAtom(canvasHeightAtom);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const { image } = useGetImageAndScaling(imageURL);

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    // @ts-ignore
    const { x, y } = event.target.getStage()!.getPointerPosition();

    if (newLabel.length === 0) {
      setNewLabel([
        {
          x,
          y,
          width: 0,
          height: 0,
          key: generateUniqueId(),
          label: '',
          textX: x,
          textY: y
        }
      ]);
    }
  };

  const handleMouseUp = (event: KonvaEventObject<MouseEvent>) => {
    if (newLabel.length === 1) {
      const sx = newLabel[0].x;
      const sy = newLabel[0].y;
      // @ts-ignore
      const { x, y } = event.target.getStage().getPointerPosition();
      const labelToAdd: ILabel = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: generateUniqueId(),
        label: selectedLabel,
        textX: sx > x ? x : sx,
        textY: sy > y ? y : sy
      };
      if (labelToAdd.width !== 0 && labelToAdd.height !== 0) {
        setLabels((labels) => [...labels, labelToAdd]);
      }
      setNewLabel([]);
    }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (newLabel.length === 1) {
      const sx = newLabel[0].x;
      const sy = newLabel[0].y;
      // @ts-ignore
      const { x, y } = event.target!.getStage()!.getPointerPosition();

      mouseX.current = x;
      mouseY.current = y;

      setNewLabel([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: generateUniqueId(),
          label: selectedLabel,
          textX: sx > x ? x : sx,
          textY: sy > y ? y : sy
        }
      ]);
    }
  };

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
      <HiddenCanvas
        hiddenCanvasRef={hiddenCanvasRef}
        imageURL={imageURL}
        labels={labelsToDraw}
      />
    </>
  );
};

export default MainCanvas;
