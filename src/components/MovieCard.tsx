import { Card, CardContent, CardActionArea, Typography, Fade } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import noImage from '@/assets/placeholder.png';

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate?: string;
};

export default function MovieCard({
  id,
  title,
  posterPath,
  releaseDate,
}: MovieCardProps) {
  const router = useRouter();

  const imageSrc = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : noImage;

  function handleClick() {
    router.push(`/movie/${id}`);
  }

  return (
    <Fade in timeout={800}>
    <Card
  sx={{
    maxWidth: 200,
    
    transition: 'all 0.25s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-6px) scale(1.03)',
      boxShadow: '0 12px 25px rgba(0,0,0,0.25)',
    },
  }}
>

      <CardActionArea onClick={handleClick}>
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={300}
          loading="lazy"
          style={{ objectFit: 'cover' }}
        />

        <CardContent sx={{ textAlign: 'center' }}>

          <Typography
  variant="subtitle1"
  fontWeight={600}
  noWrap
  sx={{ mt: 1 }}
>

            {title}
          </Typography>

          {releaseDate && (
            <Typography variant="body2" color="text.secondary">
              {new Date(releaseDate).getFullYear()}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
    </Fade>
  );
}
