import useImage from 'use-image';

import { PUBLIC_IMAGES_PREFIX } from '../constants/apiRoutes';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/canvasSize';

const useGetImageAndScaling = (imageURL: string) => {
  const [image] = useImage(PUBLIC_IMAGES_PREFIX + imageURL, 'anonymous');

  const scaleX = image?.width! / CANVAS_WIDTH;
  const scaleY = image?.height! / CANVAS_HEIGHT;

  return {
    scaleX,
    scaleY,
    image
  };
};

export default useGetImageAndScaling;
