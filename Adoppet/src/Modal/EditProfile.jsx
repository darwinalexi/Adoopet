import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

function EditProfile({ visible, close }){
    return (
        <Modal visible={visible} animationType="slide">
          
          <View  style={styles.main}>
          <View style={styles.container}>

          <TouchableOpacity onPress={close} style={styles.closeButton}>
                <FontAwesomeIcon icon={faClose} size={36} color='#1999a6'/>
                </TouchableOpacity>
            <Text style={styles.title}>Actualiza Tu Perfil</Text>
                <Text style={styles.text}>Cambia los campos</Text>
                <View style={styles.mascotasContainer}>
                
                </View>
            
          </View>
          </View>
        </Modal>
      );
    };
    
    const styles = StyleSheet.create({
        main:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        container: {
            flex: 1,
            marginTop:"25%",
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            width: "80%",
            marginBottom:"25%"
        },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      text: {
        fontSize: 18,
        marginBottom: 20,
      },
 
      closeButton: {
        position:"relative",
        left:"85%"
      },

    })
    export default EditProfile;