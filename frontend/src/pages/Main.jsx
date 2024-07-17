import { Text } from "@rneui/base";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Header from "../Component/Header";

export function Main(){
    return(
        <SafeAreaView >
            <ScrollView style={{height:'100%'}}>
            <Header/>
            <Text >Mascotas Para Adoptar</Text>

            </ScrollView>
        </SafeAreaView>
     
    )
}

const style = StyleSheet.create({

})