import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Cast} from '../interfaces/creditsInterface';
import {MovieFullData} from '../interfaces/movieInterface';
import currencyFormatter from 'currency-formatter';
import {CastItem} from './CastItem';

interface Props {
  movieData: MovieFullData;
  cast: Cast[];
}

export const MovieDetails = ({movieData, cast}: Props) => {
  return (
    <>
      {/* Detalles */}
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" color="grey" size={16} />
          <Text> {movieData.vote_average}</Text>
          <Text style={{marginLeft: 5}}>
            - {movieData.genres.map(g => g.name).join(', ')}
          </Text>
        </View>

        {/* Historia */}
        <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
          Historia
        </Text>
        <Text style={{fontSize: 16}}>{movieData.overview}</Text>
        {/* Presupuesto */}
        <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
          Presupuesto
        </Text>

        <Text style={{fontSize: 16}}>
          {currencyFormatter.format(movieData.budget, {code: 'USD'})}
        </Text>
      </View>

      {/* Cast */}
      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Actores
        </Text>

        <FlatList
          data={cast}
          keyExtractor={ (item) => item.id.toString()}
          renderItem={ ({item}) => <CastItem actor={item} />}
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 70}}
        />

        {/* <CastItem actor={cast[0]}/> */}
      </View>
    </>
  );
};
