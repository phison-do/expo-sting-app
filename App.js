import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { preloadImages } from './src/assets/images';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountStackScreen } from "./src/navigation/account";
import { CartStackScreen } from "./src/navigation/cart";
import { WishlistStackScreen } from "./src/navigation/wishlist";
import { HomeStackScreen } from "./src/navigation/home";
import { CategoriesStackScreen } from "./src/navigation/categories";
import Logo from './assets/icons/sting-icon.svg';
import HeartIcon from './assets/icons/heart.svg';
import CartIcon from './assets/icons/cart.svg';
import AccountIcon from './assets/icons/account.svg';
import CategoriesIcon from './assets/icons/categories.svg';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const PlaceholderImage = require('./assets/splash-screen.png');

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AnimatedAppLoader image={PlaceholderImage}>
      <MainScreen />
    </AnimatedAppLoader>
  );
}

const AnimatedAppLoader = ({ children, image }) => {
  const [isSplashReady, setSplashReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Apercu': require('./assets/fonts/apercu-regular.ttf'),
    'Apercu-Bold':require('./assets/fonts/apercu-bold.ttf'), 
    'Apercu-Medium':require('./assets/fonts/apercu-medium.ttf'),
    'Apercu-Light':require('./assets/fonts/apercu-light.ttf')
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

  return <AnimatedSplashScreen image={PlaceholderImage}>{children}</AnimatedSplashScreen>;
}

const AnimatedSplashScreen = ({ children, image }) => {
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
      await prepareFonts();
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
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#18181B',
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

const MainScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }} >
        <Tab.Screen name="Home" component={HomeStackScreen} showLabel={false}
          options={{
            tabBarIcon: ({ focused }) => (
              <Logo width={24}  color={focused? "#000" : "#ccc"} />
            ),
          }}
        />
        <Tab.Screen name="Categories" component={CategoriesStackScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <CategoriesIcon width={24} color={focused? "#000" : "#ccc"} />
            ),
          }}
        />
        <Tab.Screen name="Cart" component={CartStackScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <CartIcon width={24}  color={focused? "#000" : "#ccc"}  />
            ),
          }}
        />
        <Tab.Screen name="Wishlist" component={WishlistStackScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <HeartIcon width={24}  color={focused? "#000" : "#ccc"}  />
            ),
          }}
        />
        <Tab.Screen name="Account" component={AccountStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AccountIcon width={24}  color={focused? "#000" : "#ccc"}  />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
