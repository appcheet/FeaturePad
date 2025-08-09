import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Letter } from '../types';
import { useTheme } from '../theme/ThemeContext';

interface LetterCardProps {
  letter: Letter;
  onPress: () => void;
  onDelete?: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({
  letter,
  onPress,
  onDelete,
}) => {
  const { theme } = useTheme();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap = {
      happy: '😊',
      excited: '🤗',
      grateful: '🙏',
      hopeful: '🌱',
    };
    return moodMap[mood as keyof typeof moodMap] || '😊';
  };

  const cardStyles = {
    ...styles.card,
    backgroundColor: theme.colors.card,
    shadowColor: theme.colors.shadow,
  };

  return (
    <TouchableOpacity style={cardStyles} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.moodContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={styles.moodEmoji}>{getMoodEmoji(letter.mood)}</Text>
        </View>
        <Text style={[styles.date, { color: theme.colors.primary }]}>
          Opens in {Math.ceil((new Date(letter.scheduledDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} Days
        </Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.title, { color: theme.colors.text }]}>{letter.title}</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Mood: {letter.mood}</Text>
      <Text style={[styles.scheduledDate, { color: theme.colors.placeholder }]}>
        Scheduled: {formatDate(letter.scheduledDate)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 20,
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  scheduledDate: {
    fontSize: 12,
  },
});