import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { Main } from "../pages/Main";
import { Home } from "../pages/Home";

const Tab= createMaterialBottomTabNavigator();
export const Tabs=()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="main" component={Main}/>
            <Tab.Screen name="Home" component={Home}/>
        </Tab.Navigator>
    )
}