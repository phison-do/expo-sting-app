import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
    <>
      <View style={styles.wrapper}>
        <FlatList data={ACCOUNT_DATA} renderItem={renderListItems} />
      </View>
      <View style={styles.qrWrapper}>
        <Text style={styles.title}>Je persoonlijke QR</Text>
        <Image
          style={styles.qr}
          source={require('./../../assets/qr-code-costes.png')}
        />
      </View>
      <View style={styles.version}>
        <Text style={styles.versionText}>Versie 0.01</Text>
      </View>
    </>
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
    paddingHorizontal: 12,
    paddingVertical: 24,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 24,
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
  qrWrapper: {
    alignItems: 'center',
    paddingVertical: 24,
    flex: 1,
  },
  qr: {
    width: 150,
    height: 150,
  },
  version: {
    backgroundColor: '#fff',
    padding: 12,
  },
  versionText: {
    fontSize: 12,
    color: '#ccc',
  },
});
