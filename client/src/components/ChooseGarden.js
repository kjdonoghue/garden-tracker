import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


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
    const [gardenName, setGardenName] = useState({})

    useEffect(() => {
        displayGardenOptions()
    }, [props.updateGardens])


    //get all garden options
    const displayGardenOptions = () => {
        axios.get('http://localhost:8080/garden/list-gardens')
        .then(response => {
            setGardens(response.data)
        })
    }

    const handleOnChange = (name, value) => {
            // setGardenName({...gardenName,
            //     name: name,
            //     value: value

            // })

        props.onSetGardenDefault({garden_name: name, garden_id: value})
        
    }

    console.log(gardenName)

    //map through gardens and add them to drop down variables

    const gardenList = gardens.map(garden => {
        return <MenuItem onClick={() => handleOnChange(garden.garden_name, garden.id)} name={garden.garden_name} value={garden.id} key={garden.id}>{garden.garden_name}</MenuItem>
    })

        return (
        <div>
           <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Garden</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //name="Test"
                // value={selectedGarden}               
                // onChange={handleOnChange}
                label="garden"
                >
                    {gardenList}
                </Select>
            </FormControl>
        </div>
    )
}

const mapStatesToProps = (state) => {
    return {
        displayGardenDefault: state.primary_garden,
        displayZoneDefault: state.zone,
        updateGardens: state.new_garden

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetGardenDefault: (garden) => dispatch({type: 'SET_GARDEN', payload: garden}),
        onSetZoneDefault: (zone) => dispatch({type: 'SET_ZONE', payload: zone})         
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(ChooseGarden)