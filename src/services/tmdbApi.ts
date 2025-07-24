// TMDb API service - Now using real TMDB API
const API_KEY = 'bb9e6d9150b25668125d8c341996b803';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjllNmQ5MTUwYjI1NjY4MTI1ZDhjMzQxOTk2YjgwMyIsIm5iZiI6MTc1MzM2NDg4OC4yODcwMDAyLCJzdWIiOiI2ODgyMzk5OGQ5ZGExOGU1MTY4YTVmNzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-pQN0dEOmdYKHBFVMVubNxLb3I2LPC0GyijcbGPmeFU';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchFromTMDB = async (endpoint: string, params: Record<string, string | number> = {}) => {
  const url = new URL(BASE_URL + endpoint);
  url.searchParams.append('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch from TMDB');
  }
  return response.json();
};

export const fetchTrendingMovies = async () => {
  return fetchFromTMDB('/trending/movie/week');
};

export const fetchTopRatedMovies = async () => {
  return fetchFromTMDB('/movie/top_rated');
};

export const fetchPopularMovies = async () => {
  return fetchFromTMDB('/movie/popular');
};

export const fetchMoviesByGenre = async (genreId: number) => {
  return fetchFromTMDB('/discover/movie', { with_genres: genreId });
};

export const searchMovies = async (query: string) => {
  return fetchFromTMDB('/search/movie', { query });
};

export const fetchGenres = async () => {
  return fetchFromTMDB('/genre/movie/list');
};

export const fetchMovieDetails = async (movieId: number) => {
  return fetchFromTMDB(`/movie/${movieId}`);
};