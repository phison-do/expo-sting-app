import React, { useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  SectionList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorParamList } from './types';
import { HomeScreenNavigationProp } from './types';
import { HOMESTACK_DATA } from './mocks';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from './../queries/categories';
import { Loader } from '../components/loader';
import Carousel from 'react-native-snap-carousel';

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data, loading } = useQuery(CATEGORIES_QUERY);
  const {height, width} = Dimensions.get('window');
  const ref = useRef(null);

  if (loading) return <Loader />;
  if (!data) return null;

  const renderProductItem = ({ item }: any) => {
    return (
      <View style={{ marginRight: 12 }}>
        <View>
          <Image source={{ uri: item.image }} style={{ height: 420 }} />
        </View>
      
        <View>
          <Text style={{ paddingVertical: 4, }}>{ item.name }</Text>
          <Text>{ item.price }</Text>
        </View>

        <View style={{ height: 0, display: "flex", flexDirection: "row", paddingVertical: 4}}>
          {
            (item?.colorSwatches.length > 0) && item?.colorSwatches?.map((color: any) => {
              return (
                <View style={{ borderRadius: 50, backgroundColor: `${color.color}`, height: 15, width: 15, marginRight: 8 }}/ >
              );
            })
          }
        </View>
      </View>)
  }

  const renderListItems = ({ item }: any) => {
    return (
      <View
        style={{
          borderColor: '#ccc',
          backgroundColor: '#FFF',
          marginBottom: 12,
        }}
      >
          {
            item.type === "hero" && (item.img && 
            <View>
              <Image source={{ uri: item.img }} style={{ height: 480 }} />
            </View>)
          }

          {
            
            item.type === "image" && (
              <View style={{ paddingHorizontal: 12, paddingBottom: 0 }}>
                <Pressable
                onPress={() =>
                  navigation.navigate('Details', {
                    name: item.name,
                  })
                }
              >
                { item.img && 
                  <Image source={{ uri: item.img }} style={[styles.image, { height: item.height }]} />
                }
                <Text style={styles.title}>{item.name}</Text>
                </Pressable>
              </View>)
          }
        
          {
            item.type === "categories" &&  (
            <View style={{ marginTop: 12 }}>
              <SectionList style={{ flex: 1,flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', }}
                sections={
                  [ 
                    { 
                      title: "title", 
                      data: data?.categories.data[0].categories,
                    }
                  ]}
                renderItem={({item}) => (
                  <Pressable               
                    onPress={() => navigation.navigate('Details', { name: item.name, })}
                    style={{ width: (width - 48) / 2, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc'}}
                  >
                    <Text style={{ textAlign: "center" }}>{item.name}</Text>
                  </Pressable>
                )}
              />
            </View>)
          } 

          {
            item.type === "carousel" &&  (
            <View style={{ marginVertical: 12, paddingHorizontal: 12, height: 520 }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent:"space-between", marginBottom: 12 }}>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Bestsellers</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Alles tonen</Text>
                </View>
              </View>
              <Carousel
                ref={ref}
                data={item.items}
                renderItem={renderProductItem}
                activeSlideAlignment='start'
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                sliderWidth={width}
                itemWidth={300}
                vertical={false}
              />
            </View>)
          } 
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <FlatList data={HOMESTACK_DATA} renderItem={renderListItems} />
    </View>
  );
};

export const HomeStackScreen = () => {

  const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();


  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 16,
    paddingVertical: 12,
    fontWeight: "bold",
  },
  itemWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
});
