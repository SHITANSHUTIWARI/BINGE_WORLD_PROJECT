import React, { useState } from 'react';
import { Search, Menu, X, Star, User, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage?: string;
  onSearch?: (query: string) => void;
  onNavigate?: (page: string) => void;
  isLoggedIn?: boolean;
  onSignOut?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onSearch, onNavigate, isLoggedIn, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'genres', label: 'Genres' },
    { id: 'trending', label: 'Trending' },
    { id: 'user', label: 'Profile' },
  ];

  return (
    <nav className="bg-[#121212] border-b border-[#1F1F1F] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Star className="w-8 h-8 text-[#F5C518]" fill="currentColor" />
              <span className="text-2xl font-bold text-white font-['Poppins']">
                BingeVerse
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows, actors..."
                className="w-full bg-[#1F1F1F] text-white px-4 py-2 pl-10 rounded-lg border border-[#333] focus:outline-none focus:border-[#F5C518] transition-colors"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#B0B0B0]" />
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              (link.id !== 'user' || isLoggedIn) && (
                <button
                  key={link.id}
                  onClick={() => onNavigate && onNavigate(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-[#F5C518] ${
                    currentPage === link.id ? 'text-[#F5C518]' : 'text-[#B0B0B0]'
                  }`}
                  style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
                >
                  {link.label}
                </button>
              )
            ))}
            {isLoggedIn ? (
              <button
                onClick={onSignOut}
                className="text-[#B0B0B0] hover:text-[#E50914] transition-colors ml-4"
                style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  className="text-[#B0B0B0] hover:text-white transition-colors"
                  onClick={() => onNavigate && onNavigate('sign-in')}
                >
                  Sign In
                </button>
                <button
                  className="bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#d40812] transition-colors"
                  onClick={() => onNavigate && onNavigate('sign-up')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#B0B0B0] hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows..."
              className="w-full bg-[#1F1F1F] text-white px-4 py-2 pl-10 rounded-lg border border-[#333] focus:outline-none focus:border-[#F5C518] transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#B0B0B0]" />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1F1F1F] border-t border-[#333]">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              (link.id !== 'user' || isLoggedIn) && (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate && onNavigate(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-[#F5C518] ${
                    currentPage === link.id ? 'text-[#F5C518]' : 'text-[#B0B0B0]'
                  }`}
                  style={{ background: 'none', border: 'none', outline: 'none', width: '100%', textAlign: 'left' }}
                >
                  {link.label}
                </button>
              )
            ))}
            <div className="border-t border-[#333] pt-3 mt-3">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    onSignOut && onSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-[#B0B0B0] hover:text-[#E50914] transition-colors"
                  style={{ background: 'none', border: 'none', outline: 'none' }}
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-y-2 px-3">
                  <button
                    className="block w-full text-left text-[#B0B0B0] hover:text-white transition-colors"
                    onClick={() => {
                      onNavigate && onNavigate('sign-in');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="block w-full bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#d40812] transition-colors"
                    onClick={() => {
                      onNavigate && onNavigate('sign-up');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;