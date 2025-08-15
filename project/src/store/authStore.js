import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,

      login: async (credentials) => {
        set({ loading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser = {
            id: '1',
            name: 'John Artisan',
            email: credentials.email,
            role: 'buyer',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
          };
          
          set({
            user: mockUser,
            isAuthenticated: true,
            token: 'mock-jwt-token',
            loading: false
          });
          
          return { success: true };
        } catch (error) {
          set({ loading: false });
          return { success: false, error: error.message };
        }
      },

      signup: async (userData) => {
        set({ loading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser = {
            id: '1',
            name: userData.name,
            email: userData.email,
            role: userData.role || 'buyer',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
          };
          
          set({
            user: mockUser,
            isAuthenticated: true,
            token: 'mock-jwt-token',
            loading: false
          });
          
          return { success: true };
        } catch (error) {
          set({ loading: false });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null
        });
      },

      updateProfile: (userData) => {
        set(state => ({
          user: { ...state.user, ...userData }
        }));
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;