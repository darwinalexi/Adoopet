import React, { useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, SafeAreaView, Text, TouchableOpacity, Animated } from 'react-native';
import { data } from "./data";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';



//se desestructura las dimensiones de cada device
const {width}= Dimensions.get('window')



 const Slider = () => {
  const [activeoption, setActive] = useState(0); 
  const [activebtn, setactivebtn]= useState(0)
  console.log("boton",activebtn)

 //permite tener un estado de actio enm caso de estar en  la posicion del slaider corrececta 
 const handleslaide = (event) => {
  // Desestructura las propiedades contentOffset y layoutMeasurement del evento nativo
  const { contentOffset, layoutMeasurement } = event.nativeEvent;
  // Calcula el índice de la diapositiva activa
  const slide = Math.ceil(contentOffset.x / layoutMeasurement.width);
  // Actualiza el estado `activeoption` con el índice calculado
  setActive(slide >= data.length ? data.length - 1 : slide);
  setactivebtn(slide >= data.length ? data.length - 1 : slide);
};

const navigation = useNavigation();
  const datos= data;

  return (
    <SafeAreaView style={{flex:0 }}>
    <View style={styles.container}>
      <ScrollView style={{flex:1,  alignSelf:"stretch",backgroundColor:"#bfc5ca" }}
      //permite que scrollview se quede donde se pone el dedo y no se duplique
      pagingEnabled
      onMomentumScrollEnd={handleslaide}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      >
          {datos .map((data)=>(
            <View style={{flex:1}} key={data.id}>
              <View style={styles.header}>
              <Text style={{fontSize:34, color:"black", fontWeight:"bold"}}>{data.title}</Text>
              </View>

              <View style={styles.containerimage}>
                <Image source={{uri: data.imagen}} style={{width:"96%", height:"100%", borderBottomLeftRadius:23, }}/>
              </View>
              <View style={styles.text}>
              <Text style={{fontSize:23, width:"70%", color:"black", textAlign:"center"}}>{data.text}</Text>
              </View>
        
             
            </View>
          ))}
      </ScrollView>
      <View style={styles.pagincontext}>

        {datos .map((data,i)=>(
        <View key={data.id}  style={[
          styles.paginationitem,
          { backgroundColor: i === activeoption ? "#1999a6" : "black", position:"relative", bottom:45, left:23, } // Cambia el color de fondo basado en `activeoption`
        ]}>
                  
        </View>
        ))}
        
        <View style={styles.boton}>
        <TouchableOpacity    onPress={() => {
    if (activebtn === datos.length - 1) {
      navigation.navigate("main");
    } else {
      alert('Desliza hasta el último slider para continuar.');
    }
       }}style={{backgroundColor: activebtn === (datos.length-1) ? "#1999a6" : "gray",   width:"60%", height:50, position:"relative", bottom:45, right:23, borderRadius:23}}> 
        <Text style={styles.textb}>Continuar</Text>
        </TouchableOpacity>
    
        </View>
      </View>
     
    </View> 
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center",

  },
  header:{
    height:"auto",
    width,
    paddingHorizontal:20,
    justifyContent:"center",
    alignItems:"center",
    marginTop:"45%"
  },
  text:{
    height:"auto",
    width,
    paddingHorizontal:20,
    justifyContent:"center",
    alignItems:"center",
  },
  containerimage: {
    width: "80%",
marginLeft:25,
    height: 200,
    paddingTop:19,
    
    resizeMode: 'cover',
  },
  paginationitem:{
  width:14,
  height:14,
 
  borderRadius:12,
  marginRight:12,
  

  },
  pagincontext:{
    width:"100%",
    height:17,
    flexDirection:"row",
     
     backgroundColor:"#bfc5ca"
  },
  boton:{
    flex:1,  
    alignSelf:"stretch", 
    alignItems:"flex-end", 
    justifyContent:"center" 
  },
  textb:{
    textAlign:"center", 
    marginTop:"6%",  
    color:"white", 
    fontSize:14
  }
});

export default Slider;
