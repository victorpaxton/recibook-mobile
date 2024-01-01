import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  FlatList,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import DynamicHeader from "../Components/AnimatedHeader";
import { useNavigation } from "@react-navigation/native";
import { DATA } from "../Utils/data";
import ReciCard from "../Components/ReciCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  // const recipeDetail = async (e) => {
  //   e.preventDefault();
  //   navigation.navigate("RecipeDetail");
  // };
  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      <FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        data={DATA}
        renderItem={({ index, item }) => (
          <ReciCard
            id={item.id}
            reicpeName={item.recipeName}
            imgPath={item.imgPath}
            cookingTime={item.cookingTime}
            category={item.category}
            style={{ marginRight: index % 2 !== 0 ? 0 : "4%" }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        numColumns={2}
        keyExtractor={(item, index) => index}
        style={styles.mainView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainView: {
    padding: 16,
    paddingBottom: 32,
  },
});
