import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View,StyleSheet, TouchableOpacity, Alert } from "react-native";
import axiosClient from "../utils/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Create_Depart from "../Modal/ModalDepart";
import Edit_departament from "../Modal/EditDepartament";

function Departamentos(){
    const [departamento, setdepar]= useState([]);
    const [opencreate,  setopenc]= useState([])
    const [openUPDATE,  setopenUPDTE]= useState(false)
const [select, setselect]= useState([]);

    const open=()=>{
        setopenc(true)
    }
    const close=()=>{
        setopenc(false)
    }

    const openupdae=(id)=>{
        const depart = departamento.find(departament => departament.id === id); // Encuentra el departamento por ID
        setselect(depart);
        setopenUPDTE(true)
    }
    const closeupdate=()=>{
        setselect(null);
        setopenUPDTE(false)
    }

  
     const listarde_part= async()=>{
        try {
            const listar= await axiosClient.get("/departamento")
            setdepar(listar.data)
            console.log("departamentos", listar.data)
        } catch (error) {
            console.log(error)
        }
     }
     const eliminar= async(id)=>{
        try {
            const eliminar= await axiosClient.delete(`/departamento/${id}`)
            console.log(eliminar.data.mensaje)
            if (eliminar.status==200) {
                Alert.alert(eliminar.data.mensaje)
            }
        } catch (error) {
            console.log(error)
        }
     }

     useEffect(()=>{
        listarde_part();
     })
    return(
        < SafeAreaView style={style.container}>
        <ScrollView>
        <Text style={style.title}>departamento</Text>
            <View style={style.table} >
                
                <View style={style.header}>
                            <Text style={style.textheaderr}>Nombre</Text>
                            <Text style={style.textheaderr}>Codigo Dane</Text>
                            <Text style={style.textheaderr}>Accion</Text>
                        </View>
                        {departamento .map((datos)=>(
                            <View key={datos.id} style={style.datos}>
                                <Text>{datos.nombre}</Text>
                                <Text>{datos.codigo_dane}</Text>
                                <View style={style.action}>
                                <TouchableOpacity onPress={()=>eliminar(datos.id)}>
                                <FontAwesomeIcon icon={faTrash}  color="red" size={34}/>   
                                </TouchableOpacity> 
                                <TouchableOpacity y onPress={()=>openupdae(datos.id)}>
                                <FontAwesomeIcon icon={faEdit}  color="#1999a6"  size={34}/>   
                                </TouchableOpacity>   
                                </View>
                            </View>
                        ))}
                        
            </View>
            <TouchableOpacity  style={style.boton} onPress={open}>
                         <Text style={style.text}>Crear Departamento</Text>
                </TouchableOpacity>
                <Edit_departament visible={openUPDATE} onclose={closeupdate} data={select}/>
                <Create_Depart visible={opencreate} onclose={close}/>
        </ScrollView>
        </SafeAreaView>
    )
}

const style= StyleSheet.create({
    container:{
    flex:1,
    },
    title:{
        fontSize:34,
        textTransform:"capitalize",
        textAlign:"center",
        marginTop:34,
        fontWeight:"bold",
        color:"black"
    },
    header:{
        width:"100%",       
        flexDirection:"row",
        borderColor:"#1999a6",
        borderBottomWidth:2,
        borderRadius: 23,
     },
     textheaderr:{
         fontWeight: 'bold',
         color: 'black',
         fontSize: 18,
         flex: 1,
         textAlign: 'center',
     
     },
    datos:{
        flexDirection: "row",
    gap: 96,
    marginLeft:25,
    marginTop:23,
    marginBottom:25,
    },
    table:{
        width:"90%",
        borderRadius: 23,
        borderColor:"#1999a6",
        borderWidth:2,
        marginLeft:19,
       
    },
    action:{
        flexDirection:"row",
        gap:23,
        position:"absolute",
        right:9
        
    },
    boton:{
        backgroundColor:"#1999a6",
        borderRadius:12,
        marginLeft:"14%",
        marginTop:"6%",
        height:34,
        width:"73%",
         alignItems:"center"
      
      },
      text:{
        color :"white",
        padding:5,
      },
})

export default Departamentos;