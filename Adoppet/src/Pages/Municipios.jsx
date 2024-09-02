import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView,  TouchableOpacity } from "react-native";
import axiosClient from "../utils/AxiosClient";
import Create_Municipios from "../Modal/MunicicipiosCreate";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Editar_municipio from "../Modal/EditMunicipio";


function Municipios() {
const [municipios, setmunicipio]= useState([]);
const [openmodal, setModal]= useState(false);
const [openupdae, setupdate]= useState(false);
const [date, setselectdate]= useState([])

const listar= async()=>{
   try {
    const datos= await axiosClient.get("/listar_municipios")
    setmunicipio(datos.data);
    console.log("municipios", datos.data)
   } catch (error) {
    console.log(error)
   }
}

const open= ()=>{
    setModal(true)
}
const close= ()=>{
    setModal(false)
}

const openupdate=(id)=>{
    const municipio = municipios.find(muni => muni.id === id); // Encuentra la categoría por ID
    setselectdate(municipio); // Establece la categoría seleccionada
    setupdate(true)
}
const closeupdate=()=>{
    setupdate(null)
    setupdate(false)
   
}

const eliminiar= async(id)=>{
    try {
        const eliminar = await axiosClient.delete(`/eliminiar_municipio/${id}`)
        await listar();
        console.log(eliminar.data.mensaje)
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
    listar();
    //recarga
    const intervalId = setInterval(() => {
        listar();
      }, 1000);

      return () => clearInterval(intervalId);
},[])

    return(
        < SafeAreaView>
            <ScrollView>
            <Text style={style.title}>Municipios</Text>
                <View style={style.table}>
               
                        <View style={style.header}>
                            <Text style={style.textheaderr}>Nombre</Text>
                            <Text style={style.textheaderr}>Codigo Dane</Text>
                            <Text style={style.textheaderr}>Accion</Text>
                        </View>
                        <View style={[{width:"66%", marginTop:"4%", marginLeft:"6%"} ]}>
                        {municipios .map((municipio)=>(
                            <View key={municipio.id} style={style.date}>
                                <Text style={style.text_date}>{municipio.nombre}</Text>
                                <Text style={style.code}>{municipio.codigo_dane}</Text>
                                <View style={style.action}>
                                    <TouchableOpacity onPress={()=>eliminiar(municipio.id)} style={{paddingLeft:8}}>
                                    <FontAwesomeIcon icon={faTrash} color="red" size={28}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={()=>openupdate(municipio.id)} >
                                    <FontAwesomeIcon icon={faEdit} color="#1999a6" size={28}/>
                                    </TouchableOpacity>
                                    < Editar_municipio visible={openupdae} onclose={closeupdate}  data={date}/>
                                </View>
                            </View>
                        ))}
                        </View>
                </View>
                <TouchableOpacity  onPress={open} style={style.boton}>
                         <Text style={style.text}>Crear Municipio</Text>
                </TouchableOpacity>
                                < Create_Municipios visible={openmodal} onclose={close}  />
              
            </ScrollView>
        </SafeAreaView>
       
    )
  }

  const style= StyleSheet.create({
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
    date:{
        flexDirection:"row",
        padding:5,
        marginLeft:"7%",
    },
    text_date:{
        fontSize: 16,
        color: 'black',
        flex: 1,
        
    },
    table:{
        width:"90%",
        borderRadius: 23,
        borderColor:"#1999a6",
        borderWidth:2,
        marginLeft:19
    },
    title:{
     fontSize:26,
     textAlign:"center",
     color:"black",
     fontWeight:"bold",
     padding:8
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
      code:{
        color:"black"
      },
      action:{
        position:"relative",
        left:"33%",
   flexDirection:"row"
      }
  })

  export default Municipios;