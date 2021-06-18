import http from './httpService'
import jwtDecode from 'jwt-decode'

const apiEndpoint = "http://localhost:3900/api/auth";

export function getCurrentUser(){
    const token = localStorage.getItem('token');
    const user = jwtDecode(token)
    return user;
}

export async function login(loginModel){
    const { data : jwt } = await http.post(apiEndpoint, { email : loginModel.username, password : loginModel.password });
    localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem("token", jwt);
}

export function logout(){
    localStorage.removeItem('token');
}


export default {
    getCurrentUser,
    login,
    loginWithJwt,
    logout
};