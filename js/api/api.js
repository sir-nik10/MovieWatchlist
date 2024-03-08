const API_KEY='api_key=e0d8305ad7128f765581ce0c1fe69b44';
const BASE_URL ='https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ4MzA1YWQ3MTI4Zjc2NTU4MWNlMGMxZmU2OWI0NCIsInN1YiI6IjY1YmI0MjY1ZjAzMTc0MDE2MzY2ZmJlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b6HFP9ig1GZf1swsewoWzQOboCpm9Y9l7wSeQp5Qv2c'
    }
  };
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
export async function fetchMovies(title) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,options);

      if (!response.ok) {
          throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log("getting response from api.."); //list of movie results
      return data.results;
  } catch (error) {
      console.error("error: " + error);
      throw error;
  }
}