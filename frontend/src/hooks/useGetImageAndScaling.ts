import { useAtom } from 'jotai';
import useImage from 'use-image';

import { canvasHeightAtom, canvasWidthAtom } from '../atoms/canvasSizes';
import { PUBLIC_IMAGES_PREFIX } from '../constants/apiRoutes';

const useGetImageAndScaling = (imageURL: string) => {
  const [image] = useImage(PUBLIC_IMAGES_PREFIX + imageURL, 'anonymous');
  const [canvasWidth] = useAtom(canvasWidthAtom);
  const [canvasHeight] = useAtom(canvasHeightAtom);

  const scaleX = image?.width! / canvasWidth;
  const scaleY = image?.height! / canvasHeight;

  return {
    scaleX,
    scaleY,
    image
  };
};

export default useGetImageAndScaling;
