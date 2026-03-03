import React, { useState, useRef } from 'react'
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Dimensions, Animated 
} from 'react-native'

const { width } = Dimensions.get('window')

const slides = [
  { title: "Words Before Looks", desc: "Connect through stories, not photos" },
  { title: "Your Words Matter", desc: "Share your story, find your match" },
  { title: "Meaningful Connections", desc: "Build something real, one conversation at a time" },
]

const genderOptions = ['Woman', 'Man', 'Other']
const orientationOptions = ['Straight', 'Gay', 'Bisexual', 'Other']

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [orientation, setOrientation] = useState('')
  const scrollRef = useRef(null)
  const slideAnim = useRef(new Animated.Value(0)).current

  const handleSlide = (index) => {
    setStep(index)
    scrollRef.current?.scrollTo({ x: index * width, animated: true })
  }

  const handleNameSubmit = () => {
    if (!name.trim()) return
    setStep(3)
    scrollRef.current?.scrollTo({ x: 3 * width, animated: true })
  }

  const handleAgeSubmit = () => {
    const ageNum = parseInt(age)
    if (!age || isNaN(ageNum) || ageNum < 18) return
    setStep(4)
    scrollRef.current?.scrollTo({ x: 4 * width, animated: true })
  }

  const handleGenderSelect = (g) => {
    setGender(g)
    setTimeout(() => {
      setStep(5)
      scrollRef.current?.scrollTo({ x: 5 * width, animated: true })
    }, 200)
  }

  const handleOrientationSelect = (o) => {
    setOrientation(o)
    setTimeout(() => {
      onComplete({ name, age: parseInt(age), gender, orientation: o })
    }, 300)
  }

  return (
    <View style={styles.container}>
      {/* Progress Dots */}
      <View style={styles.dots}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <TouchableOpacity key={i} onPress={() => handleSlide(i)}>
            <View style={[styles.dot, step >= i && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        ref={scrollRef}
        horizontal 
        pagingEnabled 
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Slides 0-2: Intro */}
        {slides.map((slide, i) => (
          <View key={i} style={styles.slide}>
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideDesc}>{slide.desc}</Text>
            {i < 2 && (
              <TouchableOpacity style={styles.nextButton} onPress={() => handleSlide(i + 1)}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            )}
            {i === 2 && (
              <TouchableOpacity style={styles.startButton} onPress={() => handleSlide(3)}>
                <Text style={styles.startText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Slide 3: Name */}
        <View style={styles.slide}>
          <Text style={styles.inputLabel}>What should we call you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#bbb"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <TouchableOpacity 
            style={[styles.continueButton, !name.trim() && styles.buttonDisabled]} 
            onPress={handleNameSubmit}
            disabled={!name.trim()}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Slide 4: Age */}
        <View style={styles.slide}>
          <Text style={styles.inputLabel}>How old are you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Your age"
            placeholderTextColor="#bbb"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.ageHint}>Must be 18 or older</Text>
          <TouchableOpacity 
            style={[styles.continueButton, (!age || parseInt(age) < 18) && styles.buttonDisabled]} 
            onPress={handleAgeSubmit}
            disabled={!age || parseInt(age) < 18}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Slide 5: Gender */}
        <View style={styles.slide}>
          <Text style={styles.inputLabel}>I identify as</Text>
          <View style={styles.options}>
            {genderOptions.map(g => (
              <TouchableOpacity 
                key={g} 
                style={[styles.option, gender === g && styles.optionSelected]}
                onPress={() => handleGenderSelect(g)}
              >
                <Text style={[styles.optionText, gender === g && styles.optionTextSelected]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Slide 6: Orientation */}
        <View style={styles.slide}>
          <Text style={styles.inputLabel}>Interested in</Text>
          <View style={styles.options}>
            {orientationOptions.map(o => (
              <TouchableOpacity 
                key={o} 
                style={[styles.option, orientation === o && styles.optionSelected]}
                onPress={() => handleOrientationSelect(o)}
              >
                <Text style={[styles.optionText, orientation === o && styles.optionTextSelected]}>{o}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7', paddingTop: 60 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ddd' },
  dotActive: { backgroundColor: '#1a1a1a' },
  slide: { width, padding: 40, alignItems: 'center', justifyContent: 'center' },
  slideTitle: { fontFamily: 'Cormorant Garamond', fontSize: 36, fontStyle: 'italic', color: '#1a1a1a', textAlign: 'center', marginBottom: 16, lineHeight: 44 },
  slideDesc: { fontFamily: 'Space Mono', fontSize: 12, color: '#666', textAlign: 'center', marginBottom: 40 },
  nextButton: { marginTop: 20 },
  nextText: { fontFamily: 'Space Mono', fontSize: 12, color: '#999' },
  startButton: { backgroundColor: '#1a1a1a', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, marginTop: 20 },
  startText: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  inputLabel: { fontFamily: 'Cormorant Garamond', fontSize: 28, fontStyle: 'italic', color: '#1a1a1a', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#fff', borderRadius: 16, padding: 20, fontFamily: 'Space Mono', fontSize: 18, color: '#1a1a1a', borderWidth: 2, borderColor: '#eee', width: '100%', textAlign: 'center' },
  ageHint: { fontFamily: 'Space Mono', fontSize: 10, color: '#999', marginTop: 12 },
  continueButton: { backgroundColor: '#1a1a1a', borderRadius: 30, paddingVertical: 16, paddingHorizontal: 50, marginTop: 30 },
  buttonDisabled: { opacity: 0.4 },
  continueText: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  options: { width: '100%', gap: 12 },
  option: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 2, borderColor: '#eee', alignItems: 'center' },
  optionSelected: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  optionText: { fontFamily: 'Space Mono', fontSize: 14, color: '#333' },
  optionTextSelected: { color: '#fff' },
})
