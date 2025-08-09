import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/authStore';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Welcome to Letters to Future Self',
    subtitle: 'Reflect on the present by writing letters to yourself.',
    image: require('@/assets/images/onboarding/OnBoarding1.png'),
  },
  {
    title: 'Why Write To Yourself?',
    subtitle:
      'Reflect on your thoughts and emotions. Gain perspective and be a friend to your future self.',
    image: require('@/assets/images/onboarding/OnBoarding2.png'),
  },
  {
    title: 'Get started',
    subtitle:
      'Create an account to begin writing letters to your future self.',
    image: require('@/assets/images/onboarding/OnBoarding3.png'),
  },
];

export const OnboardingScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useAuthStore();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const currentData = onboardingData[currentIndex];

    const getButtonText = () => {
    if (currentIndex === 0) return 'Get Started';
    if (currentIndex === 1) return 'Next';
    return 'Continue';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Text style={styles.logo}>FuturePad</Text>

          {/* Illustration */}
          <Image
            source={currentData.image}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Title & Subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentData.title}</Text>
            <Text style={styles.subtitle}>{currentData.subtitle}</Text>
          </View>

          {/* Indicators */}
          <View style={styles.indicators}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={getButtonText()}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 25,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#B9A088',
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D4A373',
    marginTop: 60,
    marginBottom: 25,
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  image: {
    width: width * 0.85,
    height: height * 0.42, // bigger image
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  indicators: {
    marginTop:16,
    flexDirection: 'row',
    marginBottom: 30,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#D4A373',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFF',
  },
  nextButton: {
    width: '100%',
  },
});
