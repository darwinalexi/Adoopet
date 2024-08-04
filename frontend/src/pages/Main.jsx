import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Component/Header';
import axiosClient from '../utils/AxiosClient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export function Main() {
  const [pet, setPet] = useState([]);

  const listarMascotas = async () => {
    try {
      const response = await axiosClient.get('/listar_no_adoptados');
      setPet(response.data);
      console.log('respuesta', response.data);
    } catch (error) {
      console.error('Error en listar mascotas:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    listarMascotas();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#FFD166'}}>
       
      <ScrollView>
      <Header />
        <Text style={{color:'black', fontSize:23, paddingLeft:53, paddingTop:23}}>Mascotas Para Adoptar</Text>
        <View style={styles.container}>
          {pet.map((mascota, index) => (
            <View key={mascota.id || index} style={styles.itemContainer}>
                  <Image
                source={{ uri: `http://192.168.1.7:4001/img/${mascota.foto}` }}
                style={{ width: '70%', height: 130 }} 
              />
              <Text style={{color:'black'}}>Nombre: {mascota.nombre_mas}</Text>
              <Text style={{color:'black'}}>Descripcion: {mascota.descripcion}</Text>
              <Text style={{color:'black'}}>Edad: {mascota.edad}</Text>
              <Text style={{color:'black'}}>Estado: {mascota.estado}</Text>
              <FontAwesomeIcon  icon={faUser}/>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    gap:23,
    justifyContent: 'space-between', 
    paddingTop: 25,
    paddingBottom:23,
  },
  itemContainer: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    borderWidth: 4,
    height:270,
    borderColor: '#194F71',
    color:'black',
  },
});



    