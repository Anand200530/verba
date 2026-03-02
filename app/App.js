import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

// Screens
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import QuizScreen from './screens/QuizScreen'
import ProfileScreen from './screens/ProfileScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import ChatScreen from './screens/ChatScreen'
import SettingsScreen from './screens/SettingsScreen'

// Storage
import { hasCompletedOnboarding, getUserProfile, getSettings, clearUserProfile } from './lib/storage'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    bio: '',
    interests: '',
    quizData: {},
  })
  const [settings, setSettings] = useState({ ghostMode: true })

  useEffect(() => {
    checkExistingUser()
  }, [])

  const checkExistingUser = async () => {
    const hasOnboarded = await hasCompletedOnboarding()
    if (hasOnboarded) {
      const profile = await getUserProfile()
      const quizData = await getUserData()
      const appSettings = await getSettings()
      
      if (profile) {
        setUserData({
          name: profile.name || '',
          age: profile.age || '',
          bio: profile.bio || '',
          interests: profile.interests || '',
          quizData: quizData || {},
        })
        setSettings(appSettings)
        setCurrentScreen('discover')
      } else {
        setCurrentScreen('onboarding')
      }
    } else {
      setCurrentScreen('onboarding')
    }
    setLoading(false)
  }

  const handleOnboardingComplete = async (name) => {
    setUserData(prev => ({ ...prev, name }))
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = async (quizData) => {
    setUserData(prev => ({ ...prev, quizData }))
    await saveQuizData(quizData)
    setCurrentScreen('profile')
  }

  const handleProfileComplete = async (profileData) => {
    const fullData = {
      ...userData,
      ...profileData,
    }
    setUserData(fullData)
    await saveUserProfile(fullData)
    setCurrentScreen('discover')
  }

  const handleSettingsChange = async (newSettings) => {
    setSettings(newSettings)
    await saveSettings(newSettings)
  }

  const handleSignOut = async () => {
    await clearUserProfile()
    setUserData({
      name: '',
      age: '',
      bio: '',
      interests: '',
      quizData: {},
    })
    setCurrentScreen('onboarding')
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1a1a1a" />
      </View>
    )
  }

  // Navigation
  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
    
    case 'onboarding':
      return <OnboardingScreen onComplete={handleOnboardingComplete} />
    
    case 'quiz':
      return (
        <QuizScreen 
          userName={userData.name}
          onComplete={handleQuizComplete} 
        />
      )
    
    case 'profile':
      return (
        <ProfileScreen 
          userName={userData.name}
          onComplete={handleProfileComplete}
        />
      )
    
    case 'discover':
      return (
        <DiscoverScreen
          userData={userData}
          onOpenChat={(match) => setCurrentScreen('chat')}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )
    
    case 'chat':
      return (
        <ChatScreen
          userData={userData}
          onBack={() => setCurrentScreen('discover')}
        />
      )
    
    case 'settings':
      return (
        <SettingsScreen
          userData={userData}
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onBack={() => setCurrentScreen('discover')}
          onSignOut={handleSignOut}
        />
      )
    
    default:
      return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf9f7',
  },
})
