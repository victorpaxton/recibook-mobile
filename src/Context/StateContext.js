import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
