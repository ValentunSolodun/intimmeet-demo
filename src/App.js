import React, {useEffect} from 'react';
import RootPage from './pages/RootPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import {Route, Router, Switch} from "react-router-dom";
import {customHistory} from './helpers/history';
// import {IntimMeet} from './fake';
import {IntimMeet} from 'client-lib';
import getUser from './helpers/user'

function App() {
  useEffect(() => {
    if (!getUser() || !localStorage.getItem('access_token')) return customHistory.push('/login')
    IntimMeet.initialize(getUser().guid).catch(() => {
      localStorage.clear();
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
        {window.onCallEvent && (
          <div style={{position: 'absolute', bottom: 5, left: 10}}>
            <button onClick={() => window.onCallEvent('create', {
              isIncoming: false,
              publishVideo: false,
              publishAudio: true,
              isOutcoming: true,
              targetData: {name: 'test User 1'}
            })}>
              Outcoming call
            </button>
            <button onClick={() => window.onCallEvent('create', {
              isIncoming: false,
              publishVideo: true,
              publishAudio: true,
              isOutcoming: true,
              targetData: {name: 'test User 1'}
            })}>
              Outcoming call with video
            </button>
            <button onClick={() => window.onCallEvent('create', {
              isIncoming: true,
              isOutcoming: false,
              targetData: {name: 'test User 1'}
            })}>
              Incoming call
            </button>
            <button onClick={() => window.onCallEvent('pick_up', {subscribeVideo: true, publishVideo: true, subscribeAudio: true, publishAudio: true})}>Pick up (with video)</button>
            <button onClick={() => window.onCallEvent('pick_up', {subscribeVideo: false, publishVideo: false, subscribeAudio: true, publishAudio: true})}>Pick up</button>
            <button onClick={() => window.onCallEvent('hang_up')}>Hang up</button>
            <button onClick={() => window.onCallEvent('state_changed', {subscribeAudio: false})}>State changed (off
              subscribeAudio)
            </button>
            <button onClick={() => window.onCallEvent('state_changed', {subscribeAudio: true})}>State changed (on
              subscribeAudio)
            </button>
            <button onClick={() => window.onCallEvent('state_changed', {subscribeVideo: false})}>State changed (off
              subscribeVideo)
            </button>
            <button onClick={() => window.onCallEvent('state_changed', {subscribeVideo: true})}>State changed (on
              subscribeVideo)
            </button>


            <button onClick={() => window.onCallEvent('state_changed', {publishVideo: true})}>State changed (on video)
            </button>
            <button onClick={() => window.onCallEvent('state_changed', {publishVideo: false})}>State changed (off video)
            </button>
            <button onClick={() => window.onCallEvent('state_changed', {publishAudio: true})}>State changed (on micro)
            </button>
            <button onClick={() => window.onCallEvent('state_changed', {publishAudio: false})}>State changed (off micro)
            </button>
            <button onClick={() => window.onCallEvent('error')}>Error</button>
          </div>
        )}
      </Router>
    </Provider>
  );
}

export default App;
