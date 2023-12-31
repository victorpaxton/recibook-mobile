import { Camera, CameraType } from 'expo-camera';
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { reload } from '../Assets/Icons/reload';
import { flash_off } from '@/Assets/Icons/flash';
import { captureImage, send } from '@/Assets/Icons/captureImage';
import { square } from '@/Assets/Icons/square';
import { xmark } from '@/Assets/Icons/xmark';
import { arrow_left } from '@/Assets/Icons/arrow-left';


let camera

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

    const [startCamera, setStartCamera] = React.useState(false)
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const [capturedImage, setCapturedImage] = React.useState(null)
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
    const [flashMode, setFlashMode] = React.useState("off")

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        console.log(status)
        if (status === "granted") {
            setStartCamera(true)
        } else {
            Alert.alert("Access denied")
        }
    }
    const __takePicture = async () => {
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }
    const __savePhoto = () => { }
    const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
    }
    const __handleFlashMode = () => {
        if (flashMode === "on") {
            setFlashMode("off")
        } else if (flashMode === "off") {
            setFlashMode("on")
        } else {
            setFlashMode("auto")
        }
        console.log(flashMode)
    }
    const __switchCamera = () => {
        if (cameraType === "back") {
            setCameraType("front")
        } else {
            setCameraType("back")
        }
    }



    return (
        <View style={styles.container}>
            {(previewVisible && capturedImage) ?
                (<CameraPreview
                    photo={capturedImage}
                    savePhoto={__savePhoto}
                    retakePicture={__retakePicture}
                />) :
                (<Camera
                    style={styles.camera}
                    type={cameraType}
                    flashMode={flashMode}
                    ref={r => {
                        camera = r
                    }}
                >
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
                            onPress={__handleFlashMode}>
                            <SvgXml xml={flash_off} />
                        </TouchableOpacity>
                    </View>
                </Camera>
                )}

            {(previewVisible && capturedImage) ?
                (<View />) :
                (<View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                        onPress={__takePicture}
                    >
                        <SvgXml xml={captureImage} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={__switchCamera}
                        style={{
                            alignItems: 'center',
                            marginRight: 10,
                            justifyContent: 'center', 
                        }}
                    >
                        <SvgXml xml={reload} />
                    </TouchableOpacity>
                </View>)
            }

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

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
    console.log("sdsfds", photo)
    return (
        <View
            style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%"
            }}
        >
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1
                }}
            >
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            flex: 1
                        }}
                    >
                        <TouchableOpacity
                            onPress={retakePicture}
                            style={{
                                width: 50,
                                height: 50,
                                padding: 20,
                                alignItems: "flex-start",
                                borderRadius: 4,
                                flex: 1
                            }}
                        >
                            <SvgXml xml={arrow_left} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={savePhoto}
                            style={{
                                width: 130,
                                height: 130,
                                marginLeft: 270,
                                alignItems: "flex-end",
                                justifyContent: 'flex-end',
                                borderRadius: 4,
                                flex: 1
                            }}
                        >
                            <SvgXml xml={send} />

                        </TouchableOpacity>
                    </View>
            </ImageBackground>
        </View>
    )
}
