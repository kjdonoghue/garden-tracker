import { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

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

    //prompts table to update through redux
    const handleOnClick = (name, id) => {
        props.onSetGardenDefault({ garden_name: name, garden_id: id })
    }

    //map through gardens and add them to drop down variables
    const gardenList = gardens.map(garden => {
        return <MenuItem onClick={() => handleOnClick(garden.garden_name, garden.id)} name={garden.garden_name} value={garden.id} key={garden.id}>{garden.garden_name}</MenuItem>
    })


    //display
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select A Garden</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" >
                    {gardenList}
                </Select>
            </FormControl>
        </div>
    )
}

const mapStatesToProps = (state) => {
    return {

        // update gardens propts the list to update after adding new garden
        updateGardens: state.gardenReducer.new_garden
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetGardenDefault: (garden) => dispatch(actionCreators.setSelectedGarden(garden)),
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(ChooseGarden)