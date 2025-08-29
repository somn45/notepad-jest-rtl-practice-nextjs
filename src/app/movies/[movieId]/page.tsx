import { getMovie } from "@/api/getMovie";

export default async function MovieDetail({params}: {params: {movieId: string}}) {
  const {movieId} = await params;
  const {movie} = await getMovie(movieId);
  
  return <div>
    <h2>{movie.title}</h2>
    <img src={movie.medium_cover_image} alt={movie.title} />
  </div>
}