import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorParamList } from './types';
import { HomeScreenNavigationProp } from './types';
import { HOMESTACK_DATA } from './mocks';

const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderListItems = ({ item }: any) => {
    return (
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#ccc',
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate('Details', {
              name: item.name,
            })
          }
        >
          <Text style={styles.title}>{item.name}</Text>
          {item.img && (
            <Image source={{ uri: item.img }} style={styles.image} />
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
