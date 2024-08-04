import { View, Image } from "react-native"
import { Text } from "@rneui/base"; 
const Header=()=>{
    return(
        <View style={{shadowOffset:{width:0,height:2,}, shadowOpacity:0.27,shadowColor: 'orange',shadowRadius:2.84,backgroundColor:'#194F71', borderWidth:1, height:'25%'}}>
            <Image source={require('../img/logo.png')} style={{width:90, height:60, marginTop:23, position:'relative', left:'63%'}}></Image>
            <Text style={{position:'relative', bottom:46, textTransform:'capitalize', fontSize:22,color:'white', fontWeight:'bold' }}>Adoppet</Text>
        </View>
    )
}

export default Header;