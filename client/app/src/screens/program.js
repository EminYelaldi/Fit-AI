import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import { Divider } from "react-native-paper";
import styles from './program.style';

const ProgramScreen = () => {
  const params = useLocalSearchParams() || {};
  const router = useRouter();
  const handleGoBack = () => {
    router.push('/src/screens/form'); // Ana sayfaya (Front Page) yönlendirme
  };

  // Program verisini al ve JSON olarak çöz
  let programData = null;
  try {
    if (typeof params.program === "string") {
      programData = JSON.parse(params.program); // JSON string ise parse et
    } else {
      console.error("Program parametresi string formatında değil:", params.program);
    }
  } catch (error) {
    console.error("JSON Parse Hatası:", error);
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
      </View>
    </SafeAreaView>
  );
};

export default ProgramScreen;