import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import MovieCarousel from '../components/MovieCarousel';
import GenreFilter from '../components/GenreFilter';
import { Movie } from '../components/MovieCard';
import { 
  fetchTrendingMovies, 
  fetchTopRatedMovies, 
  fetchPopularMovies, 
  fetchGenres,
  fetchMoviesByGenre,
  mockGenres
} from '../services/tmdbApi';

interface Genre {
  id: number;
  name: string;
}

interface HomePageProps {
  onMovieClick?: (movie: Movie) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onMovieClick }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        
        // Load all movie categories
        const [trending, topRated, popular, genresData] = await Promise.all([
          fetchTrendingMovies(),
          fetchTopRatedMovies(),
          fetchPopularMovies(),
          fetchGenres()
        ]);

        setTrendingMovies(trending.results || []);
        setTopRatedMovies(topRated.results || []);
        setPopularMovies(popular.results || []);
        setGenres(genresData.genres || mockGenres);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading movies:', error);
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    const loadGenreMovies = async () => {
      if (selectedGenre) {
        try {
          const genreMoviesData = await fetchMoviesByGenre(selectedGenre);
          setGenreMovies(genreMoviesData.results || []);
        } catch (error) {
          console.error('Error loading genre movies:', error);
        }
      } else {
        setGenreMovies([]);
      }
    };

    loadGenreMovies();
  }, [selectedGenre]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#F5C518] mx-auto mb-4"></div>
          <div className="text-[#B0B0B0] text-xl">Loading BingeVerse...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Section */}
      <HeroSection movies={trendingMovies.slice(0, 5)} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Movies */}
        <MovieCarousel
          title="Trending Now"
          movies={trendingMovies}
          onMovieClick={onMovieClick}
        />

        {/* Top Rated Movies */}
        <MovieCarousel
          title="Top Rated"
          movies={topRatedMovies}
          onMovieClick={onMovieClick}
        />

        {/* Popular Movies */}
        <MovieCarousel
          title="Popular Movies"
          movies={popularMovies}
          onMovieClick={onMovieClick}
        />

        {/* Genre Filter */}
        <GenreFilter
          genres={genres.slice(0, 10)} // Show first 10 genres
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
        />

        {/* Genre-based Movies */}
        {selectedGenre && genreMovies.length > 0 && (
          <MovieCarousel
            title={`${genres.find(g => g.id === selectedGenre)?.name || 'Selected Genre'} Movies`}
            movies={genreMovies}
            onMovieClick={onMovieClick}
          />
        )}

        {/* Recently Added Section */}
        <div className="mt-12 p-8 bg-[#1F1F1F] rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4 font-['Poppins']">
            Welcome to BingeVerse
          </h2>
          <p className="text-[#B0B0B0] text-lg leading-relaxed mb-6">
            Discover your next favorite movie or TV show with our comprehensive entertainment database. 
            Get detailed information, ratings, reviews, and recommendations all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F5C518] mb-2">10K+</div>
              <div className="text-[#B0B0B0]">Movies & TV Shows</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F5C518] mb-2">50K+</div>
              <div className="text-[#B0B0B0]">User Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F5C518] mb-2">99%</div>
              <div className="text-[#B0B0B0]">Accuracy Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;