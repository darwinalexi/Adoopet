import { View, Image } from "react-native"
import { Text } from "@rneui/base";

const Header=()=>{
    return(
        <View style={{shadowOffset:{width:0,height:2,}, shadowOpacity:0.27,shadowColor: 'orange',shadowRadius:2.84,borderBottomColor:'orange', borderWidth:1, height:'70%'}}>
            <Image source={require('../img/logo.png')} style={{width:90, height:60, marginTop:23}}></Image>
            <Text style={{position:'relative', left:'40%', bottom:46, textTransform:'capitalize', fontSize:22, }}>Adoppet</Text>
        </View>
    )
}

export default Header;