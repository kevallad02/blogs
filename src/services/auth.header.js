import Cookies from "js-cookie";

export default function authHeader() {
    const Authorization = Cookies.get('token')

    if (Authorization) {
        return { 'Authorization': Authorization };
    } else {
        return {};
    }
}

