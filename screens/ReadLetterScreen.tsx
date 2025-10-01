import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AVAILABLE_MOODS, useLetterStore } from '../store/letterStore';
import { useTheme } from '../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

export const ReadLetterScreen: React.FC<{ navigation: any; route: any }> = ({ 
  navigation, 
  route 
}) => {
  const { letterId } = route.params;
  const { getLetterById, deleteLetter } = useLetterStore();
  const { theme, isDark } = useTheme();
  
  const letter = getLetterById(letterId);

  const styles = createStyles(theme.colors);

  if (!letter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>Letter not found</Text>
      </SafeAreaView>
    );
  }

  const getMoodEmoji = (mood: string) => {
    const moodData = AVAILABLE_MOODS.find(m => m.value === mood);
    return moodData?.emoji || '😊';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const isDelivered = letter.isDelivered || new Date() >= new Date(letter.scheduledDate);

  const handleDelete = () => {
    deleteLetter(letterId);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {!isDelivered ? (
        <View style={styles.lockedContainer}>
          <Ionicons name="lock-closed" size={80} color={theme.colors.primary} />
          <Text style={styles.lockedTitle}>Letter is Locked</Text>
          <Text style={styles.lockedSubtitle}>
            This letter will be unlocked on {formatDate(letter.scheduledDate)}
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Image */}
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: letter.image || 'https://picsum.photos/400/300' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <Text style={styles.moodEmoji}>{getMoodEmoji(letter.mood)}</Text>
              <Text style={styles.letterTitle}>{letter.title}</Text>
              <Text style={styles.letterMood}>Mood: {letter.mood.charAt(0).toUpperCase() + letter.mood.slice(1)}</Text>
            </View>
          </View>

          {/* Letter Content */}
          <View style={styles.letterBody}>
            <Text style={styles.letterContent}>{letter.content}</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.receivedButton}>
              <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.receivedText}>Received {formatDate(letter.scheduledDate)}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={18} color={theme.colors.error} />
              <Text style={styles.deleteText}>Delete This Letter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
  },
  closeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 50,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
  },
  heroImageContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.overlay,
    borderRadius: 12,
    padding: 16,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  letterTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 4,
  },
  letterMood: {
    fontSize: 14,
    color: colors.background,
  },
  letterBody: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 24,
    minHeight: height * 0.4,
  },
  letterContent: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  receivedButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  receivedText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  deleteButton: {
    backgroundColor: colors.error + '20',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  deleteText: {
    fontSize: 14,
    color: colors.error,
    fontWeight: '600',
  },
});