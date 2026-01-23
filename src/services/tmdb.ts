import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!apiKey) {
  throw new Error('TMDB API key não definida. Verifique o arquivo .env.local');
}

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'pt-BR',
  },
  timeout: 10000,
});
