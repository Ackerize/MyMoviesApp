import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
      <SafeAreaView style={styles.splash}>
        <View style={styles.splashContainer}>
          <LottieView
            source={require('../assets/movie.json')}
            autoPlay
            loop={false}
            style={styles.splashAnimation}
            resizeMode="cover"
            onAnimationFinish={() => {
              console.log('animation finished');
              // setLoaded(true);
            }}
          />
        </View>
        <Text>My Movies</Text>
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
  },
  text: {
    alignItems: 'center',
    marginTop: 100,
    fontWeight: 'bold',
  },
  splashAnimation: {
    width: '65%',
  },
  splashContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
