import React from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from './../queries/categories';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  CategoriesScreenNavigationProp,
  CategoriesStackNavigatorParamList,
} from './types';
import { ListerPage } from './ListerPage';
import { ProductDetail } from './ProductDetail';
import { Loader } from '../components/loader';

const CategoriesStack =
  createStackNavigator<CategoriesStackNavigatorParamList>();

export const CategoriesScreen = () => {
  const { data, loading } = useQuery(CATEGORIES_QUERY);
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  if (loading) return <Loader />;
  if (!data) return null;

  const renderListItems = ({ item }: any) => {
    return (
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: '#ccc',
          marginHorizontal: 24,
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate('Lister', {
              name: item.name,
              category: item.id,
            })
          }
        >
          <Text
            style={{ fontSize: 18, paddingHorizontal: 12, paddingVertical: 12 }}
          >
            {item.name}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingVertical: 24 }}>
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
        name='Lister'
        component={ListerPage}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: 'Back',
        })}
      />
      <CategoriesStack.Screen
        name='ProductDetail'
        component={ProductDetail}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: 'Back',
        })}
      />
    </CategoriesStack.Navigator>
  );
};
