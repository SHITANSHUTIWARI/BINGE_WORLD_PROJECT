import React, { useState } from 'react';
import { User, Heart, Star, Bookmark, Settings, LogOut, ArrowLeft } from 'lucide-react';
import MovieCard, { Movie } from '../components/MovieCard';
// Remove import of mockMovies

interface UserPageProps {
  onMovieClick?: (movie: Movie) => void;
  onBack: () => void;
}

const UserPage: React.FC<UserPageProps> = ({ onMovieClick, onBack }) => {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'ratings' | 'favorites'>('watchlist');
  const [isLoggedIn] = useState(true); // Mock authentication state

  // Mock user data
  const userData = {
    name: 'Movie Enthusiast',
    email: 'user@bingeverse.com',
    memberSince: '2023',
    totalRatings: 42,
    totalReviews: 15,
    favoriteGenres: ['Action', 'Drama', 'Sci-Fi']
  };

  // Mock user movies (these would come from a database in a real app)
  const userMovies = {
    watchlist: [],
    ratings: [],
    favorites: []
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <User className="w-16 h-16 text-[#F5C518] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4 font-['Poppins']">
            Sign In Required
          </h2>
          <p className="text-[#B0B0B0] mb-8">
            Please sign in to access your profile, watchlist, and ratings.
          </p>
          <div className="space-y-3">
            <button className="w-full bg-[#E50914] text-white py-3 rounded-lg hover:bg-[#d40812] transition-colors font-semibold">
              Sign In
            </button>
            <button className="w-full bg-[#1F1F1F] text-white py-3 rounded-lg border border-[#333] hover:bg-[#333] transition-colors">
              Create Account
            </button>
            <button
              onClick={onBack}
              className="w-full text-[#B0B0B0] hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark, count: userMovies.watchlist.length },
    { id: 'ratings', label: 'My Ratings', icon: Star, count: userMovies.ratings.length },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: userMovies.favorites.length },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#1F1F1F] border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-[#B0B0B0] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-[#B0B0B0] hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-2 text-[#B0B0B0] hover:text-[#E50914] transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="lg:w-80">
            <div className="bg-[#1F1F1F] rounded-lg p-6 sticky top-8">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#F5C518] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-black" />
                </div>
                <h2 className="text-xl font-bold text-white font-['Poppins']">
                  {userData.name}
                </h2>
                <p className="text-[#B0B0B0]">{userData.email}</p>
                <p className="text-[#B0B0B0] text-sm">
                  Member since {userData.memberSince}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F5C518]">
                    {userData.totalRatings}
                  </div>
                  <div className="text-[#B0B0B0] text-sm">Ratings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F5C518]">
                    {userData.totalReviews}
                  </div>
                  <div className="text-[#B0B0B0] text-sm">Reviews</div>
                </div>
              </div>

              {/* Favorite Genres */}
              <div>
                <h3 className="text-white font-semibold mb-3 font-['Poppins']">
                  Favorite Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.favoriteGenres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-[#333] text-[#B0B0B0] px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-[#1F1F1F] rounded-lg p-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#F5C518] text-black font-semibold'
                        : 'text-[#B0B0B0] hover:text-white hover:bg-[#333]'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id ? 'bg-black bg-opacity-20' : 'bg-[#333]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'watchlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">
                    My Watchlist
                  </h2>
                  {userMovies.watchlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {userMovies.watchlist.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onClick={() => onMovieClick?.(movie)}
                          size="small"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Bookmark className="w-16 h-16 text-[#333] mx-auto mb-4" />
                      <div className="text-[#B0B0B0] text-xl mb-2">
                        Your watchlist is empty
                      </div>
                      <p className="text-[#B0B0B0]">
                        Start adding movies you want to watch later
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ratings' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">
                    My Ratings
                  </h2>
                  {userMovies.ratings.length > 0 ? (
                    <div className="space-y-4">
                      {userMovies.ratings.map((movie, index) => (
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
                            <div className="flex items-center space-x-1">
                              <span className="text-[#B0B0B0] text-sm">Your rating:</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-[#FFD700]" fill="currentColor" />
                                <span className="text-[#F5C518] font-semibold">
                                  {8 + index}/10
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Star className="w-16 h-16 text-[#333] mx-auto mb-4" />
                      <div className="text-[#B0B0B0] text-xl mb-2">
                        No ratings yet
                      </div>
                      <p className="text-[#B0B0B0]">
                        Start rating movies to see your reviews here
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">
                    My Favorites
                  </h2>
                  {userMovies.favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {userMovies.favorites.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onClick={() => onMovieClick?.(movie)}
                          size="small"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Heart className="w-16 h-16 text-[#333] mx-auto mb-4" />
                      <div className="text-[#B0B0B0] text-xl mb-2">
                        No favorites yet
                      </div>
                      <p className="text-[#B0B0B0]">
                        Mark movies as favorites to see them here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;