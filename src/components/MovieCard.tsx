import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Title} from 'react-native-paper';
import {Movie} from '../interfaces/movieInterface';
import {RootStackParams} from '../navigation/Navigation';
import MovieRating from './MovieRating';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({movie}: MovieCardProps) => {
  const {vote_average, title, poster_path, release_date, overview, vote_count} =
    movie;

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const onNavigation = () => {
    // navigation.navigate('DetailScreen', movie);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onNavigation}>
        <View style={styles.movie}>
          <View style={styles.left}>
            <Image
              style={styles.image}
              source={
                poster_path
                  ? {uri: `https://image.tmdb.org/t/p/w500${poster_path}`}
                  : require('../assets/png/default-image.png')
              }
            />
          </View>
          <View style={{flexShrink: 1}}>
            <Title style={styles.text}>{title}</Title>
            <Text style={styles.text}>{release_date}</Text>
            <Text style={styles.text}>{overview}</Text>
            <MovieRating voteAverage={vote_average} voteCount={vote_count} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          width: '90%',
          flex: 1,
          alignSelf: 'center',
        }}
      />
    </>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movie: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  left: {
    paddingRight: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  text: {
    flexShrink: 1,
  },
});
