
import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import jwtDecode from 'jwt-decode'
import NavBar from './components/common/navBar';
import { ToastContainer } from 'react-toastify'
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import Movies from './components/movies';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import RegisterForm from './components/registerForm';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'

class  App extends Component {
  state = {};

  componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token)
  
      this.setState ({user});
      
    } catch (ex) {}  
  }

render(){
  return (
    <React.Fragment>
    <ToastContainer />
    <NavBar user = { this.state.user } />

    <main className="container">
      <Switch>
          <Route path="/login" component={LoginForm}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/movies/:id" component={MovieForm}/>
          <Route path="/movies" component={Movies}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <Route path="/not-found" component={NotFound}/>
          <Redirect from="/" exact to="/movies"/>
          <Redirect to="/not-found" />
      </Switch>
     {/* <Movies /> */}
    </main>
    </React.Fragment>
  );
}
}
export default App;
