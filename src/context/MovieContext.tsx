import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type tokenType = string | null;

interface ContextProps {
  token: tokenType;
  updateToken: (token: string) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const MovieContext = createContext({} as ContextProps);

export const MovieProvider = ({children}: any) => {
  const [token, setToken] = useState<tokenType>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateToken = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('@movie:token', newToken);
      setToken(newToken);
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        token,
        updateToken,
        loading,
        setLoading,
      }}>

      {children}
      
    </MovieContext.Provider>
  );
};
