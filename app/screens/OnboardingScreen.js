import React, { useState, useRef } from 'react'
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Animated, Dimensions, ScrollView
} from 'react-native'

const { width } = Dimensions.get('window')

const onboardingSlides = [
  { 
    text: "What you say matters, not how you look", 
    subtext: "Connect through words, not appearances",
  },
  { 
    text: "Your story is your introduction", 
    subtext: "Let your writing speak for you",
  },
  { 
    text: "Photos reveal only when both agree", 
    subtext: "True connection comes from within",
  },
]

const genderOptions = [
  { id: 'woman', label: 'Woman' },
  { id: 'man', label: 'Man' },
]

const orientationOptions = [
  { id: 'straight', label: 'Straight', desc: 'Opposite gender' },
  { id: 'gay', label: 'Gay/Lesbian', desc: 'Same gender' },
  { id: 'bisexual', label: 'Bisexual', desc: 'Multiple genders' },
  { id: 'other', label: 'Other', desc: 'Something else' },
]

export default function OnboardingScreen({ onComplete }) {
  const [screen, setScreen] = useState('onboarding')
  
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [orientation, setOrientation] = useState('')
  
  const scrollX = useRef(new Animated.Value(0)).current

  const validateAndContinue = () => {
    if (screen === 'name') {
      if (!name.trim()) return false
      setScreen('age')
    } else if (screen === 'age') {
      const ageNum = parseInt(age)
      if (!age || isNaN(ageNum)) return false
      if (ageNum < 18) return false
      setScreen('gender')
    } else if (screen === 'gender') {
      if (!gender) return false
      setScreen('orientation')
    } else if (screen === 'orientation') {
      if (!orientation) return false
      onComplete({ name: name.trim(), age: parseInt(age), gender, orientation })
    }
    return true
  }

  if (screen === 'onboarding') {
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
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          style={styles.slideScroll}
        >
          {onboardingSlides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <Text style={styles.slideText}>{slide.text}</Text>
              <Text style={styles.slideSubtext}>{slide.subtext}</Text>
            </View>
          ))}
        </Animated.ScrollView>

        <View style={styles.dotsContainer}>
          {onboardingSlides.map((_, index) => {
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

  if (screen === 'name') {
    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => setScreen('onboarding')}>
            <Text style={styles.backText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContent}>
          <Text style={styles.formTitle}>What should we call you?</Text>
          <Text style={styles.formSubtitle}>This is how you will appear to others</Text>

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
            style={[styles.primaryBtn, !name.trim() && styles.primaryBtnDisabled]}
            onPress={validateAndContinue}
            disabled={!name.trim()}
          >
            <Text style={styles.primaryBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (screen === 'age') {
    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => setScreen('name')}>
            <Text style={styles.backText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContent}>
          <Text style={styles.formTitle}>How old are you?</Text>
          <Text style={styles.formSubtitle}>You must be 18+ to use Verba</Text>

          <TextInput
            style={styles.ageInput}
            placeholder="18"
            placeholderTextColor="#bbb"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            maxLength={2}
            autoFocus
          />

          {age && parseInt(age) < 18 && (
            <Text style={styles.errorText}>You must be 18 or older</Text>
          )}

          <TouchableOpacity 
            style={[styles.primaryBtn, (!age || parseInt(age) < 18) && styles.primaryBtnDisabled]}
            onPress={validateAndContinue}
            disabled={!age || parseInt(age) < 18}
          >
            <Text style={styles.primaryBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (screen === 'gender') {
    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => setScreen('age')}>
            <Text style={styles.backText}>-</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.formContentCenter}>
          <Text style={styles.formTitle}>I am a...</Text>
          <Text style={styles.formSubtitle}>This helps us find the right matches</Text>

          <View style={styles.optionsGrid}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionCard, gender === option.id && styles.optionCardSelected]}
                onPress={() => setGender(option.id)}
              >
                <Text style={[styles.optionLabel, gender === option.id && styles.optionLabelSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.primaryBtn, !gender && styles.primaryBtnDisabled]}
            onPress={validateAndContinue}
            disabled={!gender}
          >
            <Text style={styles.primaryBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  if (screen === 'orientation') {
    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => setScreen('gender')}>
            <Text style={styles.backText}>-</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.formContentCenter}>
          <Text style={styles.formTitle}>Interested in...</Text>
          <Text style={styles.formSubtitle}>We will show you compatible matches</Text>

          <View style={styles.orientationList}>
            {orientationOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.orientationCard, orientation === option.id && styles.orientationCardSelected]}
                onPress={() => setOrientation(option.id)}
              >
                <View style={styles.orientationInfo}>
                  <Text style={[styles.orientationLabel, orientation === option.id && styles.orientationLabelSelected]}>
                    {option.label}
                  </Text>
                  {option.desc && (
                    <Text style={styles.orientationDesc}>{option.desc}</Text>
                  )}
                </View>
                {orientation === option.id && (
                  <Text style={styles.checkmark}>-</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.primaryBtn, !orientation && styles.primaryBtnDisabled]}
            onPress={validateAndContinue}
            disabled={!orientation}
          >
            <Text style={styles.primaryBtnText}>FINISH SETUP</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { paddingTop: 80, paddingHorizontal: 30, alignItems: 'center' },
  logo: { fontFamily: 'Space Mono', fontSize: 48, fontWeight: 'bold', color: '#1a1a1a', letterSpacing: 2 },
  tagline: { fontFamily: 'Space Mono', fontSize: 12, letterSpacing: 3, color: '#1a1a1a', marginTop: 12, fontWeight: '500' },
  slideScroll: { flex: 1 },
  slide: { width, paddingHorizontal: 40, justifyContent: 'center', paddingVertical: 60 },
  slideText: { fontFamily: 'Cormorant Garamond', fontSize: 32, textAlign: 'center', color: '#1a1a1a', fontStyle: 'italic', lineHeight: 44 },
  slideSubtext: { fontFamily: 'Space Mono', fontSize: 14, color: '#666', textAlign: 'center', marginTop: 20 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#1a1a1a', marginHorizontal: 4 },
  footer: { paddingHorizontal: 30, paddingBottom: 50 },
  primaryBtn: { backgroundColor: '#1a1a1a', paddingVertical: 18, borderRadius: 12, alignItems: 'center' },
  primaryBtnDisabled: { opacity: 0.4 },
  primaryBtnText: { fontFamily: 'Space Mono', fontSize: 12, letterSpacing: 3, color: '#fff', fontWeight: 'bold' },
  
  formHeader: { flexDirection: 'row', padding: 20, paddingTop: 50 },
  backText: { fontSize: 24, color: '#1a1a1a' },
  formContent: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  formContentCenter: { flexGrow: 1, paddingHorizontal: 30, justifyContent: 'center', paddingBottom: 50 },
  formTitle: { fontFamily: 'Cormorant Garamond', fontSize: 32, fontStyle: 'italic', color: '#1a1a1a', textAlign: 'center', marginBottom: 12 },
  formSubtitle: { fontFamily: 'Space Mono', fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 40 },
  nameInput: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 20, paddingHorizontal: 20, fontFamily: 'Space Mono', fontSize: 18, color: '#1a1a1a', textAlign: 'center', borderWidth: 1, borderColor: '#eee', marginBottom: 30 },
  ageInput: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 20, paddingHorizontal: 20, fontFamily: 'Space Mono', fontSize: 36, color: '#1a1a1a', textAlign: 'center', borderWidth: 1, borderColor: '#eee', marginBottom: 10 },
  errorText: { fontFamily: 'Space Mono', fontSize: 11, color: '#ff4444', textAlign: 'center', marginBottom: 20 },
  
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15, marginBottom: 40 },
  optionCard: { width: '45%', backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center', borderWidth: 2, borderColor: '#eee' },
  optionCardSelected: { borderColor: '#1a1a1a', backgroundColor: '#1a1a1a' },
  optionLabel: { fontFamily: 'Space Mono', fontSize: 14, color: '#1a1a1a' },
  optionLabelSelected: { color: '#fff' },
  
  orientationList: { gap: 12, marginBottom: 40 },
  orientationCard: { backgroundColor: '#fff', borderRadius: 12, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: '#eee' },
  orientationCardSelected: { borderColor: '#1a1a1a' },
  orientationInfo: { flex: 1 },
  orientationLabel: { fontFamily: 'Space Mono', fontSize: 14, color: '#1a1a1a', marginBottom: 2 },
  orientationLabelSelected: { fontWeight: 'bold' },
  orientationDesc: { fontFamily: 'Space Mono', fontSize: 11, color: '#666' },
  checkmark: { fontSize: 18, color: '#1a1a1a', fontWeight: 'bold' },
})
