interface IMovie {
  id: number;
  title: string;
  medium_cover_image: string;
}

interface GetMovieDetailResType {
  data: {
    movie: IMovie;
  }
}


export const getMovie = async (movieId: string) => {
  const getMovieDetailResponse = await fetch(`https://yts.mx/api/v2/movie_details.json?${new URLSearchParams({
    movie_id: movieId,
  })}`, {
    method: "GET",
  })
  const {data}: GetMovieDetailResType = await getMovieDetailResponse.json();
  return data;
}