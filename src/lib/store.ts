import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './auth/types';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserProfile } from './firebase/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      initialize: () => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const userProfile = await getUserProfile(firebaseUser);
            set({ user: userProfile, isAuthenticated: true, isLoading: false });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Initialize auth state listener
useAuthStore.getState().initialize();