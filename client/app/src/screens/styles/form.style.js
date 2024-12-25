import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // SafeAreaView'in beyaz kalmasını önlemek için siyah
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#121212", // Siyah arka plan
  },
  backLink: {
    position: "absolute", // Geri butonu pozisyonu
    top: 15,
    left: 15,
    zIndex: 10,
  },
  card: {
    width: "100%",
    padding: 16,
    backgroundColor: "#121212", // Koyu gri kart
    borderRadius: 10,
  },
  progressBar: {
    height: 10,
    width: 350,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BBF246",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#BBF246",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#BBF246",
    backgroundColor:"#222",
    fontSize:15,
  },
  sliderContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  sliderText: {
    fontSize: 16,
    color: "#FFFF", // Beyaz metin
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  genderContainer: {
    marginVertical: 20,
  },
  genderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFF",
    marginBottom: 10,
  },
  genderOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  genderButton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#BBF246",
    borderRadius: 8,
    backgroundColor: "#222", // Seçilmeyenlerin arka planı koyu
  },
  selectedGenderButton: {
    backgroundColor: "#BBF246", // Seçilenlerin arka planı sarı
  },
  genderButtonText: {
    fontSize: 16,
    color: "#FFFF", // Beyaz metin (varsayılan, seçilmeyenler için)
  },
  selectedGenderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Sarı metin (seçilenler için)
  },
  neonButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BBF246",
    borderRadius: 8,
    marginTop: 16,
  },
  neonButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});