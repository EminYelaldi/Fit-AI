import { StyleSheet } from "react-native";
export default StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#1b232c', // SafeAreaView'in beyaz kalmasını önlemek için
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Yandan biraz boşluk bırakır
    backgroundColor: '#0f0f0f', // Düz arka plan rengi
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dfff00',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#222',
    color: '#fff',
  },
  resetButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#dfff00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  goBackText: {
    fontSize: 16,
    color: '#dfff00',
    textDecorationLine: 'underline',
  },
});