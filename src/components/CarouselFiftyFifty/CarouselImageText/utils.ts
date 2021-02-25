import { CSSProperties } from 'react';
import { BASE_URL, WHITE_COLOR } from './const';

const getImageOriginalUrl = (image: LooseObject | undefined): string => {
  if (!image) return '';
  const { category, hash, filename } = image;
  return BASE_URL + category + hash + '_' + filename;
};

export const getBackgroundImageStyle = (image: LooseObject | undefined, color: string | undefined): CSSProperties => ({
  backgroundImage: `url("${getImageOriginalUrl(image)}")`,
  backgroundColor: color,
});

export const getTextColor = (isTextWhite) => (isTextWhite ? { color: WHITE_COLOR } : {});
export const shouldButtonRender = (url: LooseObject, buttonTitle: string) => (url.url && buttonTitle ? true : false);
