"use client";

import Link from "next/link";

interface IMovie {
  id: number;
  title: string;
  medium_cover_image: string;
}


export default function GoToMovieDetailLink({movie}: {movie: IMovie}) {
  return (
    <Link href={`/movies/${movie.id}`}>
      {movie.title}
    </Link>
  )
}