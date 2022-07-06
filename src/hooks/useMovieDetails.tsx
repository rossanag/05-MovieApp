import {useState, useEffect} from 'react';
import movieDB from '../api/movieDB';
import {MovieCredits, Cast} from '../interfaces/creditsInterface';
import {MovieFullData} from '../interfaces/movieInterface';

interface MovieDetails {
  isLoading: boolean;
  movieData: MovieFullData;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieData: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<MovieFullData>(`/${movieId}`);
    const castPromise = movieDB.get<MovieCredits>(`/${movieId}/credits`);

    const [movieDetailResp, castPromiseResp] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      movieData: movieDetailResp.data,
      cast: castPromiseResp.data.cast
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state
  };
};
