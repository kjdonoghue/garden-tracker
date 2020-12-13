import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core/'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import axios from "axios"
import { setAuthenticationHeader} from '../utils/authHeaders'
import * as actionCreators from '../store/actions/actionCreators'
import LoginTest from './LoginTest'

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

    //sets login information proir to sending to db  
    const [login, setLogin] = useState({})

    //handles chnage events as user inputs login info
    const handleOnChange = (e) => {
        setLogin ({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    //handles log in save to send info to db for verification
    const handleSubmit = (e) => {
        if (login.username == '' || login.password == '') {
            alert("Please enter a username and password")
            
        } else {
        
        axios.post('http://localhost:8080/login', {
            data: login         
        })
        .then(response => {
           const token = response.data.token
           const zone = response.data.zone
           const garden_name = response.data.garden_name
           const garden_id = response.data.garden_id
         
           if (token) {
                localStorage.setItem("jsonwebtoken", token)
                setAuthenticationHeader(token)
                props.updatePrimaryGarden({garden_name, garden_id})
                props.updateZone(zone)
                props.onLogIn()
                props.history.push("/garden")
            } else {
                alert(response.data.message)
           }
        })
        }   
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
        <b><NavLink to = "/register">Don't have an account? Sign Up</NavLink></b>   
        <LoginTest />
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: () => dispatch(actionCreators.loggedIn()),
        updateZone: (zone) => dispatch(actionCreators.setZone(zone)),
        updatePrimaryGarden: (garden) => dispatch(actionCreators.setSelectedGarden(garden))
    }
}

export default connect(null, mapDispatchToProps)(Login)