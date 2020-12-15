import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { NavLink } from "react-router-dom"
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Message from "./Message";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Register(props) {

    //for textboxes & button
    const classes = useStyles();

    // sets registration information prior to sending to db
    const [register, setRegister] = useState({ username: '', password: '', zone: '' })
    const [message, setMessage] = useState('')

    //handles on change event to user input for reg information
    const handleOnChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }

    //need to ensure all fields are filled out

    //handles the save - sending info to database to create user
    const handleSubmit = (e) => {
        if (register.username === '' || register.password === '' || register.zone === '') {
            setMessage("You must enter a username, password, and growing zone to create an account")
        } else {
            axios.post('https://tranquil-taiga-06770.herokuapp.com/register', {
                data: register
            }).then(response => {

                let success = response.data.success
                if (success) {
                    props.history.push('/login')
                } else {
                    setMessage(response.data.message)
                }
            })
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
              </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        onChange={handleOnChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                    <div className={classes.submit}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
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
                    </div>
                    <div className={classes.submit}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Register
                    </Button>
                    </div>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <NavLink to="/zone" variant="body2"> Don't know your zone? Find it here</NavLink>
                        </Grid>
                    </Grid>
                </form>
                <Message message={message} />
            </div>
        </Container>
    )
}

export default Register