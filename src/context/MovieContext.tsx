import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import movieDB from '../api/movieDB';
import { MovieDBResponse } from '../interfaces/movieInterface';
import axios from 'axios';

type tokenType = string | null;

interface ContextProps {
  token: tokenType;
  updateToken: (token: string) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const MovieContext = createContext({} as ContextProps);

export const MovieProvider = ({children}: any) => {
  const [token, setToken] = useState<tokenType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

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
        searchValue,
        setSearchValue,
      }}>

      {children}
      
    </MovieContext.Provider>
  );
};
