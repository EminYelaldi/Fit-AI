import React, { useState } from "react";
import { View, Text, Alert, ScrollView, Platform, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import styles from "./form.style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphanesi
import Loading from "../components/loading";


const FormScreen = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [gender, setGender] = useState(""); // Kadın/Erkek seçimi için state
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu
  const router = useRouter();
  const handleGoBack = () => {
    router.push('/src/screens/Login'); // Ana sayfaya (Front Page) yönlendirme
  };
  const handleSubmit = async () => {
    if (!age || !height || !weight || !gender) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;arrow
    }

    const requestBody = {
      message: `yaş:${age}, kilo:${weight}, gün sayısı:${daysPerWeek}, boy:${height}, cinsiyet:${gender}`,
    };

    try {
      setIsLoading(true); // Yükleme durumunu başlat
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Program oluşturulurken bir hata oluştu!");
      }

      const data = await response.json();
      console.log(JSON.stringify(data.reply.program));
      router.push({
        pathname: "/src/screens/program",
        params: { program: JSON.stringify(data.reply.program) },
      });
    } catch (error) {
      Alert.alert("Hata", error.message);
    } finally {
      setIsLoading(false); // Yükleme durumunu sonlandır
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
<SafeAreaView style={styles.safeArea}>
<TouchableOpacity style={styles.backLink} onPress={handleGoBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#BBF246" />
        </TouchableOpacity>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
       
      <ScrollView contentContainerStyle={styles.container}>
       
        <Text style={[styles.title, { fontFamily: 'BebasNeue' }]}>FORM</Text>
        <Card style={styles.card}>


          {/* Yaş */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#BBF246" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              textColor='#ccc'
              placeholder="Age"
              placeholderTextColor="#aaa"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              autoCapitalize="none"
            />
          </View>

          {/* Boy */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#BBF246" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              textColor='#ccc'
              placeholder="Height (Cm)"
              placeholderTextColor="#aaa"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              autoCapitalize="none"
            />
          </View>

          {/* Kilo */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#BBF246" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              textColor='#ccc'
              placeholder="Weight (Kg)"
              placeholderTextColor="#aaa"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              autoCapitalize="none"
            />
          </View>

          {/* Cinsiyet */}
          <View style={styles.genderContainer}>
            <View style={styles.genderOptions}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "Women" && styles.selectedGenderButton,
                ]}
                onPress={() => setGender("Women")}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === "Women" && styles.selectedGenderButtonText,
                  ]}
                >
                  Women
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "Man" && styles.selectedGenderButton,
                ]}
                onPress={() => setGender("Man")}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === "Man" && styles.selectedGenderButtonText,
                  ]}
                >
                  Man
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Slider */}
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>Days Per Week: {daysPerWeek}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={7}
              step={1}
              value={daysPerWeek}
              onValueChange={(value) => setDaysPerWeek(value)}
              minimumTrackTintColor="#BBF246"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#BBF246"
            />
          </View>

          {/* Gönder Butonu */}
          <TouchableOpacity style={styles.neonButton} onPress={handleSubmit}>
            <Text style={styles.neonButtonText}>SEND</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormScreen;