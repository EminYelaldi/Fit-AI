import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  checkbox: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedCheckbox: {
    backgroundColor: '#007BFF',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 12,
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default FormScreen;
