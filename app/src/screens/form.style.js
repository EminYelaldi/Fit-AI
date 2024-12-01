import { StyleSheet } from "react-native";
export default StyleSheet.create({

        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#f5f5f5',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 24,
          color: '#333',
        },
        input: {
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          paddingHorizontal: 16,
          marginBottom: 16,
          backgroundColor: '#fff',
        },
        checkboxContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
          width: '100%',
        },
        checkbox: {
          flex: 1,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          backgroundColor: '#fff',
        },
        selectedCheckbox: {
          backgroundColor: '#007BFF',
        },
        checkboxText: {
          fontSize: 16,
          color: '#333',
        },
        sliderContainer: {
          width: '100%',
          alignItems: 'center',
          marginBottom: 16,
        },
        sliderText: {
          fontSize: 16,
          color: '#333',
          marginBottom: 8,
        },
        slider: {
          width: '100%',
          height: 40,
        },
        button: {
          width: '100%',
          height: 50,
          backgroundColor: '#007BFF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          marginBottom: 8,
        },
        buttonText: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        },
        linkText: {
          marginTop: 12,
          color: '#007BFF',
          fontSize: 16,
          textDecorationLine: 'underline',
        },
      
})