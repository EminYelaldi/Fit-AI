import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import { ProgramProvider } from "./src/components/program-context";
import * as Font from "expo-font"; // Font yükleme

const AppLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BebasNeue: require("./src/assets/fonts/BebasNeue-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Yüklenene kadar hiçbir şey gösterme
  }

  return (
    <ProgramProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0c0c14", // Siyah arka plan
          },
          headerTintColor: "#BBF246", // Fosforlu sarı yazı
          headerShadowVisible: false, // Gölgeyi kaldırır
          animation: "slide_from_right", // Sağdan sola geçiş animasyonu
          headerTitle: "", // Header yazısını tamamen kaldır
          headerBackTitleVisible: false, // Geri butonunda yazı görünmesini engeller
        }}
      >
        <Stack.Screen
          name="src/screens/tabs"
          options={{ headerShown: false }} // Ana sayfa için üst başlık görünmesin
        />
        <Stack.Screen
          name="src/screens/program"
          options={{
            header: ({ navigation }) => (
              <View
                style={{
                  backgroundColor: "#121212", // Siyah arka plan
                  height: 20, // Başlık yüksekliği
                  flexDirection: "row", // Butonu ve boş alanı yan yana koyar
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
             
              </View>
            ),
          }}
        />
        <Stack.Screen
  name="src/screens/form"
  options={{
    header: ({ navigation }) => (
      <View
        style={{
          backgroundColor: "#121212", // Siyah arka plan
          height: 80, // Başlık yüksekliği
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
  }}
/>
        <Stack.Screen
          name="src/screens/frontpage"
          options={{
            header: () => (
              <View
                style={{
                  backgroundColor: "#000", // Siyah arka plan
                  height: 110, // Başlık yüksekliğini artırarak yazının yerleşimini kontrol edin
                  justifyContent: "flex-end", // Yazıyı alta hizalayın
                  alignItems: "center", // Yazıyı yatayda merkezleyin
                  paddingTop: 10, // Yazıyı daha alta kaydırmak için alt dolgu
                }}
              >
                <Text
                  style={{
                    fontFamily: "BebasNeue", // Özel font
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#BBF246", // Fosforlu sarı
                  }}
                >
                  WELCOME TO GYM APP
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="src/screens/tabs/main-page"
          options={{header: ({ navigation }) => (
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
        
          }}
        />
       <Stack.Screen
  name="src/screens/Login"
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
  }}
/>
<Stack.Screen
  name="src/screens/tabs/my-program"
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
  }}
/>
<Stack.Screen
  name="src/screens/sign-up"
  options={{
    header: ({ navigation }) => (
      <View
        style={{
          backgroundColor: "#121212", // Siyah arka plan
          height: 70, // Başlık yüksekliği
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
  }}
/>

      </Stack>
    </ProgramProvider>
  );
};

export default AppLayout;