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

export default function RecipeDetail() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
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
          <Text style={styles.title}>Recipe Detail</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          style={styles.frameParent}
        >
          <View style={styles.image}>
            <Image
              style={styles.imageIcon}
              source={require("../Assets/RecipeDetail/detail1.png")}
            />
          </View>
          <View style={[styles.nameRecipeWrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.nameRecipe}>Chocolate Cake</Text>
          </View>
          <View style={styles.wrapperSpaceBlock}>
            <Text style={styles.step}>Step 1:</Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text
              style={styles.stepDetail}
            >{`Preheat oven to 160°C. Grease and line the base and side of an 18cm round cake pan.`}</Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.step}>Step 2:</Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.stepDetail}>
              Place the butter, coffee, water, chocolate and sugar in a sauce
              pan over low heat. Cook, stirring, for 2-3 minutes or until butter
              and chocolate melt and mixture is smooth. {"\n"}
              Remove from heat and set aside for 5 minutes to cool slightly.
            </Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.step}>Step 3:</Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.stepDetail}>
              Transfer mixture to a bowl. Sift the combined flours and cocoa
              powder over the chocolate mixture and add the almond meal. Use a
              balloon whisk to gently fold the flour into the chocolate mixture.
              Add the egg and stir to combine.
            </Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.step}>Step 3:</Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.stepDetail}>
              Transfer mixture to a bowl. Sift the combined flours and cocoa
              powder over the chocolate mixture and add the almond meal. Use a
              balloon whisk to gently fold the flour into the chocolate mixture.
              Add the egg and stir to combine.
            </Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.step}>Step 3:</Text>
          </View>
          <View style={[styles.step1Wrapper, styles.wrapperSpaceBlock]}>
            <Text style={styles.stepDetail}>
              Transfer mixture to a bowl. Sift the combined flours and cocoa
              powder over the chocolate mixture and add the almond meal. Use a
              balloon whisk to gently fold the flour into the chocolate mixture.
              Add the egg and stir to combine.
            </Text>
          </View>
          <View style={[styles.buttonContainer, styles.wrapperSpaceBlock]}>
            <Pressable style={styles.button} onPress={() => {}}>
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
  image: { alignItems: "center" },
  imageIcon: {
    height: 250,
    width: "100%",
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
  },
  button: {
    borderColor: "#70001a",
    borderStyle: "solid",
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
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
});
