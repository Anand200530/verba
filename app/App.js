import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

// Screens
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import ProfileScreen from './screens/ProfileScreen'
import QuizScreen from './screens/QuizScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import MatchScreen from './screens/MatchScreen'
import ChatScreen from './screens/ChatScreen'
import SettingsScreen from './screens/SettingsScreen'

// Storage
import { 
  hasCompletedOnboarding, 
  getUserProfile, 
  getSettings, 
  saveUserProfile,
  saveQuizData,
  saveSettings,
  clearUserProfile,
  getQuizData
} from './lib/storage'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [settings, setSettings] = useState({ ghostMode: true })
  const [matchedProfile, setMatchedProfile] = useState(null)

  useEffect(() => {
    checkExistingUser()
  }, [])

  const checkExistingUser = async () => {
    const hasOnboarded = await hasCompletedOnboarding()
    if (hasOnboarded) {
      const profile = await getUserProfile()
      const quizData = await getQuizData()
      const appSettings = await getSettings()
      
      if (profile) {
        setUserData({ ...profile, quizData: quizData || {} })
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

  const handleOnboardingComplete = async (onboardingData) => {
    const fullData = {
      name: onboardingData.name,
      age: onboardingData.age,
      gender: onboardingData.gender,
      orientation: onboardingData.orientation,
      bio: '',
      interests: [],
      quizData: {},
    }
    await saveUserProfile(fullData)
    setUserData(fullData)
    setCurrentScreen('profile')
  }

  const handleProfileComplete = async (profileData) => {
    const fullData = { ...userData, ...profileData }
    await saveUserProfile(fullData)
    setUserData(fullData)
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = async (quizData) => {
    const fullData = { ...userData, quizData }
    await saveUserProfile(fullData)
    await saveQuizData(quizData)
    setUserData(fullData)
    setCurrentScreen('discover')
  }

  const handleMatch = (profile) => {
    const matchData = {
      ...profile,
      sharedInterests: profile.interests ? profile.interests.slice(0, 2) : [],
      compatibility: Math.floor(70 + Math.random() * 30),
    }
    setMatchedProfile(matchData)
    setCurrentScreen('match')
  }

  const handleSendMessage = () => {
    setCurrentScreen('chat')
  }

  const handleKeepSwiping = () => {
    setMatchedProfile(null)
    setCurrentScreen('discover')
  }

  const handleSettingsChange = async (newSettings) => {
    setSettings(newSettings)
    await saveSettings(newSettings)
  }

  const handleSignOut = async () => {
    await clearUserProfile()
    setUserData(null)
    setCurrentScreen('onboarding')
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1a1a1a" />
      </View>
    )
  }

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
    
    case 'onboarding':
      return <OnboardingScreen onComplete={handleOnboardingComplete} />
    
    case 'profile':
      return <ProfileScreen userData={userData} onComplete={handleProfileComplete} />
    
    case 'quiz':
      return <QuizScreen userData={userData} onComplete={handleQuizComplete} />
    
    case 'discover':
      return (
        <DiscoverScreen
          userData={userData}
          onMatch={handleMatch}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )
    
    case 'match':
      return (
        <MatchScreen
          matchData={matchedProfile}
          onSendMessage={handleSendMessage}
          onKeepSwiping={handleKeepSwiping}
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
