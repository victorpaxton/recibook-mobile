import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  FlatList,
  Alert,
} from 'react-native';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DynamicHeader from '../Components/AnimatedHeader';
import { useNavigation } from '@react-navigation/native';
import ReciCard from '../Components/ReciCard';
import { useStateContext } from '@/Context/StateContext';
import { getRecipesByCategory } from '@/Hooks/recipeHooks';

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

  const { accessToken, activeCategory } = useStateContext();
  const { recipes, isRecipeLoading, recipeError } = getRecipesByCategory(
    accessToken,
    activeCategory,
    0,
    20
  );

  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader animHeaderValue={scrollOffsetY} />

      {isRecipeLoading ? (
        <Text
          style={{
            color: '#A80027',
            textAlign: 'center',
            paddingBottom: 20,
            fontSize: 14,
          }}
        >
          Please wait...
        </Text>
      ) : (
        <FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
          data={recipes.data.data}
          renderItem={({ index, item }) => (
            <ReciCard
              id={item.id}
              reicpeName={item.recipeName}
              imgPath={item.image}
              cookingTime={item.cookingTime}
              category={item.recipeCategory.recipeCategoryName}
              style={{ marginRight: index % 2 !== 0 ? 0 : '4%' }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          numColumns={2}
          keyExtractor={(item, index) => index}
          style={styles.mainView}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainView: {
    padding: 16,
    paddingBottom: 32,
  },
});
