import { useEffect, useState,  useRef } from "react";
import { View, SafeAreaView, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axiosClient from "../utils/AxiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SelectList} from"react-native-dropdown-select-list" 



const Adoptar = () => {
  const [usuario, setUser] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [adoptantes, setAdoptantes] = useState([]);
  const [selectedAdoptante, setSelectedAdoptante] = useState(null);
  const [data, setdata]= useState([]);
  const[pet, setpet]= useState([]);
  const [crear_adop, setcrar]= useState([])
  const [edad, setedad]=useState({
    edad:''
  });

  const UserData = async () => {
    try {
      const user = await AsyncStorage.getItem('usuario');
      if (user) {
        const parsedUser = JSON.parse(user);
        const id = parsedUser.id;
        const response = await axiosClient.get(`/buscar/${id}`);
        setUser(response.data);
        console.log("listar",response.data);
  
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  
  const fetchAdoptantes = async () => {
    try {
      const response = await axiosClient.get("/listar_user");
      setAdoptantes(response.data);
       // se mapea lo que va en el select
      const datos= response.data.map((seleccion)=>{
        return {key:seleccion.id, value:seleccion.nombre}
  })
       // se mapea lo que va en el select
  setdata(datos)

    } catch (error) {
      console.error("Error fetching adoptantes:", error);
    }
  };

  const Mascotas = async () => {
    try {
      const response = await axiosClient.get("/listar_no_adoptados");
      setMascotas(response.data);
      // se mapea lo que va en el select
      const datos= response.data.map((seleccion)=>{
        return {key:seleccion.id, value:seleccion.nombre_mascota}
    })
    // se guarda los datos
    setpet(datos)

    } catch (error) {
      console.error("Error fetching mascotas:", error);
    }
  };

  useEffect(() => {
    UserData();
    fetchAdoptantes();
    Mascotas();
  }, []);
  const adoptante= useRef(null);
  const mascota= useRef(null);


  const crear_adopcion=async()=>{

    const adoptanteSeleccionado = adoptante.current;
    const mascotaSeleccionada = mascota.current;
    const edadIngresada = edad.edad.trim();
  
    // Validar campos
    if (!adoptanteSeleccionado || !mascotaSeleccionada || !edadIngresada ) {
      Alert.alert("Por favor, llene todos los campos.");
      return;
    } 

    if(edadIngresada <=17){
      Alert.alert("No poses la  edad minima para adoptar");
      return;
    }
  try {
    const crear= await axiosClient.post("/crear_adopcion",{
      id_adoptante: adoptante.current,
      id_mascota: mascota.current,
      edad: edad.edad,
      estado:'Pendiente'
    })
    setcrar(crear.data.mensaje)
  if (crear.status==200) {
    Alert.alert(crear.data.mensaje);
  }



    console.log(crear.data.mensaje);
  } catch (error) {
    console.log(error) 
  }
  }
  const handinputchange = (text, fieldName) => {
    setedad(prevUser => ({
      ...prevUser,
      [fieldName]: text
    }));
  };

  useEffect(() => {
    console.log('Valor actualizado de edad:', edad);
  }, [edad]);
  


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerView}>
          <Text style={styles.title}>Crea una Adopcion</Text>

          <View style={styles.cuadro}>

            <Text style={styles.subtitle}>Selecciona Tu Nombre</Text>
            {data.length > 0 ? (
                <SelectList
                setSelected={(key) => {
                  //TOMA EL VALOR DEL SELECT
                  setSelectedAdoptante(key);
                    //se le aasigna el valor del select a la variable que se va en la consulta
                  adoptante.current=key;
                  console.log("Adoptante seleccionado:", key);
                }}
                    data={data}
                    onSelect={(key) => console.log(key)}
                    placeholder="Selecciona una Opcion"
                    style={styles.selector}
                  />
            ):(
              <Text style={{ fontSize: 16, color: "gray" }}>No hay Adoptantes disponibles</Text>
            )}
          

            <Text style={styles.subtitle}>Selecciona Una Mascota</Text>
            {pet.length > 0 ? (
                <SelectList
                setSelected={(key) => {
                    //TOMA EL VALOR DEL SELECT                  setpet(key);
                  //se le asigna el valor del select a la variable que se va en la consulta
                  mascota.current=key;
                  console.log("Mascota seleccionada:", key);
                }}
                // se pasa el dato a mostrar 
                data={pet}
                placeholder="Selecciona una Opcion"
                style={styles.selector}
                />
            ):(
              <Text style={{ fontSize: 16, color: "gray" }}>No hay Mascotas disponibles</Text>
            )}
           

            <Text style={styles.subtitle}>Ingrese Su Edad</Text>
            <Text style={{fontSize:14, color:"black"}}> <Text style={{color:"red", fontSize:18}}>Aviso:</Text>  Si usted es Menor de edad no podra hace la solicitud de Adopcion</Text>
            <TextInput
             placeholder="Ingrese su edad" 
             style={styles.input}  
            onChangeText={(text) => handinputchange(text, 'edad')}   
            value={edad.edad}
            //tipo de dato a ingresar 
            keyboardType="numeric"
            />
          </View>
          <TouchableOpacity onPress={()=>crear_adopcion()} style={styles.buttom}>
              <Text style={styles.text}>Crear</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  scrollView: {
    flex: 1, 
    height:"100%"
  },
  innerView: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start', 
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    color: "black",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 23,
    textAlign: "center",
    marginBottom: 12, 
  },
  cuadro: {
    marginTop: 20,
  },
  selector: {
    borderColor: "#1999a6",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20, 
  },
  input: {
    backgroundColor: "#f0f0f0", 
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20, 
  },
  buttom:{
    marginTop:34,
    backgroundColor:"#1999a6",
    height:"10%",
    marginBottom:"34%",
    borderRadius:12
  },
  text:{
    color:"white",
    textAlign:"center",
    alignItems:"center",
    marginTop:"3%",
    fontSize:23
  }
});

export default Adoptar;
