import { useRef, useState } from 'react';

import { useAtom } from 'jotai';
import { KonvaEventObject } from 'konva/lib/Node';

import { labelsAtom } from '../atoms/labels.atom';
import { selectedLabelAtom } from '../atoms/selectedLabel.atom';
import generateUniqueId from '../functions/generateUniqueId';
import ILabel from '../interfaces/Ilabel';

const useHandleCanvasDraw = () => {
  const [selectedLabel] = useAtom(selectedLabelAtom);
  const [labels, setLabels] = useAtom(labelsAtom);

  const [newLabel, setNewLabel] = useState<ILabel[]>([]);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

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

  return { handleMouseDown, handleMouseMove, handleMouseUp, newLabel };
};

export default useHandleCanvasDraw;
