import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,handleGoBack,SafeAreaView,KeyboardAvoidingView,Platform,ScrollView,Alert } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './forgot-password.style';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Hata', 'Lütfen bir e-posta adresi girin!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin!');
      return;
    }
    console.log('Password reset email sent to:', email);
    Alert.alert('Başarılı', 'Şifre sıfırlama bağlantısı gönderildi!');
  };
  const handleGoBack = () => {
    router.push('/src/screens/Login'); // Login ekranına yönlendirme
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
            <Text style={styles.title}>Forgot Password</Text>

            {/* Email Giriş Alanı */}
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
            </View>

            {/* Şifre Sıfırlama Butonu */}
            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
              <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>

            {/* Geri Dönüş Butonu */}
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={styles.goBackText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default ForgotPassword;
