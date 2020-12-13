import './App.css';
import React from 'react';
import Movies from './components/movies.jsx';
import NavBar from './components//navBar.jsx';
import NotFound from './components/not-found.jsx';
import Rentals from './components/rentals.jsx';
import Customers from './components/customers.jsx';
import MovieForm from './components/movieForm.jsx';
import LoginForm from "./components/loginForm";
import { Route, Switch, Redirect } from 'react-router-dom';
function App() {
  return (
    <React.Fragment>
      <NavBar />
    <main className="container">
      <Switch>
             <Route path='/login' component={LoginForm}/>
            <Route path='/rentals' component={Rentals} /> 
            <Route path='/movies' component={Movies} />
            <Route path='/customers' component={Customers} />
            <Route path='/not-found' component={NotFound} />
            <Redirect exact from='/' to='/movies' />
            <Redirect to='/not-found'/>
      </Switch>
    </main>
    </React.Fragment>
  );
}

export default App;
