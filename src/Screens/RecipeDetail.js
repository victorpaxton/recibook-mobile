import React, { useEffect, useLayoutEffect, useRef } from "react";
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
import { getRecipeDetails } from "@/Hooks/recipeHooks";
import { useStateContext } from "@/Context/StateContext";
import { ActivityIndicator } from "react-native";
import { clock } from "@/Assets/Icons/Clock";

export default function RecipeDetail() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const IngredientDetail = async (e) => {
    e.preventDefault();
    navigation.navigate("Ingredient1");
  };

  const { accessToken, activeRecipe, setActiveRecipeDetails } =
    useStateContext();

  const { recipe, isRecipeDetailsLoading, isRecipeDetailsError } =
    getRecipeDetails(accessToken, activeRecipe);

  useEffect(() => {
    if (recipe) setActiveRecipeDetails(recipe.data);
  }, [recipe]);

  return (
    <>
      <SafeAreaView style={styles.recipeDetail}>
        <View style={styles.statusBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <SvgXml xml={ArrowLeft} />
          </Pressable>
          <Text style={styles.title}>Recipe Detail</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          style={styles.frameParent}
        >
          {isRecipeDetailsLoading ? (
            <ActivityIndicator
              size="large"
              color="#E00034"
              style={{ paddingTop: 300 }}
            />
          ) : (
            <>
              <View style={styles.image}>
                <Image
                  style={styles.imageIcon}
                  source={{ uri: recipe.data.image }}
                />
              </View>
              <View
                style={[styles.nameRecipeWrapper, styles.wrapperSpaceBlock]}
              >
                <Text style={styles.nameRecipe}>{recipe.data.recipeName}</Text>
              </View>

              <View style={styles.info}>
                <View style={styles.category}>
                  <SvgXml xml={recipe.data.recipeCategory.svgActive} />
                  <Text style={styles.categoryText}>
                    {recipe.data.recipeCategory.recipeCategoryName}
                  </Text>
                </View>

                <View style={styles.cookingTime}>
                  <SvgXml xml={clock} />
                  <Text style={styles.cookingTimeText}>
                    {recipe.data.cookingTime} mins
                  </Text>
                </View>
              </View>

              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.stepDetail}>{recipe.data.description}</Text>
              </View>

              <View style={styles.borderContainer}>
                <View style={styles.wrapperSpaceBlock}>
                  <Text style={styles.step}>Ingredient:</Text>
                </View>

                {recipe.data.recipeIngredients.map((i) => {
                  return (
                    <View
                      style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}
                    >
                      <Text style={styles.stepDetail}>
                        {i.amount} {i.unit} {i.ingredient.ingredientName}
                      </Text>
                    </View>
                  );
                })}

                <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
                  <Text style={styles.stepDetail}> 1 cup of water</Text>
                </View>
                <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
                  <Text style={styles.stepDetail}> 2 tomatoes</Text>
                </View>
                <View
                  style={[styles.buttonContainer, styles.wrapperSpaceBlock]}
                >
                  <Pressable style={styles.button} onPress={IngredientDetail}>
                    <Text style={[styles.textButton]}>Ingredients </Text>
                    <SvgXml
                      style={styles.caretDown}
                      xml={`<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2656 6.03906L6.51562 9.78906C6.375 9.92969 6.1875 10 6 10C5.78906 10 5.60156 9.92969 5.46094 9.78906C5.15625 9.50781 5.15625 9.01562 5.46094 8.73438L7.92188 6.25H0.75C0.328125 6.25 0 5.92188 0 5.5C0 5.10156 0.328125 4.75 0.75 4.75H7.92188L5.46094 2.28906C5.15625 2.00781 5.15625 1.51562 5.46094 1.23438C5.74219 0.929688 6.23438 0.929688 6.51562 1.23438L10.2656 4.98438C10.5703 5.26562 10.5703 5.75781 10.2656 6.03906Z" fill="#E00034"/>
</svg>
`}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.borderContainer}>
                <View style={styles.wrapperSpaceBlock}>
                  <Text style={styles.step}>Directions:</Text>
                </View>
                {recipe.data.direction.split("@").map((step, index) => {
                  return (
                    <>
                      <View
                        style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}
                      >
                        <Text style={styles.step}>Step {index + 1}:</Text>
                      </View>
                      <View
                        style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}
                      >
                        <Text style={styles.stepDetail}>{step}</Text>
                      </View>
                    </>
                  );
                })}
              </View>
            </>
          )}
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
  step: {
    lineHeight: 22,
    fontStyle: "italic",
    color: "#262626",
    fontSize: 14,
    textAlign: "left",
    fontWeight: "700",
  },
  stepDetail: {
    lineHeight: 20,
    fontSize: 12,
    color: "#262626",
    textAlign: "left",
  },
  buttonContainer: {
    flex: 1,
    height: 35,
    justifyContent: "flex-end",
    marginTop: 40,
    width: 375,
    height: 35,
    paddingRight: 0,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#fff",
    borderColor: "#70001a",
    borderStyle: "solid",
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    width: 100,
  },
  textButton: {
    fontSize: 14,
    color: "#e00034",
    textAlign: "left",
  },
  caretDown: {
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 4,
  },
  borderContainer: {
    borderColor: "#70001a",
    borderStyle: "solid",
    borderRadius: 12,
    borderWidth: 2,
    margin: 15,
  },
  category: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 3,
    gap: 8,
  },
  categoryText: {
    fontSize: 16,
    lineHeight: 32,
    textAlign: "left",
    color: "#e00034",
    fontWeight: "300",
  },
  cookingTime: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 3,
  },
  cookingTimeText: {
    marginLeft: 4,
    fontSize: 16,
    color: "#262626",
  },
  info: {
    paddingHorizontal: 15,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
});
