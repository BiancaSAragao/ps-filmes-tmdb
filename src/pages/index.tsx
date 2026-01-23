import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import MovieCard from '@/components/MovieCard';
import { tmdbApi } from '@/services/tmdb';
import { Movie } from '@/types/movie';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';


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
  <Box p={2} mb={2}>
    <Grid container spacing={3}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Grid
          key={index}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          display="flex"
          justifyContent="center"
        >
          <MovieCardSkeleton />
        </Grid>
      ))}
    </Grid>
  </Box>
)}



      {/* Erro */}
      {error && (
        <Typography color="error" textAlign="center" mt={10}>
          Erro ao carregar filmes. Tente novamente mais tarde.
        </Typography>
      )}

      {/* Lista de filmes (Grid v2) */}
      {!loading && !error && (
        <Grid container spacing={3} p={2}>
          {movies.map((movie) => (
            <Grid
              key={movie.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              display="flex"
              justifyContent="center"
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
              />
            </Grid>
          ))}
        </Grid>
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
