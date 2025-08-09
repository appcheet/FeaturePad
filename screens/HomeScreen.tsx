import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useLetterStore } from '../store/letterStore';
import { LetterCard } from '../components/LetterCard';
import { Button } from '../components/Button';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuthStore();
  const { getUpcomingLetters, deleteLetter } = useLetterStore();

  const upcomingLetters = user ? getUpcomingLetters(user.id) : [];

  const handleWriteLetter = () => {
    navigation.navigate('WriteLetter');
  };

  const handleViewArchive = () => {
    navigation.navigate('LetterArchive');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: user?.profileImage || 'https://i.pravatar.cc/150?img=1' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Welcome Back 👋</Text>
            <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Your Locked Letters</Text>

        {upcomingLetters.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyTitle}>You haven't written any letters yet.</Text>
            <Text style={styles.emptySubtitle}>
              Start one today and surprise your future self.
            </Text>
            <Button
              title="+ Write a Letter"
              onPress={handleWriteLetter}
              style={styles.writeButton}
            />
          </View>
        ) : (
          <>
            {upcomingLetters.map((letter) => (
              <LetterCard
                key={letter.id}
                letter={letter}
                onPress={() => navigation.navigate('ReadLetter', { letterId: letter.id })}
                onDelete={() => deleteLetter(letter.id)}
              />
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.bottomCard}>
        <View style={styles.bottomCardContent}>
          <Text style={styles.bottomCardTitle}>Hey You, Let's Write</Text>
          <Text style={styles.bottomCardSubtitle}>
            Ready to Write Something Just For You?
          </Text>
        </View>
        <Button
          title="✍️ Write A New Letter"
          onPress={handleWriteLetter}
          style={styles.writeNewButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  writeButton: {
    paddingHorizontal: 32,
  },
  bottomCard: {
    backgroundColor: '#2D2D2D',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  bottomCardContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  bottomCardSubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  writeNewButton: {
    backgroundColor: '#E69A8D',
  },
});