import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput, Card, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { ProgramContext } from "../components/program-context";
import styles from "./styles/form.style";

const MultiStepFormScreen = () => {
  const [step, setStep] = useState(1); // Adım numarası
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [gender, setGender] = useState(""); // Kadın/Erkek seçimi için state
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu
  const router = useRouter();
  const { setProgramData } = useContext(ProgramContext);


  const totalSteps = 5; // Toplam adım sayısı

  const handleNextStep = () => {
    if (
      (step === 1 && !age) ||
      (step === 2 && !height) ||
      (step === 3 && !weight) ||
      (step === 4 && !gender)
    ) {
      Alert.alert("Hata", "Lütfen ilgili alanı doldurun!");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  const handleSubmit = () => {
    if (!age || !weight || !height || !gender) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;
    }

    // Verileri Context'e kaydet
    setProgramData({
      age,
      weight,
      height,
      gender,
      daysPerWeek,
      program: null, // Program daha sonra oluşturulacak
    });

    // VotePage sayfasına yönlendir
    router.push("/src/screens/votepage");
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#BBF246" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* İlerleme Çubuğu */}
      <ProgressBar
        progress={step / totalSteps}
        color="#BBF246"
        style={styles.progressBar}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{`Step ${step} of ${totalSteps}`}</Text>
          <Card style={styles.card}>
            {/* Adım 1: Yaş */}
            {step === 1 && (
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color="#BBF246"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  textColor="#ccc"
                  placeholder="Enter Your Age"
                  placeholderTextColor="#aaa"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
              </View>
            )}

            {/* Adım 2: Boy */}
            {step === 2 && (
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="human-male-height"
                  size={24}
                  color="#BBF246"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  textColor="#ccc"
                  placeholder="Enter Your Height (Cm)"
                  placeholderTextColor="#aaa"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
              </View>
            )}

            {/* Adım 3: Kilo */}
            {step === 3 && (
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={24}
                  color="#BBF246"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  textColor="#ccc"
                  placeholder="Enter Your Weight (Kg)"
                  placeholderTextColor="#aaa"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
              </View>
            )}

            {/* Adım 4: Cinsiyet */}
            {step === 4 && (
              <View style={styles.genderContainer}>
                <Text style={styles.sliderText}>Select Your Gender</Text>
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
            )}

            {/* Adım 5: Haftalık Gün Sayısı */}
            {step === 5 && (
              <>
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
              </>
            )}

            {/* Adım Butonları */}
            <View style={styles.buttonContainer}>
              {step > 1 && (
                <TouchableOpacity style={styles.neonButton} onPress={handlePreviousStep}>
                  <Text style={styles.neonButtonText}>Back</Text>
                </TouchableOpacity>
              )}
              {step < totalSteps ? (
                <TouchableOpacity style={styles.neonButton} onPress={handleNextStep}>
                  <Text style={styles.neonButtonText}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.neonButton} onPress={handleSubmit}>
                  <Text style={styles.neonButtonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MultiStepFormScreen;