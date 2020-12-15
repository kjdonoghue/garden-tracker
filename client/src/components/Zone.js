import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import axios from "axios"
import * as actionCreators from '../store/actions/actionCreators'
import './css/zone.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Message from './Message'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function FindZone(props) {
  const classes = useStyles();


  const [zip, setZip] = useState('')
  const [zone, setZone] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchZoneInformation(props.setZone)

  }, [props.setZone])

  //  get zone info based on zone id
  const fetchZoneInformation = (id) => {
    if (id) {
      axios.get(`https://tranquil-taiga-06770.herokuapp.com/guides/zone-information/${id}`)      
        .then(response => {
          setZone(response.data)
        })
    }
  }

  //handle on change for entering zip code to get zone
  const handleOnChange = (e) => {
    return (
      setZip({
        zip: e.target.value
      })
    )
  }

  //validate zip code and handle the save to get the zone number based on zip
  const handleOnClick = (zip) => {
    const zipCodeRegex = /^\d{5}$/

    if (zipCodeRegex.test(zip) === false) {
      setMessage("Please enter a valid zip code")
    } else if (zip === '') {
      alert("Please enter a valid zip code")
    } else {
      setMessage('')
      fetch(`https://phzmapi.org/${zip}.json`)
        .then(response => response.json())
        .then(result => {
          props.updateZone(result.zone)
          fetchZoneInformation(result.zone)
        })
    }
  }

  //handle change to have option to update zone
  const handleOnChangeGuest = () => {
    props.notGuest()
  }

  //maps through zone db information
  let ZoneItem = zone.map(zone => {
    return <div key={zone.lat} className="zoneDetails">
      <label>Last Frost: {zone.last_frost}</label>
      <label>First Frost: {zone.first_frost}</label>
      <label>Avg Extreme Min Temp: {zone.temp}F</label>
    </div>
  })

  return (
    <Container component="main" maxWidth="sm">
            <CssBaseline />
    <div className="zoneContainer">
      <h2>GROWING ZONE INFORMATION</h2>
      <img src='./images/zone_map.jpg' alt='map' />
      {!props.isGuest ? <div className='findZone'>
        <h3>Find Your Growing Zone</h3>
        <p>The USDA divides North America into 11 separate planting zones; each growing zone is 10°F warmer (or colder) in an average winter than the adjacent zone. Knowing your growing zone allows you to estimate your first and last frosts so that you can better gauge when to start your seeds and plant outside. Additionally, it can help you determine the best plants and varieties to grow in your backyard.</p>
        <p>Enter your zip code to see detailed information about your growing zone</p>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField name="zone" onChange={handleOnChange} id="outlined-basic" label="Zip Code" variant="outlined" />
        </form>
        <Button onClick={() => handleOnClick(zip.zip)} variant="contained" color="primary">
          Submit
      </Button>
      <Message message={message} />
      </div> : null}

      {props.isGuest ? <div className='zoneNum'>
      
        <h4>Your Zone is: {props.setZone} </h4>
        {ZoneItem}
        <Button onClick={handleOnChangeGuest} variant="contained" color="primary">
          Change Zone
      </Button>
      </div> : null}

    </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    setZone: state.zoneReducer.zone,
    isGuest: state.zoneReducer.isGuest
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateZone: (zone) => dispatch(actionCreators.setZone(zone)),
    notGuest: () => dispatch(actionCreators.notGuest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindZone)