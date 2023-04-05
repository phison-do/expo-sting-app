import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { DetailsScreen } from './DetailScreen';

const WishlistStack = createStackNavigator();

export const WishlistScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          marginBottom: 15,
          fontWeight: 'bold',
        }}
      >
        Uw wishlist is leeg
      </Text>
    </View>
  );
};

export const WishlistStackScreen = () => {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen
        name='WishlistScreen'
        component={WishlistScreen}
        options={{
          headerShown: false,
        }}
      />
    </WishlistStack.Navigator>
  );
};
