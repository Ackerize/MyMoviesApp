import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParams} from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import movieDB from '../api/movieDB';
import {Movie, MovieDBResponse, MovieDetails} from '../interfaces/movieInterface';
import axios from 'axios';
import CarouselHorizontal from '../components/CarouselHorizontal';
import MovieRating from '../components/MovieRating';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSimilarMovies = async () => {
      try {
        const {
          data: {results},
        } = await movieDB.get<MovieDBResponse>(`/movie/${movie.id}/similar`);
        setRelatedMovies(results);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          console.log(error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      }
    };
    getSimilarMovies();
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const {
          data,
        } = await movieDB.get<MovieDetails>(`/movie/${movie.id}`);
        setMovieDetails(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          console.log(error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      }
    };
    getDetails();
  }, []);

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.marginContainer}>
      <Text style={styles.subTitle}>{movieDetails?.genres.map( g => g.name ).join(', ')}</Text>
        <Text style={styles.title}>{movie.title}</Text>
        
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.overview}</Text>
        <MovieRating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
      </View>

      <View style={styles.similarContainer}>
        {loading ? (
          <ActivityIndicator size={35} color="grey" style={{marginTop: 20}} />
        ) : (
          <>
          <Text style={styles.similarLabel}>Similar movies</Text>
            <CarouselHorizontal data={relatedMovies} />
          </>
        )}
      </View>

      {/* Boton para cerrar */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon color="white" name="arrow-back-outline" size={60} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },

  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
  similarContainer: {
    marginVertical: 20,
  },
  similarLabel : {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
  }
});
