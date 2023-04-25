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
  const { data, loading } = useQuery(CATEGORIES_QUERY, {
    variables: { id: 'kleding' },
  });
  const {height, width} = Dimensions.get('window');
  const ref = useRef(null);

  if (loading) return <Loader />;
  if (!data) return null;

  console.log(data?.categories?.data?.[0]?.categories);

  const renderProductItem = ({ item }: any) => {
    return (
      <View style={ styles.carouselItemWrapper }>
        <View>
          <Image source={{ uri: item.image }} style={{ height: 420 }} />
        </View>
      
        <View>
          <Text style={{ paddingVertical: 4, }}>{ item.name }</Text>
          <Text>{ item.price }</Text>
        </View>

        <View style={ styles.colorSwatchWrapper }>
          {
            (item?.colorSwatches.length > 0) && item?.colorSwatches?.map((color: any, index:number) => {
              return (
                <View key={index} style={[styles.colorSwatchItem, { backgroundColor: `${color.color}` }]
                } />
              );
            })
          }
        </View>
      </View>)
  }

  const renderListItems = ({ item }: any) => {
    return (
      <View
        style={ styles.homeItemsWrapper}
      >
          {
            item.type === "hero" && (item.img && 
            <View>
              <Image source={{ uri: item.img }} style={{ height: 480 }} />
            </View>)
          }

          {
            
            item.type === "card" && (
              <View style={ styles.cardWrapper }>
                <Pressable
                onPress={() =>
                  navigation.navigate('Details', {
                    name: item.name,
                  })
                }
              >
                { item.img && 
                  <Image source={{ uri: item.img }} style={[styles.cardImage, { height: item.height }]} />
                }
                <Text style={styles.cardTitle}>{item.name}</Text>
                </Pressable>
              </View>)
          }
        
          {
            item.type === "categories" && data?.categories?.data &&  (
            <View style={{ paddingHorizontal: 12 }}>
              <SectionList style={ styles.categoriesWrapper }
                sections={
                  [ 
                    { 
                      data: data?.categories?.data?.[0]?.categories || [],
                    }
                  ]}
                renderItem={({item, index}) => {
                  return <View key={index} style={[styles.categoriesItem, {width: (width - 48) / 2 }]}>
                    <Pressable               
                      onPress={() => navigation.navigate('Details', { name: item.name, })}
                    >
                      <Text>{item.name}</Text>
                    </Pressable>
                  </View>
                }}
              />
            </View>)
          } 

          {
            item.type === "carousel" &&  (
            <View style={ styles.carouselWrapper }>
              <View style={ styles.carouselHeader }>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Bestsellers</Text>
                </View>
                <View>
                  <Pressable
                    onPress={() => console.log("Press alles tonen")}>
                  <Text style={{ fontWeight: "bold" }}>Alles tonen</Text>
                  </Pressable>
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
    <View style={ styles.pageWrapper }>
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
  pageWrapper: {
    flex: 1, 
    backgroundColor: "#FFF"
  },
  homeItemsWrapper: {    
    borderColor: '#ccc',
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardTitle: {
    fontSize: 16,
    paddingVertical: 12,
    fontWeight: "bold",
  },
  cardWrapper: {
    paddingHorizontal: 12,
    paddingBottom: 0
  },
  categoriesWrapper: {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between'
  },
  categoriesItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc'
  },
  carouselWrapper: {
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 520
  },
  carouselHeader: {
    flex: 1, flexDirection: "row",
    justifyContent:"space-between",
    marginBottom: 12
  },
  carouselItemWrapper: { 
    marginRight: 12
  },
  colorSwatchWrapper: {
    height: 0,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 4
  },
  colorSwatchItem: {
    borderRadius: 50, 
    height: 15,
    width: 15,
    marginRight: 8 
  }
});
