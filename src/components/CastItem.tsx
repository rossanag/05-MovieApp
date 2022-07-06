import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Cast} from '../interfaces/creditsInterface';

interface Props {
  actor: Cast;
}

export const CastItem = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
  return (
    <View style={styles.container}>
      {
        //Caso que la foto sea nula
        actor.profile_path && (
          <Image
            source={{uri}}
            style={{width: 50, height: 50, borderRadius: 10}}
          />
        )
      }

      <View style={styles.actorInfo}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{actor.name}</Text>
        <Text style={{fontSize: 16, opacity: 0.7}}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 46,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 12.62,

    elevation: 5,
    marginHorizontal: 20,
    paddingRight: 15,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
});
