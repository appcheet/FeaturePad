import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from '../components/Button';
import { MoodSelector } from '../components/MoodSelector';
import { useAuthStore } from '../store/authStore';
import { useLetterStore } from '../store/letterStore';

export const WriteLetterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [mood, setMood] = useState('happy');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('30');
  
  const { user } = useAuthStore();
  const { addLetter } = useLetterStore();

  const handleChooseDate = () => {
    const days = parseInt(deliveryDays) || 30;
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + days);

    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please log in to continue');
      return;
    }

    addLetter({
      title: title.trim(),
      content: content.trim(),
      mood: mood as any,
      scheduledDate,
      userId: user.id,
    });

    Alert.alert(
      'Letter Scheduled!',
      `Your letter will be delivered in ${days} days`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write A Letter</Text>
        <TouchableOpacity>
          <Text style={styles.moreButton}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Write Your Letter</Text>
        <Text style={styles.description}>Type here</Text>

        <MoodSelector selectedMood={mood} onMoodSelect={setMood} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Letter title..."
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadIcon}>📁</Text>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Add A Caption...</Text>

        <View style={styles.contentContainer}>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Write your letter here..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryLabel}>Deliver in:</Text>
          <TextInput
            style={styles.deliveryInput}
            value={deliveryDays}
            onChangeText={setDeliveryDays}
            placeholder="30"
            keyboardType="numeric"
          />
          <Text style={styles.deliveryLabel}>days</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Choose A Date"
          onPress={handleChooseDate}
          style={styles.chooseButton}
        />
      </View>
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
  moreButton: {
    fontSize: 24,
    color: '#333',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  uploadIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  contentContainer: {
    marginBottom: 24,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 120,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  deliveryLabel: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 8,
  },
  deliveryInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
    width: 60,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  chooseButton: {
    backgroundColor: '#E69A8D',
  },
});
