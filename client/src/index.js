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
import DisplayGarden from './components/DisplayGarden';
import AddGarden from './components/AddGarden'
import Guides from './components/Guides';
import Tasks from './components/Tasks';
import Zone from './components/Zone';
import PlantDetails from './components/PlantDetails'
import {setAuthenticationHeader} from './utils/authHeaders'
import requireAuth from './components/requireAuth'
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

//change material ui colors
const theme = createMuiTheme({
  palette: {
     primary: {
        main: "#434c23" // dark green
               },
     secondary: {
        main: "#ca912f" //yellow
                }
           },
//fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

//get token from local storage
const token = localStorage.getItem('jsonwebtoken')

//set header for axios
setAuthenticationHeader(token)

// keep user logged in even if restart
// if(token) {
//   store.dispatch({
//     type: 'LOGGED_IN'
//   })
// }

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
            {/* <Route component = {requireAuth(DisplayGarden)} path='/garden' /> */}
            <Route component = {DisplayGarden} path='/garden' />
            <Route component = {AddGarden} path='/add-garden' />
            {/* <Route component = {requireAuth(Tasks)} path='/tasks' /> */}
            <Route component = {PlantDetails} path='/plant/:id' />
            <Route component = {Tasks} path='/tasks' />
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
