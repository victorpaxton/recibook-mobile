import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList
} from 'react-native';
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../Components/SearchBar';
import DropdownList from '../Components/DropdownList';
import { DATA } from '../Utils/data';

const dataList = [
    { label: 'Soup', value: '1' },
    { label: 'Dessert', value: '2' },
    { label: 'Breakfast', value: '3' },
    { label: 'Vegetarian', value: '4' },
    { label: 'Main', value: '5' },
];
export default function SearchScreen2() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const [value, setValue] = useState(null);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollViewContent}>
                <View style={styles.headerContainer}><Text style={styles.headerText}>Search</Text></View>
                <SearchBar />
                <View style={styles.filterContainer}>
                    <DropdownList placeholder={"Category"} data={dataList} />
                    <DropdownList placeholder={"Cooking Time"} data={dataList} />
                </View>
                <FlatList
                    data={DATA}

                    renderItem={({ index, item }) => (
                        <ReciCard id={item.id} recipeName={item.recipeName} imgPath={item.imgPath}
                            cookingTime={item.cookingTime} category={item.category} style={{ marginRight: index % 2 !== 0 ? 0 : "4%" }} />
                    )}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    style={styles.mainView}
                />
            </View>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollViewContent: {
        flex: 1,
    },
    headerContainer: {
        height: 54,
        paddingHorizontal: 18,
        paddingVertical: 14,
        alignItems: "center",
    },
    headerText: {
        fontSize: 16,
        color: "#E00034",
        fontWeight: 500,
    },
    filterContainer: {
        height: 55,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginTop: 14,
        flexDirection: "row",
    },
    mainView: {
        padding: 16,
        paddingBottom: 32
      },
});
