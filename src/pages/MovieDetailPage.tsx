import React, { useState, useEffect } from 'react';
import { Star, Calendar, Clock, Play, Heart, Bookmark, ArrowLeft } from 'lucide-react';
import { Movie } from '../components/MovieCard';
import { fetchMovieDetails } from '../services/tmdbApi';

interface MovieDetailPageProps {
  movieId: number;
  onBack: () => void;
}

interface DetailedMovie extends Movie {
  runtime?: number;
  genres?: { id: number; name: string }[];
  production_companies?: { name: string }[];
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({ movieId, onBack }) => {
  const [movie, setMovie] = useState<DetailedMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setIsLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading movie details:', error);
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-[#F5C518]';
    return 'text-orange-400';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#F5C518] mx-auto mb-4"></div>
          <div className="text-[#B0B0B0] text-xl">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#B0B0B0] text-xl mb-4">Movie not found</div>
          <button
            onClick={onBack}
            className="bg-[#E50914] text-white px-6 py-2 rounded-lg hover:bg-[#d40812] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const backdropUrl = 'https://image.tmdb.org/t/p/original';
  const posterUrl = movie.poster_path 
    ? `${imageBaseUrl}${movie.poster_path}` 
    : 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg';
  const backgroundUrl = movie.poster_path 
    ? `${backdropUrl}${movie.poster_path}` 
    : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Background with overlay */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={()=>window.location.href="/"}
          className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:text-[#F5C518] transition-colors  cursor-pointer pointer-events-auto z-[99]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-80 h-auto rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Information */}
              <div className="flex-1 max-w-3xl">
                {/* Title */}
                <h1 className="text-5xl font-bold text-white mb-4 font-['Poppins']">
                  {movie.title}
                </h1>

                {/* Rating and Meta Info */}
                <div className="flex flex-wrap items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
                    <Star className="w-6 h-6 text-[#FFD700]" fill="currentColor" />
                    <span className={`text-xl font-bold ${getRatingColor(movie.vote_average)}`}>
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>

                  {movie.release_date && (
                    <div className="flex items-center space-x-2 text-[#B0B0B0]">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  )}

                  {movie.runtime && (
                    <div className="flex items-center space-x-2 text-[#B0B0B0]">
                      <Clock className="w-5 h-5" />
                      <span>{movie.runtime} min</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-[#1F1F1F] text-[#B0B0B0] px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <p className="text-[#B0B0B0] text-lg leading-relaxed mb-8">
                  {movie.overview}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center space-x-4 mb-8">
                  <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    <Play className="w-5 h-5" fill="currentColor" />
                    <span>Watch Trailer</span>
                  </button>

                  <button
                    onClick={() => setIsInWatchlist(!isInWatchlist)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isInWatchlist
                        ? 'bg-[#F5C518] text-black'
                        : 'bg-[#1F1F1F] text-white border border-[#333] hover:bg-[#333]'
                    }`}
                  >
                    <Bookmark className="w-5 h-5" fill={isInWatchlist ? 'currentColor' : 'none'} />
                    <span>{isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                  </button>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isLiked
                        ? 'bg-[#E50914] text-white'
                        : 'bg-[#1F1F1F] text-white border border-[#333] hover:bg-[#333]'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>
                </div>

                {/* User Rating */}
                <div className="mb-8">
                  <h3 className="text-white text-xl font-semibold mb-3 font-['Poppins']">
                    Rate this movie
                  </h3>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className="group"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= userRating
                              ? 'text-[#FFD700]'
                              : 'text-[#333] group-hover:text-[#FFD700]'
                          }`}
                          fill={star <= userRating ? 'currentColor' : 'none'}
                        />
                      </button>
                    ))}
                    {userRating > 0 && (
                      <span className="ml-3 text-[#F5C518] font-semibold">
                        {userRating}/10
                      </span>
                    )}
                  </div>
                </div>

                {/* Production Companies */}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2 font-['Poppins']">
                      Production
                    </h3>
                    <p className="text-[#B0B0B0]">
                      {movie.production_companies.map(company => company.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 font-['Poppins']">
          User Reviews
        </h2>
        
        <div className="space-y-6">
          {/* Sample Reviews */}
          {[1, 2, 3].map((review) => (
            <div key={review} className="bg-[#1F1F1F] rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#F5C518] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">U{review}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white font-semibold">User {review}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-[#FFD700]" fill="currentColor" />
                      <span className="text-[#B0B0B0]">{8 + review}/10</span>
                    </div>
                  </div>
                  <p className="text-[#B0B0B0] leading-relaxed">
                    This is an amazing movie! The cinematography is breathtaking and the story 
                    keeps you engaged throughout. Highly recommended for anyone who enjoys 
                    quality filmmaking.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;