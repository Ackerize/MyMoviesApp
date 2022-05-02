import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Image, StatusBar} from 'react-native';
import {IconButton, Text, Title} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

const DetailScreen = ({ route, navigation }: Props) => {
    return (
        <>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieTitle movie={movie} />
        <MovieRating
          voteCount={movie.vote_count}
          voteAverage={movie.vote_average}
        />
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, {marginBottom: 20}]}>
          Fecha de lanzamiento: {movie.release_date}
        </Text>
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
    )
}

export default DetailScreen

const styles = StyleSheet.create({})
