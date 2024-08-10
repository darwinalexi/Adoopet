import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import LoginModal from '../Modal/Modal'; 
import  icono from"../img/icono.png"

const Home = () => {
    const [openmodal, setmodal] = useState(false);

    const modalopen = () => setmodal(true);
    const modalclose = () => setmodal(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.name}>ADOPPET</Text>
                <View style={styles.lem}>
                    <Image  source={icono}/>
                    <Text style={styles.description}>
                        En <Text style={styles.highlight}>adoppet</Text> creemos que cada mascota merece un hogar lleno de amor y cuidado. 
                        Únete a nuestra comunidad y encuentra a tu compañero perfecto
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={modalopen}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <LoginModal visible={openmodal} onClose={modalclose} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20, 
    },
    name: {
        color: '#1999a6',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20, 
    },
    lem: {
        width: '90%', 
        alignItems: 'center',
    },
    description: {
        color: 'black',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    highlight: {
        textTransform: 'capitalize',
        color: '#1999a6',
    },
    button: {
        backgroundColor: '#1999a6',
        height: 44,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18, // Ajuste para un tamaño más adecuado
    }
});

export default Home;
