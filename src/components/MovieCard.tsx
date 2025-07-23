import React from 'react';
import { Star, Calendar, Clock } from 'lucide-react';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
  runtime?: number;
}

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, size = 'medium' }) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const placeholderImage = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg';
  
  const sizeClasses = {
    small: 'w-48',
    medium: 'w-64',
    large: 'w-80'
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).getFullYear().toString();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-[#F5C518]';
    return 'text-orange-400';
  };

  return (
    <div 
      className={`${sizeClasses[size]} bg-[#181818] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group`}
      onClick={onClick}
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden">
        <img
          src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : placeholderImage}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Rating Overlay */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-[#FFD700]" fill="currentColor" />
          <span className={`text-sm font-semibold ${getRatingColor(movie.vote_average)}`}>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
            <p className="text-white text-sm line-clamp-3">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#F5C518] transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-[#B0B0B0] text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
          
          {movie.runtime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.runtime}min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;