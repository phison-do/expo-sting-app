import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductCart } from '../navigation/types';

const defaultCartData = [
  {
    id: '',
    image: '',
    price: '',
    name: '',
  },
];

const defaultContext = {
  cartData: defaultCartData,
  updateCart: (data: any) => {},
  clearCart: () => {},
  wishlistData: defaultCartData,
  updateWishlist: (data: any) => {},
  clearWishlist: () => {},
};

const CartContext = createContext(defaultContext);

export const useCart = () => useContext(CartContext);

//@todo: removeitem from cart/wishlist

export const CartContextProvider = ({ children }: any) => {
  const [cartData, setCartData] = useState<ProductCart[]>([]);
  const [wishlistData, setWishlistData] = useState<ProductCart[]>([]);

  const updateCart = (data: ProductCart) => {
    setData(data);
    setCartData([...cartData, data]);
  };

  const updateWishlist = (data: ProductCart) => {
    setWishListData(data);
    setWishlistData([...wishlistData, data]);
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('@cart');
      setCartData([]);
    } catch (e) {
      // clear error
    }
  };

  const clearWishlist = async () => {
    try {
      await AsyncStorage.removeItem('@wishlist');
      setWishlistData([]);
    } catch (e) {
      // clear error
    }
  };

  const setData = async (data: ProductCart) => {
    const newList = [...cartData, data];
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(newList));
    } catch (e) {
      // saving error
    }
  };

  const setWishListData = async (data: ProductCart) => {
    const newList = [...wishlistData, data];
    try {
      await AsyncStorage.setItem('@wishlist', JSON.stringify(newList));
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    let products;

    try {
      const existingProducts = await AsyncStorage.getItem('@cart');

      if (!existingProducts) return;

      products = JSON.parse(existingProducts as string);
    } catch (e) {
      // saving error
    }
    setCartData(products);
  };

  const getWishlistData = async () => {
    let products;

    try {
      const existingProducts = await AsyncStorage.getItem('@wishlist');
      if (!existingProducts) return;

      products = JSON.parse(existingProducts as string);
    } catch (e) {
      // saving error
    }

    setWishlistData(products);
  };

  useEffect(() => {
    getData();
    getWishlistData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        updateCart,
        clearCart,
        wishlistData,
        clearWishlist,
        updateWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
