import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { getCurrentUser } from '../services/userService';

/**
 * Hook to check if the user is authenticated on initial load
 * by verifying the token with the server
 */
const useAuthCheck = () => {
  const { isAuthenticated, token, login, logout } = useAuthStore();

  useEffect(() => {
    const verifyToken = async () => {
      // If we have a token but user is not authenticated in state
      const storedToken = localStorage.getItem('token');
      
      if (storedToken && !isAuthenticated) {
        try {
          // Verify token by getting current user
          const user = await getCurrentUser();
          
          // If successful, update auth state
          if (user) {
            useAuthStore.setState({
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
              },
              isAuthenticated: true,
              token: storedToken
            });
          }
        } catch (error) {
          // If token is invalid, clear it
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          logout();
        }
      }
    };

    verifyToken();
  }, [isAuthenticated, token, logout]);
};

export default useAuthCheck;