import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, FlatList, TextInput } from "react-native"
import axiosClient from "../utils/AxiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";


 const AdopcionesAdop=()=>{
    const [aceptadas, setacetar]= useState([]);
    const [buscador, setbuscador]= useState("")
    
    const  solicitudes_aceptadas= async()=>{

        const usuario=await AsyncStorage.getItem('usuario');
        const user= JSON.parse(usuario);
        const id=user.id
        try {
            const item= await axiosClient.get(`/solicitudes_aceptadas/${id}`)
            setacetar(item.data)
            console.log("solicitud",item.data)
        } catch (error) {
            console.log(error)
        }
    }


    const datos= aceptadas.filter(mascotas=>{
        const nombre = mascotas.nombre_mascota ? mascotas.nombre_mascota.toLowerCase():'';

        const busqueda = nombre.includes(buscador.toLowerCase());
        return busqueda;
    })


      
    useEffect(()=>{
        solicitudes_aceptadas();
    },[])
    return(
        <SafeAreaView>
       
                <View> 
                    <Text style={style.title}>Solicitudes Aceptas</Text>
                    <TextInput
                        style={style.searchBar}
                        placeholder="Buscar mascotas"
                        onChangeText={(text) => setbuscador(text)}
                        value={buscador}
                        />
                </View >
                <FlatList
                data={datos}
                style={style.register}
                renderItem={({item})=>(
                    <View style={style.conten}>
                    <Text style={style.text}>Nombre: {item.nombre_mascota}</Text>
                    <Text style={style.text}>Edad: {item.edad}</Text>
                    <Text style={style.text}>Celular: {item.celular}</Text>
                   
                    {/*toma los nommbre los separa por , y da el 1 nombre*/}
                    {item.foto && item.foto.split(',')[0] !== '' ? (
                        <Image
                        source={{ uri: `http://192.168.1.7:4001/img/${item.foto.split(',')[0]}` }}
                            style={style.image}
                            onError={(e) => console.error('Image load error:', e.nativeEvent.error)}
                        />
                        ) : (
                        <Text>No hay imagen disponible</Text>
                        )}
                         <Text style={style.text}>Estado: {item.estado}</Text>
                         <View style={{backgroundColor:"red", height:12, width:"63%"}}>
                           
                    </View>
        
                </View>
                )}
                />

     
        </SafeAreaView>
    )
 }

 const style = StyleSheet.create({
    conten:{
        borderWidth: 2,
        borderColor: '#1999a6',
        width: '90%',
        marginVertical: 10,
        padding: 12,
        marginLeft:17,
        alignItems: 'center',
        borderRadius:34
        
    },
    image: {
        width: "50%",
        borderRadius:23,
        height: 200,
        margin:12,
       
      },
      text: {
        color: 'black',
        fontSize: 22,
      },
      title: {
        fontSize: 45,
        marginBottom: 20,
        textAlign:"center",
        fontWeight:"bold",
        color:"#000"
      },
      register:{
        height:"74%",
      },
      searchBar: {
        height: 40,
        borderColor: '#1999a6',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width:"78%",
        marginLeft:"10%"
      },
 })

 export default  AdopcionesAdop;