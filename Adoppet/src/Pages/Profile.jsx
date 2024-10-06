import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Alert } from "react-native"
import axiosClient from "../utils/AxiosClient"
import EditProfile from "../Modal/EditProfile"
import Logout from "../Component/Logout"
import { baseURL } from "../utils/data"

const Profile = ({ navigation }) => {
  const [user, setuser] = useState()
  const [openmodal, setmodal] = useState(false);
  const [tipo, settipo]= useState([]);

  const open = () => {
    setmodal(true);
  };

  const close = () => {
    setmodal(false);
  };



  const listar_user = async () => {
    const user_save = await AsyncStorage.getItem('usuario')
    const user = JSON.parse(user_save);
    const id = user.id
    const  type= user.tipo;
    settipo(type) 
    const response = await axiosClient.get(`/buscar/${id}`)
    //se convierte para poder mostrar los daros   
    if (response.data && response.data.length > 0) {
      setuser(response.data[0]);
      console.log("usuario niciado", user)
    } else {
      setuser(null);
    }
  }

  useEffect(() => {
    listar_user();
  }, [])

  return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <View style={{flex:1}}>
            <View style={{flex:1}}>
             
            {tipo=="Administrador"&&(
              //permite desplazamiento vertical
              <ScrollView horizontal={true} style={style.scrollContainer}>
              <View style={style.option}>
              <TouchableOpacity  onPress={()=>navigation.navigate('Categotria')} style={style.buttom}>
              <Text style={style.textbuttom}>
                Categoria
              </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>navigation.navigate('Municipios')} style={style.buttom}>
              <Text style={style.textbuttom}>
                Municipio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>navigation.navigate('Departamento')} style={style.buttom}>
              <Text style={style.textbuttom}>Departamentos</Text>
            </TouchableOpacity>

              </View>
              </ScrollView>
      )}
              {user !== null && (
                <View style={style.container}>
                  <Text style={style.title}>Perfil De Usuario</Text>
                  
                  {tipo=="Administrador" || tipo=="Usuario"&&(
                    <>
                        <Text style={style.text}>Nombre: {user?.nombre}</Text>
                      <Text style={style.text}>Dirección: {user?.direccion}</Text>
                      <Text style={style.text}>Documento: {user?.documento}</Text>
                      <Text style={style.text}>Email: {user?.email}</Text>
                      <View style={{ borderRadius: 23, width: "53%", position: "relative", left: 84 }}>
                        <Image style={style.image} source={{ uri: `${baseURL}/img/${user?.foto}` }} />
                      </View>
                      <Text style={style.text}>Tipo: {user?.tipo}</Text>
                      <Text style={style.text}>Tipo de documento: {user?.tipo_de_documento}</Text>
                      <Text style={style.text}>Teléfono: {user?.telefono}</Text>
                    </>
                  )}

                  {tipo=="Invitado"&&(
                     <>
                       <Text style={style.text}>Nombre: {user?.nombre}</Text>
                       <Text style={style.text}>Email: {user?.email}</Text>
                       <View style={{ borderRadius: 23, width: "53%", position: "relative", left: 84 }}>
                        <Image style={style.image} source={{ uri: `${baseURL}/img/${user?.foto}` }} />
                      </View>
                      <Text style={style.text}>Tipo: {user?.tipo}</Text>
                     </>
                  )}
           
                </View>
              )}
         
            </View>
        
      {tipo == "Usuario" &&(
        <TouchableOpacity onPress={() => navigation.navigate('Adoptar')} style={style.buttomAdopt}>
              <Text style={{ padding: 9, color: "white", textAlign: "center" }}>
                Adoptar Mascota
              </Text>
            </TouchableOpacity>
      )}
            <EditProfile visible={openmodal} close={close} />
            <View style={style.butomm}>
                      <Logout />
                    </View>
          </View>
          </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    marginTop: "15%",
    flex:1,
    height:"100%",
    

  },
  image: {
    width: "100%",
    borderRadius: 23,
    height: 200,
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    margin: 4
  },
  text: {
    color: "black",
    fontSize: 25,
    marginBottom: 13,
    textAlign: "center"
  },
  buttomAdopt: {
    width: "36%",
    position: "absolute",
    left: "3%",
    top: 12,
    backgroundColor: "#1999a6",
    borderRadius: 23
  },
  buttomedit: {
    width: "36%",
    position: "absolute",
    left: "57%",
    top: 12,
    borderWidth: 3,
    borderColor: "#1999a6",
    borderRadius: 23
  },
  option:{
    flexDirection:"row",

  },
   buttom:{
    backgroundColor:"#1999a6",
    borderRadius:12,
    margin:12,
    height:34,
  
  },

  textbuttom:{
    color:"white",
    padding:7,
    fontFamily:"bold"
  },
  scrollContainer:{
    borderBottomColor:"2%",
    borderWidth:2,
    paddingHorizontal: 10, // Añadir algo de padding para asegurarse de que el color se muestre correctamente
    height: 50,
    width:"100%"
  },
  butomm:{
    position:"absolute",
  left:"60%",
  marginTop:14,
    width:"50%",
    height:"20%"
  }
})

export default Profile;