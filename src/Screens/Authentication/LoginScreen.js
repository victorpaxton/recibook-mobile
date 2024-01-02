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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '@/Hooks/authHooks';
import { useStateContext } from '@/Context/StateContext';

import { ActivityIndicator } from 'react-native';

const { height, width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUser, setAccessToken, setRefreshToken } = useStateContext();

  const { loginAPI, loginResponse, isLoginLoading, loginError, refetch } =
    login();

  const signIn = async (e) => {
    e.preventDefault();

    await loginAPI(username, password);
  };

  useEffect(() => {
    if (loginResponse) {
      console.log('loginResponse:' + loginResponse.data);
      setUser(loginResponse.data.user);
      setAccessToken(loginResponse.data.tokens.access.token);
      setRefreshToken(loginResponse.data.tokens.refresh.token);
      console.log(loginResponse.data.user);
      navigation.navigate('Main');
    }
  }, [loginResponse]);

  const register = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      // keyboardVerticalOffset={height}
    >
      <View style={styles.scrollViewContent}>
        <Image
          style={styles.appName}
          source={require('../../Assets/recibook.png')}
        />
        <View style={styles.lottie}>
          <Lottie
            source={require('../../Assets/animation/screen3.json')}
            autoPlay
            loop
          />
        </View>
        <View>
          <Text style={styles.logIn}>Log in</Text>
        </View>

        {isLoginLoading ? (
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

        {loginError ? (
          <Text
            style={{
              color: '#A80027',
              textAlign: 'center',
              paddingBottom: 20,
              fontSize: 16,
            }}
          >
            Wrong email or password!
          </Text>
        ) : (
          <></>
        )}

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email Address"
            onChangeText={(username) => setUsername(username)}
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
        <View>
          <TouchableOpacity style={styles.signInBtn} onPress={signIn}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
              Let’s Snap, Cook and Enjoy !!!
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerView}>
          <Text style={styles.registerQuestion}>
            Don’t you have an account?
          </Text>
          <View width={10}></View>
          <TouchableOpacity onPress={register}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  appName: {
    marginTop: 50,
    height: 45,
    width: width * 0.5,
    marginBottom: 0,
  },
  lottie: {
    marginTop: 0,
    width: '100%',
    height: width * 0.9,
  },
  logIn: {
    fontSize: 24,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  textInput: {
    color: '#E00034',
    height: 50,
    flex: 1,
    paddingLeft: 25,
  },
  signInBtn: {
    marginHorizontal: 36,
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
