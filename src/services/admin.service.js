import axios from "axios"
import authHeader from "./auth.header"

const API_URL = 'https://cyberforestapi.vercel.app/api/admin/'

const adminLoginService = (data) => {
    return axios.post(API_URL + 'login', data)
}

const blogListService = () => {
    return axios.get(API_URL + 'blog/getall', {
        headers: authHeader()
    })
}
export default {
    adminLoginService,
    blogListService
}