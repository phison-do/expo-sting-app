import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { preloadImages } from '../../assets/images';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export type Image = {
  url?: string;
  alt?: string | null | undefined;
  width?: string | number;
  color?: string;
  source?: string;
};

type AnimatedAppLoaderProps = {
  children: React.ReactNode;
  image: ImageSourcePropType;
};

export const AnimatedAppLoader: FC<AnimatedAppLoaderProps> = ({
  children,
  image,
}) => {
  const [isSplashReady, setSplashReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Apercu: require('../../../assets/fonts/apercu-regular.ttf'),
    'Apercu-Bold': require('../../../assets/fonts/apercu-bold.ttf'),
    'Apercu-Medium': require('../../../assets/fonts/apercu-medium.ttf'),
    'Apercu-Light': require('../../../assets/fonts/apercu-light.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded && image) {
        await SplashScreen.preventAutoHideAsync();
      }
      setSplashReady(true);
    }
    prepare();
  }, [image, fontsLoaded]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
};

export const AnimatedSplashScreen: FC<AnimatedAppLoaderProps> = ({
  children,
  image,
}) => {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      await preloadImages();
      // await prepareFonts();
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents='none'
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#ffffff',
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};
