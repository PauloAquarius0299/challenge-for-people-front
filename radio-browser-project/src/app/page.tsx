'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Radio } from './types';
import { Menu } from 'lucide-react';

export default function Home() {
  const [favorites, setFavorites] = useState<Radio[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<Radio | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar escondido por padrão em mobile

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (radio: Radio) => {
    const updatedFavorites = [...favorites, radio];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (stationId: string) => {
    const updatedFavorites = favorites.filter((radio) => radio.stationuuid !== stationId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleEditRadio = (index: number, updatedRadio: Radio) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = updatedRadio;
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSearch = (query: string) => {
    console.log('Pesquisar:', query);
  };

  // Função para alternar a visibilidade do Sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="bg-[#2b2a2a] min-h-screen flex">
      {/* Overlay para fechar o Sidebar ao clicar fora (mobile) */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Sidebar
        favorites={favorites}
        addToFavorites={addToFavorites}
        onSearch={handleSearch}
        removeFavorite={removeFavorite}
        onSelectRadio={(radio) => setSelectedRadio(radio)}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 overflow-y-auto">
        {/* Ícone do Menu fixo no canto superior direito (mobile) */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 p-2 bg-[#161616] rounded-lg z-50 lg:hidden"
        >
          <Menu className="w-6 h-6 text-cyan-500" />
        </button>
        <MainContent
          favorites={favorites}
          removeFavorite={removeFavorite}
          selectedRadio={selectedRadio}
          onSelectRadio={(radio) => setSelectedRadio(radio)}
          onEditRadio={handleEditRadio}
        />
      </div>
    </div>
  );
}