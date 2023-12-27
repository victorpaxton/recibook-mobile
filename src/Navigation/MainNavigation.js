import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SvgXml } from 'react-native-svg';
import { HomeIcon, HomeIconFilled } from '../Assets/Icons/House-blank.js';
import { searchIcon, searchIconFilled } from '../Assets/Icons/Search.js';
import { Wishlist, WishlistFilled } from '../Assets/Icons/square-heart.js';
import { profile } from '../Assets/Icons/circle-user.js';
import { CameraIcon } from '../Assets/Icons/camera.js';
import HomeScreen from '../Screens/HomeScreen'
// import LogScreen from './LogScreen';
// import DeviceScreen from './DeviceScreen';
// import SettingScreen from './SettingScreen';

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View
            style={{
                width: 72,
                height: 72,
                borderRadius: 35,
                backgroundColor: '#A80027',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: 55,
                    height: 55,
                    borderRadius: 35,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <SvgXml xml={CameraIcon} />
            </View>
        </View>
    </TouchableOpacity>
);

const MainNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    height: 75,
                    backgroundColor: '#A80027',
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    borderBottomRightRadius: 32,
                    borderBottomLeftRadius: 32,
                    padding: 0,
                    paddingBottom: 12,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    color: 'white', 
                },

                tabBarIcon: ({ focused}) => {
                    if (route.name === 'Home') {
                        if (focused) {
                            return <SvgXml xml={HomeIconFilled} />;
                        } else {
                            return <SvgXml xml={HomeIcon} />;
                        }
                    } else if (route.name === 'Search') {
                        if (focused) {
                            return <SvgXml xml={searchIconFilled} />;
                        } else {
                            return <SvgXml xml={searchIcon} />;
                        }
                    } else if (route.name === 'Wishlist') {
                        if (focused) {
                            return <SvgXml xml={WishlistFilled} />;
                        } else {
                            return <SvgXml xml={Wishlist} />;
                        }
                    } else if (route.name === 'Profile') {
                        if (focused) {
                            return <SvgXml xml={profile} />;
                        } else {
                            return <SvgXml xml={profile} />;
                        }
                    }
                },
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={HomeScreen} />
            <Tab.Screen name="Cameras" component={HomeScreen}
                styles={styles.cameraBtn}
                options={{
                    tabBarLabel: () => null,
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                }} />
            <Tab.Screen name="Wishlist" component={HomeScreen} />
            <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default MainNavigator

const styles = StyleSheet.create({
    cameraBtn: {
        backgroundColor: '#fff',
    }
});