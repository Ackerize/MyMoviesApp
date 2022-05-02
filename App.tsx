import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Navigation} from './src/navigation/Navigation';
import SplashScreen from './src/screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MovieContext, MovieProvider} from './src/context/MovieContext';

const App = () => {
  const {updateToken, loading} = useContext(MovieContext);

  useEffect(() => {
    const getToken = async () => {
      const tokenStorage = await AsyncStorage.getItem('@movie:token');
      updateToken(tokenStorage || '');
    };
    getToken();
  }, []);

  return (
      <NavigationContainer>
        {!loading ? <SplashScreen /> : <Navigation />}
      </NavigationContainer>

  );
};

const styles = StyleSheet.create({});

export default App;
