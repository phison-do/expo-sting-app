import React from 'react';
import {
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
import { ListerScreenNavigationProp } from './types';
import { Loader } from '../components/loader';

export const ListerPage = ({ route }) => {
  const { data, loading } = useQuery(LISTER_QUERY, {
    variables: { id: route.params.category },
  });

  const navigation = useNavigation<ListerScreenNavigationProp>();

  if (loading) return <Loader />;
  if (!data) return null;

  const renderListItems = ({ item }: any) => {
    return (
      <View style={styles.container}>
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
            source={{
              uri: `${item.image.link}?f=width:${imageWidth}/quality:100`,
            }}
            style={styles.image}
          />
          <View style={styles.title}>
            <Text style={styles.productTitle}>{item.product_name}</Text>
            <Text style={styles.price}>€ {item.price}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data.productSearch.hits}
        renderItem={renderListItems}
        numColumns={2}
      />
    </View>
  );
};

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8,
    backgroundColor: '#ffffff',
  },
  container: {
    borderColor: '#ccc',
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  image: {
    flex: 1,
    height: 240,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    paddingVertical: 12,
  },
  productTitle: {
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
