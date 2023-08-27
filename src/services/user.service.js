import axios from "axios"

const API_URL = 'https://cyberforestapi.vercel.app/api/'

const blogList = ()=>{
    return axios.get(API_URL+'blog/userblog')
}

export default {
    blogList
}