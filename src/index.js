import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import './fonts/Silkscreen/Silkscreen-Regular.ttf';
import {Provider} from "react-redux";
import store from './store';



ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


