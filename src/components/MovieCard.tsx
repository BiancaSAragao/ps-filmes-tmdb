import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import Image from 'next/image';
import noImage from '@/assets/placeholder.png';

type MovieCardProps = {
  title: string;
  posterPath: string | null;
  releaseDate?: string;
  onClick?: () => void;
};

export default function MovieCard({
  title,
  posterPath,
  releaseDate,
  onClick,
}: MovieCardProps) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea onClick={onClick}>
        <Image
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : noImage
          }
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
