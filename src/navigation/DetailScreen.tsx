import React from 'react';
import { Text, View } from 'react-native';

export const DetailsScreen = () => {
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
        Welkom bij de Sting
      </Text>
    </View>
  );
};
