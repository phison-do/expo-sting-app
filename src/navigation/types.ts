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
  subCategory: {
    name: string;
    category: string;
  };
  Lister: {
    name: string;
    category: string;
  };
  ProductDetail: {
    name: string;
  };
};

export type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackNavigatorParamList,
  'subCategory'
>;

export type SubCategoriesStackNavigatorParamList = {
  CategoriesScreen: undefined;
  Lister: {
    name: string;
    category: string;
  };
  ProductDetail: {
    name: string;
  };
};

export type SubCategoriesScreenNavigationProp = NativeStackNavigationProp<
  SubCategoriesStackNavigatorParamList,
  'Lister'
>;

export type ListerStackNavigatorParamList = {
  ListerScreen: undefined;
  ProductDetail: {
    name: string;
    id: string;
  };
};

export type ListerScreenNavigationProp = NativeStackNavigationProp<
  ListerStackNavigatorParamList,
  'ProductDetail'
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

export type ProductDetailStackNavigatorParamList = {
  ProductDetailScreen: undefined;
  ProductDetail: {
    name: string;
    id: string;
  };
};

export type ProductDetailScreenNavigationProp = NativeStackNavigationProp<
  ProductDetailStackNavigatorParamList,
  'ProductDetail'
>;

export type ImageType = {
  link: string;
};

export type ProductCart = {
  id: string;
  image: string;
  name: string;
  price: string;
};
