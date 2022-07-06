import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../navigation/Navigation';

//import Icon from 'react-native-vector-icons/Ionicons';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {MovieDetails} from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {} //me permite importar la route, el navigator, etc
//Es buena práctica señalar qué viene en las props
export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {isLoading, movieData, cast} = useMovieDetails(movie.id);

  useMovieDetails(movie.id);

  //console.log(movie.id);

  //console.log(movie.title);
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          {/* <Text>Detail Screen</Text> */}
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={20} color="grey" style={{marginTop: 20}} />
      ) : (
        <MovieDetails movieData={movieData!} cast={cast} />
      )}

      {/* Botón para cerrar */}
      <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.pop()}
      >
        <Icon color="white" name="arrow-back-outline" size={70} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    height: screenHeight * 0.7,
    paddingBottom: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 12.62,

    elevation: 9,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  posterImage: {
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  marginContainer: {
    marginHorizontal: 20,
    margingTop: 20,
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
});
