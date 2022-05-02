import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import movieDB from '../api/movieDB';
import {Movie, MovieDBResponse} from '../interfaces/movieInterface';
import {Searchbar, Title, Button} from 'react-native-paper';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

const HomeScreen = ({ navigation } : Props) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { searchValue, setSearchValue } = useContext(MovieContext);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const {
          data: {results, total_pages},
        } = await movieDB.get<MovieDBResponse>('/movie/popular', {
          params: {
            page,
          },
        });
        if (page < total_pages) {
          setPopularMovies([...popularMovies, ...results]);
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

  useEffect(() => {
    if(searchValue.length > 0) {
      setSearchValue('');
    }
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Searchbar
        placeholder="Search"
        icon="magnify"
        value={searchValue}
        style={styles.input}
        onChangeText={setSearchValue}
        onIconPress={() => {
          navigation.navigate('SearchScreen');
        }}
      />

      {popularMovies.length > 0 && (
        <View style={styles.popular}>
          <Title style={styles.popularTitle}>Popular movies</Title>
          {popularMovies.map((movie: Movie) => (
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

export default HomeScreen;

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
    width: '90%'
  },
});
