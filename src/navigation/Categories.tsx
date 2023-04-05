import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { DetailsScreen } from './DetailScreen';

const CategoriesStack = createStackNavigator();

export const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Categories screen</Text>
      <Button title='Heren' onPress={() => navigation.navigate('Details')} />
      <Button title='Dames' onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

export const CategoriesStackScreen = () => {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name='CategoriesScreen'
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <CategoriesStack.Screen name='Details' component={DetailsScreen} />
    </CategoriesStack.Navigator>
  );
};
