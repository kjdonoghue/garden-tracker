import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core/'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import * as actionTypes from "../store/actions/actionTypes"
import axios from "axios"
import { setAuthenticationHeader} from '../utils/authHeaders'


//For Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
})); 

function Login(props) {
      //for textboxes & button
      const classes = useStyles();

    const [login, setLogin] = useState({})

    const handleOnChange = (e) => {
        setLogin ({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        axios.post('http://localhost:8080/login', {
            username: login.username,
            password: login.password,
            zip: login.zip
        })
        .then(response => {
                        
           const token = response.data.token
           const zone = response.data.zone
         
           if (token) {
                localStorage.setItem("jsonwebtoken", token)
                setAuthenticationHeader(token)
                // props.updateZone(zone)
                props.onLogIn()
                props.history.push("/")
            } else {
                console.log("your entry was not accepted")
           }
        })
    }

    return(
        <div className="loginContainer">
        <h1>Login</h1>
        <div>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-secondary"
                label="Username"
                variant="outlined"        
                name="username"
                color="secondary"
                onChange={handleOnChange}
            />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                name="password"
                color="secondary"
                onChange={handleOnChange}
                />
        </form>
        </div>
        <div className={classes.root}>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
        <b><NavLink to = "/register">Register For An Account</NavLink></b>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: () => dispatch({type: actionTypes.LOGGED_IN}),
        // updateZone: (zone) => dispatch({type: 'SET_ZONE', payload: zone})
    }
}

export default connect(null, mapDispatchToProps)(Login)