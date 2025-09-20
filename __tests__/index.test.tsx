import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { getMovies } from "@/api/getMovies";
import { FAKE_MOVIES } from "@/constants/fakeData";
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import MovieDetail from "@/app/movies/[movieId]/page";
import { getMovie } from "@/api/getMovie";

jest.mock("../src/api/getMovies");
jest.mock("../src/api/getMovie");

describe("서버 컴포넌트", () => {
  it("영화 목록 데이터 fetching 후 영화 제목이 브라우저에 출력되었는가?", async () => {
    (getMovies as jest.Mock).mockResolvedValue({
      movies: FAKE_MOVIES,
    });

    (getMovie as jest.Mock).mockResolvedValue({
      movie: FAKE_MOVIES[1],
    });

    const MoviesComponentUI = await Home();
    render(MoviesComponentUI, {wrapper: MemoryRouterProvider});

    const movielist = await screen.findByRole("list");
    const moviesLink = within(movielist).getAllByRole("link");

    fireEvent.click(moviesLink[1]);

    const MovieDetailUI = await MovieDetail({params: {movieId: String(FAKE_MOVIES[1].id)} })
    render(MovieDetailUI, {wrapper: MemoryRouterProvider});

    expect(mockRouter.asPath).toEqual(`/movies/${FAKE_MOVIES[1].id}`)

    const movieTitle = screen.getByRole("heading", {level: 2});
    const movieCoverImage = screen.getByRole("img");
    
    expect(movieTitle).toHaveTextContent(FAKE_MOVIES[1].title);
    expect(movieCoverImage).toHaveAttribute("src", FAKE_MOVIES[1].medium_cover_image);
    expect(movieCoverImage).toHaveAttribute("alt", FAKE_MOVIES[1].title);
  })
})