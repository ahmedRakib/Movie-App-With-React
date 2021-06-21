import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import authService from '../../services/authService';

const ProtectedRoute = ({ path, component : Component, render, ...rest }) => {
    return (  
        <Route 
            path={path}
            {...rest}
            render={props => {
                if(!authService.getCurrentUser()) return <Redirect to = {{
                    pathname : '/login',
                    state : {from : props.location} //sending the requested url by the user to redirect to that url after logging in successfully
                }} />;
                return Component ? <Component {...props} /> : render(props);
            }} 
        />
    );
}
 
export default ProtectedRoute;