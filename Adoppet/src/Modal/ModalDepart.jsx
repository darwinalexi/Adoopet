import { Modal, View,Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosClient from "../utils/AxiosClient";

function Create_Depart({visible, onclose}) {

const [valores, setvalores]= useState({
    nombre:'',
    codigo_dane:''
})
const crear= async()=> {
    if (!valores.nombre || !valores.codigo_dane) {
        Alert.alert("Llena los campos")
        return;
    }else  if (!valores.nombre.trim() || isNaN(valores.nombre) === false ) {
        Alert.alert("El nombre debe ser un texto ")
        return;
    }
    try {
const crear = await  axiosClient.post("/departamento", valores) 
    Alert.alert(crear.data.mensaje)
setvalores({
    nombre: '',
    codigo_dane: ''
});
onclose();
    } catch (error) {
        console.log(error)
    }
}

const handinputchange = (text, fieldName) => {
    setvalores(prevValores => ({ ...prevValores, [fieldName]: text }));
       console.log("datos", valores);
};




    return(
        <Modal 
        visible={visible}
        animationType="slide"
        transparent={true}
        >
<View  style={style.background}>
   <View style={style.form}>
    <TouchableOpacity onPress={onclose}>
    <FontAwesomeIcon icon={faClose} size={40} style={{margin:10}}/>
    </TouchableOpacity>

        <Text style={style.title}>Crear Departamento</Text>
        <Text style={style.subtitle}>Nombre</Text>
        <TextInput
        placeholder="Ingrese El Nombre"
        style={style.input}
        onChangeText={(text)=>handinputchange(text,'nombre')}
        />
        <Text style={style.subtitle2}>Codigo Dane</Text>
   
        <TextInput
        placeholder="Ingrese El Codigo"
        style={style.input2}
        keyboardType="number-pad"
        onChangeText={(text)=>handinputchange(text,'codigo_dane')}
        />
         <TouchableOpacity style={style.boton} onPress={crear} >
    <Text style={style.text}>Crear Departamento</Text>
    </TouchableOpacity>
   </View>
</View>
        </Modal>
    )
}
const style= StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    form: {
        backgroundColor: "white",
        width: "70%",
        height: "80%",
        borderRadius: 12,
        position: "relative", // Cambiado de "fixed" a "relative"
        padding: 20, // Agregado para un mejor espaciado
    },
    title: {
        fontSize: 33,
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        marginBottom: 20, // Agregado para espaciar el título del resto del contenido
    },
    input: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        width: '100%', // Cambiado de '80%' a '100%' para adaptarse al contenedor
        marginBottom: 20,
        textAlign: "center",
    },
    input2: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        width: '100%', // Cambiado de '80%' a '100%' para adaptarse al contenedor
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 19,
        color: "black",
        marginBottom: 10, // Agregado para espaciar los elementos
    },
    subtitle2: {
        fontSize: 19,
        color: "black",
        marginBottom: 10, // Agregado para espaciar los elementos
    },
    boton:{
        backgroundColor:"#1999a6",
        borderRadius:12,
        marginLeft:"7%",
        marginTop:"6%",
        height:34,
        width:"93%",
         alignItems:"center",
         margin:67
      
      },
      text:{
        color :"white",
        padding:5,
      },
})

export default Create_Depart;