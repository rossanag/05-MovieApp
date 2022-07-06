import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '7d28174c407ac00b72bb80996d0aa0ae',              
    language: 'es-ES',
  },
});

export default movieDB;
