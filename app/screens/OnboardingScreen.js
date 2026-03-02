import React, { useState, useRef } from 'react'
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Animated, Dimensions, KeyboardAvoidingView, Platform,
  Alert 
} from 'react-native'

const { width } = Dimensions.get('window')

const slides = [
  { 
    text: "What you say matters, not how you look", 
    subtext: "Connect through words, not appearances"
  },
  { 
    text: "Your story is your introduction", 
    subtext: "Let your writing speak for you"
  },
  { 
    text: "Photos reveal only when both agree", 
    subtext: "True connection comes from within"
  },
]

export default function OnboardingScreen({ onSignUp, onSignIn }) {
  const [screen, setScreen] = useState('onboarding') // 'onboarding' | 'auth'
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'
  const [slideIndex, setSlideIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const scrollX = useRef(new Animated.Value(0)).current

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  )

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please fill in all fields')
      return
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      if (authMode === 'login') {
        await onSignIn(email, password)
      } else {
        await onSignUp(email, password)
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong')
    }
    setLoading(false)
  }

  // Onboarding Screen
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
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.slideScroll}
        >
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <View style={styles.slideIconContainer}>
                <Text style={styles.slideIcon}>
                  {index === 0 ? '✍️' : index === 1 ? '📖' : '🎭'}
                </Text>
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
                style={[
                  styles.dot, 
                  { transform: [{ scale }], opacity }
                ]} 
              />
            )
          })}
        </View>

        <View style={styles.onboardingFooter}>
          <TouchableOpacity 
            style={styles.primaryBtn}
            onPress={() => setScreen('auth')}
          >
            <Text style={styles.primaryBtnText}>GET STARTED</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => { setScreen('auth'); setAuthMode('login'); }}
          >
            <Text style={styles.loginLinkText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Auth Screen
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        contentContainerStyle={styles.authContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => setScreen('onboarding')}
        >
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>

        <View style={styles.authHeader}>
          <Text style={styles.logo}>VERBA</Text>
          <Text style={styles.tagline}>WORDS BEFORE LOOKS</Text>
        </View>

        <View style={styles.authForm}>
          <Text style={styles.authTitle}>
            {authMode === 'login' ? 'Welcome back' : 'Create your account'}
          </Text>
          <Text style={styles.authSubtitle}>
            {authMode === 'login' 
              ? 'Sign in to continue your journey' 
              : 'Start by telling your story'}
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              placeholderTextColor="#bbb"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#bbb"
            />
          </View>

          {authMode === 'signup' && (
            <Text style={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          )}

          <TouchableOpacity 
            style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? 'PLEASE WAIT...' : authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchMode}
            onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          >
            <Text style={styles.switchModeText}>
              {authMode === 'login' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  onboardingFooter: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  primaryBtn: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    letterSpacing: 3,
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#1a1a1a',
  },
  
  // Auth Styles
  authContent: {
    padding: 30,
    paddingTop: 40,
  },
  backBtn: {
    marginBottom: 20,
    width: 40,
  },
  backBtnText: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  authForm: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  authTitle: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 26,
    fontStyle: 'italic',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  authSubtitle: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    letterSpacing: 1,
    color: '#999',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#faf9f7',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontFamily: 'Space Mono',
    fontSize: 13,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#eee',
  },
  termsText: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  dividerText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#ccc',
    marginHorizontal: 12,
  },
  socialBtn: {
    backgroundColor: '#faf9f7',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  socialBtnText: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    color: '#1a1a1a',
  },
  switchMode: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchModeText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#1a1a1a',
  },
})
