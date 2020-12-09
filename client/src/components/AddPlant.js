import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import axios from "axios";


//for material-ui select
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
  }));


function AddPlant(props) {
    //for material ui select
    const classes = useStyles();

    const [newPlant, setNewPlant] = useState({})
    
    useEffect(() => {
      setNewPlant({...newPlant,
        zone: props.displayZone,
        garden_id: props.displayGardenID
      })
    }, [props.displayGardenID])        
    
    
    const handleOnChange = (e) => {
        setNewPlant({...newPlant,
          [e.target.name]: e.target.value
        })
    }

    const onSaveToGarden = (plant) => {
      axios.post('http://localhost:8080/garden/save-new',
        {
          data: newPlant
        })
        .then(response => {let success = response.data.success

          if (success) {
           //reload add plant and garden
           console.log("Success")
          } else {
              console.log("did not update")
              }
          })    
    }

    

      return (
        <div>
            <p>Add Plant</p>
            <div>
            <TextField onChange={handleOnChange} name="plant_name" value={newPlant.plant_name} id="standard-search" label="Plant Name" type="text" />
            </div>
            <div>
            <FormControl className={classes.formControl}>            
                  <InputLabel id="demo-simple-select-label">Family</InputLabel>
                  <Select onChange={handleOnChange} labelId="demo-simple-select-label" id="demo-simple-select" name="plant_family" value={newPlant.plant_family} >
                      <MenuItem value={1}>Beans</MenuItem>
                      <MenuItem value={2}>Beets</MenuItem>
                      <MenuItem value={3}>Broccoli</MenuItem>
                      <MenuItem value={4}>Cabbage</MenuItem>
                      <MenuItem value={5}>Carrots</MenuItem>
                      <MenuItem value={6}>Cauliflower</MenuItem>
                      <MenuItem value={7}>Celery</MenuItem>
                      <MenuItem value={8}>Corn</MenuItem>
                      <MenuItem value={9}>Cowpeas</MenuItem>
                      <MenuItem value={10}>Cucumbers</MenuItem>
                      <MenuItem value={11}>Eggplant</MenuItem>
                      <MenuItem value={13}>Greens</MenuItem>
                      <MenuItem value={14}>Leeks</MenuItem>
                      <MenuItem value={15}>Melons</MenuItem>
                      <MenuItem value={16}>Okra</MenuItem>
                      <MenuItem value={19}>Peanuts</MenuItem>
                      <MenuItem value={20}>Peas</MenuItem>
                      <MenuItem value={21}>Peppers</MenuItem>
                      <MenuItem value={22}>Potatoes</MenuItem>
                      <MenuItem value={24}>Summer Squash</MenuItem>
                      <MenuItem value={25}>Winter Squash</MenuItem>
                      <MenuItem value={26}>Sweet Potatoes</MenuItem>
                      <MenuItem value={28}>Tomatoes</MenuItem>        
                  </Select>
              </FormControl>                        
              <TextField onChange={handleOnChange} name="company" id="standard-search" label="Company" type="text" value={newPlant.company} />
              <FormControl className={classes.formControl}>            
                  <InputLabel id="demo-simple-select-label">Start From</InputLabel>
                  <Select onChange={handleOnChange} labelId="demo-simple-select-label" id="demo-simple-select" name="type" value={newPlant.type} >
                      <MenuItem value="seed">Seed</MenuItem>
                      <MenuItem value="plant">Plant</MenuItem>
                      <MenuItem value="sets">Sets</MenuItem>
                      <MenuItem value="slips">Slips</MenuItem>                   
                  </Select>
              </FormControl>
              </div>
              <div>
                <button onClick={() => onSaveToGarden(newPlant)}>Save</button>
              </div>          
        </div>

        
    );
} 

const mapStatesToProps = (state) =>  {
  return {
    displayZone: state.zone,
    displayGardenID: state.primary_garden   
  }
}

export default connect(mapStatesToProps)(AddPlant)