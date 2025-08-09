import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Mood } from '../types';
import { useTheme } from '../theme/ThemeContext';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

const moods: Mood[] = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '🤗', label: 'Excited', value: 'excited' },
  { emoji: '🙏', label: 'Grateful', value: 'grateful' },
  { emoji: '🌱', label: 'Hopeful', value: 'hopeful' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodSelect,
}) => {
  const { theme } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: theme.colors.text }]}>Select Mood</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodButton,
              { backgroundColor: theme.colors.surface },
              selectedMood === mood.value && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => onMoodSelect(mood.value)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={[
              styles.moodLabel,
              { color: selectedMood === mood.value ? '#fff' : theme.colors.textSecondary }
            ]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    minWidth: 70,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
  },
});