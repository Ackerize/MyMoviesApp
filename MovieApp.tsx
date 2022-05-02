import React from 'react';
import App from './App';
import {MovieProvider} from './src/context/MovieContext';
import {Provider as PaperProvider} from 'react-native-paper';

const MovieApp = () => {
  return (
    <PaperProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </PaperProvider>
  );
};

export default MovieApp;

