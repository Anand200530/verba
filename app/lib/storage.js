import AsyncStorage from '@react-native-async-storage/async-storage'

const KEYS = {
  USER_PROFILE: 'verba_user_profile',
  QUIZ_DATA: 'verba_quiz_data',
  MATCHES: 'verba_matches',
  MESSAGES: 'verba_messages',
  SETTINGS: 'verba_settings',
}

// User Profile
export const saveUserProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile))
    return true
  } catch (error) {
    console.error('Error saving profile:', error)
    return false
  }
}

export const getUserProfile = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_PROFILE)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting profile:', error)
    return null
  }
}

export const clearUserProfile = async () => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.USER_PROFILE,
      KEYS.QUIZ_DATA,
      KEYS.MATCHES,
      KEYS.MESSAGES,
      KEYS.SETTINGS,
    ])
    return true
  } catch (error) {
    console.error('Error clearing profile:', error)
    return false
  }
}

// Quiz Data
export const saveQuizData = async (data) => {
  try {
    await AsyncStorage.setItem(KEYS.QUIZ_DATA, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving quiz:', error)
    return false
  }
}

export const getQuizData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.QUIZ_DATA)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting quiz:', error)
    return null
  }
}

// Settings
export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
    return true
  } catch (error) {
    console.error('Error saving settings:', error)
    return false
  }
}

export const getSettings = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.SETTINGS)
    return data ? JSON.parse(data) : { ghostMode: true }
  } catch (error) {
    console.error('Error getting settings:', error)
    return { ghostMode: true }
  }
}

// Check if user has completed onboarding
export const hasCompletedOnboarding = async () => {
  const profile = await getUserProfile()
  return profile !== null
}
