import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, updateUser } from '../services/userService';

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
          // Call the login API endpoint
          const user = await loginUser(credentials);
          
          set({
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar
            },
            isAuthenticated: true,
            token: user.token,
            loading: false
          });
          
          return { success: true };
        } catch (error) {
          set({ loading: false });
          return { success: false, error: error.response?.data?.message || error.message };
        }
      },

      signup: async (userData) => {
        set({ loading: true });
        try {
          // Call the register API endpoint
          const newUser = await registerUser({
            name: userData.name,
            email: userData.email,
            password: userData.password,
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
            token: newUser.token,
            loading: false
          });
          
          return { success: true };
        } catch (error) {
          set({ loading: false });
          return { success: false, error: error.response?.data?.message || error.message };
        }
      },

      logout: () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        set({
          user: null,
          isAuthenticated: false,
          token: null
        });
      },

      updateProfile: async (userData) => {
        try {
          if (!get().user?.id) return;
          
          // Call the update user API endpoint
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