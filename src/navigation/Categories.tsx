import React from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from './../queries/categories';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { DetailsScreen } from './DetailScreen';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  CategoriesScreenNavigationProp,
  CategoriesStackNavigatorParamList,
} from './types';
import { ListerScreen } from './ListerScreen';

const CategoriesStack =
  createStackNavigator<CategoriesStackNavigatorParamList>();

export const CategoriesScreen = () => {
  const { data, loading } = useQuery(CATEGORIES_QUERY);
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  if (loading)
    return (
      <Text
        style={{ fontSize: 18, paddingHorizontal: 12, paddingVertical: 12 }}
      >
        Loading
      </Text>
    );

  if (!data) return null;

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
      <FlatList
        data={data.categories.data[0].categories}
        renderItem={renderListItems}
      />
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
      <CategoriesStack.Screen
        name='Details'
        component={ListerScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: 'Back',
        })}
      />
    </CategoriesStack.Navigator>
  );
};
