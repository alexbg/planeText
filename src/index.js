import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import planeText from './reducers/reducer';
import App from './containers/container';

let store = createStore(planeText);
//console.log(ReactDOM);
//console.log(store);
ReactDOM.render(
  React.createElement(Provider,{store: store},
    React.createElement(App)
  ),
  document.getElementById('main')
)
