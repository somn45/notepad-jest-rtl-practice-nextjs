interface IMovie {
  id: number;
  title: string;
  medium_cover_image: string;
}

interface GetMoviesResType {
  data: {
    movies: IMovie[];
  }
}

export const getMovies = async () => {
  const getMoviesResponse = await fetch('https://yts.mx/api/v2/list_movies.json', {
    method: 'GET',
  });
  const {data}: GetMoviesResType = await getMoviesResponse.json();
  return data;
}