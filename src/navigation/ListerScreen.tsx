import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { LISTER_QUERY } from './../queries/lister';
import { FlatList } from 'react-native-gesture-handler';

// route = RouteProp<{ params: { name: string } }, 'params'

export const ListerScreen = ({ route }) => {
  const { data, loading } = useQuery(LISTER_QUERY);
  const navigation = useNavigation();

  if (loading)
    return (
      <Text
        style={{ fontSize: 18, paddingHorizontal: 12, paddingVertical: 12 }}
      >
        Loading
      </Text>
    );

  if (!data) return null;

  const renderListItems = ({ item }: any) => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#ccc',
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate('Details', {
              name: item.product_name,
              id: item.id,
            })
          }
        >
          <Image
            source={{ uri: item.image.link }}
            style={{ width: '100%', height: 600 }}
          />
          <View
            style={{
              flex: 1,
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
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList data={data.productSearch.hits} renderItem={renderListItems} />
    </View>
  );
};
