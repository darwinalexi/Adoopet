import { Modal, View, FlatList, Text, Image, TouchableOpacity , StyleSheet} from "react-native"
import { baseURL } from "../utils/data";

function ModalVer({visible, onClose, data}) {

    if (!data) return null; // No renderizar el modal si no hay mascota seleccionada

    const images = data.foto ? data.foto.split(',').map(image => `${baseURL}/img/${image.trim()}`) : [];

    return(
<Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
          <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Detalles de la Mascota</Text>
          <FlatList
            data={images}
            renderItem={({ item }) => (
                <Image
                source={{ uri: item }}
                style={styles.image}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          /> 
          <Text style={styles.text}>Nombre: {data.nombre_mascota}</Text>
          <Text style={styles.text}>Descripción: {data.descripcion}</Text>
          <Text style={styles.text}>Edad: {data.edad} Años</Text>
          <Text style={styles.text}>Estado: {data.estado_adopcion}</Text>
          <Text style={styles.text}>Hitorial : {data.historial}</Text>
          <Text style={styles.text}>Departamento : {data.departamento}</Text>
          <Text style={styles.text}>Municipio : {data.municipio}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente para el modal
    },
    modalContainer: {
      width: "80%",
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
    image: {
      width: 270,
       margin:4,
      height: 200,
      
      borderRadius: 10,
    },
  });


export default  ModalVer;