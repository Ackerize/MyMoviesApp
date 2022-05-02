import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { Movie } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/Navigation';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

interface CarouselHorizontalProps {
    data: Movie[];
  }
  
  interface RenderItemProps {
    data: {item: Movie};
  }

const CarouselHorizontal = ({data} : CarouselHorizontalProps) => {
  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={(item) => <RenderItem data={item} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      firstItem={1}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  );
};

const RenderItem = ({data}: RenderItemProps) => {
  const {id, title, poster_path} = data.item;
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const onNavigation = () => {
    navigation.navigate('DetailScreen', data.item);
  };
  
  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Title style={styles.title} numberOfLines={1}> {title} </Title>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CarouselHorizontal;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '85%',
    height: 170,
    borderRadius: 20,
  },
  title: {
      marginHorizontal: 10,
      marginTop: 10,
      fontSize: 16,
  }
});