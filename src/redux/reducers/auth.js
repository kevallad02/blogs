import Cookies from "js-cookie";
import { LOGIN_SUCCESS } from "../actions/type";

const isLoggedIn = Cookies.get('isLoggedin')
const auth = Cookies.get('auth')
const token = Cookies.get('token')
const initialState = {
    isLoggedIn: isLoggedIn !== undefined?.JSON.parse(isLoggedIn) || false,
    auth: auth,
    token: token
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                auth: payload,
                token: token
            }
        default:
            return state
    }
}