import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { DetailsScreen } from './DetailScreen';
import { useNavigation } from '@react-navigation/native';
import { ACCOUNT_DATA } from './mocks';
import { FlatList } from 'react-native-gesture-handler';
import {
  AccountScreenNavigationProp,
  AccountStackNavigatorParamList,
} from './types';

const AccountStack = createStackNavigator<AccountStackNavigatorParamList>();

export const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();

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
      <FlatList data={ACCOUNT_DATA} renderItem={renderListItems} />
    </View>
  );
};

export const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <AccountStack.Screen name='Details' component={DetailsScreen} />
    </AccountStack.Navigator>
  );
};
