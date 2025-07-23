// TMDb API service - Note: You'll need to get your own API key from https://www.themoviedb.org/
const API_KEY = 'your_api_key_here'; // Replace with your actual TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Mock data for demonstration (replace with actual API calls when you have an API key)
export const mockMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to destroy the remaining criminal organizations that plague the streets."
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    overview: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state."
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_date: "2014-11-07",
    vote_average: 8.6,
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage."
  },
  {
    id: 4,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    release_date: "1999-03-31",
    vote_average: 8.7,
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
  },
  {
    id: 5,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    release_date: "1994-10-14",
    vote_average: 8.9,
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    release_date: "1994-09-23",
    vote_average: 9.3,
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison."
  },
  {
    id: 7,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    release_date: "1999-10-15",
    vote_average: 8.8,
    overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more."
  },
  {
    id: 8,
    title: "Goodfellas",
    poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    release_date: "1990-09-21",
    vote_average: 8.7,
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners."
  }
];

export const mockGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

// API functions (these would make actual API calls when you have an API key)
export const fetchTrendingMovies = async () => {
  // Replace with actual API call: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  return { results: mockMovies };
};

export const fetchTopRatedMovies = async () => {
  // Replace with actual API call: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  return { results: mockMovies.slice(0, 6) };
};

export const fetchPopularMovies = async () => {
  // Replace with actual API call: `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  return { results: mockMovies.slice(2, 8) };
};

export const fetchMoviesByGenre = async (genreId: number) => {
  // Replace with actual API call: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  return { results: mockMovies.slice(0, 4) };
};

export const searchMovies = async (query: string) => {
  // Replace with actual API call: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  const filteredMovies = mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  return { results: filteredMovies };
};

export const fetchGenres = async () => {
  // Replace with actual API call: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  return { genres: mockGenres };
};

export const fetchMovieDetails = async (movieId: number) => {
  // Replace with actual API call: `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  const movie = mockMovies.find(m => m.id === movieId);
  return movie ? {
    ...movie,
    runtime: 148,
    genres: [
      { id: 28, name: 'Action' },
      { id: 80, name: 'Crime' },
      { id: 18, name: 'Drama' }
    ],
    production_companies: [
      { name: 'Warner Bros. Pictures' },
      { name: 'Legendary Entertainment' }
    ]
  } : null;
};