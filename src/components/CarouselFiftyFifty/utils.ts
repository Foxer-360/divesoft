import { IMAGE_POSITION_RIGHT, IMAGE_POSITION_LEFT } from './const';
import { ImagePositionType } from './types';

export const getImagePosition = (imageOnRight): ImagePositionType => {
  return imageOnRight ? IMAGE_POSITION_RIGHT : IMAGE_POSITION_LEFT;
};
