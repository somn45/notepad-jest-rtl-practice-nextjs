import { getMovies } from "@/api/getMovies";
import GoToMovieDetailLink from "./GoToMovieDetailLink";

export default async function Home() {
  const {movies} = await getMovies();
  return (
    <section>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <GoToMovieDetailLink movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  );
}
