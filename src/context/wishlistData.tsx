import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductCart } from '../navigation/types';

const defaultWishlistData = [
  {
    id: '',
    image: '',
    price: '',
    name: '',
  },
];

const defaultContext = {
  WishlistData: defaultWishlistData,
  updateWishlist: (data: any) => {},
  clearWishlist: () => {},
};

const WishlistContext = createContext(defaultContext);

export const useWishlist = () => useContext(WishlistContext);

export const WishlistContextProvider = ({ children }: any) => {
  const [WishlistData, setWishlistData] = useState<ProductCart[]>([]);

  const updateWishlist = (data: ProductCart) => {
    setWishlistData([...WishlistData, data]);
  };

  const clearWishlist = async () => {
    try {
      await AsyncStorage.removeItem('@wishlist');
      setWishlistData([]);
    } catch (e) {
      // clear error
    }
  };

  // const setData = useCallback(async (data: ProductWishlist) => {
  //   const newList = [...WishlistData, data];
  //   try {
  //     await AsyncStorage.setItem('@Wishlist', JSON.stringify(newList));
  //   } catch (e) {
  //     // saving error
  //   }
  // }, []);

  const getData = async () => {
    let products;

    try {
      const existingProducts = await AsyncStorage.getItem('@Wishlist');
      if (!existingProducts) return;

      products = JSON.parse(existingProducts as string);
    } catch (e) {
      // saving error
    }

    setWishlistData(products);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ WishlistData, updateWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
