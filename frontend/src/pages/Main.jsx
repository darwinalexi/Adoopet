import { Text } from "@rneui/base";
import { ScrollView, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Header from "../Component/Header";
import { useEffect, useState } from "react";

import axiosClient from "../utils/AxiosClient";

export function Main(){
const [pet, setpet]= useState([])

 
const listar_mascotas = async () => {
    try {
       
        const response = await axiosClient.get("/listar_no_adoptados");
        setpet(response.data);
        console.log("respuesta", response.data);
    } catch (error) {
        console.error("Error en listar mascotas:", error.response ? error.response.data : error.message);
        
    }
};

useEffect(() => {
    listar_mascotas();
}, []);

    return(
        <SafeAreaView >
            <ScrollView style={{height:'100%'}}>
          
            <Text >Mascotas Para Adoptar</Text>
            <View style={style.container}>

{pet.map((mascota, index) => (
  <View key={index} style={style.itemContainer}>
    <Text>Nombre De La Mascota: {mascota.nombre_mas}</Text>
    <Text>Descripcion: {mascota.descripcion}</Text>
    <Text>Edad: {mascota.edad}</Text>
    <Text>Estado: {mascota.estado}</Text>
    <Image
        source={{ url: `http://192.168.1.7:4001/img/${mascota.foto}`}}
    />
  </View>
))}
</View>
           
            </ScrollView>
        </SafeAreaView>
     
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      itemContainer: {
        width: '50%', 
        padding: 10, 
        alignItems: 'center', 
      },
      
})



    