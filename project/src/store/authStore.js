import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserById, createUser, updateUser } from '../services/userService';

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
          // In a real app, you would make an API call to your backend
          // For now, we'll use the service directly
          const user = await getUserById(credentials.email);
          
          if (!user) {
            set({ loading: false });
            return { success: false, error: 'Invalid credentials' };
          }
          
          // In a real app, you would verify the password here
          // For demo purposes, we'll just assume it's correct
          
          set({
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar
            },
            isAuthenticated: true,
            token: 'jwt-token-would-come-from-backend',
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
          // In a real app, you would make an API call to your backend
          // For now, we'll use the service directly
          const newUser = await createUser({
            name: userData.name,
            email: userData.email,
            password: userData.password, // In a real app, this would be hashed on the backend
            role: userData.role || 'buyer',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
          });
          
          set({
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              avatar: newUser.avatar
            },
            isAuthenticated: true,
            token: 'jwt-token-would-come-from-backend',
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

      updateProfile: async (userData) => {
        try {
          if (!get().user?.id) return;
          
          // In a real app, you would make an API call to your backend
          // For now, we'll use the service directly
          const updatedUser = await updateUser(get().user.id, userData);
          
          set(state => ({
            user: { 
              ...state.user, 
              ...userData,
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
              avatar: updatedUser.avatar
            }
          }));
          
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;