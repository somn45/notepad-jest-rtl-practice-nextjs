import { getMovies } from "@/api/getMovies";

export default async function Home() {
  const {movies} = await getMovies();
  return (
    <section>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title}
          </li>

        ))}
      </ul>
    </section>
  );
}
