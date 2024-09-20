import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity, FlatList, TextInput } from "react-native";
import axiosClient from "../utils/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import ModalShow from "../Modal/ModalShow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import ModalColor from "../Modal/ModalColor";
import Buttom from "../Component/btn/butoom";
import { baseURL } from "../utils/data";



function Adopcionesp() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null); // Estado para la mascota seleccionada
  const [modal, setModalVisible] = useState(false);
  const [user, setuser]= useState([]);
   const [searchText, setSearchText] = useState('');
   const [raza, setraza]= useState()
   const [select, setSelecterace]= useState(null)
   const [categoria, setcategoria]= useState([]);
   const [selectcategorie, setselectcategorie]= useState()
 
  

  const openModal = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPet(null); 
  };

  const listar = async () => {
    try {
      const response = await axiosClient.get("/listar_no_adoptados");
      setPets(response.data);
      console.log("mascota", response.data);
      const user= await AsyncStorage.getItem('usuario');
            if (user) {
                const usuario= JSON.parse(user)
                const tipo= usuario.tipo;
              setuser(tipo)
            }
    } catch (error) {
      if (error) {
        Alert.alert("No Hay Registros de mascotas por adoptar")
    }
      
    }
  };

  const eliminar = async (id) => {
    try {
      const response = await axiosClient.delete(`/eliminar_pets/${id}`);
      console.log("consulta", response.data.message);
      await listar();
    } catch (error) {
      console.error("Error al eliminar la mascota:", error);
    }
  };
  const razas= async()=> {
    const  raza= await axiosClient.get("/listar_races")
    
    console.log(raza.data)

    const datos= raza.data.map((seleccion)=>{
      return {
        key: seleccion.id,
        value:seleccion.nombre_r}
})
setraza(datos)
  }


  const categorias = async () => {
    const response = await axiosClient.get("/listar_categories")
    
    
    const data= response.data.map((dato)=>{
      return{
        key: dato.id,
        value:dato.nombre
      }
    })
    setcategoria(data)

  }



  useEffect(() => {
    listar();
    razas();
    categorias();
  }, [pets]);

 

  const maco = pets.filter(mascotas => {
    const nombre = mascotas.nombre_mascota ? mascotas.nombre_mascota.toLowerCase() : '';
    
    const filterByName = nombre.includes(searchText.toLowerCase());

    //en cada filtro se crea una const dondese sepone la respuesta de la apí y luego se trae y se comparan ambos datos  
    const filterByRaza = select ? mascotas.raza_id === select : true;
// estructura 
//se crea la const y luego se asigna la variable que va a contener el select  para traer la info  juunto con el dato traido de la la api 
//si es true lo muestra ty si no no muestra  nada
    const filtercaegorie = selectcategorie ? mascotas.categoria_id === selectcategorie:true;
  
    return filterByName && filterByRaza && filtercaegorie;
  });
  
  const getimage = (foto) => {
    const baseUrl = `${baseURL}/img/`;
    //si hay muchas img crea una url para cada una y las separa por una ,
    const urls = foto.split(',').map(image => `${baseUrl}${image.trim()}`);
    //  URL generadas
    console.log('url de img:', urls); 
    // Devuelve solo la primera imagen
    return urls.length > 0 ? urls[0] : ''; 
  };
  


    return (
    <SafeAreaView style={{ flex: 1 }}> 
       <Buttom/>
        
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar mascotas"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <View style={{flexDirection:"row",width:"90%"}}>
              <View style={{width:"40%", margin:12, marginLeft:24}}>
              <SelectList
                data={raza}
                setSelected={(value) => {
                  setSelecterace(value); // Establece el ID seleccionado
                }}
                placeholder="Seleccionar raza"
              />
              </View>
              <View style={{width:"40%", margin:12, marginLeft:43}}>
              <SelectList
                data={categoria}
                setSelected={(value) => {
                  setselectcategorie(value); // Establece el ID seleccionado para compararar en el filtro
                }}
                placeholder="Seleccionar  categoria"
              />
              </View>
        </View>
        {maco.length >0?(
              <FlatList
              data={maco}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image
                      source={{ uri: getimage(item.foto) }} // Usa getimage para obtener solo la primera imagen
                      style={styles.image}
                      onError={(e) => console.error('Image load error:', e.nativeEvent.error)} // Maneja errores de carga
                    />
                  <View style={styles.infoContainer}>
                    <Text style={styles.text}>Nombre: {item.nombre_mascota}</Text>
                    <Text style={styles.text}>{item.descripcion}</Text>
                    <Text style={styles.text}>Edad: {item.edad} Años</Text>
                    <Text style={styles.text}>Municipio: {item.municipio}</Text>
                    <Text style={styles.text}>Departamento: {item.nombre_departamento}</Text>
                    <View style={{backgroundColor:"blue", height:7}}></View>
                  </View>
                  <TouchableOpacity onPress={()=>openModal(item)}>
                  <FontAwesomeIcon icon={faSearch} size={34} style={{marginRight:"7%", marginTop:"22%", color:"#1999a6"}}/>
                  </TouchableOpacity>

                  {user=="Administrador" &&(
                    <TouchableOpacity  onPress={()=>eliminar(item.id)}>
                    <FontAwesomeIcon icon={faTrash} size={34} style={{marginRight:"5%", marginTop:"22%", color:"red"}}/>
                    </TouchableOpacity>
                  )}
                  
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
        ):(
     <Text  style={styles.text} >No Hay Un Registro</Text>
        )}
     
      <ModalShow
        visible={modal}
        onClose={closeModal}
        data={selectedPet}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingBottom: 30
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1999a6',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
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

});

export default Adopcionesp;
