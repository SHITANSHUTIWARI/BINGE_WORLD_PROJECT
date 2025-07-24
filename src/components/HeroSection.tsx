import React, { useState, useEffect } from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Movie } from './MovieCard';

interface HeroSectionProps {
  movies: Movie[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ movies }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentMovie = movies[currentMovieIndex];
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const backdropUrl = currentMovie?.poster_path 
    ? `${imageBaseUrl}${currentMovie.poster_path}`
    : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';

  useEffect(() => {
    if (movies.length > 0) {
      setIsLoading(false);
      const interval = setInterval(() => {
        setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [movies.length]);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-[#F5C518]';
    return 'text-orange-400';
  };

  if (isLoading || !currentMovie) {
    return (
      <div className="relative h-[70vh] bg-[#1F1F1F] flex items-center justify-center">
        <div className="text-[#B0B0B0] text-xl">Loading featured movies...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Movie Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-['Poppins'] leading-tight">
              {currentMovie.title}
            </h1>

            {/* Rating and Year */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1 bg-black bg-opacity-50 rounded-full px-3 py-1">
                <Star className="w-5 h-5 text-[#FFD700]" fill="currentColor" />
                <span className={`font-semibold ${getRatingColor(currentMovie.vote_average)}`}>
                  {currentMovie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-[#B0B0B0] text-lg">
                {currentMovie.release_date ? new Date(currentMovie.release_date).getFullYear() : 'TBA'}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#B0B0B0] text-lg mb-8 leading-relaxed line-clamp-3">
              {currentMovie.overview || 'An exciting movie experience awaits you.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center justify-center space-x-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                <Play className="w-5 h-5" fill="currentColor" />
                <span>Watch Trailer</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 bg-[#1F1F1F] bg-opacity-80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-100 transition-colors border border-[#333]">
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovieIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentMovieIndex ? 'bg-[#F5C518] w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;