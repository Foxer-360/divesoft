import { imagePositionType } from './types';

export const getImagePosition = (imageOnRight): imagePositionType => {
  if (imageOnRight) return 'right';
  return 'left';
};
