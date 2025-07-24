import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import MovieCard, { Movie } from '../components/MovieCard';
import { searchMovies, fetchGenres } from '../services/tmdbApi';

interface SearchPageProps {
  initialQuery?: string;
  onMovieClick?: (movie: Movie) => void;
  onBack: () => void;
}

interface Genre {
  id: number;
  name: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ 
  initialQuery = '', 
  onMovieClick,
  onBack 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'date'>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData.genres || []);
      } catch (error) {
        console.error('Error loading genres:', error);
        setGenres([]);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      let movies = results.results || [];

      // Apply genre filter
      if (selectedGenre) {
        movies = movies.filter(movie => 
          movie.genre_ids?.includes(selectedGenre)
        );
      }

      // Apply sorting
      movies = sortMovies(movies, sortBy);

      setSearchResults(movies);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const sortMovies = (movies: Movie[], sortType: string) => {
    switch (sortType) {
      case 'rating':
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case 'date':
        return [...movies].sort((a, b) => 
          new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime()
        );
      default:
        return movies;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const clearFilters = () => {
    setSelectedGenre(null);
    setSortBy('relevance');
    if (query) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#1F1F1F] border-b border-[#333] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="text-[#B0B0B0] hover:text-white transition-colors"
            >
              ← Back to Home
            </button>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-[#B0B0B0] hover:text-white transition-colors lg:hidden"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, TV shows, actors..."
              className="w-full bg-[#121212] text-white px-6 py-4 pl-12 pr-16 rounded-lg border border-[#333] focus:outline-none focus:border-[#F5C518] transition-colors text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#B0B0B0]" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#d40812] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-[#1F1F1F] rounded-lg p-6 sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold font-['Poppins']">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-[#B0B0B0] hover:text-white transition-colors text-sm"
                >
                  Clear All
                </button>
              </div>

              {/* Genre Filter */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Genre</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="genre"
                      checked={selectedGenre === null}
                      onChange={() => setSelectedGenre(null)}
                      className="text-[#F5C518] mr-3"
                    />
                    <span className="text-[#B0B0B0]">All Genres</span>
                  </label>
                  {genres.slice(0, 10).map((genre) => (
                    <label key={genre.id} className="flex items-center">
                      <input
                        type="radio"
                        name="genre"
                        checked={selectedGenre === genre.id}
                        onChange={() => setSelectedGenre(genre.id)}
                        className="text-[#F5C518] mr-3"
                      />
                      <span className="text-[#B0B0B0]">{genre.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Sort By</h4>
                <div className="space-y-2">
                  {[
                    { value: 'relevance', label: 'Relevance' },
                    { value: 'rating', label: 'Rating' },
                    { value: 'date', label: 'Release Date' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="text-[#F5C518] mr-3"
                      />
                      <span className="text-[#B0B0B0]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSearch()}
                className="w-full bg-[#E50914] text-white py-2 rounded-lg hover:bg-[#d40812] transition-colors font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {query && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 font-['Poppins']">
                  Search Results for "{query}"
                </h2>
                <p className="text-[#B0B0B0]">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </p>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5C518] mx-auto mb-4"></div>
                  <div className="text-[#B0B0B0]">Searching...</div>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((movie: Movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => onMovieClick?.(movie)}
                    size="small"
                  />
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-16">
                <div className="text-[#B0B0B0] text-xl mb-4">
                  No results found for "{query}"
                </div>
                <p className="text-[#B0B0B0] mb-6">
                  Try adjusting your search or removing filters
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#E50914] text-white px-6 py-2 rounded-lg hover:bg-[#d40812] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-[#333] mx-auto mb-4" />
                <div className="text-[#B0B0B0] text-xl mb-2">
                  Search for movies and TV shows
                </div>
                <p className="text-[#B0B0B0]">
                  Enter a title, actor, or keyword to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;