import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './frontpage.style';

const FrontPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/src/screens/sign-up'); // Get Started için hedef rota
  };

  const handleLogin = () => {
    router.push('/src/screens/Login'); // Login için hedef rota
  };

  return (
    <ImageBackground
      source={require('../assets/photos/man.png')} // Arka plan resmi
      style={styles.background}
      resizeMode="cover"
      padding= '40'
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Gym App</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        </View>
    </ImageBackground>
  );
};

export default FrontPage;