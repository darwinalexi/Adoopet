import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native"
import { TextInput } from "react-native"

export const Sign=({navigation})=>{
    return(
        <ImageBackground source={require('../img/logo.png')} style={{opacity:0.6}}>
        <SafeAreaView >
         <ScrollView>
         <Text style={{color:'black', marginTop:'35%', marginLeft:'26%',fontSize:34}}>REGISTRO</Text>
         <View style={styles.input}>
            <TextInput placeholderTextColor="gray"placeholder="INGRESE EL NOMBRE"  style={{textAlign:'center', color:'orange', fontSize:19}}></TextInput>
         </View>
         <View>
                <View style={styles.input}>
                    <TextInput placeholderTextColor="gray"placeholder="INGRESE EL NOMBRE" style={{textAlign:'center',  color:'orange', fontSize:19}}></TextInput>
                </View>

                <View style={styles.input}>
                    <TextInput placeholderTextColor="gray"placeholder="INGRESE SU EDAD" style={{textAlign:'center',  color:'orange', fontSize:19}}></TextInput>
                </View>

                <View style={styles.input}>
                    <TextInput placeholderTextColor="gray"placeholder="CORREO" style={{textAlign:'center',  color:'orange', fontSize:19}}></TextInput>
                </View>

                <View style={styles.input}>
                    <TextInput placeholderTextColor="gray"placeholder="CONTRASEÑA" style={{ color:'orange', fontSize:19,textAlign:'center'}}></TextInput>
                </View>

                <View style={{width:'89%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Sign')} style={{marginLeft:14, backgroundColor:'orange',height:53, borderColor:'orange', borderWidth:2, marginTop:23, borderRadius:42}}>
                <Text style={{fontFamily:'bold', fontSize:19, marginLeft:103, }}>Registrate</Text>
                </TouchableOpacity>
                </View>

                <View style={{width:'89%', marginTop:34}}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={ {textAlign:'center', marginLeft:14, height:53, borderColor:'orange', borderWidth:2, borderRadius:45}}>
                <Text style={{fontFamily:'bold', fontSize:19, marginLeft:83, color:'orange'}}>Iniciar Sesion</Text>
                </TouchableOpacity>
                </View>
         </View>
         
         </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles= StyleSheet.create({
    input:{
        borderBottomWidth:2,
        borderBottomEndRadius:9,
        width:'79%',
        marginLeft:32,
              
    }
})