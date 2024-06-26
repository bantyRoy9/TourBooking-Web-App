import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './Redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>

);

