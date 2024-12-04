import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ProgramScreen = () => {
  const params = useLocalSearchParams() || {};

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
    <View style={styles.container}>
      <Text style={styles.title}>Oluşturulan Program</Text>
      <FlatList
        data={programData}
        keyExtractor={(item) => `day-${item.gün}`}
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayTitle}>Gün {item.gün}</Text>
            {item.hareketler.map((hareket, index) => (
              <View key={`hareket-${index}`} style={styles.exerciseContainer}>
                <Text style={styles.exerciseText}>
                  {hareket.adı} - {hareket.set} Set x {hareket.tekrar} Tekrar
                </Text>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  dayContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 5,
  },
  exerciseText: {
    fontSize: 16,
  },
});
export default ProgramScreen;