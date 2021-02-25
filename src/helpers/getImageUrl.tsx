import { BASE_URL } from '@source/const/mediaLibrary';

const getImageUrl = (data) => {
  if (data && data.filename) {
    return BASE_URL + data.category + data.hash + '_' + data.filename;
  }

  return null;
};

export default getImageUrl;
