import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountStackScreen } from './src/navigation/Account';
import { CartStackScreen } from './src/navigation/Cart';
import { WishlistStackScreen } from './src/navigation/Wishlist';
import { HomeStackScreen } from './src/navigation/Home';
import { CategoriesStackScreen } from './src/navigation/Categories';
import Logo from './assets/icons/sting-icon.svg';
import HeartIcon from './assets/icons/heart.svg';
import CartIcon from './assets/icons/cart.svg';
import AccountIcon from './assets/icons/account.svg';
import CategoriesIcon from './assets/icons/categories.svg';
import { AnimatedAppLoader } from './src/components/splashScreen';

const PlaceholderImage = require('./assets/splash-screen.png');

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AnimatedAppLoader image={PlaceholderImage}>
      <MainScreen />
    </AnimatedAppLoader>
  );
}

const MainScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name='Home'
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Logo width={24} color={focused ? '#000' : '#ccc'} />
            ),
          }}
        />
        <Tab.Screen
          name='Categories'
          component={CategoriesStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CategoriesIcon width={24} color={focused ? '#000' : '#ccc'} />
            ),
          }}
        />
        <Tab.Screen
          name='Cart'
          component={CartStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CartIcon width={24} color={focused ? '#000' : '#ccc'} />
            ),
          }}
        />
        <Tab.Screen
          name='Wishlist'
          component={WishlistStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <HeartIcon width={24} color={focused ? '#000' : '#ccc'} />
            ),
          }}
        />
        <Tab.Screen
          name='Account'
          component={AccountStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AccountIcon width={24} color={focused ? '#000' : '#ccc'} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};