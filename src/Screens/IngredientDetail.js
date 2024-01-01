import React, { useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { ArrowLeft } from "@/Assets/Icons/arrow-left";

export default function IngredientDetail() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <SafeAreaView style={styles.recipeDetail}>
        <View style={styles.statusBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <SvgXml xml={ArrowLeft} />
          </Pressable>
          <Text style={styles.title}>Ingredient Detail</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          style={styles.frameParent}
        >
          <View style={styles.borderContainer}>
            <View style={[styles.nameRecipeWrapper, styles.wrapperSpaceBlock]}>
              <Text style={styles.nameRecipe}>Coffee Powder</Text>
            </View>
            <View style={styles.image}>
              <Image
                style={styles.imageIcon}
                source={require("../Assets/RecipeDetail/detail1.png")}
              />
            </View>
            <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
              <Text style={styles.stepDetail}> 1 spoon of sugar</Text>
            </View>
          </View>
          <View style={styles.borderContainer}>
            <View style={[styles.nameRecipeWrapper, styles.wrapperSpaceBlock]}>
              <Text style={styles.nameRecipe}>Coffee Powder</Text>
            </View>
            <View style={styles.image}>
              <Image
                style={styles.imageIcon}
                source={require("../Assets/RecipeDetail/detail1.png")}
              />
            </View>
            <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
              <Text style={styles.stepDetail}> 1 spoon of sugar</Text>
            </View>
          </View>
          <View style={styles.borderContainer}>
            <View style={[styles.nameRecipeWrapper, styles.wrapperSpaceBlock]}>
              <Text style={styles.nameRecipe}>Coffee Powder</Text>
            </View>
            <View style={styles.image}>
              <Image
                style={styles.imageIcon}
                source={require("../Assets/RecipeDetail/detail1.png")}
              />
            </View>
            <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
              <Text style={styles.stepDetail}> 1 spoon of sugar</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  recipeDetail: {
    backgroundColor: "#fff",
    paddingTop: "10%",
  },
  title: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "#e00034",
    flex: 1,
  },
  statusBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  frameParent: {
    backgroundColor: "#ffebef",
    borderTopWidth: 2,
    borderColor: "#70001a",
    borderStyle: "solid",
    width: "100%",
  },
  image: { alignItems: "center", paddingTop: 10 },
  imageIcon: {
    height: 250,
    width: "90%",
    borderRadius: 12,
  },
  nameRecipe: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: "left",
    color: "#e00034",
    fontWeight: "700",
  },
  nameRecipeWrapper: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  wrapperSpaceBlock: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  frameParent: {
    backgroundColor: "#ffebef",
    borderTopWidth: 2,
    borderColor: "#70001a",
    borderStyle: "solid",
    width: "100%",
    height: "100%",
  },
  borderContainer: {
    margin: 10,
  },
});
