import MovieCard from '@/components/MovieCard';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <MovieCard
        title="Filme de Teste"
        posterPath={null}
        releaseDate="2024-01-01"
      />
    </div>
  );
}
