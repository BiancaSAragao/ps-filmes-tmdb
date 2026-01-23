import { Card, CardContent, Skeleton } from '@mui/material';

export default function MovieCardSkeleton() {
  return (
    <Card sx={{ width: 200 }}>
      <Skeleton variant="rectangular" width={200} height={300} animation="wave" />
      <CardContent>
        <Skeleton width="80%" animation="wave" />
        <Skeleton width="40%" animation="wave" />
      </CardContent>
    </Card>
  );
}
