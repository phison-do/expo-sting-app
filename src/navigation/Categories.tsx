import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Pressable, Text, View, StyleSheet } from 'react-native';
import { DetailsScreen } from './DetailScreen';
import { CATEGORIES_DATA } from './mocks';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  CategoriesScreenNavigationProp,
  CategoriesStackNavigatorParamList,
} from './types';

const CategoriesStack =
  createStackNavigator<CategoriesStackNavigatorParamList>();

export const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const renderListItems = ({ item }: any) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Details', {
            name: item.name,
          })
        }
      >
        <Text
          style={{ fontSize: 18, paddingHorizontal: 12, paddingVertical: 12 }}
        >
          {item.name}
        </Text>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#ccc',
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <FlatList data={CATEGORIES_DATA} renderItem={renderListItems} />
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
