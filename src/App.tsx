import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';
import GenresPage from './pages/GenresPage';
import UserPage from './pages/UserPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { Movie } from './components/MovieCard';

type PageType = 'home' | 'movie-detail' | 'search' | 'genres' | 'user' | 'sign-in' | 'sign-up';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentPage('movie-detail');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedMovie(null);
    setSearchQuery('');
  };

  const handleSignIn = (credentials: { email: string; password: string }) => {
    // Mock: accept any credentials
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleSignUp = (credentials: { email: string; password: string }) => {
    // Mock: accept any credentials
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'movie-detail':
        return (
          <MovieDetailPage
            movieId={selectedMovie?.id || 1}
            onBack={handleBackToHome}
          />
        );
      case 'search':
        return (
          <SearchPage
            initialQuery={searchQuery}
            onMovieClick={handleMovieClick}
            onBack={handleBackToHome}
          />
        );
      case 'genres':
        return (
          <GenresPage
            onMovieClick={handleMovieClick}
            onBack={handleBackToHome}
          />
        );
      case 'user':
        if (!isLoggedIn) {
          setTimeout(() => setCurrentPage('sign-in'), 0);
          return null;
        }
        return (
          <UserPage
            onMovieClick={handleMovieClick}
            onBack={handleBackToHome}
          />
        );
      case 'sign-in':
        return <SignInPage onSignIn={handleSignIn} onNavigate={handleNavigate} />;
      case 'sign-up':
        return <SignUpPage onSignUp={handleSignUp} onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onMovieClick={handleMovieClick}
            trendingRef={trendingRef}
          />
        );
    }
  };

  // Add trending ref
  const trendingRef = React.useRef<HTMLDivElement>(null);

  const handleNavigate = (page: string) => {
    if (page === 'trending') {
      setCurrentPage('home');
      setTimeout(() => {
        trendingRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Wait for HomePage to render
    } else if (page === 'genres') {
      setCurrentPage('genres');
    } else if (page === 'user') {
      setCurrentPage('user');
    } else if (page === 'sign-in') {
      setCurrentPage('sign-in');
    } else if (page === 'sign-up') {
      setCurrentPage('sign-up');
    } else {
      setCurrentPage('home');
    }
  };

  // Don't show navbar and footer on movie detail page for immersive experience
  const showNavAndFooter = currentPage !== 'movie-detail';

  return (
    <div className="min-h-screen bg-[#121212] text-white font-['Inter']">
      {showNavAndFooter && (
        <Navbar 
          currentPage={currentPage}
          onSearch={handleSearch}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
        />
      )}

      <main className={showNavAndFooter ? '' : 'min-h-screen'}>
        {renderCurrentPage()}
      </main>

      {showNavAndFooter && <Footer />}

      {/* Navigation Helper (for demo purposes) */}
      {currentPage === 'home' && (
        <div className="fixed bottom-6 right-6 flex flex-col space-y-2 z-50">
          <button
            onClick={() => setCurrentPage('genres')}
            className="bg-[#E50914] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#d40812] transition-colors text-sm font-semibold"
          >
            Browse Genres
          </button>
          <button
            onClick={() => setCurrentPage('user')}
            className="bg-[#F5C518] text-black px-4 py-2 rounded-lg shadow-lg hover:bg-[#e6b015] transition-colors text-sm font-semibold"
          >
            My Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default App;