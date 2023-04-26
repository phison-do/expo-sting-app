import React, { useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  SectionList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigatorParamList } from "./types";
import { HomeScreenNavigationProp } from "./types";
import { HOMESTACK_DATA } from "./mocks";
import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "./../queries/categories";
import { Loader } from "../components/loader";
import { ListerPage } from "./ListerPage";
import Carousel from "react-native-snap-carousel";

export const HomeScreen = () => {
  const ref = useRef(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data, loading } = useQuery(CATEGORIES_QUERY, {
    variables: { id: "kleding" },
  });
  const { height, width } = Dimensions.get("window");

  if (loading) return <Loader />;
  if (!data) return null;

  const renderProductItem = ({ item }: any) => {
    return (
      <View style={styles.carouselItemWrapper}>
        <View>
          <Image source={{ uri: item.image }} style={{ height: 420 }} />
        </View>

        <View>
          <Text style={{ paddingVertical: 4 }}>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>

        <View style={styles.colorSwatchWrapper}>
          {item?.colorSwatches.length > 0 &&
            item?.colorSwatches?.map((color: any, index: number) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.colorSwatchItem,
                    { backgroundColor: `${color.color}` },
                  ]}
                />
              );
            })}
        </View>
      </View>
    );
  };

  const renderListItems = ({ item }: any) => {
    return (
      <View style={styles.homeItemsWrapper}>
        {item.type === "hero" && item.img && (
          <View>
            <Image source={{ uri: item.img }} style={{ height: 480 }} />
          </View>
        )}

        {item.type === "card" && (
          <View
            style={[
              styles.cardWrapper,
              {
                ...(item.name && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }),
              },
            ]}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("Lister", {
                  name: item.name,
                  category: item.id,
                })
              }
            >
              {item.img && (
                <Image
                  source={{ uri: item.img }}
                  style={[styles.cardImage, { height: item.height }]}
                />
              )}

              {item.name && <Text style={styles.cardTitle}>{item.name}</Text>}
            </Pressable>
          </View>
        )}

        {item.type === "categories" && data?.categories?.data && (
          <View style={{ paddingHorizontal: 12 }}>
            <FlatList
              style={styles.categoriesWrapper}
              numColumns={2}
              data={data?.categories?.data?.[0]?.categories || []}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={[
                      styles.categoriesItem,
                      {
                        width: width / 2 - 18,
                        marginRight: index % 2 === 0 ? 12 : 0,
                      },
                    ]}
                    key={index}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Lister", {
                          name: item.name,
                          category: item.id,
                        })
                      }
                    >
                      <Text>{item.name}</Text>
                    </Pressable>
                  </View>
                );
              }}
            />
          </View>
        )}

        {item.type === "carousel" && (
          <View style={styles.carouselWrapper}>
            <View style={styles.carouselHeader}>
              <View>
                <Text style={{ fontWeight: "bold" }}>Bestsellers</Text>
              </View>
              <View>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Lister", {
                      name: item.name,
                      category: item.id,
                    })
                  }
                >
                  <Text style={{ fontWeight: "bold" }}>Alles tonen</Text>
                </Pressable>
              </View>
            </View>
            <Carousel
              ref={ref}
              data={item.items}
              renderItem={renderProductItem}
              activeSlideAlignment="start"
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              sliderWidth={width}
              itemWidth={300}
              vertical={false}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.pageWrapper}>
      <FlatList data={HOMESTACK_DATA} renderItem={renderListItems} />
    </View>
  );
};

export const HomeStackScreen = () => {
  const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Group>
        <HomeStack.Screen
          name="Lister"
          component={ListerPage}
          options={({ route }) => ({
            title: route.params.name,
            headerBackTitleStyle: {
              fontSize: 16,
              color: "black",
            },
            headerTintColor: "black",
            headerTitleStyle: { color: "black" },
          })}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  homeItemsWrapper: {
    borderColor: "#ccc",
    backgroundColor: "#FFF",
    marginBottom: 12,
  },
  cardImage: {
    width: "100%",
  },
  cardTitle: {
    fontSize: 16,
    paddingVertical: 12,
    fontWeight: "bold",
  },
  cardWrapper: {
    marginHorizontal: 12,
    paddingBottom: 0,
    borderColor: "#ccc",
  },
  categoriesWrapper: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    paddingBottom: 12,
  },
  categoriesItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  carouselWrapper: {
    marginVertical: 12,
    marginHorizontal: 12,
    paddingBottom: 12,
    height: 535,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  carouselHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  carouselItemWrapper: {
    marginRight: 12,
  },
  colorSwatchWrapper: {
    height: 0,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 4,
  },
  colorSwatchItem: {
    borderRadius: 50,
    height: 15,
    width: 15,
    marginRight: 8,
  },
});
