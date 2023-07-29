const { default: axios } = require("axios")

const API_URL = 'https://cyberforest.vercel.app/api/'

const adminLoginService = (data) => {
    return axios.post('api/admin/login', data)
}

export default {
    adminLoginService
}