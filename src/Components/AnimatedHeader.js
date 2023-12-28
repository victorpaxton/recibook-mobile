import * as React from 'react';
import { Text, View, StyleSheet, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
import WelcomeBar from './WelcomeBar';
import CustomTabBar from './CustomTabBar.js';
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
        <CustomTabBar/>
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
});