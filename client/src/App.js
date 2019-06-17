import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </Switch>
        </Router>
    </Provider>
  );
}

export default App;
