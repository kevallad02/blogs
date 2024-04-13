import axios from "axios"

const API_URL = 'https://api.cyberforest.tech/api/'

const blogList = (query) => {
    return axios.get(API_URL + 'blog/userblog' + query)
}

const blogDetail = (id) => {
    return axios.get(API_URL + 'blog/blogdetail/' + id)
}

export default {
    blogList,
    blogDetail
}