import { StyleSheet } from "react-native";
export default StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // SafeAreaView'in beyaz kalmasını önlemek için
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backLink: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
  },
  backLinkText: {
    fontSize: 16,
    color: '#BBF246', // Fosforlu sarı renk
    textDecorationLine: 'underline',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Yandan biraz boşluk bırakır
    backgroundColor: '#121212', // Düz arka plan rengi
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#BBF246',
    marginBottom: 60,
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
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#BBF246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  goBackText: {
    fontSize: 16,
    color: '#BBF246',
    marginTop:30,

  },
  backContainer:{
    justifyContent:'space-between',
    flexDirection: "row",
  },
  accountText:{
    fontSize: 16,
    color:'#ccc',
    marginRight:4,
    marginTop:30,
  },

})