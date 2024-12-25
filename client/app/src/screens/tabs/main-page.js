import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment"; // Tarih işlemleri için
import { Card, ProgressBar } from "react-native-paper";

const HomeScreen = () => {
  const [daysInMonth, setDaysInMonth] = useState([]); // Takvim verisi
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD")); // Varsayılan gün
  const [userName, setUserName] = useState(""); // Kullanıcı adı
  const [progress, setProgress] = useState(0.5); // Örnek ilerleme verisi (0-1)
  const router = useRouter();
  const flatListRef = useRef(null); // `FlatList` referansı

  useEffect(() => {
    const days = [];
    const today = moment();
    const startOfMonth = today.clone().startOf("month");
    const endOfMonth = today.clone().endOf("month");

    let currentDay = startOfMonth;
    while (currentDay <= endOfMonth) {
      days.push({
        date: currentDay.clone(),
        dayName: currentDay.format("ddd"),
      });
      currentDay = currentDay.clone().add(1, "day");
    }
    setDaysInMonth(days);

    // Kullanıcı adı örneği (AsyncStorage ile alınabilir)
    AsyncStorage.getItem("userName").then((name) => {
      setUserName(name || "User");
    });

    // Bugünkü tarihi bulup o tarihe kaydır
    const todayIndex = days.findIndex((day) => day.date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"));
    if (flatListRef.current && todayIndex !== -1) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
      }, 100); // Scroll işlemi için kısa bir gecikme
    }
  }, []);

  const handleProgramNavigation = () => {
    router.push("/src/screens/tabs/my-program");
  };

  const handleEditProfile = () => {
    router.push("/src/screens/profile");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profil Bölümü */}
      <View style={styles.profileContainer}>
        <Image source={require("../../assets/photos/woman.png")} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Takvim */}
      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>This Month's Calendar</Text>
        <FlatList
          ref={flatListRef} // `FlatList` referansı
          data={daysInMonth}
          horizontal
          keyExtractor={(item) => item.date.format("YYYY-MM-DD")}
          contentContainerStyle={styles.listContainer}
          getItemLayout={(data, index) => ({
            length: 70, // Her bir öğenin genişliği
            offset: 70 * index, // Genişlik x index
            index,
          })}
          onScrollToIndexFailed={(info) => {
            console.warn("scrollToIndexFailed:", info);
            flatListRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: true,
            });
          }}
          renderItem={({ item }) => {
            const isSelected = item.date.format("YYYY-MM-DD") === selectedDay;
            return (
              <TouchableOpacity
                style={[styles.dayItem, isSelected && styles.selectedDayItem]}
                onPress={() => setSelectedDay(item.date.format("YYYY-MM-DD"))}
              >
                <Text style={styles.dayName}>{item.dayName}</Text>
                <Text style={styles.dayNumber}>{item.date.format("D")}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Günlük Hedefler */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Today's Progress</Text>
        <ProgressBar progress={progress} color="#BBF246" style={styles.progressBar} />
        <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>
      </Card>

      {/* Motivasyon Mesajı */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Fitness Tip</Text>
        <Text style={styles.cardContent}>Stay hydrated! Drink at least 2 liters of water daily. 💧</Text>
      </Card>

      {/* Program Sayfasına Yönlendirme */}
      <TouchableOpacity style={styles.programButton} onPress={handleProgramNavigation}>
        <Text style={styles.programButtonText}>Go to Your Program</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: "#FFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BBF246",
  },
  editProfile: {
    color: "#BBF246",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#BBF246",
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayItem: {
    width: 50,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "#222",
  },
  selectedDayItem: {
    backgroundColor: "#BBF246",
  },
  dayName: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  card: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#BBF246",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: "#FFF",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 10,
  },
  programButton: {
    backgroundColor: "#BBF246",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  programButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});