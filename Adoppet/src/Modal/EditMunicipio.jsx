import { Modal, View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axiosClient from "../utils/AxiosClient";
function Editar_municipio({visible, onclose, data}){
   const [datos, setdatos]= useState({
    nombre:'',
    codigo_dane:''
   })


   const actualizar=async()=> {
    //valida si estan vacios
   if (!datos.nombre || !datos.codigo_dane) {
    Alert.alert("Llena los Campos");
    return;
     //valida sai nombre  es string
   }else if (!datos.nombre.trim() || isNaN(datos.nombre) === false) {
        Alert.alert("El campo nombre debe ser un string");
        return;
      }
    try {
        const actualizar= await axiosClient.put(`/actualiza_municipio/${data.id}`, datos)
        setdatos(actualizar.data.mensaje)
        if (actualizar.status==200) {
            Alert.alert(actualizar.data.mensaje)
            await onclose();
        }
          console.log("resultado",actualizar.data.mensaje)
    } catch (error) {
        console.log(error)
    }
   }

   const handinputchange = (text, fieldName) => {
    setdatos(prevDatos => ({ ...prevDatos, [fieldName]: text }));
    console.log("datos", datos);
  };
  useEffect(() => {
    if (data) {
        setdatos({
            nombre: data.nombre || '',
             // lo convierte a cadena de texto para poder verlo en el textinput ya que es un dato  tipo int
            codigo_dane: data.codigo_dane ? data.codigo_dane.toString() : ''
        });
    }
}, [data, visible]);
    return(
        <Modal
        visible={visible}
        transparent={true}
        animationType="slider"
        onRequestClose={onclose}
        >
            <View style={style.main}>
              <View style={style.container}>
                <TouchableOpacity onPress={onclose}>
                   
                <FontAwesomeIcon icon={faClose}   size={34} style={{margin:23}} />
                </TouchableOpacity>
                <Text style={style.title}>Actualiza El Municipio</Text>
                <TextInput
                value={datos.nombre}
                  style={style.input}
                  onChangeText={(text) => handinputchange(text, 'nombre')}
                />
                 <TextInput
                 value={datos.codigo_dane}
                style={style.input}
                keyboardType="number-pad"
                onChangeText={(text) => handinputchange(text, 'codigo_dane')}
                placeholder="Ingrese Codigo Dane"
                />
                <TouchableOpacity style={style.buttom} onPress={actualizar} >
                    <Text style={style.text}>Actualizar</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
    )

}
const style = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
      

    },
    container:{
        backgroundColor:"white",
        height:"65%",
        width:"78%",
        marginLeft:45
    },
    input: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        width: '80%',
        color: "black",
        marginBottom: 20,
        marginLeft: "10%"
    },
    title:{
      fontSize:23,
      textAlign:"center",
         color:"black",
         marginBottom:34
    },
    buttom:{
        backgroundColor:"#1999a6",
        borderRadius:12,
        margin:12,
        height:34,
        width:"77%",
         alignItems:"center",
         marginLeft:40
      
      },
      text:{
        color :"white",
        padding:5,
      },
}) 

export default Editar_municipio;