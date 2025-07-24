import React, { useState, useEffect } from 'react';
import { ArrowLeft, Grid, List } from 'lucide-react';
import MovieCard, { Movie } from '../components/MovieCard';
import { fetchGenres, fetchMoviesByGenre } from '../services/tmdbApi';

interface Genre {
  id: number;
  name: string;
}

interface GenresPageProps {
  onMovieClick?: (movie: Movie) => void;
  onBack: () => void;
}

const GenresPage: React.FC<GenresPageProps> = ({ onMovieClick, onBack }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoading(true);
        const genresData = await fetchGenres();
        const genresList = genresData.genres || [];
        setGenres(genresList);
        
        // Select first genre by default
        if (genresList.length > 0) {
          setSelectedGenre(genresList[0]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading genres:', error);
        setGenres([]);
        if ([].length > 0) {
          setSelectedGenre([][0]);
        }
        setIsLoading(false);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadGenreMovies = async () => {
      if (!selectedGenre) return;

      try {
        setIsLoadingMovies(true);
        const moviesData = await fetchMoviesByGenre(selectedGenre.id);
        setGenreMovies(moviesData.results || []);
        setIsLoadingMovies(false);
      } catch (error) {
        console.error('Error loading genre movies:', error);
        setGenreMovies([]);
        setIsLoadingMovies(false);
      }
    };

    loadGenreMovies();
  }, [selectedGenre]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#F5C518] mx-auto mb-4"></div>
          <div className="text-[#B0B0B0] text-xl">Loading genres...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#1F1F1F] border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-[#B0B0B0] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              
              <h1 className="text-3xl font-bold text-white font-['Poppins']">
                Browse by Genre
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-[#F5C518] text-black' 
                    : 'text-[#B0B0B0] hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-[#F5C518] text-black' 
                    : 'text-[#B0B0B0] hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Genre Sidebar */}
          <div className="lg:w-80">
            <div className="bg-[#1F1F1F] rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4 font-['Poppins']">
                All Genres
              </h2>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedGenre?.id === genre.id
                        ? 'bg-[#F5C518] text-black font-semibold'
                        : 'text-[#B0B0B0] hover:bg-[#333] hover:text-white'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="flex-1">
            {selectedGenre && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 font-['Poppins']">
                  {selectedGenre.name} Movies
                </h2>
                <p className="text-[#B0B0B0]">
                  Discover the best {selectedGenre.name.toLowerCase()} movies
                </p>
              </div>
            )}

            {isLoadingMovies ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5C518] mx-auto mb-4"></div>
                  <div className="text-[#B0B0B0]">Loading movies...</div>
                </div>
              </div>
            ) : genreMovies.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
                  : 'space-y-4'
              }`}>
                {genreMovies.map((movie) => (
                  viewMode === 'grid' ? (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => onMovieClick?.(movie)}
                      size="small"
                    />
                  ) : (
                    <div
                      key={movie.id}
                      onClick={() => onMovieClick?.(movie)}
                      className="flex items-center space-x-4 bg-[#1F1F1F] rounded-lg p-4 hover:bg-[#333] transition-colors cursor-pointer"
                    >
                      <img
                        src={movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` 
                          : 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg'
                        }
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {movie.title}
                        </h3>
                        <p className="text-[#B0B0B0] text-sm mb-2">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                        </p>
                        <p className="text-[#B0B0B0] text-sm line-clamp-2">
                          {movie.overview}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          <span className="text-[#FFD700]">★</span>
                          <span className="text-white font-semibold">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-[#B0B0B0] text-xl mb-4">
                  No movies found for this genre
                </div>
                <p className="text-[#B0B0B0]">
                  Try selecting a different genre from the sidebar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenresPage;