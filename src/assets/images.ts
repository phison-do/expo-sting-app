import { Asset } from 'expo-asset';
import { Image } from 'react-native';

const cacheImages = (images: string[]) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
};

export const preloadImages = async () => {
  try {
    await Promise.all(cacheImages([]));
  } catch {
    console.log('Asset prefetch ended early. Promise.all[] aborted.');
  }
  try {
    Promise.all(cacheImages([])).then();
  } catch {
    console.log('Big asset prefetch ended early. Promise.all[] aborted.');
  }
};
