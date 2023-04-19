import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size='small' color='#18181B' />
    </View>
  );
};
