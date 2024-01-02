// CustomTabBar.js

import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { SvgXml } from 'react-native-svg';
import { ActivityIndicator } from 'react-native';

import {
  getRecipeCategories,
  getRecipesByCategory,
} from '@/Hooks/recipeHooks.js';

import { useStateContext } from '@/Context/StateContext.js';

const CustomTabBar = () => {
  const { accessToken, setActiveCategory } = useStateContext();

  const { recipeCategories, isLoading, error, refetch } =
    getRecipeCategories(accessToken);

  //   console.log(recipeCategories.data);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index, categoryId) => {
    setActiveTab(index);
    // Perform actions based on the selected tab, e.g., show/hide content
    setActiveCategory(categoryId);
  };

  //   useEffect(() => {
  //     const { recipes, isRecipeLoading, error } =
  //       getRecipesByCategory(accessToken);
  //   }, []);

  return (
    <View style={styles.menuCategoryContainer}>
      <ScrollView
        style={{ height: '100%' }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#E00034" style={{}} />
        ) : (
          recipeCategories.data.map((category, index) => {
            return (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleTabPress(index, category.id)}
              >
                <View style={styles.categoryIcon}>
                  <SvgXml
                    xml={
                      activeTab === index ? category.svgActive : category.svg
                    }
                  />
                </View>
                <View style={styles.categoryLabel}>
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: activeTab === index ? '#E00034' : '#262626',
                      },
                      ,
                    ]}
                  >
                    {category.recipeCategoryName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuCategoryContainer: {
    height: 78,
    padding: 12,
  },
  categoryItem: {
    padding: 0,
    width: 70,
    height: '100%',
    marginRight: 6,
    justifyContent: 'space-between',
  },
  categoryIcon: {
    height: 24,
    alignItems: 'center',
  },
  categoryLabel: {
    alignItems: 'center',
    height: 24,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    height: 50,
  },
});

export default CustomTabBar;
