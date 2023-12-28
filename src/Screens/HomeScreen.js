import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  FlatList,
  Image
} from 'react-native';
import React, { useLayoutEffect, useState, useRef } from "react";
import {AntDesign} from '@expo/vector-icons'

import DynamicHeader from '../Components/AnimatedHeader';
import { useNavigation } from '@react-navigation/native';
import { removeItem } from '@/Utils/asyncStorage';
import { DATA } from '../Utils/data';
import { SvgXml } from 'react-native-svg';
import { clock } from '@/Assets/Icons/Clock';


const HeartButton = () => {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    setLiked(!liked);
  };

  return (
      <AntDesign onPress={handlePress}
        style={styles.heartIcon}
        name={liked ? 'heart' : 'hearto'}
        size={20}
        color={liked ? '#E00034' : '#70001A'}
        borderColor="#70001A"
      />
  );
};
export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const [liked, setLiked] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      {/* <ScrollView 
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY}}}],
          {useNativeDriver: false}
        )}
      >         
            {DATA.map((book, index) => {
              return (                
                  <Text style={styles.scrollText} key={book.id}>{book.title}</Text>                
              )
            })}
            {DATA.map((book, index) => {
              return (                
                  <Text style={styles.scrollText} key={book.id}>{book.title}</Text>                
              )
            })}         
      </ScrollView> */}
      <FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        data={DATA}

        renderItem={({ index, item }) => (
          <TouchableOpacity style={[styles.itemContainer, { marginRight: index % 2 !== 0 ? 0 : "4%" }]} key={item.id}>
            <Image style={styles.recipeImage} source={item.imgPath} />
            <View style={styles.recipeDetail}>
              <View style={styles.cookingTime}>
                <SvgXml xml={clock}/>
                <Text style={styles.cookingTimeText}>{item.cookingTime} mins</Text>
              </View>
              <Text style={styles.recipeName}>{item.recipeName}</Text>
              <Text style={styles.categoryText}>Category: {item.category}</Text>
            </View>
            <HeartButton/>
          </TouchableOpacity>
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
    paddingBottom: 32
  },
  itemContainer: {
    height: 190,
    width: "48%",
    marginBottom: 8,
  },
  recipeImage: {
    width: "100%",
    borderRadius: 12
  },
  recipeDetail: {
    padding: 8,
  },
  cookingTime: {
    flexDirection: "row",
    alignContent: "center",
    height: 10,
    marginBottom: 3,
  },
  cookingTimeText: {
    marginLeft: 4,
    fontSize: 10,
    color: "#262626",
  },
  recipeName: {
    fontSize: 12,
    color: "#E00034",
    marginBottom: 3,
  },
  categoryText: {
    fontSize: 10,
    color: "#262626",
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  }
});
