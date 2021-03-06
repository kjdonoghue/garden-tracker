import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {createStore, combineReducers} from "redux"
import {Provider} from "react-redux"
import BaseLayout from './components/BaseLayout';
import Login from './components/Login';
import Register from './components/Register';
import DisplayGarden from './components/DisplayGarden';
import Guides from './components/Guides';
import Zone from './components/Zone';
import AddPlant from './components/AddPlant';
import PlantDetails from './components/PlantDetails'
import {setAuthenticationHeader} from './utils/authHeaders'
import requireAuth from './components/requireAuth'
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import gardenReducer from './store/reducers/garden'
import zoneReducer from './store/reducers/zone'
import authenticatedReducer from './store/reducers/authenticated'

//change material ui colors
const theme = createMuiTheme({
  palette: {
    // dark green
     primary: {main: "#434c23"},
     //yellow
     secondary: {main: "#ca912f"}
    },
  });

//reducers
const rootReducer = combineReducers({
  gardenReducer: gardenReducer,
  zoneReducer: zoneReducer,
  authenticatedReducer: authenticatedReducer
})  

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

//get token from local storage
const token = localStorage.getItem('jsonwebtoken')

//set header for axios
setAuthenticationHeader(token)


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
        <ThemeProvider theme={theme}>
          <BaseLayout>
            <Route component = {Register} path='/register' />
            <Route component = {Login} path='/login' />
            <Route component = {App} path='/' exact />
            <Route component = {Guides} path='/guides' />
            <Route component = {requireAuth(DisplayGarden)} path='/garden' />        
             <Route component = {requireAuth(PlantDetails)} path='/detail/:id' />
            <Route component = {requireAuth(AddPlant)} path='/add-plant' />  
            <Route component = {Zone} path='/zone' />
          </BaseLayout>
          </ThemeProvider>
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
