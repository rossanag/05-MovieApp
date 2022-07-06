import React, {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {MovieDBMoviesResponse, Movie} from '../interfaces/movieInterface';

interface MovieState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MovieState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [], // para evitar el ! en nowPlaying, topRated, etc, siempre habrá algo, aunque sea vacío
  });

  //const [moviesInTh, setMovieInTh] = useState<Movie[]>([]);

  const getMovies = async () => {
    /*  // const respNowPlaying = await movieDB.get<MovieDBMoviesResponse>(
    //   '/now_playing',
    // ); */
    const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');
    const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
    const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');
    /* //await movieDB.get<MovieDBMoviesResponse>('/top-rated');
    //await movieDB.get<MovieDBMoviesResponse>('/upcoming');

    Promise<AxiosResponse<MovieDBMoviesResponse, any> >
    // */
    //const resp =
    const resp = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    //const peliculas = resp.data.results;
    //setMovieInTh(peliculas);
    setMoviesState({
      nowPlaying: resp[0].data.results, //    .data.results,  //resp[0].data.results,
      popular: resp[1].data.results,
      topRated: resp[2].data.results,
      upcoming: resp[3].data.results,
    });

    setIsLoading(false); //ya leyó y están cargados
  };

  useEffect(() => {
    // now playing
    getMovies();
  }, []);

  return {
    ...moviesState, //nowPlaying = movieState.nowPlaying, etc
    isLoading,
  };
};
