import React from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from './../queries/categories';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, Text, View, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView style={styles.itemWrapper}>
        <Pressable
          onPress={() =>
            navigation.navigate('Lister', {
              name: item.name,
              category: item.id,
            })
          }
        >
          <Text style={styles.itemName}>{item.name}</Text>
        </Pressable>
      </ScrollView>
    );
  };

  return (
    <View style={styles.wrapper}>
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
        options={({ route }) => ({
          headerTitle: 'Categories',
          // headerShown: true,
        })}
      />
      <CategoriesStack.Group>
        <CategoriesStack.Screen
          name='Lister'
          component={ListerPage}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
        <CategoriesStack.Screen
          name='ProductDetail'
          component={ProductDetail}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
      </CategoriesStack.Group>
    </CategoriesStack.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingVertical: 24,
  },
  itemWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    marginHorizontal: 12,
  },
  itemName: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
