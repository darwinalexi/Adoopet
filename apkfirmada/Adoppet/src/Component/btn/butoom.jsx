import { TouchableOpacity, Text, StyleSheet } from "react-native"
import ModalColor from "../../Modal/ModalColor"
import { useState } from "react"


function Buttom() {
    const [modalcolor, setmodalcolor]= useState(false)
    const opencolor=()=> {

        try {
          setmodalcolor(true)
          console.log('opencolor se está ejecutando');
        } catch (error) {
          console.log("error no se abre el modal")
        }
      }
      const closecolor=()=> {
        try {
          setmodalcolor(false)
        } catch (error) {
          console.log("error no se cerro el modal")
        }
      }
    return(
        <>
        <TouchableOpacity onPress={opencolor} style={styles.btoncolor}>
        <Text  style={{textAlign:"center",padding:3, fontWeight:"bold", fontSize:17}}>Significado de Colores </Text>
      </TouchableOpacity>
      <ModalColor visile={modalcolor} onclose={closecolor}/>
      </>
    )
}

const  styles= StyleSheet.create({
    btoncolor:{
        borderRadius:23,
        borderWidth:2,
        borderColor: '#1999a6',
        margin:23,
        width:"32%",
        height:52
      }
})
export default Buttom;