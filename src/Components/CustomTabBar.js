// CustomTabBar.js

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import {
    forkKnifeActive,
    forkKnifeInactive,
    soupInactive,
    soupActive,
    cakeInactive,
    cakeActive,
    breakfastInactive,
    breakfastActive,
    vegetationInactive,
    vegetationActive,
    mainActive,
    mainInactive,
} from '../Assets/Icons/Categories/index.js'
import { SvgXml } from 'react-native-svg';

const CustomTabBar = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabPress = (index) => {
        setActiveTab(index);
        // Perform actions based on the selected tab, e.g., show/hide content
    };

    return (
        <View style={styles.menuCategoryContainer}>
            <ScrollView style={{ height: '100%' }} horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.categoryItem} onPress={() => handleTabPress(0)}>
                    <View style={styles.categoryIcon}><SvgXml xml={activeTab === 0 ? forkKnifeActive : forkKnifeInactive} /></View>
                    <View style={styles.categoryLabel}><Text style={[styles.categoryText, { color: activeTab === 0 ? '#E00034' : '#262626' }]}>All</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={() => handleTabPress(1)}>
                    <View style={styles.categoryIcon}><SvgXml xml={activeTab === 1 ? soupActive : soupInactive} /></View>
                    <View style={styles.categoryLabel}><Text style={[styles.categoryText, { color: activeTab === 1 ? '#E00034' : '#262626' }]}>Soup</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={() => handleTabPress(2)}>
                    <View style={styles.categoryIcon}><SvgXml xml={activeTab === 2 ? cakeActive : cakeInactive} /></View>
                    <View style={styles.categoryLabel}><Text style={[styles.categoryText, { color: activeTab === 2 ? '#E00034' : '#262626' }]}>Dessert</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={() => handleTabPress(3)}>
                    <View style={styles.categoryIcon}><SvgXml xml={activeTab === 3 ? breakfastActive : breakfastInactive} /></View>
                    <View style={styles.categoryLabel}><Text style={[styles.categoryText, { color: activeTab === 3 ? '#E00034' : '#262626' }]}>Breakfast</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={() => handleTabPress(4)}>
                    <View style={styles.categoryIcon}><SvgXml xml={activeTab === 4 ? vegetationActive : vegetationInactive} /></View>
                    <View style={styles.categoryLabel}><Text style={[styles.categoryText, { color: activeTab === 4 ? '#E00034' : '#262626' }]}>Vegetarian</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={() => handleTabPress(5)}>
                    <View style={styles.categoryIcon}><SvgXml xml={activeTab === 5 ? mainActive : mainInactive} /></View>
                    <View style={styles.categoryLabel}><Text style={[styles.categoryText, { color: activeTab === 5 ? '#E00034' : '#262626' }]}>Main</Text></View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    menuCategoryContainer: {
        height: 78,
        padding: 16,
    },
    categoryItem: {
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
    }
});

export default CustomTabBar;
