import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { captureImage } from '@/Assets/Icons/captureImage';
import { list, verylarger } from '@/Assets/Icons/list';
import { arrow_left_pink } from '@/Assets/Icons/arrow-left';
import { edit } from '@/Assets/Icons/edit';

const ImagePreviewScreen = ({ route }) => {

    const { photo } = route.params;
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const goToPreviousTab = () => {
        navigation.navigate("Cameras");
    }

    const goToEditScreen = () => {
        navigation.navigate("Edit");
    }

    const goToSuggestioScreen = () => {
        navigation.navigate("Suggestion");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity style={{ justifyContent: 'center', padding: 20 }} onPress={goToPreviousTab}>
                    <SvgXml xml={arrow_left_pink} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: '#E00034' }}>  Your Ingredients </Text>
                <TouchableOpacity style={{ opacity: 0 }}>
                    <SvgXml xml={captureImage} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.frame}>
                    <Image source={{ uri: photo.uri }} style={styles.image} />

                </View>
                <View style={styles.middle}>
                    <SvgXml xml={list} />
                    <Text style={{ fontSize: 20, padding: 20, color: '#E00034' }}> Your Ingredients (6) </Text>
                </View>

            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 50,
                        flexDirection: 'row',
                        padding: 10,
                        borderColor: '#E00034',
                        alignItems: 'center'
                    }}
                    onPress={goToEditScreen}>
                    <SvgXml xml={edit} />
                    <Text style={{ color: '#E00034' }}> Edit Result</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 50,
                        flexDirection: 'row',
                        padding: 10,
                        borderColor: '#E00034',
                        alignItems: 'center',
                        backgroundColor: '#A80027'
                    }}
                    onPress={goToSuggestioScreen}
                >
                    <Text style={{ color: 'white' }}> Find Dishes </Text>
                    <SvgXml xml={verylarger} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ImagePreviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    frame: {
        height: 350,
        borderWidth: 3,
        borderColor: '#70001A',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: -75
    },
    middle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 90,
        paddingHorizontal: 20,
        marginTop: -20
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    bottom: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 2,
        borderTopColor: '#70001A',
        backgroundColor: '#FFEBEF'
    }
});