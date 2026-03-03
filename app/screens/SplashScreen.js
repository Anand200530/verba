import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

export default function SplashScreen({ onFinish }) {
  const fadeAnim = new Animated.Value(0)
  const scaleAnim = new Animated.Value(0.8)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      onFinish()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.logo}>V</Text>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>VERBA</Animated.Text>
      <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>Words Before Looks</Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  logo: { fontFamily: 'Space Mono', fontSize: 48, fontWeight: 'bold', color: '#1a1a1a' },
  title: { fontFamily: 'Space Mono', fontSize: 28, fontWeight: 'bold', color: '#fff', letterSpacing: 8, marginBottom: 8 },
  tagline: { fontFamily: 'Cormorant Garamond', fontSize: 18, fontStyle: 'italic', color: '#888' },
})
