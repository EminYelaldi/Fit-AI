import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView,ScrollView,Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import styles from './form.style';

const FormScreen = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!age || !height || !weight) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }
    const requestBody = {

      message: `yaş:${age}, kilo:${weight}, gün sayısı:${daysPerWeek}, boy:${height}`
    };

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Program oluşturulurken bir hata oluştu!');
      }

      const data = await response.json();
      
      // Yanıtı Program ekranına yönlendirin
      console.log(JSON.stringify(data.reply.program));
      router.push({
        pathname: '/src/screens/program',
        params: { program: JSON.stringify(data.reply.program) }, 
      });
    } catch (error) {
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false} // Kaydırma çubuğunu gizler
        >
    <View style={styles.container}>
      <Text style={styles.title}>Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Yaş"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Boy (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Kilo (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>Haftada Kaç Gün: {daysPerWeek}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={7}
          step={1}
          value={daysPerWeek}
          onValueChange={setDaysPerWeek}
          minimumTrackTintColor="#dfff00"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#dfff00"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Bilgileri Gönder</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  </KeyboardAvoidingView>
  );
};

export default FormScreen;