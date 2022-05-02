import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Rating} from 'react-native-ratings';

interface MovieRatingProps {
    voteAverage: number;
    voteCount: number;
}

const MovieRating = ({ voteAverage, voteCount } : MovieRatingProps) => {
  const media = voteAverage / 2;
  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={require('../assets/png/starLight.png')}
        ratingColor="#ffc205"
        ratingBackgroundColor={'#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
      />
      <Text>{ voteCount } votes</Text>
    </View>
  );
};

export default MovieRating;

const styles = StyleSheet.create({
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
});
