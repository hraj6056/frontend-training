import { URL, API_KEY } from "./constants";

const searchMovie = async (
  title: string,
  year: string,
  page = 1
): Promise<IResponse<IMovieList>> => {
  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    s: title,
    y: year,
    page: page?.toString(),
  });

  const response = await fetch(URL + "?" + searchParams).then((res) =>
    res.json()
  );

  return response;
};

export default searchMovie;
