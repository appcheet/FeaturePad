import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { AVAILABLE_MOODS, useLetterStore } from '../store/letterStore';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export const WriteLetterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [mood, setMood] = useState('happy');
  const [content, setContent] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { addLetter } = useLetterStore();
  const { theme, isDark } = useTheme();

  const handleChooseDate = () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please write your letter content');
      return;
    }

    if (!selectedDate) {
      Alert.alert('Error', 'Please choose a delivery date');
      return;
    }

    addLetter({
      title: `Letter To Me In ${getMonthName(selectedDate)}`,
      content: content.trim(),
      mood: mood as any,
      scheduledDate: selectedDate,
      userId: 'current-user',
      caption: caption.trim() || undefined,
      image: selectedImage || undefined,
    });

    Alert.alert(
      'Letter Scheduled!',
      `Your letter will be delivered on ${selectedDate.toLocaleDateString()}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const getMonthName = (date: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()];
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const styles = createStyles(theme.colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write A Letter</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Write Your Letter Section */}
        <Text style={styles.sectionTitle}>Write Your Letter</Text>
        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="Type Here..."
          placeholderTextColor={theme.colors.placeholder}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        {/* Select Mood Section */}
        <Text style={styles.sectionTitle}>Select Mood</Text>
        <View style={styles.moodContainer}>
          {AVAILABLE_MOODS.slice(0, 4).map((moodOption) => (
            <TouchableOpacity
              key={moodOption.value}
              style={[
                styles.moodButton,
                mood === moodOption.value && styles.moodButtonSelected
              ]}
              onPress={() => setMood(moodOption.value)}
            >
              <Text style={styles.moodEmoji}>{moodOption.emoji}</Text>
              <Text style={[
                styles.moodLabel,
                mood === moodOption.value && styles.moodLabelSelected
              ]}>
                {moodOption.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Photo Section */}
        <Text style={styles.sectionTitle}>Add A Photo That Captures This Feeling</Text>
        <TouchableOpacity style={styles.photoUpload} onPress={handleImagePicker}>
          {selectedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle" size={24} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.uploadContent}>
              <Ionicons name="cloud-upload-outline" size={48} color={theme.colors.primary} />
              <Text style={styles.uploadText}>Upload Image</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Caption Section */}
        <Text style={styles.sectionTitle}>Add A Caption...</Text>
        <TextInput
          style={styles.captionInput}
          value={caption}
          onChangeText={setCaption}
          placeholder="Add a caption for your photo..."
          placeholderTextColor={theme.colors.placeholder}
        />

        {/* Choose Date Section */}
        <Text style={styles.sectionTitle}>Choose A Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={handleDatePress}>
          <Ionicons name="calendar" size={24} color={theme.colors.primary} />
          <Text style={styles.dateText}>
            {selectedDate ? selectedDate.toLocaleDateString() : 'Choose A Date'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleChooseDate}
        >
          <Ionicons name="calendar" size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Choose A Date</Text>
        </TouchableOpacity>
      </View>
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
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: colors.card,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 8,
    color: colors.text,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  moodButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: (width - 60) / 4,
    borderWidth: 2,
    borderColor: colors.border,
  },
  moodButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  moodLabelSelected: {
    color: colors.background,
    fontWeight: '600',
  },
  photoUpload: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 8,
    minHeight: 150,
    justifyContent: 'center',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 12,
  },
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: colors.card,
    marginBottom: 8,
    color: colors.text,
  },
  dateButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.surface,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
