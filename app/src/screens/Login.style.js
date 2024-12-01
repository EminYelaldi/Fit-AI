import { StyleSheet } from "react-native";
export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0f0f', // SafeAreaView'in beyaz kalmasını önlemek için siyah
  },
  backLink: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  backLinkText: {
    fontSize: 16,
    color: '#dfff00', // Fosforlu sarı renk
    textDecorationLine: 'underline',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Yandan biraz boşluk bırakır
    backgroundColor: '#0f0f0f', // Siyah arka plan
    paddingBottom:70,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 5,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#dfff00', // Fosforlu sarı
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 0.5,
    borderColor: '#FFFF', // Fosforlu sarı kenarlık
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#222', // Koyu gri arka plan
    color: '#dfff00', // Fosforlu sarı metin
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#dfff00', // Fosforlu sarı
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    marginTop:10,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Siyah yazı
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#FFFF', // Fosforlu sarı
    textDecorationLine: 'underline',
    marginBottom: 8,
    marginLeft:'220',
  },
  signUpText: {
    fontSize: 16,
    color: '#FFFF', // Fosforlu sarı
    textDecorationLine: 'underline',
    marginLeft:120,
  },
  linkContainer: {
    flexDirection: 'row', // Yatay hizalama
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 8,
    width:'100%',
    
  },
  linkText: {
    fontSize: 16,
    color: '#FFFF', // Fosforlu sarı
    textDecorationLine: 'underline',
  },
  
});