import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    setTimeout(() => onFinish(), 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>VERBA</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf9f7',
  },
  logo: {
    fontFamily: 'Space Mono',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
})
