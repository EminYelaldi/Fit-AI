import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView,ScrollView,Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import styles from './sign-up.style';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
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
    Alert.alert('Başarılı', 'Kayıt başarılı!');
    router.push('/src/screens/login');
  };
  const handleGoBack = () => {
    router.push('/src/screens/Login'); // Giriş ekranına geri dönüş
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.background}>
            {/* Başlık */}
            <Text style={[styles.title, { fontFamily: 'BebasNeue' }]}>Sign Up</Text>

            {/* Kayıt Alanları */}
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
             {/* Şifre Alanı */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={24} color="#BBF246" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              textColor='#BBF246'
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
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
