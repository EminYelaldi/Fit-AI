import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import AsyncStorage from "@react-native-async-storage/async-storage"; // Kullanıcı ID'si için
import styles from './styles/Login.style';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin!');
      return;
    }
  
    try {
      // Backend ile POST isteği oluştur
      const response = await fetch('http://localhost:6000/get-user-by-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Bir hata oluştu.');
      }
    
      const userData = await response.json();
    console.log(userData);
      // Kullanıcı ID'sini AsyncStorage içine kaydedin
      await AsyncStorage.setItem('userId', userData.id);
    
      // Giriş başarılı
      Alert.alert('Başarılı', `Hoşgeldiniz, ${userData.email}`);
      router.push('/src/screens/form'); // Form ekranına yönlendirme
    } catch (error) {
      console.error('Giriş Hatası:', error);
      Alert.alert('Hata', error.message || 'Bir hata oluştu.');
    }
  }; 

  const handleForgotPassword = () => {
    router.push('/src/screens/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/src/screens/sign-up');
  };


  return (
    <SafeAreaView style={styles.safeArea}>
     
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.background}>
            {/* Logo */}
            <Image
              source={require('../assets/photos/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Başlık */}
            <Text style={[styles.title, { fontFamily: 'BebasNeue' }]}>GYM LOGIN</Text>

            {/* Giriş Alanları */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email"
                size={24}
                color="#BBF246"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                textColor="#BBF246"
                placeholder="Email"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="lock"
                size={24}
                color="#BBF246"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                textColor="#BBF246"
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={[styles.linkText]}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Butonu */}
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.neonButton}
              labelStyle={styles.neonButtonText}
            >
              LOGIN
            </Button>

            <TouchableOpacity onPress={handleSignUp} style={styles.backContainer}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <Text style={styles.goBackText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;