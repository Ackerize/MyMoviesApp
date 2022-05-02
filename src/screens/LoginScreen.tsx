import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/png/logo.png')} style={styles.logo} />
      </View>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain'
  },
  logoContainer: {
    marginBottom: '-20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
