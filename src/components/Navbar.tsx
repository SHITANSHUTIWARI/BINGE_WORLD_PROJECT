import React, { useState } from 'react';
import { Search, Menu, X, Star, User, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage?: string;
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn] = useState(false); // Mock auth state

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'movies', label: 'Movies', href: '#' },
    { id: 'genres', label: 'Genres', href: '#' },
    { id: 'trending', label: 'Trending', href: '#' },
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
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#F5C518] ${
                  currentPage === link.id ? 'text-[#F5C518]' : 'text-[#B0B0B0]'
                }`}
              >
                {link.label}
              </a>
            ))}
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Heart className="w-5 h-5 text-[#B0B0B0] hover:text-[#E50914] cursor-pointer transition-colors" />
                <div className="w-8 h-8 bg-[#F5C518] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#121212]" />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="text-[#B0B0B0] hover:text-white transition-colors">
                  Sign In
                </button>
                <button className="bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#d40812] transition-colors">
                  Sign Up
                </button>
              </div>
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
              <a
                key={link.id}
                href={link.href}
                className={`block px-3 py-2 text-base font-medium transition-colors hover:text-[#F5C518] ${
                  currentPage === link.id ? 'text-[#F5C518]' : 'text-[#B0B0B0]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-[#333] pt-3 mt-3">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3 px-3">
                  <div className="w-8 h-8 bg-[#F5C518] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#121212]" />
                  </div>
                  <span className="text-white">Profile</span>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <button className="block w-full text-left text-[#B0B0B0] hover:text-white transition-colors">
                    Sign In
                  </button>
                  <button className="block w-full bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#d40812] transition-colors">
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