export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

export interface Letter {
  id: string;
  title: string;
  content: string;
  mood: 'happy' | 'excited' | 'grateful' | 'hopeful';
  scheduledDate: Date;
  isDelivered: boolean;
  createdAt: Date;
  userId: string;
}

export type Mood = {
  emoji: string;
  label: string;
  value: 'happy' | 'excited' | 'grateful' | 'hopeful';
};

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    error: string;
    success: string;
    warning: string;
    accent: string;
    placeholder: string;
    icon: string;
    shadow: string;
  };
}