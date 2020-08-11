import React from 'react';
import RootPage from './pages/RootPage';
import UserPage from './pages/UserPage';
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

function App() {
  return (
    <Provider store={store}>
      <Router history={customHistory}>
        <div>
          <Switch>
            <Route exact path="/" component={RootPage}/>
            <Route path="/user/:id" component={UserPage}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
