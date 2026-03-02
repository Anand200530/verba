import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const slides = [
  { text: "What you say matters, not how you look" },
  { text: "Words create connection" },
  { text: "Let your story be heard" },
]

export default function OnboardingScreen({ onSignUp, onSignIn }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const nextSlide = () => {
    if (slideIndex < slides.length) {
      setSlideIndex(slideIndex + 1)
    }
  }

  const handleSubmit = async () => {
    if (!email || !password) return
    if (isLogin) {
      await onSignIn(email, password)
    } else {
      await onSignUp(email, password)
    }
  }

  if (slideIndex < slides.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>VERBA</Text>
        <Text style={styles.tag}>WORDS BEFORE LOOKS</Text>
        
        <View style={styles.slidesContainer}>
          {slides.map((slide, i) => (
            <Text 
              key={i} 
              style={[styles.slideText, i === slideIndex && styles.activeSlide]}
            >
              {slide.text}
            </Text>
          ))}
        </View>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === slideIndex && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={nextSlide}>
          <Text style={styles.btnText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (isLogin) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.formContent}>
        <Text style={styles.logo}>VERBA</Text>
        <Text style={styles.tag}>WORDS BEFORE LOOKS</Text>

        <View style={styles.form}>
          <Text style={styles.formTitle}>{isLogin ? 'Welcome back' : 'Join Verba'}</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>{isLogin ? 'SIGN IN' : 'SIGN UP'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchBtn} onPress={() => setIsLogin(false)}>
            <Text style={styles.switchText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>VERBA</Text>
      <Text style={styles.tag}>WORDS BEFORE LOOKS</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setIsLogin(true)}>
        <Text style={styles.btnText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
    padding: 30,
    paddingTop: 60,
  },
  logo: {
    fontFamily: 'Space Mono',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
  },
  tag: {
    fontFamily: 'Space Mono',
    fontSize: 8,
    letterSpacing: 4,
    textAlign: 'center',
    color: '#bbb',
    marginBottom: 50,
  },
  slidesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 26,
    textAlign: 'center',
    lineHeight: 38,
    color: '#1a1a1a',
    fontStyle: 'italic',
    display: 'none',
  },
  activeSlide: {
    display: 'flex',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    margin: 40,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',
  },
  activeDot: {
    backgroundColor: '#1a1a1a',
  },
  btn: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  btnText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    letterSpacing: 3,
    color: '#fff',
    textAlign: 'center',
  },
  formContent: {
    padding: 30,
    paddingTop: 60,
  },
  form: {
    marginTop: 40,
  },
  formTitle: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    fontFamily: 'Space Mono',
    fontSize: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  switchBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#1a1a1a',
  },
})
