import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { PRODUCT_QUERY } from '../queries/productDetail';
// import { ProductDetailScreenNavigationProp } from './types';
import { Loader } from '../components/loader';

type ImageType = {
  link: string;
};

export const ProductDetail = ({ route }) => {
  const { data, loading } = useQuery(PRODUCT_QUERY, {
    variables: { productId: route.params.id },
  });

  // const navigation = useNavigation<ProductDetailScreenNavigationProp>();

  if (loading) return <Loader />;
  if (!data) return null;

  const product = data.product;
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={200}
        decelerationRate='fast'
        pagingEnabled
      >
        {product.image_groups[0].images.map((image: ImageType) => {
          return (
            <Image
              // resizeMode='contain'
              key={image.link}
              source={{
                uri: `${image.link}?f=width:${imageWidth}/quality:100`,
              }}
              style={{ width: imageWidth, height: 450 }}
            />
          );
        })}
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          {product.name}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          € {product.price}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {product.long_description}
        </Text>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Toevoegen aan winkelwagen</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginVertical: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
