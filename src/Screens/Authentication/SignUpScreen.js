import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useStateContext } from '@/Context/StateContext';

import { registerUser } from '@/Hooks/authHooks';

import { ActivityIndicator } from 'react-native';
import SnackBar from 'react-native-snackbar-component';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { accessToken, setAccessToken, setRefreshToken, setUser } =
    useStateContext();

  const {
    registerUserAPI,
    registerResponse,
    isRegisterLoading,
    registerError,
    refetch,
  } = registerUser();

  const signUp = async (e) => {
    e.preventDefault();

    await registerUserAPI(username, email, password);
  };

  useEffect(() => {
    if (registerResponse) {
      console.log(registerResponse);
      // console.log(registerResponse.data.tokens);

      setAccessToken(registerResponse.data.tokens.access.token);
      setRefreshToken(registerResponse.data.tokens.refresh.token);
      setUser(registerResponse.data.user);

      console.log(accessToken);

      navigation.navigate('Main');
    }
  }, [registerResponse]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text style={styles.signUpText}>Register</Text>
        </View>

        {isRegisterLoading ? (
          <>
            <ActivityIndicator size="large" color="black" style={{}} />
            <Text
              style={{
                color: '#A80027',
                textAlign: 'center',
                paddingBottom: 20,
                fontSize: 14,
              }}
            >
              Please wait...
            </Text>
          </>
        ) : (
          <></>
        )}

        {registerError ? (
          <Text
            style={{
              color: '#A80027',
              textAlign: 'center',
              paddingBottom: 20,
              fontSize: 16,
            }}
          >
            Email already in use!
          </Text>
        ) : (
          <></>
        )}

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email Address"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.signUpBtn} onPress={signUp}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
              Let’s explore Recibook now !!
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lottie}>
          <Lottie
            source={require('../../Assets/animation/screen1.json')}
            autoPlay
            loop
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    alignItems: 'center',
  },
  lottie: {
    marginTop: 0,
    width: '100%',
    height: width * 0.9,
  },
  signUpText: {
    fontSize: 24,
    fontWeight: '400',
    height: 32,
    marginBottom: 20,
    marginTop: 50,
  },
  inputView: {
    backgroundColor: '#FFF',
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    width: '70%',
    height: 45,
    marginBottom: 13,
  },
  textInput: {
    color: '#E00034',
    height: 50,
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  signUpBtn: {
    marginTop: 17,
    backgroundColor: '#A80027',
    borderRadius: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
    width: 306,
    height: 49,
  },
  registerView: {
    paddingTop: 12,
    flexDirection: 'row',
  },
  registerQuestion: {
    height: 30,
    marginBottom: 30,
    fontStyle: 'italic',
  },
  registerText: {
    color: '#FF1A51',
    fontStyle: 'italic',

    textShadowColor: 'rgba(0, 0, 0, 0.25)', // color of the text shadow
    textShadowOffset: { width: 0, height: 4 }, // offset of the text shadow
    textShadowRadius: 5, // radius of the text shadow
  },
});
