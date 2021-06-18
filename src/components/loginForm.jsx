import React, { Component } from 'react';
import Joi, { schema } from 'joi-browser';
import Form from './common/form';
import { login } from '../services/authService';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

class LoginForm extends Form {

    state = {
        data : { username:"", password:"" },
        errors : {}
    }

    schema = {
        username : Joi.string().required().label('Username'),
        password : Joi.string().required().label('Password')
    }

    doSubmit = async () =>{
        try {
            const {data : jwt} = await login(this.state.data);
            localStorage.setItem("token", jwt);
            
            //this.props.history.push('/');
            window.location = '/';
        } catch (ex) {
            if(ex.response && ex.response.status === 400){
                toast.error(ex.response.data);
            }
            
        }
        
    }

    render() { 
        return ( 
            <div>
                 <h1>Login</h1>
                 <ToastContainer />
                 <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password","Password", "password")}
                    {this.renderButton("Login")}
                 </form>
            </div>
       
         );
    }
}
 
export default LoginForm;