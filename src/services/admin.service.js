import axios from "axios"
import authHeader from "./auth.header"

const API_URL = 'https://api.cyberforest.tech/api/admin/'

const adminLoginService = (data) => {
    return axios.post(API_URL + 'login', data)
}

const blogListService = () => {
    return axios.get(API_URL + 'blog/getall', {
        headers: authHeader()
    })
}

const addBlogService = (data) => {
    return axios.post(API_URL + 'blog', data, { headers: authHeader() })
}

const categoriesService = () => {
    return axios.get(API_URL + 'viewall', { headers: authHeader() })
}

const getBlogById = (id) => {
    return axios.get(API_URL + 'blog/get-by-id/' + id, { headers: authHeader() })
}

const editBlog = (id, data) => {
    return axios.put(API_URL + 'editblog/' + id, data, { headers: authHeader() })
}
export default {
    adminLoginService,
    blogListService,
    addBlogService,
    categoriesService,
    getBlogById,
    editBlog
}