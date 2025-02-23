'use client';
import React, { useState } from 'react';
import { Radio } from '../types';
import { Pencil, Play, Trash2 } from 'lucide-react';

interface FavoriteListProps {
  favorites: Radio[];
  removeFavorite: (index: number) => void;
  onSelectRadio: (radio: Radio) => void;
  onEditRadio: (index: number, updatedRadio: Radio) => void;
  onPlayRadio: (radio: Radio) => void;
  className?: string; 
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  favorites,
  removeFavorite,
  onSelectRadio,
  onEditRadio,
  onPlayRadio,
  className = '' 
}) => {
  const [editingRadio, setEditingRadio] = useState<Radio | null>(null);
  const [editedName, setEditedName] = useState<string>('');

  const handleEdit = (radio: Radio) => {
    setEditingRadio(radio);
    setEditedName(radio.name);  
  };

  const handleSave = () => {
    if (editedName.trim() !== '') {
      const updatedRadio = { ...editingRadio!, name: editedName };
      const index = favorites.findIndex((r) => r.stationuuid === updatedRadio.stationuuid);
      if (index !== -1) {
        onEditRadio(index, updatedRadio);
      }
      setEditingRadio(null);  
      setEditedName('');
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {favorites.map((radio, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-[#616060] rounded-md group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              {radio.favicon ? (
                <img
                  src={radio.favicon}
                  alt={radio.name}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <span className="text-xs text-gray-300">FM</span>
              )}
            </div>
            <div>
              {editingRadio?.stationuuid === radio.stationuuid ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-white font-medium bg-transparent border-b border-gray-500 focus:outline-none"
                />
              ) : (
                <>
                  <h3 className="text-black font-medium text-2xl">{radio.name}</h3>
                  <p className="text-black text-sm">{radio.country}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPlayRadio(radio)}
              className="p-2 hover:bg-cyan-500 rounded-md transition-colors"
            >
              <Play className="w-8 h-8 text-black" />
            </button>
            <button
              onClick={() => handleEdit(radio)}
              className="p-2 hover:bg-cyan-500 rounded-md transition-colors"
            >
              <Pencil className="w-8 h-8 text-black" />
            </button>
            {editingRadio?.stationuuid === radio.stationuuid ? (
              <button
                onClick={handleSave}
                className="p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <span className="text-cyan-400">Save</span>
              </button>
            ) : (
              <button
                onClick={() => removeFavorite(index)}
                className="p-2 hover:bg-cyan-500 rounded-lg transition-colors"
              >
                <Trash2 className="w-8 h-8 text-black " />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
