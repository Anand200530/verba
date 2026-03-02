import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { supabase, getCurrentUser, signIn, signUp, signOut } from './lib/supabase'

// Screens (we'll update these next)
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import QuizScreen from './screens/QuizScreen'
import ProfileScreen from './screens/ProfileScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import ChatScreen from './screens/ChatScreen'
import MatchScreen from './screens/MatchScreen'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    // Check active session
    getCurrentUser().then(({ user }) => {
      setSession(user)
      if (user) {
        checkProfile(user.id)
      } else {
        setLoading(false)
        setCurrentScreen('onboarding')
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) {
        setCurrentScreen('onboarding')
        setUserProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    setUserProfile(data)
    setLoading(false)
    
    if (data) {
      setCurrentScreen('discover')
    } else {
      setCurrentScreen('quiz')
    }
  }

  const handleSignUp = async (email, password) => {
    const { data, error } = await signUp(email, password)
    if (error) {
      alert(error.message)
      return false
    }
    setSession(data.user)
    setCurrentScreen('quiz')
    return true
  }

  const handleSignIn = async (email, password) => {
    const { data, error } = await signIn(email, password)
    if (error) {
      alert(error.message)
      return false
    }
    setSession(data.user)
    return true
  }

  const handleSignOut = async () => {
    await signOut()
    setSession(null)
    setUserProfile(null)
    setCurrentScreen('onboarding')
  }

  const completeQuiz = (quizData) => {
    setCurrentScreen('profile')
  }

  const completeProfile = (profileData) => {
    setCurrentScreen('discover')
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    )
  }

  // Navigation
  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
    
    case 'onboarding':
      return (
        <OnboardingScreen
          onSignUp={handleSignUp}
          onSignIn={handleSignIn}
        />
      )
    
    case 'quiz':
      return <QuizScreen onComplete={completeQuiz} />
    
    case 'profile':
      return (
        <ProfileScreen
          user={session}
          onComplete={completeProfile}
        />
      )
    
    case 'discover':
      return (
        <DiscoverScreen
          user={session}
          profile={userProfile}
          onOpenChat={(match) => setCurrentScreen('chat')}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )
    
    case 'chat':
      return (
        <ChatScreen
          match={null}
          profile={userProfile}
          onBack={() => setCurrentScreen('discover')}
        />
      )
    
    case 'settings':
      return (
        <SettingsScreen
          profile={userProfile}
          onSignOut={handleSignOut}
          onBack={() => setCurrentScreen('discover')}
        />
      )
    
    default:
      return <OnboardingScreen onSignUp={handleSignUp} onSignIn={handleSignIn} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
