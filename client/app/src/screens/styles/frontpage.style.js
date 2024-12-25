import { StyleSheet } from "react-native";

export default StyleSheet.create({
    
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#000'
    },
    overlay: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Siyah transparan katman
      width: '100%',
      paddingHorizontal: 20,
    },
    getStartedButton: {
      width: '40%',
      height: 50,
      backgroundColor: '#BBF246', // Fosforlu sarı
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 40,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    loginButton: {
      width: '40%',
      height: 50,
      borderWidth: 2,
      borderColor: '#BBF246', // Fosforlu sarı kenarlık
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    getStartedText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000', // Siyah yazı
      
    },
    loginText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffff', // Siyah yazı
      
    },
  });