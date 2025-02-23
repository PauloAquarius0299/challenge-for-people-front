'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Radio } from '../types';
import FavoriteList from './FavoriteList';
import Player from './Player';

interface MainContentProps {
  favorites: Radio[];
  removeFavorite: (stationId: string) => void;
  selectedRadio: Radio | null;
  onSelectRadio: (radio: Radio) => void;
  onEditRadio: (index: number, updatedRadio: Radio) => void; 
}

const MainContent: React.FC<MainContentProps> = ({
  favorites,
  removeFavorite,
  selectedRadio,
  onSelectRadio,
  onEditRadio, 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePlayRadio = (radio: Radio) => {
    onSelectRadio(radio);
    setIsPlaying(true);
  };

  const handleEditRadio = (index: number, updatedRadio: Radio) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = updatedRadio;
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    onEditRadio(index, updatedRadio); 
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex justify-center items-center mb-8 pt-6">
        <h1 className="text-white text-4xl font-semibold text-center">Radio Browser</h1>
      </div>
      <div className="flex justify-between items-center px-6">
        <p className="text-white p-2">FAVORITE RADIOS</p>
        <div className='flex items-center'>
          <Search className="text-cyan-500 w-8 h-8 cursor-pointer self-end" />
          <p className='text-white'>Search stations</p>
        </div>
      </div>
      {selectedRadio && (
        <div className="bg-[#424242] rounded-lg p-4 mx-6 shadow-lg shadow-black-500/50">
          <div className="flex items-center gap-8 border-collapse border-gray-500 pb-2 mb-2">
            <Player url={selectedRadio.url} imageUrl={selectedRadio.favicon} />  
            <h2 className="text-black text-4xl font-semibold">{selectedRadio.name}</h2>
          </div>
          <FavoriteList
            favorites={favorites}
            removeFavorite={(index) => removeFavorite(favorites[index].stationuuid)}
            onSelectRadio={onSelectRadio}
            onEditRadio={handleEditRadio}
            onPlayRadio={handlePlayRadio}
          />
        </div>
      )}
    </div>
  );
};

export default MainContent;