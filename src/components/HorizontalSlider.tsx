import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {Movie} from '../interfaces/movieInterface';
import {MoviePoster} from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View
      style={{
        height: title ? 180 : 120,
      }}>
      {title && (
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 5}}>
          {title}
        </Text>
      )}

      <FlatList
        data={movies}
        renderItem={({item}: any) => (
          <MoviePoster movie={item} width={80} height={95} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
