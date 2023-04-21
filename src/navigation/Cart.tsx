import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useCart } from '../context/cartData';

const CartStack = createStackNavigator();

export const CartScreen = ({ navigation }: any) => {
  const { cartData, clearCart } = useCart();
  console.log('CART', cartData);
  if (!cartData?.length)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            marginBottom: 15,
            fontWeight: 'bold',
          }}
        >
          Uw winkelwagen is leeg
        </Text>
      </View>
    );

  return (
    <ScrollView style={styles.wrapper}>
      {cartData.flat().map((item, index) => {
        return (
          <View key={`${item.id}-${index}`} style={styles.item}>
            <View style={{ flex: 1 }}>
              {item.image && (
                <Image
                  source={{
                    uri: `${item.image?.link}?f=width:200/quality:100`,
                  }}
                  style={{ height: 260 }}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(64, 64, 64)' : '#000000',
            },
            styles.button,
          ]}
        >
          <Text style={styles.text}>Nu betalen</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(64, 64, 64)' : '#000000',
            },
            styles.button,
          ]}
          onPress={clearCart}
        >
          <Text style={styles.text}>Leegmaken</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export const CartStackScreen = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name='CartScreen'
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
    </CartStack.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 14,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 14,
  },
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
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    color: 'white',
  },
});
