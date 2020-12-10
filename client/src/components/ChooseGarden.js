import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function ChooseGarden(props) {

    //for material ui
    const classes = useStyles();

    const [gardens, setGardens] = useState([])
    const [selectedGarden, setSelectedGarden] = useState()

    useEffect(() => {
        // get user defaults
        // fetchUserGardenDefaults()

        //get all garden options
        displayGardenOptions()
    }, [])

    // get user defaults - should this move to action creators?
    // const fetchUserGardenDefaults = () => {
    //     axios.get('http://localhost:8080/garden/defaults')
    //     .then(response => {
    //         let zone = response.data[0].zone
    //         let garden_id = response.data[0].primary_garden
    //         props.onSetZoneDefault(zone)
    //         props.onSetGardenDefault(garden_id)
    //     })
    // }

    //get all garden options
    const displayGardenOptions = () => {
        axios.get('http://localhost:8080/garden/list-gardens')
        .then(response => {
            setGardens(response.data)
        })
    }

    const handleOnChange = (e) => {
        
        props.onSetGardenDefault(e.target.value)
        
    }

    //map through gardens and add them to drop down variables

    const gardenList = gardens.map(garden => {
        return <MenuItem name={garden.garden_name} value={garden.id}>{garden.garden_name}</MenuItem>
    })

        return (
        <div>
           <p>choose garden</p> 

           <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Garden</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="garden" 
                value={selectedGarden}               
                onChange={handleOnChange}
                label="garden"
                >
                    {gardenList}
                </Select>
            </FormControl>
            <div>
                <b><NavLink to = "/add-garden">Create a new Garden</NavLink></b>
            </div>
        </div>
    )
}

const mapStatesToProps = (state) => {
    return {
        displayGardenDefault: state.primary_garden,
        displayZoneDefault: state.zone

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetGardenDefault: (garden_id) => dispatch({type: 'SET_GARDEN', payload: garden_id}),
        onSetZoneDefault: (zone) => dispatch({type: 'SET_ZONE', payload: zone})         
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(ChooseGarden)