import React, { useState, useRef } from 'react'
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Animated, Dimensions 
} from 'react-native'

const { width } = Dimensions.get('window')

const slides = [
  { 
    text: "What you say matters, not how you look", 
    subtext: "Connect through words, not appearances",
    icon: "✍️"
  },
  { 
    text: "Your story is your introduction", 
    subtext: "Let your writing speak for you",
    icon: "📖"
  },
  { 
    text: "Photos reveal only when both agree", 
    subtext: "True connection comes from within",
    icon: "🎭"
  },
]

export default function OnboardingScreen({ onComplete }) {
  const [screen, setScreen] = useState('onboarding') // 'onboarding' | 'name'
  const [slideIndex, setSlideIndex] = useState(0)
  const [name, setName] = useState('')
  const scrollX = useRef(new Animated.Value(0)).current

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  )

  const handleNameSubmit = () => {
    if (name.trim()) {
      onComplete(name.trim())
    }
  }

  // Name Input Screen
  if (screen === 'name') {
    return (
      <View style={styles.container}>
        <View style={styles.nameHeader}>
          <Text style={styles.logo}>VERBA</Text>
        </View>

        <View style={styles.nameContent}>
          <Text style={styles.nameTitle}>What should we call you?</Text>
          <Text style={styles.nameSubtitle}>This is how you'll appear to others</Text>

          <TextInput
            style={styles.nameInput}
            placeholder="Your name"
            placeholderTextColor="#bbb"
            value={name}
            onChangeText={setName}
            autoFocus
            autoCapitalize="words"
          />

          <TouchableOpacity 
            style={[styles.nameBtn, !name.trim() && styles.nameBtnDisabled]}
            onPress={handleNameSubmit}
            disabled={!name.trim()}
          >
            <Text style={styles.nameBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Onboarding Screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>VERBA</Text>
        <Text style={styles.tagline}>WORDS BEFORE LOOKS</Text>
      </View>

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.slideScroll}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.slideIconContainer}>
              <Text style={styles.slideIcon}>{slide.icon}</Text>
            </View>
            <Text style={styles.slideText}>{slide.text}</Text>
            <Text style={styles.slideSubtext}>{slide.subtext}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          })
          return (
            <Animated.View 
              key={index} 
              style={[styles.dot, { transform: [{ scale }], opacity }]} 
            />
          )
        })}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryBtn}
          onPress={() => setScreen('name')}
        >
          <Text style={styles.primaryBtnText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'Space Mono',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 2,
  },
  tagline: {
    fontFamily: 'Space Mono',
    fontSize: 8,
    letterSpacing: 5,
    color: '#ccc',
    marginTop: 8,
  },
  slideScroll: {
    flex: 1,
  },
  slide: {
    width,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  slideIcon: {
    fontSize: 48,
  },
  slideText: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 28,
    textAlign: 'center',
    color: '#1a1a1a',
    fontStyle: 'italic',
    lineHeight: 38,
    marginBottom: 12,
  },
  slideSubtext: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 4,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  primaryBtn: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    letterSpacing: 3,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Name Screen
  nameHeader: {
    paddingTop: 40,
    alignItems: 'center',
  },
  nameContent: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  nameTitle: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 28,
    fontStyle: 'italic',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  nameSubtitle: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
  nameInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontFamily: 'Space Mono',
    fontSize: 18,
    color: '#1a1a1a',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  nameBtn: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  nameBtnDisabled: {
    opacity: 0.4,
  },
  nameBtnText: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    letterSpacing: 3,
    color: '#fff',
    fontWeight: 'bold',
  },
})
