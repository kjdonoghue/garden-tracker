import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"
import { setAuthenticationHeader } from '../utils/authHeaders'
import * as actionCreators from '../store/actions/actionCreators'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Message from './Message'

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

function Login(props) {
    //for textboxes & button
    const classes = useStyles();

    //sets login information proir to sending to db  
    const [login, setLogin] = useState({})
    const [message, setMessage] = useState('')

    //handles chnage events as user inputs login info
    const handleOnChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    //handles log in save to send info to db for verification
    const handleSubmit = (e) => {

        if (login.username == '' || login.password == '') {
            setMessage("Please enter a username and password")

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
                        props.updatePrimaryGarden({ garden_name, garden_id })
                        props.updateZone(zone)
                        props.onLogIn()
                        props.history.push("/garden")
                    } else {
                        setMessage(response.data.message)
                    }
                })
        }
    }

    const handleGuestLogin = () => {
        axios.post('http://localhost:8080/guestlogin')
            .then(response => {

                const token = response.data.token
                const zone = response.data.zone
                const garden_name = response.data.garden_name
                const garden_id = response.data.garden_id

                if (token) {
                    localStorage.setItem("jsonwebtoken", token)
                    setAuthenticationHeader(token)
                    props.onLogIn()
                    props.updatePrimaryGarden({ garden_name, garden_id })
                    props.updateZone(zone)                    
                    props.history.push("/garden")
                } else {
                    setMessage(response.data.message)
                }
            })


    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                    </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
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
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Sign In
                            </Button>
                    </div>
                    <div className={classes.submit}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleGuestLogin}>
                            Sign In as Guest
                            </Button>
                    </div>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <NavLink to='/register' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                    <Message message={message} />
                </form>
            </div>
        </Container>
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