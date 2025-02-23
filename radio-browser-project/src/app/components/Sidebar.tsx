'use client';
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import RadioList from './RadioList';
import { Radio } from '../types';
import { fetchRadios } from '../utils/api';

interface SidebarProps {
  onSearch: (query: string) => void;
  addToFavorites: (radio: Radio) => void;
  removeFavorite: (stationId: string) => void;
  onSelectRadio: (radio: Radio) => void;
  favorites: Radio[];
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSearch,
  addToFavorites,
  removeFavorite,
  onSelectRadio,
  favorites,
  isSidebarVisible,
  toggleSidebar,
}) => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [favoriteStations, setFavoriteStations] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Carregar rádios ao iniciar
  useEffect(() => {
    const loadRadios = async () => {
      try {
        setLoading(true);
        const data = await fetchRadios();
        setRadios(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar as rádios. Tente novamente mais tarde.');
        console.error('Erro ao buscar rádios:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRadios();
  }, []);

  useEffect(() => {
    const favoriteIds = new Set(favorites.map((radio) => radio.stationuuid));
    setFavoriteStations(favoriteIds);
  }, [favorites]);

  // Filtrar rádios com base no termo de busca
  const filteredRadios = radios.filter((radio) =>
    radio.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFavorite = (stationId: string) => {
    const radio = radios.find((r) => r.stationuuid === stationId);
    if (radio) {
      if (favoriteStations.has(stationId)) {
        removeFavorite(stationId);
      } else {
        addToFavorites(radio);
      }
    }
  };

  return (
    <div
      className={`fixed lg:relative w-64 min-w-64 bg-[#161616] flex flex-col h-screen p-2 transition-transform duration-300 ease-in-out z-50 ${
        isSidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <Menu
        className="w-8 h-8 text-cyan-500 self-end m-4 cursor-pointer lg:hidden"
        onClick={toggleSidebar}
      />
      <div className="p-2 flex items-center gap-2">
        <div className="relative flex-1 p-2">
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full px-3 py-2 bg-[#616060] rounded-md text-sm text-white placeholder-white focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-gray-400 text-center p-4">Carregando...</div>
        ) : error ? (
          <div className="text-red-400 text-center p-4">{error}</div>
        ) : (
          <RadioList
            radios={filteredRadios}
            favoriteStations={favoriteStations}
            addToFavorites={addToFavorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectRadio={onSelectRadio}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;