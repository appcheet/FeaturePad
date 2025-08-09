import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Letter } from '../types';

interface LetterState {
  letters: Letter[];
  addLetter: (letter: Omit<Letter, 'id' | 'createdAt' | 'isDelivered'>) => void;
  getLettersByUser: (userId: string) => Letter[];
  getDeliveredLetters: (userId: string) => Letter[];
  getUpcomingLetters: (userId: string) => Letter[];
  deleteLetter: (id: string) => void;
}

export const useLetterStore = create<LetterState>()(
  persist(
    (set, get) => ({
      letters: [],
      addLetter: (letterData) => {
        const newLetter: Letter = {
          ...letterData,
          id: Date.now().toString(),
          createdAt: new Date(),
          isDelivered: new Date() >= letterData.scheduledDate,
        };
        set((state) => ({
          letters: [...state.letters, newLetter],
        }));
      },
      getLettersByUser: (userId: string) => {
        return get().letters.filter(letter => letter.userId === userId);
      },
      getDeliveredLetters: (userId: string) => {
        return get().letters.filter(letter => 
          letter.userId === userId && 
          (letter.isDelivered || new Date() >= letter.scheduledDate)
        );
      },
      getUpcomingLetters: (userId: string) => {
        return get().letters.filter(letter => 
          letter.userId === userId && 
          !letter.isDelivered && 
          new Date() < letter.scheduledDate
        );
      },
      deleteLetter: (id: string) => {
        set((state) => ({
          letters: state.letters.filter(letter => letter.id !== id),
        }));
      },
    }),
    {
      name: 'letter-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);