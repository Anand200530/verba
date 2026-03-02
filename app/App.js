import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

// Screens
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import QuizScreen from './screens/QuizScreen'
import ProfileScreen from './screens/ProfileScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import ChatScreen from './screens/ChatScreen'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [userName, setUserName] = useState('')
  const [quizData, setQuizData] = useState({})
  const [profileData, setProfileData] = useState({})

  const handleOnboardingComplete = (name) => {
    setUserName(name)
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = (data) => {
    setQuizData(data)
    setCurrentScreen('profile')
  }

  const handleProfileComplete = (data) => {
    setProfileData(data)
    setCurrentScreen('discover')
  }

  // Navigation
  switch (currentScreen) {
    case 'splash':
      return (
        <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
      )
    
    case 'onboarding':
      return (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )
    
    case 'quiz':
      return (
        <QuizScreen 
          userName={userName}
          onComplete={handleQuizComplete} 
        />
      )
    
    case 'profile':
      return (
        <ProfileScreen 
          userName={userName}
          quizData={quizData}
          onComplete={handleProfileComplete}
        />
      )
    
    case 'discover':
      return (
        <DiscoverScreen
          userName={userName}
          profileData={profileData}
          onOpenChat={(match) => setCurrentScreen('chat')}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )
    
    case 'chat':
      return (
        <ChatScreen
          userName={userName}
          onBack={() => setCurrentScreen('discover')}
        />
      )
    
    case 'settings':
      return (
        <SettingsScreen
          userName={userName}
          profileData={profileData}
          onBack={() => setCurrentScreen('discover')}
          onSignOut={() => {
            setUserName('')
            setQuizData({})
            setProfileData({})
            setCurrentScreen('onboarding')
          }}
        />
      )
    
    default:
      return (
        <View style={styles.container} />
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
  },
})
