import { StyleSheet } from "react-native";
export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // SafeAreaView'in beyaz kalmasını önlemek için siyah
  },
  backLinkText: {
    fontSize: 16,
    color: '#BBF246', // Fosforlu sarı renk
    textDecorationLine: 'underline',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 23, // Yandan biraz boşluk bırakır
    backgroundColor: '#121212', // Siyah arka plan
    paddingBottom:70,

  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 40,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#BBF246', // Fosforlu sarı
    marginBottom: 40,
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
  neonButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BBF246",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  neonButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Siyah yazı
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#FFFF', // Fosforlu sarı
    textDecorationLine: 'underline',
    marginBottom: 10,
    marginLeft:'220',
  },
  linkContainer: {
    alignItems: 'right',
    marginVertical: 3,
    width:'100%',
  },
  linkText: {
    fontSize: 16,
    color: '#ccc', // Fosforlu sarı
    textAlign:"right",
  },
  backLink: {
    position: "absolute", // Geri butonu pozisyonu
    top: 15,
    left: 15,
    zIndex: 10,
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
});