import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { getMovies } from "@/api/getMovies";
import { FAKE_MOVIES } from "@/constants/fakeData";

jest.mock("../src/api/getMovies");

describe("서버 컴포넌트", () => {
  it("영화 목록 데이터 fetching 후 영화 제목이 브라우저에 출력되었는가?", async () => {
    (getMovies as jest.Mock).mockResolvedValue({
      movies: FAKE_MOVIES,
    })

    const MoviesComponentUI = await Home();
    render(MoviesComponentUI);

    const movielist = await screen.findByRole("list");
    const moviesUI = within(movielist).getAllByRole("listitem");
    
    expect(moviesUI[1]).toBeInTheDocument();
    expect(moviesUI[1]).toHaveTextContent(FAKE_MOVIES[1].title)
  })
})