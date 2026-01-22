import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import Image from 'next/image';
import { tmdbApi } from '@/services/tmdb';
import noImage from '@/assets/placeholder.png';

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
};

export default function MovieDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchMovie() {
      try {
        const response = await tmdbApi.get(`/movie/${id}`);
        setMovie(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Typography color="error" textAlign="center" mt={10}>
        Erro ao carregar detalhes do filme.
      </Typography>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Grid container spacing={4} justifyContent="center">

        {/* Poster */}
        <Grid size={{ xs: 12, md: 4 }} display="flex" justifyContent="center">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : noImage
            }
            alt={movie.title}
            width={300}
            height={450}
            style={{
              borderRadius: 12,
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          />
        </Grid>

        {/* Informações */}
        <Grid
          size={{ xs: 12, md: 8 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {movie.release_date?.slice(0, 4)} • {movie.runtime} min
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap" my={2} justifyContent="center">
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} />
            ))}
          </Box>

          <Divider sx={{ my: 2, width: '100%' }} />

          <Typography variant="h6" gutterBottom>
            Sinopse
          </Typography>

          <Typography variant="body1" lineHeight={1.7} maxWidth={700}>
            {movie.overview || 'Sinopse não disponível.'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
