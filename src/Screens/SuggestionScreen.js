import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import DropdownList from "../Components/DropdownList";
import { DATA } from "../Utils/data";
import { SvgXml } from "react-native-svg";
import { arrow_left_pink } from "@/Assets/Icons/arrow-left";
import { CameraIcon } from "@/Assets/Icons/camera";
import { getSuggestionRecipes } from "@/Hooks/recognititionHooks";
import { useStateContext } from "@/Context/StateContext";
import { ActivityIndicator } from "react-native";
const dataList = [
  { label: "Soup", value: "1" },
  { label: "Dessert", value: "2" },
  { label: "Breakfast", value: "3" },
  { label: "Vegetarian", value: "4" },
  { label: "Main", value: "5" },
];
export default function SuggestionScreen() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const goToPreviousTab = () => {
    navigation.goBack();
  };

  const goToCamera = () => {
    navigation.navigate("Cameras");
  };

  const [value, setValue] = useState(null);

  const { accessToken } = useStateContext();

  const { recognizedIngredients } = useStateContext();

  const { recipe, isRecipeSuggestionLoading, isRecipeSuggestionError } =
    getSuggestionRecipes(accessToken, recognizedIngredients);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={goToPreviousTab}>
            <SvgXml xml={arrow_left_pink} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Recipes Suggestion</Text>
          <TouchableOpacity onPress={goToCamera}>
            <SvgXml xml={CameraIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <DropdownList placeholder={"Category"} data={dataList} />
          <DropdownList placeholder={"Cooking Time"} data={dataList} />
        </View>

        {isRecipeSuggestionLoading ? (
          <View style={{ paddingTop: 12 }}>
            <ActivityIndicator size="large" color="#E00034" style={{}} />
            <Text
              style={{
                color: "#A80027",
                textAlign: "center",
                paddingBottom: 20,
                fontSize: 14,
              }}
            >
              Please wait...
            </Text>
          </View>
        ) : recipe == null ? (
          <Text
            style={{
              color: "#A80027",
              textAlign: "center",
              paddingBottom: 20,
              fontSize: 14,
            }}
          >
            <></>
          </Text>
        ) : recipe.data.length == 0 ? (
          <Text
            style={{
              color: "#A80027",
              textAlign: "center",
              paddingBottom: 20,
              paddingTop: 20,
              fontSize: 14,
            }}
          >
            No recipe found!
          </Text>
        ) : (
          <FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
            data={recipe.data}
            renderItem={({ index, item }) => (
              <ReciCard
                id={item.id}
                recipeName={item.recipeName}
                imgPath={item.image}
                cookingTime={item.cookingTime}
                category={item.recipeCategory.recipeCategoryName}
                style={{ marginRight: index % 2 !== 0 ? 0 : "4%" }}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            numColumns={2}
            keyExtractor={(item, index) => index}
            style={styles.mainView}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    flex: 1,
  },
  headerContainer: {
    height: 54,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 16,
    color: "#E00034",
    fontWeight: 500,
  },
  filterContainer: {
    height: 55,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 14,
    flexDirection: "row",
  },
  mainView: {
    padding: 16,
    paddingBottom: 32,
  },
});
