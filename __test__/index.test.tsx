import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("서버 컴포넌트", () => {
  it("서버 컴포넌트의 h1 요소 검사", () => {
    render(<Home />)

    const heading1 = screen.getByRole('heading', {level: 1});
    expect(heading1).toHaveTextContent("서버 컴포넌트입니다.")
  })
})