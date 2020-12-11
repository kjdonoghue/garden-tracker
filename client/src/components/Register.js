import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {TextField, Button} from '@material-ui/core/'
import Select from '@material-ui/core/Select';
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

       // sets registration information prior to sending to db
       const [register, setRegister] = useState({})
   
       //handles on change event to user input for reg information
       const handleOnChange = (e) => {
           setRegister ({
               ...register,
               [e.target.name]: e.target.value
           })
       }

       //need to ensure all fields are filled out
       
       //handles the save - sending info to database to create user
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
                <MenuItem value="1a">1a</MenuItem>
                <MenuItem value="1b">1b</MenuItem>
                <MenuItem value="2a">2a</MenuItem>
                <MenuItem value="2b">2b</MenuItem>
                <MenuItem value="3a">3a</MenuItem>
                <MenuItem value="3b">3b</MenuItem>
                <MenuItem value="4a">4a</MenuItem>
                <MenuItem value="4b">4b</MenuItem>
                <MenuItem value="5a">5a</MenuItem>
                <MenuItem value="5b">5b</MenuItem>
                <MenuItem value="6a">6a</MenuItem>
                <MenuItem value="6b">6b</MenuItem>
                <MenuItem value="7a">7a</MenuItem>
                <MenuItem value="7b">7b</MenuItem>
                <MenuItem value="8a">8a</MenuItem>
                <MenuItem value="8b">8b</MenuItem>
                <MenuItem value="9a">9a</MenuItem>
                <MenuItem value="9b">9b</MenuItem>
                <MenuItem value="10a">10a</MenuItem>
                <MenuItem value="10b">10b</MenuItem>
                </Select>
            </FormControl>
            <div>
                <b><NavLink to = "/zone"> Don't know your zone? Find it here</NavLink></b>
            </div>    
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