import http from './httpService'

const apiEndpoint = "http://localhost:3900/api/auth";

export function login(loginModel){
    return http.post(apiEndpoint, {
        email : loginModel.username,
        password : loginModel.password
    });
}
