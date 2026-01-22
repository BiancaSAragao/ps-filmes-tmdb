import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
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
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea onClick={handleClick}>
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={300}
          style={{ objectFit: 'cover' }}
        />

        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
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
  );
}
