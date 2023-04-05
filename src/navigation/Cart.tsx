import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { DetailsScreen } from './DetailScreen';

const CartStack = createStackNavigator();

export const CartScreen = ({ navigation }) => {
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
        Uw winkelwagen is leeg
      </Text>
    </View>
  );
};

export const CartStackScreen = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name='CartScreen'
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
    </CartStack.Navigator>
  );
};
