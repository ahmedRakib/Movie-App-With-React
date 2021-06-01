import React, { Component } from 'react';
import Joi, { schema } from 'joi-browser';
import Input from './common/input';

class LoginForm extends Component {

    state = {
        account : { username:"", password:"" },
        errors : {}
    }

    schema = {
        username : Joi.string().required().label('Username'),
        password : Joi.string().required().label('Password')
    }

    validate () {
        const result = Joi.validate(this.state.account, this.schema, {abortEarly: false});

        if(!result.error)  return null;

        const errors = {};
        for(let item of result.error.details){
            //console.log("Hello" + item.path[0])
            errors[item.path[0]] =  item.message;
        }
        return errors;

        // previous code without joi 
        // const errors = {};
        // const {account} = this.state;

        // if(account.username.trim() === '')
        // errors.username = "UserName is required";
        // if(account.password.trim() === '')
        // errors.password = "Password is required";

        // return Object.keys(errors).length === 0 ? null : errors;
    }

    //
    validateProperty(e){
        // if(e.currentTarget.name === "username"){
        //     if(e.currentTarget.value.trim() === "") return "Username is required";
        // }
        // if(e.currentTarget.name === "password"){
        //     if(e.currentTarget.value.trim() === "") return "Password is required";
        // }

        // if(e.currentTarget.value.trim() === ""){
        //     if(e.currentTarget.name === "username") return "Username is required";
        //     else return "Password is required";
        // }

        const obj = {
            [e.currentTarget.name] : e.currentTarget.value
        }

        const schema = {
            [e.currentTarget.name] : this.schema[e.currentTarget.name]
        }

        const result = Joi.validate(obj, schema );

        return result.error ? result.error.details[0].message  : null;

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
        const errors = {...this.state.errors}

        //validation
        const errorMessage = this.validateProperty(e);
        if(errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];

        account[e.currentTarget.name] = e.currentTarget.value;

        this.setState( {account, errors} );
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
                    {/* if validate method returns null then its falsy(false) otherwise truthy(true) */}
                    <button disabled = {this.validate()} className="btn btn-primary">Login</button>
                 </form>
            </div>
       
         );
    }
}
 
export default LoginForm;