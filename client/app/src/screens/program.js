import React, { useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import { Divider } from "react-native-paper";
import { ProgramContext } from "../components/program-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/program.style';

const ProgramScreen = () => {
  const params = useLocalSearchParams() || {};
  const router = useRouter();
  const { programData, setProgramData } = useContext(ProgramContext);

  const handleGoBack = () => {
    router.push('/src/screens/form'); // Ana sayfaya (Front
  }
    const saveProgram = () => {
      Alert.alert('Başarılı', 'Programınız başarılı bir şekilde kaydedildi !');
      router.push('/src/screens/tabs/main-page');
    }
  const saveProgramToDatabase = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Hata', 'Kullanıcı ID bulunamadı. Lütfen tekrar giriş yapın.');
        return;
      }

      const response = await fetch('http://localhost:6000/save-program', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          program: programData,
        }),
      });

      if (!response.ok) {
        throw new Error('Program veritabanına kaydedilemedi.');
      }

      Alert.alert('Başarılı', 'Program başarıyla kaydedildi.');
    } catch (error) {
      console.error('Program Kaydetme Hatası:', error);
      Alert.alert('Hata', error.message || 'Program kaydedilirken bir hata oluştu.');
    }
  };
  // Program verisini al ve JSON olarak çöz
  useEffect(() => {
    if (params.program) {
      try {
        const parsedProgram = JSON.parse(params.program);

        // Yalnızca programData boşsa güncelle
        if (!programData) {
          setProgramData(parsedProgram);
        }
      } catch (error) {
        console.error("JSON Parse Hatası:", error);
      }
    }
  }, [params.program]);

  if (!programData) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Program verisi yükleniyor...</Text>
      </View>
    );
  }

  // Program verisi kontrolü
  if (!programData || !Array.isArray(programData)) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Program verisi bulunamadı veya geçersiz formatta.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backLink} onPress={handleGoBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#BBF246" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={[styles.title, { fontFamily: 'BebasNeue' }]}>Workout Program</Text>
        <FlatList
          data={programData}
          keyExtractor={(item) => `day-${item.gün}`}
          renderItem={({ item }) => (
            <View style={styles.dayContainer}>
              <Text style={styles.dayTitle}>Day {item.gün}</Text>
              {item.hareketler.map((hareket, index) => (
                <View key={`hareket-${index}`} style={styles.exerciseContainer}>

                  <Text style={styles.exerciseText}>
                    {hareket.adı} - {hareket.set} Set x {hareket.tekrar} Reps
                  </Text>
                  <Divider style={styles.divider} />
                </View>
              ))}
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveProgram}>
          <Text style={styles.saveButtonText}>Programı Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProgramScreen;