import React, { useState } from 'react';
import { View, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, IconButton, Avatar, Text } from "react-native-paper";
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import styles from './Login.style';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin!');
      return;
    }
    // Giriş başarılıysa, form sayfasına yönlendir
    Alert.alert('Başarılı', 'Giriş başarılı!', [
      { text: 'Tamam', onPress: () => router.push('/src/screens/form') }
    ]);
  };

  const handleForgotPassword = () => {
    router.push('/src/screens/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/src/screens/sign-up');
  };
  const handleGoBack = () => {
    router.push('/src/screens/frontpage'); // Ana sayfaya (Front Page) yönlendirme
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backLink} onPress={handleGoBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#BBF246" />
      </TouchableOpacity>


      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false} // Kaydırma çubuğunu gizler
        >
          <View style={styles.background}>
            {/* Üstte Logo */}
            <Image
              source={require('../assets/photos/logo.png')} // Logo dosyanız
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Başlık */}
            <Text style={[styles.title, { fontFamily: 'BebasNeue' }]}>GYM LOGIN</Text>


            {/* Giriş Alanları */}

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email" size={24} color="#BBF246" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                textColor='#BBF246'
                placeholder="Email"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Şifre Alanı */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock" size={24} color="#BBF246" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                textColor='#BBF246'
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
