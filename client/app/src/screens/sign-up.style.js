import { StyleSheet } from "react-native";
export default StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#192126', // SafeAreaView'in beyaz kalmasını önlemek için
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Yandan biraz boşluk bırakır
    backgroundColor: '#192126', // Düz arka plan rengi
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BBF246',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#384046',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#384046',
    color: '#BBF246',
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#BBF246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  goBackText: {
    fontSize: 16,
    color: '#BBF246',
    textDecorationLine: 'underline',
  },
      

})