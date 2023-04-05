import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Button,
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from './types';

import { DetailsScreen } from './DetailScreen';
import { HomeStackNavigatorParamList } from './types';
import { HOMESTACK_DATA } from './mocks';

const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderListItems = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Details', {
            name: item.name,
            birthYear: item.birth_year,
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <FlatList data={HOMESTACK_DATA} renderItem={renderListItems} />
    </View>
  );
};

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
