import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import movieDB from '../api/movieDB';
import MovieCard from '../components/MovieCard';
import {MovieContext} from '../context/MovieContext';
import {Movie, MovieDBResponse} from '../interfaces/movieInterface';
import {RootStackParams} from '../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'> {}

const SearchScreen = ({navigation}: Props) => {
  const {searchValue, setSearchValue} = useContext(MovieContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const {
          data: {results, total_pages},
        } = await movieDB.get<MovieDBResponse>('search/movie', {
          params: {
            page,
            query: searchValue,
          },
        });
        if (page < total_pages) {
          setMovies([...movies, ...results]);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          // 👇️ error: AxiosError<any, any>
          console.log(error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      }
    };
    getPopularMovies();
  }, [page]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Boton para cerrar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
            setSearchValue('');
          }}>
          <Icon color="black" name="arrow-back-outline" size={50} />
        </TouchableOpacity>
      </View>
      {movies.length > 0 && (
        <View style={styles.popular}>
          <Title style={styles.popularTitle}>Searching "{searchValue}"</Title>
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </View>
      )}
      {showMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{color: '#000'}}
          onPress={() => setPage(page + 1)}>
          Load more...
        </Button>
      )}
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  popular: {
    marginVertical: 10,
  },
  popularTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    width: '90%',
  },
  navbar: {},
});
