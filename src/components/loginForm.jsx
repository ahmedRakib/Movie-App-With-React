import React, { Component } from 'react';
import Joi, { schema } from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from './common/form';
import authService from '../services/authService';
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
            await authService.login(this.state.data);
            //this.props.history.push('/');
            const { state } = this.props.location; //getting the requested url by the user to redirect to that url after login
            window.location = state ? state.from.pathname : '/';
        } catch (ex) {
            if(ex.response && ex.response.status === 400){
                toast.error(ex.response.data);
            } 
        }  
    }

    render() { 
        if(authService.getCurrentUser()) return <Redirect to = '/' /> //if user is logged in then redirect to login page
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