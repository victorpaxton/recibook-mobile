import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import DropdownList from "../Components/DropdownList";
import { DATA } from "../Utils/data";
import { SvgXml } from "react-native-svg";
import { arrow_left_pink } from "@/Assets/Icons/arrow-left";
import { CameraIcon } from "@/Assets/Icons/camera";

const dataList = [
  { label: "Soup", value: "1" },
  { label: "Dessert", value: "2" },
  { label: "Breakfast", value: "3" },
  { label: "Vegetarian", value: "4" },
  { label: "Main", value: "5" },
];
export default function SuggestionScreen() {
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
        <FlatList
          data={DATA}
          renderItem={({ index, item }) => (
            <ReciCard
              id={item.id}
              recipeName={item.recipeName}
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
