//import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
//import ImageColors from 'react-native-image-colors';
//import {MovieDBNowPlaying, Movie} from '../interfaces/movieInterface';
import {getImageColors} from '../helpers/getColores';
import {GradientContext} from '../context/GradientContext';
//import SplashScreen from 'react-native-splash-screen'


const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  //const navigation = useNavigation();

  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  const {setMainColors} = useContext(GradientContext);

//   useEffect(() => {
//     SplashScreen.hide();
//   },[])

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    //console.log(colors)
    const [primary = 'green', secondary = 'blue'] = await getImageColors(uri);
    setMainColors({primary: primary, secondary: secondary});
    //console.log([primary, secondary])
  };


  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  //console.log(moviesInTh[1]?.title);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={60} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/*Carousel ppal */}
          <View
            style={{
              width: 300,
              height: 420,
            }}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.5}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          {/* Películas populares */}
          {/* <HorizontalSlider title="En cine" movies={moviesInTh} />                 */}
          <HorizontalSlider title="Popular" movies={popular} />
          <HorizontalSlider title="Top rated" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
