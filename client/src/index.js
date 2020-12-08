import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import reducer from './store/reducer'
import BaseLayout from './components/BaseLayout';
import Login from './components/Login';
import Register from './components/Register';
import Garden from './components/Garden';
import Guides from './components/Guides';
import Tasks from './components/Tasks';
import Zone from './components/Zone';
import Calculators from './components/Calculators';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <BaseLayout>
            <Route component = {Register} path='/register' />
            <Route component = {Login} path='/login' />
            <Route component = {App} path='/' exact />
            <Route component = {Guides} path='/guides' />
            <Route component = {Calculators} path='/calculators' />
            <Route component = {Garden} path='/garden' />
            <Route component = {Tasks} path='/tasks' />
            <Route component = {Zone} path='/zone' />
          </BaseLayout>
        </Switch>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
