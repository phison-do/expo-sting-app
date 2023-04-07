import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  HomeScreen: undefined;
  Details: {
    name: string;
    img?: string;
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Details'
>;

export type CategoriesStackNavigatorParamList = {
  CategoriesScreen: undefined;
  Details: {
    name: string;
  };
};

export type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackNavigatorParamList,
  'Details'
>;

export type AccountStackNavigatorParamList = {
  AccountScreen: undefined;
  Details: {
    name: string;
  };
};

export type AccountScreenNavigationProp = NativeStackNavigationProp<
  AccountStackNavigatorParamList,
  'Details'
>;
