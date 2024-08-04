import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.7:4001/'
})

axiosClient.interceptors.request.use( async (request) => {
    const token = await AsyncStorage.getItem('token')
    request.headers['token'] = token
    return request
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error.response.data);
    if (error.response.status == 404) {
        console.log("Cerrar sesión");
    }
})

export default axiosClient