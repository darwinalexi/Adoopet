import { SafeAreaView,Text,StyleSheet, ScrollView, View, Image, TextInput, TouchableOpacity, FlatList, Alert} from "react-native"
import axiosClient from "../utils/AxiosClient"
import { useEffect, useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalShow from "../Modal/ModalShow"; 
import ModalVer from "../Modal/ModalVer";
import Buttom from "../Component/btn/butoom";
 
const Pendientes = () => {
    const [merraing, seterraing] = useState([]);
    const [tipo_user, setuser] = useState([]);
    const [adoptar, setadoptar] = useState([]);
    const [borrar, setbborrar] = useState([]);
    const [user, setusers] = useState([]);
    const [id, setid] = useState([]);
    const [modal,setmodal]= useState(false)
    const[selectpet, setselectpet]= useState([])
    const [search, setsearch]= useState("")


    const openmodal = (user) => {
       try {
        console.log("data",user)
        setselectpet(user)
         setmodal(true)
       } catch (error) {
        console.log("errorrrrrrrrrrrrrrrr")
       }
    };

    const closemodal = () => {
  
        setselectpet(null)
        setmodal(false)
     };
   
     const datos= user.filter(pet =>{
         const nombre= pet.nombre_mascota? pet.nombre_mascota.toLowerCase() : '';
    
         const filterByName = nombre.includes(search.toLowerCase());

         return filterByName;
     })
    const listar_solicitudes = async () => {
        try {
            const user = await AsyncStorage.getItem('usuario');
            if (user) {
                const usuario = JSON.parse(user);
                const id = usuario.id;
                const listar = await axiosClient.get(`/solicitudes/${id}`);
                setusers(listar.data);
                console.log("usuarios", listar.data);
            }
        } catch (error) {
            if (listar.data.length===0) {
                Alert.alert("No Hay Registros de adopciones pendientes")
            }
        }
    };

    const eliminar = async (id_adopcion, id_mascota) => {
        try {
            const Eliminar = await axiosClient.delete(`/eliminar_adopcion/${id_adopcion}/${id_mascota}`);
            setbborrar(Eliminar.data.mensaje);
            console.log("respuesta", Eliminar.data.mensaje);
            if (Eliminar.status === 200) {
                Alert.alert("La solicitud de adopción fue eliminada");
            }
            await listarpendientes();
        } catch (error) {
            console.log(error);
        }
    };




    const listarpendientes = async () => {
        try {
            const show = await axiosClient.get("/listar_adopciones");
            seterraing(show.data);
            console.log("adopcion", show.data)
          
            const user = await AsyncStorage.getItem('usuario');
            if (user) {
                const usuario = JSON.parse(user);
                const tipo = usuario.tipo;
                setuser(tipo);
                console.log("tipopooi",tipo);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarpendientes();
        listar_solicitudes();
        const intervaloId = setInterval(() => {
            listarpendientes();
            listar_solicitudes();
        }, 30000);
        return () => clearInterval(intervaloId);
    }, []);

   
    const getimage = (foto) => {
        const baseUrl = 'http://192.168.1.7:4001/img/';
        //si hay muchas img crea una url para cada una y las separa por una ,
        const urls = foto.split(',').map(image => `${baseUrl}${image.trim()}`);
        //  URL generadas
        console.log('url de img:', urls); 
        // Devuelve solo la primera imagen
        return urls.length > 0 ? urls[0] : ''; 
      }

    return (
        <SafeAreaView style={style.main}>

                {tipo_user === "Usuario" && (
                    <View>
                      <Buttom/>
                        <Text style={{ fontSize: 45, textAlign:"center", fontWeight:"bold", color:"#000" }}>Adopciones en proceso</Text>
                        <TextInput
                            style={style.searchBar}
                            placeholder="Buscar mascotas"
                            onChangeText={(text) => setsearch(text)}
                            value={search}
                            />
                        <FlatList
                            data={datos}
                            renderItem={({ item }) => (
                                <View style={style.itemContainer}>
                                    <View style={{width:"50%"}}>
                                    <Image
                                        source={{ uri: getimage(item.foto) }} // Usa getimage para obtener solo la primera imagen
                                        style={style.image} 
                                    />
                                    </View>
                                    <View style={{flexDirection:"column"}}>

                                    <View style={style.infoContainer}>
                                        <Text style={style.text}>Nombre: {item.nombre_mascota}</Text>
                                        <Text style={style.text}>{item.descripcion}</Text>
                                        <Text style={style.text}>Edad: {item.edad} Años</Text>
                                        <Text style={style.text}>Municipio: {item.municipio}</Text>
                                        <Text style={style.text}>Departamento: {item.departamento}</Text>
                                    </View>

                                    <View style={{flexDirection:"row", width:"50%",}}>
                                        <TouchableOpacity onPress={() => openmodal(item)}>
                                            <FontAwesomeIcon icon={faSearch} size={34} style={{ position:"absolute", bottom:1, left:88, color: "#1999a6" }} />
                                        </TouchableOpacity>

                                        {/*error aqui en el modal datos no se van */}
                                        <ModalVer
                                            visible={modal}
                                            onClose={closemodal}
                                            data={selectpet}
                                        />

                                        {tipo_user === "Administrador" && (
                                            <TouchableOpacity onPress={() => eliminar(item.id)}>
                                                <FontAwesomeIcon icon={faTrash} size={34} style={{ color: "red",position:"absolute", bottom:1, }} />
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    </View>
                                   
                                </View>
                            )}
                        />
                    </View>
                )}
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    title: {
        fontSize: 34
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    conten: {
        borderWidth: 2,
        borderColor: '#1999a6',
        width: '90%',
        marginVertical: 10,
        padding: 12,
        alignItems: 'center',
        borderRadius: 34
    },
    image: {
        width: "80%",
        borderRadius: 23,
        height: 200,
        margin: 12
    },
    scrol: {
        padding: 10,
    },
    text: {
        color: 'black',
        fontSize: 19,
        textAlign: 'center'
    },
    itemContainer: {
        flexDirection:"row",
       
        height:"63%",
    },
    infoContainer: {
        height:"78%",
        marginTop:18
    },
    imgconten: {
        position: "relative",
        left: 36
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

export default Pendientes;