import React, { useEffect, useRef, useState } from 'react';

import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import { Image, Layer, Rect, Stage as CanvasStage, Circle } from 'react-konva';
import useImage from 'use-image';

import HiddenCanvas from './HiddenCanvas';
import ILabel from '../../interfaces/Ilabel';

interface Props {
  imageURL: string;
  selectedLabel: string;
  width: number;
  height: number;
}

const MainCanvas = ({ imageURL, selectedLabel, width, height }: Props) => {
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [newLabel, setNewLabel] = useState<ILabel[]>([]);
  const mainCanvasRef = useRef<Stage>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const [image] = useImage(imageURL, 'anonymous');

  const scaleX = image?.width! / width;
  const scaleY = image?.height! / height;

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (newLabel.length === 0) {
      // @ts-ignore
      const { x, y } = event.target.getStage()!.getPointerPosition();
      setNewLabel([
        {
          x,
          y,
          width: 0,
          height: 0,
          key: 0,
          text: selectedLabel,
          textX: 0,
          textY: 0
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
        key: labels.length + 1,
        text: selectedLabel,
        textX: sx > x ? x : sx,
        textY: sy > y ? y : sy
      };
      if (labelToAdd.width !== 0 && labelToAdd.height !== 0) {
        labels.push(labelToAdd);
      }
      setNewLabel([]);
      setLabels(labels);
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
          key: 0,
          text: selectedLabel,
          textX: sx > x ? x : sx,
          textY: sy > y ? y : sy
        }
      ]);
    }
  };

  const handleRemoveLabel = (key: number) => {
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
        width={width}
        height={height}
      >
        <Layer>
          <Image width={width} height={height} image={image} />
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
        image={image!}
        scaleX={scaleX}
        scaleY={scaleY}
        labels={labelsToDraw}
        selectedLabel={selectedLabel}
      />
    </>
  );
};

export default MainCanvas;
