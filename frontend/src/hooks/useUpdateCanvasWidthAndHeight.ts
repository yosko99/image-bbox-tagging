import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { canvasHeightAtom, canvasWidthAtom } from '../atoms/canvasSizes.atom';

const useUpdateCanvasWidthAndHeight = (parentWidth: number) => {
  const [canvasWidth, setCanvasWidth] = useAtom(canvasWidthAtom);
  const [canvasHeight, setCanvasHeight] = useAtom(canvasHeightAtom);

  useEffect(() => {
    if (parentWidth !== undefined || !Number.isNaN(parentWidth)) {
      setCanvasWidth(parentWidth);
      setCanvasHeight(parentWidth * 0.75);
    }
  }, [parentWidth]);
};

export default useUpdateCanvasWidthAndHeight;
