import React, {useEffect} from 'react';
import RootPage from './pages/RootPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {customHistory} from './helpers/history';
import {initialize} from './fake';
import getUser from './helpers/user'

function App() {
  useEffect(() => {
    if (!getUser() || !localStorage.getItem('access_token')) return customHistory.push('/login')
    initialize(getUser().guid).catch(() => {
      customHistory.push('/login')
    })
  });

  return (
    <Provider store={store}>
      <Router history={customHistory}>
        <div>
          <Switch>
            <Route exact path="/" component={RootPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/user/:id" component={UserPage}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
