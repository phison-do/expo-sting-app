import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
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

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  itemName: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
