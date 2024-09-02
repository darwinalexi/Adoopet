import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function ModalColor({visile, onclose}){
    return(
<Modal
visible={visile}
transparent={true}
onRequestClose={onclose}
>
<View style={style.main}>
   <View style={style.submain}>
    <TouchableOpacity onPress={onclose} style={{padding:13}}>
    <FontAwesomeIcon icon={faClose} size={34} color='#1999a6'/>
    </TouchableOpacity>
    <Text style={{textAlign:"center", fontWeight:"bold", padding:5, fontSize:23,}} >Colores</Text>
   <ScrollView style={style.scrollContainer}>
    <View style={style.context}> 

    <View style={style.item}>
                            <View style={{ backgroundColor: "blue", borderRadius: 23, width: 34, height: 22, margin: 12 }} />
                            <View style={style.containertext}>
                                <Text style={style.text}>
                                    Azul claro: Son todas aquellas mascotas que tienen un estado de "por adoptar"
                                </Text>
                            </View>
                        </View>

                        <View style={style.item}>
                            <View style={{ backgroundColor: "orange", borderRadius: 23, width: 34, height: 22, margin: 12 }} />
                            <View style={style.containertext}>
                                <Text style={style.text}>
                                    Naranja: Son todas aquellas solitudes que que tienen un estado "Pendiente"
                                </Text>
                            </View>
                        </View>

                        <View style={style.item}>
                            <View style={{ backgroundColor: "red", borderRadius: 23, width: 34, height: 22, margin: 12 }} />
                            <View style={style.containertext}>
                                <Text style={style.text}>
                                    Rojo: Son todas aquellas solicitudes que estan aceptadas
                                </Text>
                            </View>
                        </View>
    </View>
                    </ScrollView>
   </View>
   
</View>

</Modal>
    

)}
    const style= StyleSheet.create({
        scrollContainer: {
            flex: 1, 
        },
        main:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"'rgba(0, 0, 0, 0.5)',"
        },
        submain:{
            width:"67%",
            height:300,
            backgroundColor:"white",
            borderRadius:23,
            overflow:"scroll"
        },
        containertext:{
            width:"83%",
            height:"165%",
        },
        item:{
            
            height:104,
            width:"100%",
            
            
            flexDirection:"row",
            padding:32,
        },
        text:{
            color:"black",
            fontWeight:"900",
            fontSize:15,
            height:"295%"
        },
        context:{
            height:"150%",
            flex:1,
            

        }
    })


export default ModalColor;