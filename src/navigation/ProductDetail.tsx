import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { PRODUCT_QUERY } from '../queries/productDetail';
import { Loader } from '../components/loader';
import HeartIcon from './../../assets/icons/heart.svg';
import { ImageType } from './types';
import { useCart } from '../context/cartData';

export const ProductDetail = ({ route }: any) => {
  const { cartData, updateCart, updateWishlist } = useCart();

  const { data, loading } = useQuery(PRODUCT_QUERY, {
    variables: { productId: route.params.id },
  });

  if (loading) return <Loader />;
  if (!data) return null;

  const product = data.product;
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const productCart = {
    id: route.params.id,
    image: product.image_groups[0].images[0],
    name: product.name,
    price: product.price,
  };

  const addToCart = () => {
    updateCart(productCart);
  };

  const addToWishlist = () => {
    updateWishlist(productCart);
  };

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
      <View style={styles.product}>
        <Text
          style={{
            flexDirection: 'column',
            fontSize: 16,
          }}
        >
          {product.name}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
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
            fontSize: 14,
            fontWeight: '300',
          }}
        >
          {product.long_description}
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgb(64, 64, 64)' : '#000000',
              },
              styles.button,
            ]}
            onPress={addToCart}
          >
            <Text style={styles.text}>Voeg toe aan winkelwagen</Text>
          </Pressable>
          <Pressable style={styles.wishlist} onPress={addToWishlist}>
            <Text style={styles.text}>
              {' '}
              <HeartIcon width={24} color={'#ccc'} />
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 24,
    alignItems: 'center',
  },
  wishlist: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingRight: 14,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
  },
  product: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
