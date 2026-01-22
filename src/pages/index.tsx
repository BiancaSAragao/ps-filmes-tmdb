import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import MovieCard from '@/components/MovieCard';
import { tmdbApi } from '@/services/tmdb';
import { Movie } from '@/types/movie';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');

  function showToast(message: string, type: 'success' | 'error' | 'warning') {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  }

  // Buscar filmes populares ao carregar a página
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await tmdbApi.get('/movie/popular');
        setMovies(response.data.results);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  // Buscar filmes pelo campo de busca
  async function handleSearch() {
    if (!search.trim()) {
      showToast('Digite algo para buscar um filme.', 'warning');
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const response = await tmdbApi.get('/search/movie', {
        params: { query: search },
      });

      setMovies(response.data.results);

      if (response.data.results.length === 0) {
        showToast('Nenhum filme encontrado.', 'warning');
      }
    } catch {
      setError(true);
      showToast('Erro ao buscar filmes.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      {/* Campo de busca */}
      <Box display="flex" gap={2} p={2}>
        <TextField
          label="Buscar filme"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      )}

      {/* Erro */}
      {error && (
        <Typography color="error" textAlign="center" mt={10}>
          Erro ao carregar filmes. Tente novamente mais tarde.
        </Typography>
      )}

      {/* Lista de filmes */}
      {!loading && !error && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={2}
          p={2}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
            />
          ))}
        </Box>
      )}

      {/* Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toastType} onClose={() => setToastOpen(false)}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
