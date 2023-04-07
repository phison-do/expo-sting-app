import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// route = RouteProp<{ params: { name: string } }, 'params'

export const HomeDetailsScreen = ({ route }) => {
  const { name } = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          marginBottom: 15,
          fontWeight: 'bold',
        }}
      >
        {name}
      </Text>
    </View>
  );
};
