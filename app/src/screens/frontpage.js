import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

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
      source={require('../assets/photos/woman.png')} // Arka plan resmi
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#0f0f0f'
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Siyah transparan katman
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#dfff00',
    textAlign: 'center',
    marginTop:20,
    fontFamily: 'BebasNeue', // Daha önce yüklenen font
  },
  getStartedButton: {
    width: '40%',
    height: 50,
    backgroundColor: '#dfff00', // Fosforlu sarı
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  loginButton: {
    width: '40%',
    height: 50,
    borderWidth: 2,
    borderColor: '#dfff00', // Fosforlu sarı kenarlık
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Siyah yazı
    
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff', // Siyah yazı
    
  },
});

export default FrontPage;