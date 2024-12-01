import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import styles from './form.style';

const FormScreen = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState(''); // 'gym' veya 'home'
  const [daysPerWeek, setDaysPerWeek] = useState(3); // Slider başlangıç değeri
  const router = useRouter();

  const handleSubmit = () => {
    if (!age || !height || !weight || !location) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }

    router.push('/src/screens/program');

    Alert.alert(
      'Bilgileriniz',
      `Yaş: ${age}, Boy: ${height}, Kilo: ${weight}, Spor Yeri: ${
        location === 'gym' ? 'Spor Salonu' : 'Ev'
      }, Haftada: ${daysPerWeek} Gün`
    );
  };

  const handleLocationSelection = (selectedLocation) => {
    if (location === selectedLocation) {
      setLocation(''); // Seçimi kaldır
    } else {
      setLocation(selectedLocation);
    }
  };

  return (
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
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, location === 'gym' && styles.selectedCheckbox]}
          onPress={() => handleLocationSelection('gym')}
        >
          <Text style={styles.checkboxText}>Spor Salonu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, location === 'home' && styles.selectedCheckbox]}
          onPress={() => handleLocationSelection('home')}
        >
          <Text style={styles.checkboxText}>Ev</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>Haftada Kaç Gün: {daysPerWeek}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={7}
          step={1}
          value={daysPerWeek}
          onValueChange={(value) => setDaysPerWeek(value)}
          minimumTrackTintColor="#007BFF"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#007BFF"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Bilgileri Gönder</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/src/screens/Login')}>
        <Text style={styles.linkText}>Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
};



export default FormScreen;
