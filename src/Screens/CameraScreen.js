import { Camera, CameraType } from 'expo-camera';
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { reload } from '../Assets/Icons/reload';
import { flash_off } from '@/Assets/Icons/flash';
import { captureImage } from '@/Assets/Icons/captureImage';
import { square } from '@/Assets/Icons/square';
import { xmark } from '@/Assets/Icons/xmark';

export default function CameraScreen() {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const goToPreviousTab = () => {
        navigation.goBack();
    }

    const [flashMode, setFlashMode] = React.useState('off');
    const [type, setType] = useState(CameraType.back);
    const [hasCameraPermission, setHasCameraPermission] = useState();
    
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }


    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }

    }



    return (
        <View style={styles.container}>

            <Camera style={styles.camera} type={type}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 10,
                        marginVertical: 20
                    }}
                >
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={goToPreviousTab}>
                        <SvgXml xml={xmark} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                        }}
                        onPress={handleFlashMode}>
                        <SvgXml xml={flash_off} />
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>

                <TouchableOpacity
                    style={{
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <SvgXml xml={square} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <SvgXml xml={captureImage} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={toggleCameraType}
                    style={{
                        alignItems: 'center',
                        marginRight: 10,
                        justifyContent: 'center'
                    }}
                >
                    <SvgXml xml={reload} />
                </TouchableOpacity>
                {/* </View> */}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
    },
    top: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

});