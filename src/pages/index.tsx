import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import MovieCard from '@/components/MovieCard';
import { tmdbApi } from '@/services/tmdb';
import { Movie } from '@/types/movie';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await tmdbApi.get('/movie/popular');
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={10}>
        Erro ao carregar filmes. Tente novamente mais tarde.
      </Typography>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      gap={2}
      p={2}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
        />
      ))}
    </Box>
  );
}
