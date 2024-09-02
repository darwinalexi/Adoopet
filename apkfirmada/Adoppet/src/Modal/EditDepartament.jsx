import { Modal, View, Text, StyleSheet , TouchableOpacity, TextInput, Alert} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axiosClient from "../utils/AxiosClient";

function  Edit_departament({visible, onclose, data}) {
const [valores, setval]= useState({
    nombre:'',
    codigo_dane:'',
})


const handinputchange = (text, fieldName) => {
    setval(prevValores => ({ ...prevValores, [fieldName]: text }));
    console.log("datos", valores);
  };


  const Actualizar =  async()=> {
    try {
        
        const actualizar= await axiosClient.put(`/departamento/${data.id}`, valores)
Alert.alert(actualizar.data.mensaje)
    } catch (error) {
        console.log(error)
    }
  }
useEffect(() => {
    if (data) {
        setval({
            nombre: data.nombre || '',
             // lo convierte a cadena de texto para poder verlo en el textinput ya que es un dato  tipo int
            codigo_dane: data.codigo_dane ? data.codigo_dane.toString() : ''
        });
        console.log("datos", data)
    }
}, [data, visible]);


    return(
        <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        >
            <View style={style.main}>
              <View style={style.form}>
                <TouchableOpacity onPress={onclose}>
                  <FontAwesomeIcon icon={faClose} style={{margin:23}} size={30}/>
                </TouchableOpacity>
             
              <Text style={style.title}>Actualiza El Departamento</Text>

                    <Text style={style.subtitle}>Nombre</Text>
                    <TextInput
                    value={valores.nombre}
                    placeholder="Ingrese El Nombre"
                    style={style.input}
                    onChangeText={(text)=>handinputchange(text,'nombre')}
                    />
                    <Text style={style.subtitle2}>Codigo Dane</Text>
            
                    <TextInput
                    value={valores.codigo_dane}
                    placeholder="Ingrese El Codigo"
                    style={style.input2}
                    keyboardType="number-pad"
                    onChangeText={(text)=>handinputchange(text,'codigo_dane')}
                    />
                     <TouchableOpacity style={style.boton}  onPress={Actualizar}>
                      <Text style={style.text}>Actualizar Departamento</Text>
                    </TouchableOpacity>
              </View>
            </View>
        </Modal>
    )
}

const style= StyleSheet.create({
    main:{
      flex:1,
      justifyContent:"center",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    form:{
        backgroundColor:"#ffff",
        width:"68%",
        height:"80%",
        marginLeft:"17%",
        borderRadius:12,
    },
    title: {
        fontSize: 33,
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        marginBottom: 20, 
    },
    input: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        width: '100%', 
        marginBottom: 20,
        textAlign: "center",
    },
    input2: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        width: '100%',
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 19,
        color: "black",
        marginBottom: 10, 
    },
    subtitle2: {
        fontSize: 19,
        color: "black",
        marginBottom: 10, 
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
      }
})
export default Edit_departament;