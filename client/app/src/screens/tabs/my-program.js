import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ProgramContext } from "../../components/program-context";
import { Divider } from "react-native-paper";


const HomeScreen = () => {
  const { programData } = useContext(ProgramContext);

  if (!programData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Henüz bir program oluşturulmadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Program Listesi</Text>
      <FlatList
        data={programData}
        keyExtractor={(item, index) => `program-${index}`}
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: '40',
    color: '#BBF246',
    marginBottom: 20,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  listContainer: {
    padding: 20,
    backgroundColor: '#121212',
  },
  dayContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#121212',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: '#BBF246',
    borderWidth: 1,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#BBF246',
  },
  exerciseContainer: {
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: 16,
    color: '#ccc',
  },
  divider: {
    marginVertical: 10,
    color: '#BBF246'
  }
});