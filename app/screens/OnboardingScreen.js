// VERBA - Onboarding Screen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: '01',
    text: 'Create your profile with a story, not photos',
  },
  {
    title: '02', 
    text: 'Match and chat without seeing photos',
  },
  {
    title: '03',
    text: 'Reveal photos only when both agree',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Quiz');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>V</Text>
      </View>

      <View style={styles.slideContainer}>
        <Text style={styles.slideNumber}>{slides[currentSlide].title}</Text>
        <Text style={styles.slideText}>{slides[currentSlide].text}</Text>
      </View>

      <View style={styles.dots}>
        {slides.map((_, index) => (
          <View 
            key={index} 
            style={[styles.dot, index === currentSlide && styles.dotActive]} 
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={nextSlide}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#111',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideNumber: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  slideText: {
    fontSize: 24,
    color: '#111',
    textAlign: 'center',
    lineHeight: 36,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#111',
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
