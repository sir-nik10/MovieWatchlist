const API_KEY='';
const BASE_URL ='https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ''
    }
  };

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