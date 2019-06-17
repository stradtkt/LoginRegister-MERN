import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Alert from './components/Alert';
import Home from './components/Home';

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
      store.dispatch(loadUser());
  }, []);  
  return (
    <Provider store={store}>
        <Router>
            <Navbar/>
            <Alert/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </Router>
    </Provider>
  );
}

export default App;
