import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLetterStore } from '../store/letterStore';

export const ReadLetterScreen: React.FC<{ navigation: any; route: any }> = ({ 
  navigation, 
  route 
}) => {
  const { letterId } = route.params;
  const { letters } = useLetterStore();
  
  const letter = letters.find(l => l.id === letterId);

  if (!letter) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Letter not found</Text>
      </SafeAreaView>
    );
  }

  const getMoodEmoji = (mood: string) => {
    const moodMap = {
      happy: '😊',
      excited: '🤗',
      grateful: '🙏',
      hopeful: '🌱',
    };
    return moodMap[mood as keyof typeof moodMap] || '😊';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isDelivered = letter.isDelivered || new Date() >= new Date(letter.scheduledDate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Read a Letter</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {!isDelivered ? (
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedEmoji}>🔒</Text>
            <Text style={styles.lockedTitle}>Letter is Locked</Text>
            <Text style={styles.lockedSubtitle}>
              This letter will be unlocked on {formatDate(letter.scheduledDate)}
            </Text>
          </View>
        ) : (
          <View style={styles.letterContainer}>
            <View style={styles.letterHeader}>
              <Text style={styles.moodEmoji}>{getMoodEmoji(letter.mood)}</Text>
              <View style={styles.letterInfo}>
                <Text style={styles.letterTitle}>{letter.title}</Text>
                <Text style={styles.letterMood}>Mood: {letter.mood}</Text>
                <Text style={styles.letterDate}>
                  Received: {formatDate(letter.scheduledDate)}
                </Text>
              </View>
            </View>

            <View style={styles.letterBody}>
              <Text style={styles.letterContent}>{letter.content}</Text>
            </View>

            <View style={styles.letterFooter}>
              <Text style={styles.footerText}>
                Written on {formatDate(letter.createdAt)}
              </Text>
              <Text style={styles.signature}>From your past self ❤️</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEE6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  lockedContainer: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  lockedEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  lockedSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  letterContainer: {
    flex: 1,
  },
  letterHeader: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  moodEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  letterInfo: {
    flex: 1,
  },
  letterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  letterMood: {
    fontSize: 14,
    color: '#E69A8D',
    marginBottom: 4,
  },
  letterDate: {
    fontSize: 12,
    color: '#999',
  },
  letterBody: {
    flex: 1,
    marginBottom: 24,
  },
  letterContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  letterFooter: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  signature: {
    fontSize: 14,
    color: '#E69A8D',
    fontStyle: 'italic',
  },
});