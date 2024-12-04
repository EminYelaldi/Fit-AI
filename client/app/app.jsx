import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import FrontPage from './src/screens/frontpage';
import FormScreen from './src/screens/form';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false); // Font yükleme durumunu kontrol eden state

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BebasNeue: require('./src/assets/fonts/BebasNeue-Regular.ttf'), // Font dosyası yolu
      });
      setFontsLoaded(true); // Fontlar yüklendikten sonra state'i güncelle
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Fontlar yüklenmeden önce yükleme göstergesi
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FrontPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Siyah bir arka plan
  },
});

export default App;