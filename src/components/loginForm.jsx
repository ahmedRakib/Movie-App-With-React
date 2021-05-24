import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {

    state = {
        account : { username:"", password:"" },
        errors : {}
    }

    validate () {
        //return  { username: "User Name is requried" };
        const errors = {};
        const {account} = this.state;

        if(account.username.trim() === '')
        errors.username = "UserName is required";
        if(account.password.trim() === '')
        errors.password = "Password is required";

        return Object.keys(errors).length === 0 ? null : errors;

    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState( { errors : errors || {} } ); //if there is no error then assigning an empty object
        if(errors) return;

        //call the server
        console.log("Submitted");
    }

    handleChange = e =>{
        const account = {...this.state.account}

        account[e.currentTarget.name] = e.currentTarget.value;

        this.setState( {account} );
    }

    render() { 
        return ( 
            <div>
                 <h1>Login</h1>
                 <form onSubmit={this.handleSubmit}>
                     <Input 
                        value={this.state.username} 
                        label = "Username" 
                        name = "username" 
                        onChange = {this.handleChange}
                        type = "text"
                        error = {this.state.errors.username}
                    />
                    <Input 
                        value={this.state.password} 
                        label = "Password" 
                        name = "password" 
                        onChange = {this.handleChange}
                        type = "password"
                        error = {this.state.errors.password}
                    />
                    <button className="btn btn-primary">Login</button>
                 </form>
            </div>
       
         );
    }
}
 
export default LoginForm;