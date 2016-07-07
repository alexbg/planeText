import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import planeText from './reducers/reducer';
import App from './containers/container';
import thunkMiddleware from 'redux-thunk'

let store = createStore(
  planeText,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
);
//console.log(ReactDOM);
//console.log(store);
ReactDOM.render(
  React.createElement(Provider,{store: store},
    React.createElement(App)
  ),
  document.getElementById('main')
)
