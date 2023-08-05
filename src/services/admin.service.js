import axios from "axios"

const API_URL = 'https://cyberforestapi.vercel.app/api/admin/'

const adminLoginService = (data) => {
    return axios.post(API_URL + 'login', data)
}

export default {
    adminLoginService
}