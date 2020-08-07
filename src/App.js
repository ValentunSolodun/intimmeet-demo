import React from 'react';
import RootPage from './pages/RootPage'
import UserPage from './pages/UserPage';
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
    <div className="App">
      <Router history={customHistory}>
        <div>
          <Switch>
            <Route exact path="/">
              <RootPage/>
            </Route>
            <Route path="/user/:id">
              <UserPage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
