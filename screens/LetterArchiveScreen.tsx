import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useLetterStore } from '../store/letterStore';
import { LetterCard } from '../components/LetterCard';

type TabType = 'past' | 'upcoming';

export const LetterArchiveScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabType>('past');
  const { user } = useAuthStore();
  const { getDeliveredLetters, getUpcomingLetters } = useLetterStore();

  const pastLetters = user ? getDeliveredLetters(user.id) : [];
  const upcomingLetters = user ? getUpcomingLetters(user.id) : [];

  const currentLetters = activeTab === 'past' ? pastLetters : upcomingLetters;

  const renderLetter = ({ item }: { item: any }) => (
    <LetterCard
      letter={item}
      onPress={() => navigation.navigate('ReadLetter', { letterId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Letter Archive</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past Letters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming Letters
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={currentLetters}
        renderItem={renderLetter}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📮</Text>
            <Text style={styles.emptyText}>
              {activeTab === 'past' ? 'No past letters yet' : 'No upcoming letters'}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeTab === 'past' 
                ? 'Your delivered letters will appear here' 
                : 'Write a letter to see it here'
              }
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#E69A8D',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});