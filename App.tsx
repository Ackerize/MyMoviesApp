import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';


const App = () => {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <SplashScreen />
    );
  } else {
    return (
      <SafeAreaView>
        <Text>My Movies</Text>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  
});

export default App;
