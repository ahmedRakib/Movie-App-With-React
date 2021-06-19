import axios from 'axios';
import { toast } from 'react-toastify';
import authService from '../services/authService'

axios.defaults.headers.common['x-auth-token'] = authService.getJwt(); //putting token(if exist) in header 
                                                                      // for every http request sent to server

axios.interceptors.response.use(null, error => {
    const expectedError = 
    error.response && 
    error.response.status >= 400 &&
    error.response.status < 500

    if(!expectedError){
        console.log(error)
        toast.error("An unexepected error occured");
    }

    return Promise.reject(error);
})

export default {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    delete : axios.delete
}