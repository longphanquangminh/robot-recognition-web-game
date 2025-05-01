import { ALIBABA_MEDIA_URL } from '../constants';

export const getImageLink = (image: string) => {
  return `${ALIBABA_MEDIA_URL}/${image}`;
};
