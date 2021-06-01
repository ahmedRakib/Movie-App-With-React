import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input'

class Form extends Component {
    state = { 
        data: {},
        errors : {}
     }

    validate () {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly: false});

        if(!result.error)  return null;

        const errors = {};
        for(let item of result.error.details){
            //console.log("Hello" + item.path[0])
            errors[item.path[0]] =  item.message;
        }
        return errors;

        // previous code without joi 
        // const errors = {};
        // const {data} = this.state;

        // if(data.username.trim() === '')
        // errors.username = "UserName is required";
        // if(data.password.trim() === '')
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

    handleChange = e =>{
        const data = {...this.state.data}
        const errors = {...this.state.errors}

        //validation
        const errorMessage = this.validateProperty(e);
        if(errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];

        data[e.currentTarget.name] = e.currentTarget.value;

        this.setState( {data, errors} );
    }

    handleSubmit = e => {
        e.preventDefault(); // preventing auto post to server

        const errors = this.validate();
        console.log(errors);
        this.setState( { errors : errors || {} } ); //if there is no error then assigning an empty object
        if(errors) return;

        this.doSubmit();   
    }

    renderButton(label){
        // {/* if validate method returns null then its falsy(false) otherwise truthy(true) */}
        return <button disabled = {this.validate()} className="btn btn-primary">{label}</button>
    }

    renderInput(name, label, type="text"){

        const {data, errors} = this.state; //object destructuring

        return <Input 
        value={data[name]} 
        label = {label}
        name = {name}
        onChange = {this.handleChange}
        type = {type}
        error = {errors[name]}
    />
    }
  
}
 
export default Form;