import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountStackScreen } from './Account';
import { CartStackScreen } from './Cart';
import { WishlistStackScreen } from './Wishlist';
import { HomeStackScreen } from './Home';
import { CategoriesStackScreen } from './Categories';
import Logo from '../../assets/icons/costes-icon.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import CartIcon from '../../assets/icons/cart.svg';
import AccountIcon from '../../assets/icons/account.svg';
import CategoriesIcon from '../../assets/icons/categories.svg';
import LogoBlack from '../../assets/logo-black.svg';
import ScannerBlack from '../../assets/icons/barcode.svg';
import { useCart } from '../context/cartData';
import { Pressable } from 'react-native';
import React, { useState } from 'react';
import { BarcodeCodeScreen } from '../components/barcode';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  const { cartData, wishlistData } = useCart();

  const [ camera, setCamera ]= useState(false);

  if(camera) {
    return <BarcodeCodeScreen />
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name='Home'
          component={HomeStackScreen}
          options={{
            headerTitle: () => <LogoBlack height={16} color={'#18181B'} />,
            tabBarIcon: ({ focused }) => (
              <Logo width={24} color={focused ? '#18181B' : '#ccc'} />
            ),
            headerRight: () => (
              <Pressable onPress={() => setCamera(true)}>
                <ScannerBlack width={24} color={'#18181B'} style={{ marginRight: 12 }} />  
              </Pressable>
            )
          }}
        />
        <Tab.Screen
          name='Categories'
          component={CategoriesStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <CategoriesIcon width={24} color={focused ? '#18181B' : '#ccc'} />
            ),
          }}
        />
        <Tab.Screen
          name='Winkelwagen'
          component={CartStackScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  <CartIcon width={24} color={focused ? '#18181B' : '#ccc'} />
                  {cartData && cartData.length > 0 && (
                    <View style={styles.cartAmount}>
                      <Text style={styles.cartAmountText}>
                        {cartData?.length}
                      </Text>
                    </View>
                  )}
                </>
              );
            },
          }}
        />
        <Tab.Screen
          name='Wishlist'
          component={WishlistStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <HeartIcon width={24} color={focused ? '#18181B' : '#ccc'} />
                {wishlistData && wishlistData.length > 0 && (
                  <View style={styles.cartAmount}>
                    <Text style={styles.cartAmountText}>
                      {wishlistData?.length}
                    </Text>
                  </View>
                )}
              </>
            ),
          }}
        />
        <Tab.Screen
          name='Account'
          component={AccountStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AccountIcon width={24} color={focused ? '#18181B' : '#ccc'} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cartAmount: {
    backgroundColor: '#000000',
    color: '#fff',
    width: 16,
    height: 16,
    borderRadius: 16,
    position: 'absolute',
    right: 18,
    top: 10,
  },
  cartAmountText: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
