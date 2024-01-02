import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const registerUser = () => {
  const [registerResponse, setRegisterResponse] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const registerUserAPI = useCallback(async (username, email, password) => {
    setIsRegisterLoading(true);

    try {
      const options = {
        method: 'POST',
        url: 'https://recibook-be-production.up.railway.app/recibook-service/auth/register-v2',
        data: {
          name: username,
          email: email,
          password: password,
        },
      };
      const response = await axios.request(options);
      setRegisterResponse(response.data);
      setIsRegisterLoading(false);
    } catch (error) {
      setRegisterError(error);
      console.log(error);
    } finally {
      setIsRegisterLoading(false);
    }
  }, []);

  const refetch = () => {
    setIsRegisterLoading(true);
    registerUserAPI();
  };

  return {
    registerUserAPI,
    registerResponse,
    isRegisterLoading,
    registerError,
    refetch,
  };
};

const login = () => {
  const [loginResponse, setLoginResponse] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const loginAPI = useCallback(async (email, password) => {
    setIsLoginLoading(true);

    try {
      const options = {
        method: 'POST',
        url: 'https://recibook-be-production.up.railway.app/recibook-service/auth/login',
        data: {
          email: email,
          password: password,
        },
      };
      const response = await axios.request(options);
      setLoginResponse(response.data);
      setIsLoginLoading(false);
    } catch (error) {
      setLoginError(error);
      console.log(error);
    } finally {
      setIsLoginLoading(false);
    }
  }, []);

  const refetch = () => {
    setIsLoginLoading(true);
    loginAPI();
  };

  return {
    loginAPI,
    loginResponse,
    isLoginLoading,
    loginError,
    refetch,
  };
};

export { registerUser, login };
