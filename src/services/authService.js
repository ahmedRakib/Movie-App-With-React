import http from './httpService'
import jwtDecode from 'jwt-decode'

const apiEndpoint = "http://localhost:3900/api/auth";

http.setJwt(getJwt()); //setting jwt in request header for every http request passed to server

export function getCurrentUser(){
    const token = localStorage.getItem('token');
    if(!token)
    return null;
    
    const user = jwtDecode(token)
    return user;
}

export function getJwt () {
    return localStorage.getItem('token');
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
    getJwt,
    login,
    loginWithJwt,
    logout
};