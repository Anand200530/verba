import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import ProfileScreen from './screens/ProfileScreen'
import QuizScreen from './screens/QuizScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import ChatsListScreen from './screens/ChatsListScreen'
import ThoughtsScreen from './screens/ThoughtsScreen'
import DailyPromptScreen from './screens/DailyPromptScreen'
import VibeQuizScreen from './screens/VibeQuizScreen'
import MatchScreen from './screens/MatchScreen'
import ChatScreen from './screens/ChatScreen'
import SettingsScreen from './screens/SettingsScreen'

import { hasCompletedOnboarding, getUserProfile, getSettings, saveUserProfile, saveQuizData, saveSettings, clearUserProfile, getQuizData } from './lib/storage'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [settings, setSettings] = useState({ ghostMode: true })
  const [matchedProfile, setMatchedProfile] = useState(null)
  const [activeChat, setActiveChat] = useState(null)

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

  const handleOnboardingComplete = async (data) => {
    const fullData = { name: data.name, age: data.age, gender: data.gender, orientation: data.orientation, bio: '', interests: [], quizData: {} }
    await saveUserProfile(fullData)
    setUserData(fullData)
    setCurrentScreen('profile')
  }

  const handleProfileComplete = async (data) => {
    const fullData = { ...userData, ...data }
    await saveUserProfile(fullData)
    setUserData(fullData)
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = async (data) => {
    const fullData = { ...userData, quizData: data }
    await saveUserProfile(fullData)
    await saveQuizData(data)
    setUserData(fullData)
    setCurrentScreen('discover')
  }

  const handleMatch = (profile) => {
    const matchData = { ...profile, sharedInterests: profile.interests ? profile.interests.slice(0, 2) : [], compatibility: Math.floor(70 + Math.random() * 30) }
    setMatchedProfile(matchData)
    setCurrentScreen('match')
  }

  const handleSendMessage = () => {
    setCurrentScreen('chats')
  }

  const handleKeepSwiping = () => {
    setMatchedProfile(null)
    setCurrentScreen('discover')
  }

  const handleOpenChat = (chat) => {
    setActiveChat(chat)
    setCurrentScreen('chat')
  }

  const handleSettingsChange = async (newSettings) => {
    setSettings(newSettings)
    await saveSettings(newSettings)
  }

  const handleSignOut = async () => {
    await clearUserProfile()
    setUserData(null)
    setMatchedProfile(null)
    setActiveChat(null)
    setCurrentScreen('onboarding')
  }

  const handleEditProfile = () => {
    setCurrentScreen('profile')
  }

  const handleVibeComplete = () => {
    setCurrentScreen('discover')
  }

  const goToDiscover = () => {
    setCurrentScreen('discover')
  }

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color="#1a1a1a" /></View>
  }

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
    case 'onboarding':
      return <OnboardingScreen onComplete={handleOnboardingComplete} />
    case 'profile':
      return <ProfileScreen userData={userData} onComplete={handleProfileComplete} onBack={goToDiscover} isEditing={true} />
    case 'quiz':
      return <QuizScreen userData={userData} onComplete={handleQuizComplete} onBack={() => setCurrentScreen('profile')} />
    case 'discover':
      return <DiscoverScreen 
        userData={userData} 
        onMatch={handleMatch} 
        onOpenSettings={() => setCurrentScreen('settings')} 
        onOpenChats={() => setCurrentScreen('chats')} 
        onOpenThoughts={() => setCurrentScreen('thoughts')} 
        onOpenVibeQuiz={() => setCurrentScreen('vibequiz')}
        onOpenDailyPrompt={() => setCurrentScreen('dailyprompt')}
      />
    case 'chats':
      return <ChatsListScreen 
        userData={userData} 
        onOpenChat={handleOpenChat} 
        onOpenDiscover={goToDiscover} 
        onOpenSettings={() => setCurrentScreen('settings')} 
        onOpenThoughts={() => setCurrentScreen('thoughts')} 
      />
    case 'thoughts':
      return <ThoughtsScreen 
        userData={userData} 
        onBack={goToDiscover} 
        onOpenDiscover={goToDiscover} 
        onOpenSettings={() => setCurrentScreen('settings')} 
      />
    case 'dailyprompt':
      return <DailyPromptScreen onBack={goToDiscover} onClose={goToDiscover} />
    case 'vibequiz':
      return <VibeQuizScreen onComplete={handleVibeComplete} onBack={goToDiscover} />
    case 'match':
      return <MatchScreen matchData={matchedProfile} onSendMessage={handleSendMessage} onKeepSwiping={handleKeepSwiping} />
    case 'chat':
      return <ChatScreen userData={userData} chatData={activeChat} onBack={() => setCurrentScreen('chats')} />
    case 'settings':
      return <SettingsScreen 
        userData={userData} 
        settings={settings} 
        onSettingsChange={handleSettingsChange} 
        onBack={goToDiscover} 
        onSignOut={handleSignOut} 
        onEditProfile={handleEditProfile} 
        onOpenThoughts={() => setCurrentScreen('thoughts')} 
      />
    default:
      return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
  }
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#faf9f7' },
})
