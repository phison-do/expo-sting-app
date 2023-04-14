import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { LISTER_QUERY } from '../queries/lister';
import { FlatList } from 'react-native-gesture-handler';
import {
  ListerScreenNavigationProp,
  ListerStackNavigatorParamList,
} from './types';
import { Loader } from '../components/loader';

export const ListerPage = ({ route }) => {
  const { data, loading } = useQuery(LISTER_QUERY, {
    variables: { id: route.params.category },
  });

  const navigation = useNavigation<ListerScreenNavigationProp>();

  if (loading) return <Loader />;
  if (!data) return null;

  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const renderListItems = ({ item }: any) => {
    console.log('LISTERSCREEN', item);
    return (
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#ccc',
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate('ProductDetail', {
              name: item.product_name,
              id: item.product_id,
            })
          }
        >
          <Image
            resizeMode='cover'
            source={{ uri: item.image.link }}
            style={{ width: imageWidth, height: 450 }}
          />
          <View
            style={{
              backgroundColor: '#fff',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#ccc',
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                flexDirection: 'column',
                fontSize: 18,
              }}
            >
              {item.product_name}
            </Text>
            <Text style={{ fontSize: 18 }}>€ {item.price}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={data.productSearch.hits} renderItem={renderListItems} />
    </View>
  );
};
