import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import React, { useLayoutEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../Components/SearchBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function SearchScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const handleSummit = () => {
        navigation.navigate("Search2");
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollViewContent}>
                <View style={styles.headerContainer}><Text style={styles.headerText}>Search</Text></View>
                <SearchBar handleSummit={handleSummit}/>
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
    }
});
