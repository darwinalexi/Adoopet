import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import axiosClient from "../utils/AxiosClient";

const EditCategories = ({ visible, onClose, data }) => {
    const [datos, setDatos] = useState({
        nombre:'',
        estado:''
    })

    useEffect(() => {
        if (data) {
            setDatos({
                nombre: data.nombre || '',
                estado: data.estado || ''
            });
        }
    }, [data, visible]);


    const  actualizar = async()=> {
        if (!datos.nombre  || !datos.estado) {
            Alert.alert("Llene los campos")
            return;
        }
         if  (!datos.nombre.trim() || isNaN(datos.nombre) === false ) {
            Alert.alert("El nombre debe ser un texto ")
            return;
            
        }
     try {
        const  peticion = await axiosClient.put(`/actualizar_categories/${data.id}`, datos);
        setDatos( peticion.data.mensaje)
          console.log("respuesta", peticion.data.mensaje)
          if (peticion.status==200) {
            Alert.alert("Se Actualizo con exito")
            onClose();
          }
     } catch (error) {
        
     }
    }

    const handleInputChange = (text) => {
         // Actualiza el estado con el valor del campo correspondiente
        setDatos(prevDatos => ({ ...prevDatos, nombre: text }));
    };

    const handleSelectChange = (selected) => {
        const value = estado.find(item => item.key === selected)?.value || '';
        setDatos(prevDatos => ({ ...prevDatos, estado: value }));
    };

    const estado = [
        { key: '1', value: 'Activo' },
        { key: '2', value: 'Desactivo' }
    ];

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={style.main}>
                <View style={style.containerUpdate}>
                    <TouchableOpacity style={style.icon} onPress={onClose}>
                        <FontAwesomeIcon icon={faClose} size={33} />
                    </TouchableOpacity>
                    <Text style={style.title}>Actualizar Categoria</Text>
                    <View>
                        <Text>Nombre</Text>
                        <TextInput
                            style={style.input}
                             // Asigna el valor del estado "nombre" al TextInput para mostrar el valor inicial
                            value={datos.nombre}
                            onChangeText={handleInputChange}
                        />
                        <Text>Seleccione El Estado</Text>
                        <SelectList
                            data={estado}
                               // Establece el valor seleccionado en el SelectList
                            setSelected={handleSelectChange}
                            // encuentra el valor  que  trae el estado desde data
                            defaultOption={estado.find(option => option.value === datos.estado)}
                        />
                        <TouchableOpacity onPress={actualizar}>
                            <Text>Actualizar Categoria</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const style = StyleSheet.create({
    main: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerUpdate: {
        backgroundColor: "#ffff",
        width: "70%",
        height: "50%",
        borderRadius: 12,
    },
    icon: {
        position: "relative",
        top: 12,
        left: "80%"
    },
    title: {
        color: "black",
        fontWeight: "bold",
        marginLeft: 34,
        marginTop: 32,
        fontSize: 18
    },
    input: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        color: "black",
        marginBottom: 20,
        
    }
});

export default EditCategories;
