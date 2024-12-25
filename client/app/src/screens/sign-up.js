import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // İkon kütüphanesi
import styles from './styles/sign-up.style';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor!');
      return;
    }

    try {
      // Backend'e POST isteği gönder
      const response = await fetch('http://localhost:6000/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Kullanıcı bilgileri
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kayıt sırasında bir hata oluştu.');
      }

      Alert.alert('Başarılı', 'Kayıt başarılı!');
      router.push('/src/screens/Login');
    } catch (error) {
      console.error('Kayıt Hatası:', error);
      Alert.alert('Hata', error.message || 'Bir hata oluştu.');
    }
  };

  const handleGoBack = () => {
    router.push('/src/screens/login'); // Giriş ekranına geri dönüş
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
            {/* Başlık */}
            <Text style={[styles.title, { fontFamily: 'BebasNeue' }]}>Sign Up</Text>

            {/* Kayıt Alanları */}
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

            {/* Şifre Alanı */}
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
                autoComplete="off" // Otomatik doldurmayı kapatır
                textContentType="none" // Şifre önerisini devre dışı bırakır
              />
            </View>

            {/* Şifre Onay Alanı */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="lock"
                size={24}
                color="#BBF246"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                textColor="#BBF246"
                placeholderTextColor="#ccc"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="off" // Otomatik doldurmayı kapatır
                textContentType="none" // Şifre önerisini devre dışı bırakır
              />
            </View>

            {/* Kayıt Ol Butonu */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Geri Dönüş Butonu */}
            <TouchableOpacity onPress={handleGoBack} style={styles.backContainer}>
              <Text style={styles.accountText}>Already have an account?</Text>
              <Text style={styles.goBackText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;