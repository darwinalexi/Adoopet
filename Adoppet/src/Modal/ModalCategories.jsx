import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import axiosClient from "../utils/AxiosClient";

const Create_Categories = ({ visible, onClose}) => {

    const [datos, sedatos]= useState({
        nombre:'',
        estado:''
    })
    const data = [
        { key: '1', value: 'Activo' },
        { key: '2', value: 'Desactivo' }
    ];

    const handinputchange = (text, fieldName) => {
        sedatos(prevDatos => ({ ...prevDatos, [fieldName]: text }));
        console.log("datos", datos);
      };


      const crear_categorioas= async()=> {
        if (!datos.nombre || !datos.estado) {
            Alert.alert("Completa los campos")
            return;
        }
         if (!datos.nombre.trim() || isNaN(datos.nombre) === false ) {
            Alert.alert("El nombre debe ser un texto ")
            return;
        }
            try {
                const crear = await axiosClient.post("/crear_categories",datos);
              console.log("mensaje", crear.data.mensaje)
            sedatos(crear.data.mensaje)
            onClose()
            if (crear.status==200) {
                Alert.alert("Se creo con exito o la Categotria")
            }
            } catch (error) {
                console.log(error)
            }
      }


      
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.containerform}>
                    <TouchableOpacity onPress={onClose} style={styles.close}>
                        <FontAwesomeIcon icon={faClose} size={23} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Crear Una Categoria</Text>
                    <TextInput 
                        placeholder="Ingresa el nombre de la Categoria"
                        placeholderTextColor="gray"
                        style={styles.input}
                        onChangeText={(text) => handinputchange(text, 'nombre')}
                    />
                    <SelectList
                        setSelected={(selected) => {
                            //encuentra el aarreglo que cumpla con el valor seleccionado n el select
                            const value = data.find(item => item.key === selected).value;
                            //lo asigna a estado
                            sedatos(prevDatos => ({ ...prevDatos, estado: value }));
                            console.log("Estado:", value);
                        }}
                    data={data}
                    placeholder="Seleccione Un Estado"
                    dropdownStyles={[styles.dropdown, { width: '100%' }]}
                    inputStyles={[styles.selectInput, { width: '100%' }]}
                    searchable={false}
                    defaultValue={data[0].value}
                        />
                        <TouchableOpacity onPress={()=>crear_categorioas()}>
                            <Text>Crear Categoria</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerform: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    close: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    title: {
        fontSize: 24,
        color: "#000",
        padding: 12,
    },
    input: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        width: '100%', 
        marginBottom: 20, 
    },
    dropdown: {
        borderColor: "#1999a6",
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#fff",
        
    },
    selectInput: {
        borderColor: "#1999a6",
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
    }
});

export default Create_Categories;