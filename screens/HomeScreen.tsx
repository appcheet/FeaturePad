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

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { getLockedLetters, getDaysUntilDelivery, calculateProgress, addLetter } = useLetterStore();
  const { theme, isDark } = useTheme();

  // Mock user ID for now - in a real app this would come from auth
  const userId = 'current-user';
  const lockedLetters = getLockedLetters(userId);

  // Add sample data if no letters exist
  React.useEffect(() => {
    if (lockedLetters.length === 0) {
      // Add sample letters
      const sampleLetters = [
        {
          title: 'Letter To Me In Spring',
          content: 'Dear Future Me, I hope you are doing well and have achieved your goals...',
          mood: 'happy' as const,
          scheduledDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000), // 23 days from now
          userId: userId,
          image: 'https://picsum.photos/300/200',
          caption: 'Spring memories',
        },
        {
          title: 'Motivation for Tomorrow',
          content: 'Remember why you started this journey...',
          mood: 'excited' as const,
          scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          userId: userId,
        },
        {
          title: 'Reflections on Growth',
          content: 'Looking back at how much you have grown...',
          mood: 'reflective' as const,
          scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          userId: userId,
        },
      ];

      sampleLetters.forEach(letter => {
        addLetter(letter);
      });
    }
  }, [lockedLetters.length, addLetter]);

  const handleWriteLetter = () => {
    navigation.navigate('WriteLetter');
  };

  const handleViewArchive = () => {
    navigation.navigate('LetterArchive');
  };

  const handleLetterPress = (letterId: string) => {
    navigation.navigate('ReadLetter', { letterId });
  };

  const handleDeleteLetter = (letterId: string) => {
    // Add confirmation dialog here
    console.log('Delete letter:', letterId);
  };

  const getMoodEmoji = (mood: string) => {
    const moodData = AVAILABLE_MOODS.find(m => m.value === mood);
    return moodData?.emoji || '😊';
  };

  const formatDaysUntilDelivery = (letter: any) => {
    const days = getDaysUntilDelivery(letter);
    if (days <= 0) return 'Opens Today';
    if (days === 1) return 'Opens Tomorrow';
    return `Opens In ${days} Days`;
  };

  const styles = createStyles(theme.colors);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      
      {/* Background Blobs */}
      <Image
        source={require('../assets/images/home/BlobLeft.png')}
        style={styles.blobLeft}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/home/BlobMiddle.png')}
        style={styles.blobMiddle}
        resizeMode="contain"
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Locked Letters</Text>

        {lockedLetters.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="mail-open-outline" size={80} color={theme.colors.textSecondary} />
            <Text style={styles.emptyTitle}>No locked letters yet</Text>
            <Text style={styles.emptySubtitle}>
              Write your first letter to your future self
            </Text>
          </View>
        ) : (
          <View style={styles.lettersContainer}>
            {lockedLetters.map((letter) => (
              <TouchableOpacity
                key={letter.id}
                style={styles.letterCard}
                onPress={() => handleLetterPress(letter.id)}
              >
                <View style={styles.letterHeader}>
                  <View style={styles.letterIconContainer}>
                    <Ionicons name="mail" size={24} color={theme.colors.primary} />
                  </View>
                  <View style={styles.letterActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeleteLetter(letter.id);
                      }}
                    >
                      <Ionicons name="lock-closed" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeleteLetter(letter.id);
                      }}
                    >
                      <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <Text style={styles.letterTitle}>{letter.title}</Text>
                <Text style={styles.letterMood}>
                  Mood: {letter.mood.charAt(0).toUpperCase() + letter.mood.slice(1)}
                </Text>
                
                <View style={styles.deliveryInfo}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.letterStatus}>
                    {formatDaysUntilDelivery(letter)}
                  </Text>
                </View>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${calculateProgress(letter)}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{Math.round(calculateProgress(letter))}%</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Write Letter Card */}
        <View style={styles.writeCard}>
          <View style={styles.writeCardContent}>
            <View style={styles.writeCardIconContainer}>
              <Ionicons name="mail" size={40} color={theme.colors.primary} />
            </View>
            <Text style={styles.writeCardTitle}>Hey You. Let's Write.</Text>
            <Text style={styles.writeCardSubtitle}>
              Ready To Write Something Just For You?
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.writeButton}
          onPress={handleWriteLetter}
        >
          <Ionicons name="create" size={20} color="#FFFFFF" style={styles.writeButtonIcon} />
          <Text style={styles.writeButtonText}>Write A New Letter</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  blobLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    opacity: 0.3,
  },
  blobMiddle: {
    position: 'absolute',
    top: '30%',
    right: -50,
    width: 250,
    height: 250,
    opacity: 0.2,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    marginTop: 20,
  },
  lettersContainer: {
    gap: 16,
  },
  letterCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  letterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  letterIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  letterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  letterMood: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  letterStatus: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#FFE4DD',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  writeCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  writeCardContent: {
    alignItems: 'center',
  },
  writeCardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  writeCardSubtitle: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
  writeButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  writeButtonIcon: {
    marginRight: 4,
  },
  writeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});