import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LetterCard } from '../components/LetterCard';
import { useAuthStore } from '../store/authStore';
import { useLetterStore } from '../store/letterStore';
import { useTheme } from '../theme/ThemeContext';

type TabType = 'past' | 'upcoming';

export const LetterArchiveScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabType>('past');
  const { user } = useAuthStore();
  const { getDeliveredLetters, getUpcomingLetters } = useLetterStore();
  const { theme, isDark } = useTheme();

  const pastLetters = user ? getDeliveredLetters(user.id) : [];
  const upcomingLetters = user ? getUpcomingLetters(user.id) : [];

  const currentLetters = activeTab === 'past' ? pastLetters : upcomingLetters;
  
  const styles = createStyles(theme.colors);

  const renderLetter = ({ item }: { item: any }) => (
    <LetterCard
      letter={item}
      onPress={() => navigation.navigate('ReadLetter', { letterId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
            style={styles.avatar}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.welcomeText}>Welcome Back 👋</Text>
            <Text style={styles.userName}>Mahnoor Tanveer</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={22} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Letter Archive</Text>
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
            <Ionicons 
              name={activeTab === 'past' ? 'mail-open-outline' : 'time-outline'} 
              size={80} 
              color={theme.colors.textSecondary} 
            />
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

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  userTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  titleContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});