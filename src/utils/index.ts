import { CDN_IMAGE_URL } from '../constants';

export const getImageLink = (image: string) => {
  return `${CDN_IMAGE_URL}/${image}`;
};
