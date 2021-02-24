import { BASE_URL, WHITE_COLOR } from './const';

export const getTextColor = (isTextWhite) => (isTextWhite ? { color: WHITE_COLOR } : {});

export const getImageOriginalUrl = (image: LooseObject): string => {
  if (!image) return '';
  const { category, hash, filename } = image;
  return BASE_URL + category + hash + '_' + filename;
};

export const shouldButtonRender = (url: LooseObject, buttonTitle: string) => (url.url && buttonTitle ? true : false);
