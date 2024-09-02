import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axiosClient from "../utils/AxiosClient";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Create_Categories from "../Modal/ModalCategories";
import EditCategories from "../Modal/EditCategories";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [openModal, setModal] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openUpdate = (id) => {
        const category = categories.find(cat => cat.id === id); // Encuentra la categoría por ID
        setSelectedCategory(category); // Establece la categoría seleccionada
        setUpdate(true); // Abre el modal de edición
    };

    const closeUpdate = () => {
        setUpdate(false);
        setSelectedCategory(null); // Limpia la categoría seleccionada
    };

    const open = () => {
        setModal(true);
    };

    const close = () => {
        setModal(false);
    };

    const listCategories = async () => {
        try {
            const response = await axiosClient.get("/listar_categories");
            setCategories(response.data);
            console.log("mensaje", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await axiosClient.delete(`/eliminar_categories/${id}`);
            console.log(response.data.mensaje);
            await listCategories();
        } catch (error) {
            console.log(error);
            Alert.alert("Esta categoria no se puede borrar porque esta en uso");
        }
    };

    useEffect(()=>{
        listCategories();
        //recarga
        const intervalId = setInterval(() => {
            listCategories();
          }, 1000);
    
          return () => clearInterval(intervalId);
    },[])

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={style.title}>Categorias</Text>
                <View style={style.table}>
                    <View style={style.row}>
                        <Text style={style.cellHeader}>Nombre</Text>
                        <Text style={style.cellHeader}>Estado</Text>
                        <Text style={style.cellHeader}>Acción</Text>
                    </View>
                    {categories.map((data) => (
                        <View key={data.id} style={style.row}>
                            <Text style={style.cell}>{data.nombre}</Text>
                            <Text style={style.cell}>{data.estado}</Text>
                            <View style={style.cell}>
                                <TouchableOpacity style={{ marginLeft: 23 }} onPress={() => deleteCategory(data.id)}>
                                    <FontAwesomeIcon icon={faTrash} color="red" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openUpdate(data.id)} style={{ marginLeft: 23 }}>
                                    <FontAwesomeIcon icon={faEdit} color="#1999a6" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={open} style={style.create}>
                    <Text style={style.textButton}>CREAR CATEGORIA</Text>
                    <FontAwesomeIcon icon={faPlus} size={24} color="white" style={{ padding: 3, marginLeft: 74 }} />
                </TouchableOpacity>
            </ScrollView>
            <Create_Categories visible={openModal} onClose={close} categorias={listCategories} />
            {selectedCategory && (
                <EditCategories
                    visible={update}
                    onClose={closeUpdate}
                    data={selectedCategory} // Pasa solo la categoría seleccionada
                />
            )}
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center",
        margin: "4%",
        color: "#000"
    },
    table: {
        borderColor: "#1999a6",
        borderWidth: 3,
        margin: 9
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        width: "100%"
    },
    cell: {
        flex: 1,
        padding: 10,
        borderColor: "#1999a6",
        borderWidth: 1,
        width: "33%",
        flexDirection: "row"
    },
    cellHeader: {
        borderColor: "#1999a6",
        borderWidth: 1,
        width: "33%",
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    create: {
        backgroundColor: "#1999a6",
        width: "50%",
        marginLeft: "24%",
        marginTop: "8%",
        borderRadius: 12
    },
    textButton: {
        color: "#ffff",
        padding: 3,
        marginLeft: 34
    }
});

export default Categories;
