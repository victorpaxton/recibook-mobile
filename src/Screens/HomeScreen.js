import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  FlatList
} from 'react-native';
import React, {useLayoutEffect, useState, useRef} from 'react';
import DynamicHeader from '../Components/AnimatedHeader';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { removeItem } from '@/Utils/asyncStorage';
import { DATA } from '../Utils/data';


const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const handleReset = async () => {
    await removeItem('onboarded');
    navigation.push('Onboarding');
  };
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
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY}}}],
          {useNativeDriver: false}
        )}
        data={DATA}
        
        renderItem={({ index, item }) => (
          <View style={[styles.itemContainer, {marginRight: index % 2 !== 0 ? 0 : "4%"}]}>
            <Text style={styles.scrollText} key={item.id}>{item.title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
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
  },
  scrollText: {
    height: 40,
  },
  resetButton: {
    backgroundColor: '#34d399',
    padding: 10,
    borderRadius: 10,
  },
  mainView: {
    padding : 16,
  },
  itemContainer: {
    backgroundColor: "white",
    height: 162,
    width: "48%",
    marginBottom: 8,
  }
});
