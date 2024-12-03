import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import styles from './program.style';

const ProgramScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgramData = async () => {
    try {
      const response = await fetch('https://gist.githubusercontent.com/EminYelaldi/134c9e3c8a56c4ac1df56fd9a12c2f23/raw/0b3d745f29725f42dec81c52f6939d347e9f1469/gistfile1.txt');
      if (!response.ok) {
        throw new Error('Veri alınırken bir hata oluştu!');
      }
      const jsonData = await response.json();
      setData(jsonData.program);
      setLoading(false);
    } catch (error) {
      Alert.alert('Hata', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loaderText}>Veriler Yükleniyor...</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Gösterilecek veri bulunamadı.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
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
  );
};



export default ProgramScreen;