import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { clock } from '@/Assets/Icons/Clock';
import HeartButton from './HeartButton.js';
import { useNavigation } from '@react-navigation/native';
export default ReciCard = (props) => {
  const navigation = useNavigation();
  const recipeDetail = async (e) => {
    e.preventDefault();
    navigation.navigate('Recipe1');
  };
  return (
    <TouchableOpacity
      style={[styles.itemContainer, props.style]}
      key={props.id}
      onPress={recipeDetail}
    >
      <Image
        style={styles.recipeImage}
        source={{
          uri: props.imgPath,
        }}
      />

      <View style={styles.recipeDetail}>
        <View style={styles.cookingTime}>
          <SvgXml xml={clock} />
          <Text style={styles.cookingTimeText}>{props.cookingTime} mins</Text>
        </View>
        <Text style={styles.recipeName}>{props.recipeName}</Text>
        <Text style={styles.categoryText}>Category: {props.category}</Text>
      </View>
      <HeartButton />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 275,
    width: '48%',
    marginBottom: 8,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  recipeDetail: {
    padding: 8,
  },
  cookingTime: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 10,
    marginBottom: 3,
  },
  cookingTimeText: {
    marginLeft: 4,
    fontSize: 10,
    color: '#262626',
  },
  recipeName: {
    fontSize: 12,
    color: '#E00034',
    marginBottom: 3,
  },
  categoryText: {
    fontSize: 10,
    color: '#262626',
  },
  imageIcon: {
    flex: 1,
    width: '100%',
    height: 250,
  },
});
