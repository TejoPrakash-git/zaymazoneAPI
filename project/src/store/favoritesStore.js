import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (product) => {
        set(state => {
          const isAlreadyFavorite = state.favorites.some(item => item.id === product.id);
          if (isAlreadyFavorite) return state;
          
          return {
            favorites: [...state.favorites, product]
          };
        });
      },

      removeFromFavorites: (productId) => {
        set(state => ({
          favorites: state.favorites.filter(item => item.id !== productId)
        }));
      },

      isFavorite: (productId) => {
        return get().favorites.some(item => item.id === productId);
      },

      toggleFavorite: (product) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        
        if (isFavorite(product.id)) {
          removeFromFavorites(product.id);
        } else {
          addToFavorites(product);
        }
      }
    }),
    {
      name: 'favorites-storage',
    }
  )
);

export default useFavoritesStore;