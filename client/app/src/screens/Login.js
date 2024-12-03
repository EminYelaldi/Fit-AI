import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,KeyboardAvoidingView,Platform,ScrollView ,Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
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
        <Text style={styles.backLinkText}>← Back</Text>
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
            
            {/* Başlık */}
            <Text style={[styles.title, { fontFamily: 'BebasNeue' }]}>GYM LOGIN</Text>


            {/* Giriş Alanları */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Login Butonu */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={[styles.loginButtonText, ]}>LOGIN</Text>
            </TouchableOpacity>

            {/* Forgot Password ve Sign Up Sağ ve Sol Uçta */}
            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={[styles.linkText]}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={[styles.linkText]}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



export default LoginScreen;
