import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ProgramContext } from "../components/program-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const VotePage = () => {
  const { programData, setProgramData } = useContext(ProgramContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleWorkoutProgram = async () => {
    if (!programData.age || !programData.weight || !programData.height || !programData.gender) {
      Alert.alert("Hata", "Eksik bilgiler. Lütfen formu doldurun ve tekrar deneyin.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:6000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `yaş:${programData.age}, kilo:${programData.weight}, gün sayısı:${programData.daysPerWeek}, boy:${programData.height}, cinsiyet:${programData.gender}`,
        }),
      });

      if (!response.ok) throw new Error("Program oluşturulurken bir hata oluştu!");

      const data = await response.json();

      if (!data.reply || !data.reply.program) {
        throw new Error("Program oluşturulamadı. Yanıt formatı hatalı.");
      }

      // Programı kaydet
      setProgramData((prev) => ({ ...prev, program: data.reply.program }));

      // Program sayfasına yönlendir
      router.push({
        pathname: "/src/screens/program",
        params: { program: JSON.stringify(data.reply.program) },
      });
    } catch (error) {
      Alert.alert("Hata", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#BBF246" />
          <Text style={styles.loadingText}>Program oluşturuluyor...</Text>
        </View>
      )}
      <Text style={[styles.title, { fontFamily: "BebasNeue" }]}>Select Your Program</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => Alert.alert("Diyet Programı", "Diyet programı seçildi.")}>
          <MaterialCommunityIcons name="food-apple" size={64} color="#BBF246" />
          <Text style={styles.cardText}>Diet Program</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleWorkoutProgram}>
          <MaterialCommunityIcons name="dumbbell" size={64} color="#BBF246" />
          <Text style={styles.cardText}>Workout Program</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VotePage;

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#BBF246",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    height: 180,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#BBF246",
    marginTop: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#BBF246",
  },
});