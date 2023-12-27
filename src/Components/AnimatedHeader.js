import * as React from 'react';
import { Text, View, StyleSheet, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
import WelcomeBar from './WelcomeBar';
import { FontSize } from '@/Theme/Variables';
import {forkKnife, forkKnifeWhite} from '../Assets/Icons/fork-knife.js';
import { Touchable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHippo } from "@fortawesome/free-solid-svg-icons";

const Max_Header_Height = 210;
const Min_Header_Height = 112;
const Scroll_Distance = Max_Header_Height - Min_Header_Height



const DynamicHeader = ({animHeaderValue}) => {
  const animatedHeaderHeight =  animHeaderValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Max_Header_Height , Min_Header_Height],
    extrapolate: 'clamp'
  })
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, Max_Header_Height - Min_Header_Height],
    outputRange: ['white', 'white'],
    extrapolate: 'clamp'
  })
  return (
    <Animated.View 
        style={[
          styles.container,
          {
            height: animatedHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor
          }

        ]}
      >
        <View style={styles.logoContainer}><Image style={styles.appName} source={require("../Assets/recibook.png")} /></View>
        <WelcomeBar logoUri={require("../Assets/avatar.jpg")} userName={'Rose'}></WelcomeBar>
        <View style={{height: 34, paddingHorizontal: 18, margin: 0, paddingTop: 12}}><Text style={{fontSize: 16, fontWeight: 700}}>Let’s prepare your meal</Text></View> 
        <View style={styles.menuCategoryContainer}>
          <ScrollView style={{height: '100%'}} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}><SvgXml xml={forkKnife} /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>All</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}><SvgXml xml={forkKnife} /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>All</Text></View>
            </TouchableOpacity>            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}><SvgXml xml={forkKnife} /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>All</Text></View>
            </TouchableOpacity>            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}><SvgXml xml={forkKnife} /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>All</Text></View>
            </TouchableOpacity>            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}><SvgXml xml={forkKnife} /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>All</Text></View>
            </TouchableOpacity>            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}><SvgXml xml={forkKnife} /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>All</Text></View>
            </TouchableOpacity>            
          </ScrollView>
        </View>  
    </Animated.View>
  );
};

export default DynamicHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    left: 0,
    right: 0,
  },
  logoContainer: {
    height:56,
    width: '100%',
    paddingTop: 5,
    margin: 0,
    alignItems: 'center',
  },
  appName: {
  },

  ////////////////////////////////

  menuCategoryContainer: {
    height: 78,
    padding: 16,
  },
  categoryItem: {
    // backgroundColor:'red',
    
    padding: 0,
    width: 67,
    height: '100%',
    marginRight: 6,
    justifyContent: 'space-between',
  },
  categoryIcon: {
    height: 24,
    alignItems: 'center',

  },
  categoryLabel: {
    height: 18,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    // color: 'red', 
  }
});