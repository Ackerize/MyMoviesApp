import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import movieDB from '../api/movieDB';
import {Movie, MovieDBResponse} from '../interfaces/movieInterface';
import {Text, Title, Button} from 'react-native-paper';
import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const {
          data: {results, total_pages},
        } = await movieDB.get<MovieDBResponse>('/popular', {
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
});
