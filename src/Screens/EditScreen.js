import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

import DropdownList from '../Components/DropdownList';
import { DATA } from '../Utils/data';
import { SvgXml } from 'react-native-svg';
import { arrow_left_pink } from '@/Assets/Icons/arrow-left';
import { CameraIcon } from '@/Assets/Icons/camera';
import { list, verylarger } from '@/Assets/Icons/list';
import { edit } from '@/Assets/Icons/edit';
import CustomTabBar from '@/Components/CustomTabBar2';


const ingredientNames = ['Almond', 'Almond', 'Almond', 'Almond', 'Almond', 'Almond', 'Almond', 'Almond', 'Almond', 'Almond', 'Almond', 'Almond'];
export default function SuggestionScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const goToPreviousTab = () => {
        navigation.goBack();
    }

    const goToHome = () => {
        navigation.navigate("Home");
    }

    const [isShowIngredients, ShowIngredients] = useState(false);

    const toggleIngredients = () => {
        ShowIngredients(!isShowIngredients);
    }


    const [value, setValue] = useState(null);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={goToPreviousTab}>
                        <SvgXml xml={arrow_left_pink} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Edit Ingredients</Text>
                    <TouchableOpacity style={{ opacity: 0 }}>
                        <SvgXml xml={CameraIcon} />
                    </TouchableOpacity>
                </View>
                <CustomTabBar/>
                {/* <View style={styles.filterContainer}>
                    <DropdownList placeholder={"Category"} data={dataList} />
                    <DropdownList placeholder={"Cooking Time"} data={dataList} />
                </View> */}
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

                <View style={styles.bottom}>

                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderRadius: 50,
                            flexDirection: 'row',
                            padding: 10,
                            borderColor: '#E00034',
                            alignItems: 'center',
                            height: 50,
                            width: 160,
                            justifyContent: 'center'
                        }}
                        onPress={goToHome}
                    >
                        <SvgXml xml={edit} />
                        <Text style={{ color: '#E00034' }}> Complete result</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderRadius: 50,
                            flexDirection: 'row',
                            padding: 10,
                            borderColor: '#E00034',
                            alignItems: 'center',
                            backgroundColor: '#A80027',
                            height: 50,
                            width: 160,
                            justifyContent: 'center'
                        }}

                    >
                        <Text style={{ color: 'white' }}> Find dishes </Text>
                        <SvgXml xml={verylarger} />
                    </TouchableOpacity>
                </View>

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
        justifyContent: 'space-between',
        flexDirection: 'row'
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
    bottom: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 2,
        borderTopColor: '#70001A',
        backgroundColor: '#FFEBEF'
    },
    ingredients: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: -120
    },
});
