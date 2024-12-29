import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";

const TabLayout = () => (
  <Tabs  screenOptions={{
    tabBarActiveTintColor: "#BBF246", // Aktif sekme rengi
    tabBarInactiveTintColor: "#FFF", // Pasif sekme rengi
    tabBarStyle: {
      backgroundColor: "#0c0c14", // Tab bar arka plan rengi
      borderTopWidth: 0, // Çizgiyi kaldırmak için
      height: 70, // Daha geniş tab bar
      paddingBottom: 10, // İkonların yerleşimini artır
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "bold", // Etkileyici font
      textTransform: "uppercase", // Tüm sekme isimleri büyük harf
    },
  }}
  >
    
    <Tabs.Screen
      name="main-page"
      options={{
        header: ({ navigation }) => (
          <View
            style={{
              backgroundColor: "#121212", // Siyah arka plan
              height: 90, // Başlık yüksekliği
              flexDirection: "row", // Butonu ve boş alanı yan yana koyar
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            {/* Geri Dönüş Butonu */}
            <TouchableOpacity
              onPress={() => navigation.goBack()} // Geri dönüş işlemi
              style={{
                paddingTop: 50,
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left" // Sol ok ikonu
                size={24}
                color="#BBF246" // Fosforlu sarı renk
              />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: false,
        title: "Main page",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={24} color={color} />
        ),
      }}
    />
    <Tabs.Screen
  name="my-program"
  options={{
    header: ({ navigation }) => (
      <View
        style={{
          backgroundColor: "#121212", // Siyah arka plan
          height: 90, // Başlık yüksekliği
          flexDirection: "row", // Butonu ve boş alanı yan yana koyar
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        {/* Geri Dönüş Butonu */}
        <TouchableOpacity
              onPress={() => navigation.goBack()} // Geri dönüş işlemi
              style={{
                paddingTop: 50,
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left" // Sol ok ikonu
                size={24}
                color="#BBF246" // Fosforlu sarı renk
              />
            </TouchableOpacity>
      </View>
    ),
    
    headerShown: true, // Header'ı göster
    headerTitle: "", // Header yazısını kaldır
    title: "Program",
    tabBarIcon: ({ color }) => (
      <FontAwesome name="calendar" size={24} color={color} />
    ),
  }}
/>

  </Tabs>
);

export default TabLayout