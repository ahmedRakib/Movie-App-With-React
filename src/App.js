
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import './App.css';
import NavBar from './components/common/navBar';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm'
import Movies from './components/movies'
import NotFound from './components/notFound';
import Rentals from './components/rentals';

function App() {
  return (
    <React.Fragment>
    <NavBar />

    <main className="container">
      <Switch>
          <Route path="/login" component={LoginForm}/>
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

export default App;
