import axios from 'axios'
import { baseUrl } from './data'

const axiosClient = axios.create({
    baseURL: baseUrl
})

axiosClient.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    request.headers['token'] = token
    return request
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log("error", error)
})

export default axiosClient