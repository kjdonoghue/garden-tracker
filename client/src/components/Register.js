import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {TextField, Button} from '@material-ui/core/'
import Select from '@material-ui/core/Select';
import * as actionTypes from "../store/actions/actionTypes"
import axios from "axios"
import { setAuthenticationHeader} from '../utils/authHeaders'
import {NavLink} from "react-router-dom"

//For Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})); 


function Register(props) {

       //for textboxes & button
       const classes = useStyles();

       const [register, setRegister] = useState({})
   
       const handleOnChange = (e) => {
           setRegister ({
               ...register,
               [e.target.name]: e.target.value
           })
       }

       const handleSubmit = (e) => {
           fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(register)
            }).then (response => response.json())
            .then(result => {
                if (result.success) 
                props.history.push('/login')
            })
        
        }
   

    return(
        <div>
         <div className="loginContainer">
        <h1>Register</h1>
        <div>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-secondary"
                label="Username"
                variant="outlined"        
                name="username"
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
                onChange={handleOnChange}
                />
            </form>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Zone</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="zone"
                onChange={handleOnChange}
                label="Zone"
                >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                </Select>
            </FormControl>
            <b><NavLink to = "/zone"> Don't know your zone? Find it here</NavLink></b>
        </div>
        <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    </div>
            
        </div>
    )
}

export default Register