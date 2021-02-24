import { IMAGE_POSITION_RIGHT, IMAGE_POSITION_LEFT } from './const';
import { imagePositionType } from './types';

export const getImagePosition = (imageOnRight): imagePositionType => {
  return imageOnRight ? IMAGE_POSITION_RIGHT : IMAGE_POSITION_LEFT;
};
