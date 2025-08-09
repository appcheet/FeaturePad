import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      login: async (email: string, password: string) => {
        // Mock login - replace with real API
        const mockUser: User = {
          id: '1',
          firstName: 'Hello',
          lastName: 'Jerryd',
          email: email,
          profileImage: 'https://i.pravatar.cc/150?img=1'
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      signup: async (firstName: string, lastName: string, email: string, password: string) => {
        // Mock signup - replace with real API
        const mockUser: User = {
          id: Date.now().toString(),
          firstName,
          lastName,
          email,
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);