'use client'
import React from 'react';
import { Check } from 'lucide-react';
import { Radio } from '../types';

interface RadioListProps {
  radios: Radio[];
  favoriteStations: Set<string>;
  addToFavorites: (radio: Radio) => void; 
  onToggleFavorite: (stationId: string) => void;
  onSelectRadio: (radio: Radio) => void;
}

const RadioList: React.FC<RadioListProps> = ({
  radios,
  favoriteStations,
  onToggleFavorite,
  onSelectRadio
}) => {
  return (
    <div className="flex-1">
      {radios.map((radio) => (
        <div
          key={radio.stationuuid}
          onClick={() => onSelectRadio(radio)}
          className={`relative group mx-2 my-1 px-3 py-2 rounded-md cursor-pointer 
            ${favoriteStations.has(radio.stationuuid)
              ? 'bg-gradient-to-r from-[#616060] to-[#616060]'
              : 'hover:bg-[#272727]'
            }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {radio.favicon ? (
                <img 
                  src={radio.favicon} 
                  alt={radio.name} 
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/radio-placeholder.png'; 
                  }}
                />
              ) : (
                <div className="w-6 h-6 bg-gray-700 rounded-full" />
              )}
              <div className="flex flex-col">
                <span className="text-gray-200 truncate max-w-[180px]">
                  {radio.name.trim()}
                </span>
              
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(radio.stationuuid);
              }}
              className={`p-1 rounded-full text-bold ${
                favoriteStations.has(radio.stationuuid)
                  ? 'text-blue-500'
                  : 'text-transparent group-hover:text-gray-500'
              }`}
            >
              <Check className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioList;