import React from 'react';

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onGenreSelect: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onGenreSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4 font-['Poppins']">Browse by Genre</h3>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onGenreSelect(null)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedGenre === null
              ? 'bg-[#F5C518] text-black font-semibold'
              : 'bg-[#1F1F1F] text-[#B0B0B0] hover:bg-[#333] hover:text-white'
          }`}
        >
          All Genres
        </button>
        
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreSelect(genre.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedGenre === genre.id
                ? 'bg-[#F5C518] text-black font-semibold'
                : 'bg-[#1F1F1F] text-[#B0B0B0] hover:bg-[#333] hover:text-white'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;